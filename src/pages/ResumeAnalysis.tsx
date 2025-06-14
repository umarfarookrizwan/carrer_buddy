import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp,
  User,
  Award,
  Briefcase,
  Target,
  Star
} from 'lucide-react';

interface AnalysisResult {
  score: number;
  strengths: string[];
  improvements: string[];
  keywords: string[];
  sections: {
    name: string;
    score: number;
    feedback: string;
  }[];
}

export const ResumeAnalysis: React.FC = () => {
  const [resumeText, setResumeText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const analyzeResume = async () => {
    if (!resumeText.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate mock analysis based on resume content
    const analysis: AnalysisResult = {
      score: 75 + Math.floor(Math.random() * 20),
      strengths: [
        'Clear professional summary that highlights key achievements',
        'Quantified accomplishments with specific metrics and numbers',
        'Well-organized chronological work experience section',
        'Relevant technical skills clearly listed',
        'Professional formatting with consistent styling'
      ],
      improvements: [
        'Add more industry-specific keywords to improve ATS compatibility',
        'Include more quantified achievements in recent roles',
        'Consider adding a certifications or professional development section',
        'Optimize bullet points to start with strong action verbs',
        'Add relevant volunteer work or side projects if applicable'
      ],
      keywords: [
        'Project Management',
        'Data Analysis',
        'Team Leadership',
        'Strategic Planning',
        'Customer Service',
        'Problem Solving',
        'Communication',
        'Microsoft Office'
      ],
      sections: [
        {
          name: 'Contact Information',
          score: 90,
          feedback: 'Complete and professional contact details provided'
        },
        {
          name: 'Professional Summary',
          score: 85,
          feedback: 'Strong summary that highlights key qualifications'
        },
        {
          name: 'Work Experience',
          score: 80,
          feedback: 'Good experience section, could use more quantified achievements'
        },
        {
          name: 'Education',
          score: 75,
          feedback: 'Education details are present but could include relevant coursework'
        },
        {
          name: 'Skills',
          score: 70,
          feedback: 'Skills section needs more industry-specific keywords'
        }
      ]
    };

    setAnalysisResult(analysis);
    setIsAnalyzing(false);
  };

  const sampleResume = `John Smith
Software Developer | john.smith@email.com | (555) 123-4567 | LinkedIn: /in/johnsmith

PROFESSIONAL SUMMARY
Experienced Software Developer with 5+ years of expertise in full-stack development, specializing in JavaScript, React, and Node.js. Proven track record of delivering scalable web applications and leading cross-functional teams to achieve project goals.

WORK EXPERIENCE
Senior Software Developer | TechCorp Inc. | 2021 - Present
• Developed and maintained 15+ web applications using React.js and Node.js
• Led a team of 4 developers, improving code quality by 30%
• Implemented automated testing, reducing bugs by 25%
• Collaborated with UX/UI designers to improve user experience

Software Developer | StartupXYZ | 2019 - 2021
• Built responsive web applications serving 10,000+ daily active users
• Optimized database queries, improving application performance by 40%
• Participated in agile development cycles and code reviews

EDUCATION
Bachelor of Science in Computer Science | State University | 2019

SKILLS
JavaScript, React.js, Node.js, Python, SQL, Git, AWS, Docker, Agile Development`;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Resume Analysis</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get AI-powered feedback on your resume to improve your chances of landing interviews. 
            Our system analyzes formatting, content, keywords, and provides actionable recommendations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Resume Input */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <FileText className="h-6 w-6 text-indigo-600" />
              <h2 className="text-xl font-semibold text-gray-900">Upload Your Resume</h2>
            </div>

            <div className="space-y-6">
              {/* File Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 transition-colors">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Drag and drop your resume here</p>
                <p className="text-sm text-gray-500 mb-4">Supports PDF, DOC, DOCX files</p>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Choose File
                </button>
              </div>

              <div className="text-center">
                <span className="text-gray-500">or</span>
              </div>

              {/* Text Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paste your resume text
                </label>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your resume content here..."
                  className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Sample Resume Button */}
              <button
                onClick={() => setResumeText(sampleResume)}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                Use Sample Resume
              </button>

              {/* Analyze Button */}
              <button
                onClick={analyzeResume}
                disabled={!resumeText.trim() || isAnalyzing}
                className="w-full px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isAnalyzing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Analyzing Resume...
                  </div>
                ) : (
                  'Analyze Resume'
                )}
              </button>
            </div>
          </div>

          {/* Analysis Results */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            {!analysisResult ? (
              <div className="text-center py-12">
                <Target className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Analyze</h3>
                <p className="text-gray-600">
                  Upload or paste your resume to get detailed feedback and improvement suggestions.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Overall Score */}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-indigo-100 rounded-full mb-4">
                    <span className="text-3xl font-bold text-indigo-600">{analysisResult.score}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${
                          i < Math.floor(analysisResult.score / 20) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Overall Score</h3>
                  <p className="text-gray-600">
                    {analysisResult.score >= 80 ? 'Excellent' : 
                     analysisResult.score >= 60 ? 'Good' : 'Needs Improvement'}
                  </p>
                </div>

                {/* Section Scores */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Section Analysis</h4>
                  <div className="space-y-3">
                    {analysisResult.sections.map((section, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="text-sm font-semibold text-indigo-600">{section.score}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${section.score}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{section.feedback}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Keywords */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Detected Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.keywords.map((keyword, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Detailed Feedback */}
        {analysisResult && (
          <div className="mt-8 grid md:grid-cols-2 gap-8">
            {/* Strengths */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-6">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <h3 className="text-xl font-semibold text-gray-900">Strengths</h3>
              </div>
              <ul className="space-y-3">
                {analysisResult.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <span className="text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Improvements */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-6">
                <AlertCircle className="h-6 w-6 text-orange-600" />
                <h3 className="text-xl font-semibold text-gray-900">Improvements</h3>
              </div>
              <ul className="space-y-3">
                {analysisResult.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <span className="text-gray-700">{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tips Section */}
        <div className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Pro Tips for Resume Optimization</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <TrendingUp className="h-6 w-6 text-indigo-200 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Quantify Your Achievements</h4>
                  <p className="text-indigo-100 text-sm">Use numbers, percentages, and metrics to demonstrate your impact and results.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <User className="h-6 w-6 text-indigo-200 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Tailor for Each Job</h4>
                  <p className="text-indigo-100 text-sm">Customize your resume keywords and content for each specific position you apply for.</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Award className="h-6 w-6 text-indigo-200 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Use Action Verbs</h4>
                  <p className="text-indigo-100 text-sm">Start bullet points with strong action verbs like "Led," "Developed," "Improved."</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Briefcase className="h-6 w-6 text-indigo-200 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Keep It Concise</h4>
                  <p className="text-indigo-100 text-sm">Aim for 1-2 pages maximum and focus on the most relevant and recent experiences.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};