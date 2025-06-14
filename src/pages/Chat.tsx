import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Lightbulb, BookOpen, TrendingUp } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export const Chat: React.FC = () => {
  const { userData } = useUser();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: `Hello${userData.name ? ` ${userData.name}` : ''}! I'm your AI career advisor. I'm here to help you with career guidance, job market insights, and personalized recommendations. What would you like to know about your career path?`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    {
      icon: Lightbulb,
      text: 'Career suggestions for my skills',
      action: 'Based on my skills and interests, what career paths would you recommend?'
    },
    {
      icon: BookOpen,
      text: 'Skills I should develop',
      action: 'What skills should I develop to advance in my career?'
    },
    {
      icon: TrendingUp,
      text: 'Job market trends',
      action: 'What are the current job market trends in my field of interest?'
    }
  ];

  const generateBotResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Simple response generation based on keywords
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('skill') || lowerMessage.includes('develop')) {
      return `Based on current market trends, I'd recommend focusing on these high-demand skills:

• **Technical Skills**: Programming (Python, JavaScript), Data Analysis, Cloud Computing (AWS, Azure)
• **Soft Skills**: Leadership, Communication, Problem-solving, Adaptability
• **Digital Skills**: Digital Marketing, UX/UI Design, Project Management tools

${userData.interests.length > 0 ? `Given your interests in ${userData.interests.slice(0, 2).join(' and ')}, I'd especially recommend focusing on skills that combine these areas with technology.` : ''}

Would you like me to suggest specific courses or certifications for any of these areas?`;
    }

    if (lowerMessage.includes('career') || lowerMessage.includes('job') || lowerMessage.includes('recommendation')) {
      const careers = [
        'Software Developer',
        'Data Scientist',
        'Digital Marketing Manager',
        'UX/UI Designer',
        'Project Manager',
        'Business Analyst',
        'Product Manager',
        'Cybersecurity Specialist'
      ];
      
      const randomCareers = careers.sort(() => 0.5 - Math.random()).slice(0, 3);
      
      return `Based on your profile and current market demand, here are some promising career paths:

${randomCareers.map((career, index) => `**${index + 1}. ${career}**
• High growth potential and competitive salaries
• Strong demand across multiple industries
• Opportunities for remote work and career advancement`).join('\n\n')}

${userData.skills.length > 0 ? `Your existing skills in ${userData.skills.slice(0, 2).join(' and ')} align well with these opportunities.` : ''}

Would you like me to provide more details about any of these careers, including required skills and typical career progression?`;
    }

    if (lowerMessage.includes('salary') || lowerMessage.includes('pay') || lowerMessage.includes('earn')) {
      return `Here's an overview of salary ranges for popular career paths:

**Technology Sector:**
• Software Developer: $70,000 - $150,000+
• Data Scientist: $80,000 - $160,000+
• Cybersecurity Specialist: $75,000 - $140,000+

**Business & Marketing:**
• Digital Marketing Manager: $60,000 - $120,000+
• Product Manager: $90,000 - $180,000+
• Business Analyst: $65,000 - $130,000+

**Design & Creative:**
• UX/UI Designer: $65,000 - $130,000+
• Graphic Designer: $40,000 - $80,000+

Salaries vary significantly based on location, experience, company size, and specific skills. Major tech hubs typically offer higher compensation but also have higher living costs.

Would you like me to provide more specific information about salaries in your area or for particular roles?`;
    }

    if (lowerMessage.includes('trend') || lowerMessage.includes('future') || lowerMessage.includes('market')) {
      return `Here are the key job market trends shaping the future of work:

**🚀 High-Growth Areas:**
• Artificial Intelligence & Machine Learning
• Cybersecurity & Data Privacy
• Renewable Energy & Sustainability
• Healthcare Technology & Telemedicine
• E-commerce & Digital Transformation

**💼 In-Demand Skills:**
• Cloud Computing & DevOps
• Data Analysis & Visualization
• Digital Marketing & SEO
• Remote Collaboration Tools
• Emotional Intelligence & Leadership

**🔮 Future Outlook:**
• Hybrid/remote work is becoming permanent
• Continuous learning is essential for career growth
• Soft skills are increasingly valued alongside technical skills
• Green jobs and sustainability roles are expanding rapidly

The key is to stay adaptable and continuously update your skills. Which of these trends interests you most?`;
    }

    if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
      return `Here are key tips for creating a standout resume:

**📝 Structure & Format:**
• Keep it to 1-2 pages maximum
• Use a clean, professional format with consistent styling
• Include contact info, professional summary, experience, education, and skills

**🎯 Content Tips:**
• Use action verbs and quantify achievements (e.g., "Increased sales by 25%")
• Tailor your resume for each job application
• Include relevant keywords from the job posting
• Focus on results and impact, not just responsibilities

**✨ Modern Resume Trends:**
• Add a professional summary instead of an objective
• Include links to your LinkedIn profile and portfolio
• Use bullet points for easy scanning
• Consider adding relevant certifications and volunteer work

${userData.skills.length > 0 ? `Make sure to highlight your skills in ${userData.skills.slice(0, 3).join(', ')} prominently in your skills section.` : ''}

Would you like me to help you craft a professional summary or review specific sections of your resume?`;
    }

    // Default response
    return `That's a great question! As your AI career advisor, I can help you with:

• **Career Path Planning**: Discover roles that match your interests and skills
• **Skill Development**: Identify gaps and recommend learning resources
• **Job Market Insights**: Stay updated on trends and opportunities
• **Resume & Interview Prep**: Get tips for job applications
• **Salary Negotiation**: Understand market rates and negotiation strategies

${userData.assessmentCompleted ? 'Since you\'ve completed your assessment, I can provide more personalized advice based on your profile.' : 'Consider completing the career assessment for more personalized recommendations!'}

What specific aspect of your career would you like to explore today?`;
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const botResponse = await generateBotResponse(input);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: 'I apologize, but I encountered an error. Please try asking your question again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (action: string) => {
    setInput(action);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">AI Career Advisor</h1>
                <p className="text-indigo-100 text-sm">Get personalized career guidance</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-3xl rounded-lg px-4 py-3 ${
                    message.type === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === 'bot' && (
                      <Bot className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                    )}
                    {message.type === 'user' && (
                      <User className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                    )}
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-5 w-5 text-indigo-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-6 py-4 border-t border-gray-100">
            <div className="flex flex-wrap gap-2 mb-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action.action)}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm"
                >
                  <action.icon className="h-4 w-4 text-indigo-600" />
                  <span>{action.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="px-6 pb-6">
            <div className="flex space-x-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask me anything about your career..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                disabled={isTyping}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isTyping}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};