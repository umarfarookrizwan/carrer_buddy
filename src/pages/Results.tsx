import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, 
  TrendingUp, 
  DollarSign, 
  Users, 
  BookOpen, 
  ExternalLink,
  Award,
  Target,
  Building
} from 'lucide-react';
import { useUser } from '../context/UserContext';

export const Results: React.FC = () => {
  const { userData } = useUser();

  // Generate career recommendations based on user data
  const generateRecommendations = () => {
    const recommendations = [
      {
        id: '1',
        title: 'Software Developer',
        match: 92,
        description: 'Design, develop, and maintain software applications and systems using various programming languages and frameworks.',
        salary: '$75,000 - $150,000',
        growth: '+22% (Much faster than average)',
        requiredSkills: ['Programming', 'Problem Solving', 'Team Collaboration', 'Technical Writing'],
        education: 'Bachelor\'s degree in Computer Science or related field',
        companies: ['Google', 'Microsoft', 'Amazon', 'Netflix', 'Spotify'],
        pros: ['High demand', 'Remote work opportunities', 'Continuous learning', 'Creative problem solving'],
        cons: ['Requires continuous skill updates', 'Can be stressful with tight deadlines'],
        dailyTasks: ['Writing and reviewing code', 'Debugging applications', 'Collaborating with team members', 'Planning software architecture']
      },
      {
        id: '2',
        title: 'UX/UI Designer',
        match: 88,
        description: 'Create intuitive and visually appealing user interfaces and experiences for digital products.',
        salary: '$65,000 - $130,000',
        growth: '+13% (Faster than average)',
        requiredSkills: ['Creative Design', 'Problem Solving', 'Communication', 'Research & Development'],
        education: 'Bachelor\'s degree in Design, HCI, or related field',
        companies: ['Apple', 'Adobe', 'Airbnb', 'Uber', 'Figma'],
        pros: ['Creative freedom', 'User impact', 'Growing field', 'Portfolio-based career'],
        cons: ['Subjective feedback', 'Tight project timelines'],
        dailyTasks: ['User research', 'Creating wireframes and prototypes', 'Design reviews', 'Usability testing']
      },
      {
        id: '3',
        title: 'Data Scientist',
        match: 85,
        description: 'Analyze complex data to extract insights and help organizations make informed business decisions.',
        salary: '$80,000 - $160,000',
        growth: '+31% (Much faster than average)',
        requiredSkills: ['Data Analysis', 'Problem Solving', 'Programming/Coding', 'Research & Development'],
        education: 'Bachelor\'s degree in Statistics, Mathematics, Computer Science, or related field',
        companies: ['Tesla', 'Netflix', 'LinkedIn', 'Spotify', 'Airbnb'],
        pros: ['High growth potential', 'Intellectual challenges', 'Data-driven decisions', 'Versatile across industries'],
        cons: ['Requires strong mathematical background', 'Data quality issues'],
        dailyTasks: ['Data collection and cleaning', 'Statistical analysis', 'Creating data visualizations', 'Presenting findings']
      }
    ];

    // Adjust recommendations based on user interests and skills
    return recommendations.map(rec => {
      let adjustedMatch = rec.match;
      
      // Boost match based on user interests
      if (userData.interests.some(interest => 
        interest.toLowerCase().includes('technology') || 
        interest.toLowerCase().includes('programming')
      )) {
        if (rec.title.includes('Software')) adjustedMatch += 3;
        if (rec.title.includes('Data')) adjustedMatch += 2;
      }
      
      if (userData.interests.some(interest => 
        interest.toLowerCase().includes('design') || 
        interest.toLowerCase().includes('creativity')
      )) {
        if (rec.title.includes('UX/UI')) adjustedMatch += 3;
      }

      // Boost match based on user skills
      const matchingSkills = rec.requiredSkills.filter(skill => 
        userData.skills.some(userSkill => 
          userSkill.toLowerCase().includes(skill.toLowerCase())
        )
      );
      
      adjustedMatch += matchingSkills.length * 2;
      adjustedMatch = Math.min(adjustedMatch, 98); // Cap at 98%

      return { ...rec, match: adjustedMatch };
    }).sort((a, b) => b.match - a.match);
  };

  const recommendations = generateRecommendations();

  if (!userData.assessmentCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Complete Your Assessment First
          </h1>
          <p className="text-gray-600 mb-8">
            To get personalized career recommendations, please complete your career assessment.
          </p>
          <Link
            to="/assessment"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Start Assessment
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Career Recommendations
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Based on your assessment, here are the top career paths that align with your 
            interests, skills, and goals.
          </p>
        </div>

        {/* User Summary */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Profile Summary</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Top Interests</h3>
              <div className="flex flex-wrap gap-2">
                {userData.interests.slice(0, 3).map((interest, index) => (
                  <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Key Skills</h3>
              <div className="flex flex-wrap gap-2">
                {userData.skills.slice(0, 3).map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Background</h3>
              <p className="text-gray-600 text-sm">
                {userData.education} • {userData.experience} experience
              </p>
            </div>
          </div>
        </div>

        {/* Career Recommendations */}
        <div className="space-y-8">
          {recommendations.map((career, index) => (
            <div key={career.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-indigo-100 rounded-lg">
                      <Target className="h-8 w-8 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{career.title}</h3>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1">
                          <Star className="h-5 w-5 text-yellow-400 fill-current" />
                          <span className="text-lg font-semibold text-gray-900">{career.match}% Match</span>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          #{index + 1} Recommendation
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">{career.description}</p>

                {/* Key Metrics */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-500">Salary Range</p>
                      <p className="font-semibold text-gray-900">{career.salary}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Job Growth</p>
                      <p className="font-semibold text-gray-900">{career.growth}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <BookOpen className="h-6 w-6 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-500">Education</p>
                      <p className="font-semibold text-gray-900">Bachelor's Degree</p>
                    </div>
                  </div>
                </div>

                {/* Detailed Information */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Award className="h-5 w-5 text-indigo-600 mr-2" />
                        Required Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {career.requiredSkills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              userData.skills.some(userSkill => 
                                userSkill.toLowerCase().includes(skill.toLowerCase())
                              )
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {skill}
                            {userData.skills.some(userSkill => 
                              userSkill.toLowerCase().includes(skill.toLowerCase())
                            ) && ' ✓'}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Building className="h-5 w-5 text-indigo-600 mr-2" />
                        Top Companies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {career.companies.map((company, companyIndex) => (
                          <span key={companyIndex} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                            {company}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Pros & Cons</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-green-700 mb-1">Advantages:</p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {career.pros.map((pro, proIndex) => (
                              <li key={proIndex} className="flex items-center">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-orange-700 mb-1">Challenges:</p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {career.cons.map((con, conIndex) => (
                              <li key={conIndex} className="flex items-center">
                                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span>
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Daily Tasks</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {career.dailyTasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-gray-100">
                  <Link
                    to="/skills"
                    className="flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    View Skill Gap Analysis
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    to="/chat"
                    className="flex items-center px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Ask AI About This Career
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 mt-12 text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Take the Next Step?</h2>
          <p className="text-indigo-100 mb-6">
            Explore additional tools to help you advance your career and achieve your goals.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/resume"
              className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Analyze Your Resume
            </Link>
            <Link
              to="/skills"
              className="px-6 py-3 bg-white/20 text-white font-medium rounded-lg hover:bg-white/30 transition-colors border border-white/30"
            >
              Identify Skill Gaps
            </Link>
            <Link
              to="/dashboard"
              className="px-6 py-3 bg-white/20 text-white font-medium rounded-lg hover:bg-white/30 transition-colors border border-white/30"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};