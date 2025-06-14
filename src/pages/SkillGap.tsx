import React, { useState } from 'react';
import { 
  Target, 
  TrendingUp, 
  BookOpen, 
  Award, 
  ExternalLink,
  Clock,
  Users,
  Star,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { useUser } from '../context/UserContext';

interface SkillGap {
  skill: string;
  currentLevel: number;
  requiredLevel: number;
  priority: 'High' | 'Medium' | 'Low';
  resources: {
    type: 'Course' | 'Certification' | 'Book' | 'Practice';
    title: string;
    provider: string;
    duration: string;
    rating: number;
    price: string;
    url: string;
  }[];
}

export const SkillGap: React.FC = () => {
  const { userData } = useUser();
  const [selectedCareer, setSelectedCareer] = useState('Software Developer');
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const careerOptions = [
    'Software Developer',
    'UX/UI Designer',
    'Data Scientist',
    'Product Manager',
    'Digital Marketing Manager',
    'Business Analyst',
    'Cybersecurity Specialist',
    'DevOps Engineer'
  ];

  const generateSkillGaps = (): SkillGap[] => {
    const skillGaps: SkillGap[] = [];

    if (selectedCareer === 'Software Developer') {
      skillGaps.push({
        skill: 'React.js',
        currentLevel: userData.skills.includes('Programming/Coding') ? 6 : 2,
        requiredLevel: 8,
        priority: 'High',
        resources: [
          {
            type: 'Course',
            title: 'Complete React Developer Course',
            provider: 'Udemy',
            duration: '40 hours',
            rating: 4.7,
            price: '$89.99',
            url: '#'
          },
          {
            type: 'Certification',
            title: 'React Developer Certification',
            provider: 'Meta',
            duration: '6 months',
            rating: 4.8,
            price: '$49/month',
            url: '#'
          }
        ]
      });

      skillGaps.push({
        skill: 'Node.js',
        currentLevel: userData.skills.includes('Programming/Coding') ? 5 : 1,
        requiredLevel: 7,
        priority: 'High',
        resources: [
          {
            type: 'Course',
            title: 'Node.js Complete Guide',
            provider: 'Coursera',
            duration: '30 hours',
            rating: 4.6,
            price: '$59/month',
            url: '#'
          }
        ]
      });

      skillGaps.push({
        skill: 'System Design',
        currentLevel: 3,
        requiredLevel: 7,
        priority: 'Medium',
        resources: [
          {
            type: 'Book',
            title: 'Designing Data-Intensive Applications',
            provider: 'O\'Reilly',
            duration: '3 weeks',
            rating: 4.9,
            price: '$44.99',
            url: '#'
          }
        ]
      });
    } else if (selectedCareer === 'UX/UI Designer') {
      skillGaps.push({
        skill: 'Figma',
        currentLevel: userData.skills.includes('Creative Design') ? 4 : 1,
        requiredLevel: 8,
        priority: 'High',
        resources: [
          {
            type: 'Course',
            title: 'Figma UI/UX Design Essentials',
            provider: 'Coursera',
            duration: '25 hours',
            rating: 4.8,
            price: '$59/month',
            url: '#'
          }
        ]
      });

      skillGaps.push({
        skill: 'User Research',
        currentLevel: 2,
        requiredLevel: 7,
        priority: 'High',
        resources: [
          {
            type: 'Certification',
            title: 'Google UX Design Certificate',
            provider: 'Google',
            duration: '6 months',
            rating: 4.7,
            price: '$49/month',
            url: '#'
          }
        ]
      });
    } else if (selectedCareer === 'Data Scientist') {
      skillGaps.push({
        skill: 'Python for Data Science',
        currentLevel: userData.skills.includes('Data Analysis') ? 5 : 2,
        requiredLevel: 8,
        priority: 'High',
        resources: [
          {
            type: 'Course',
            title: 'Python for Data Science and ML',
            provider: 'edX',
            duration: '50 hours',
            rating: 4.6,
            price: '$199',
            url: '#'
          }
        ]
      });

      skillGaps.push({
        skill: 'Machine Learning',
        currentLevel: 1,
        requiredLevel: 8,
        priority: 'High',
        resources: [
          {
            type: 'Course',
            title: 'Machine Learning Specialization',
            provider: 'Coursera',
            duration: '3 months',
            rating: 4.9,
            price: '$59/month',
            url: '#'
          }
        ]
      });
    }

    return skillGaps;
  };

  const skillGaps = generateSkillGaps();

  const runAnalysis = () => {
    setAnalysisComplete(true);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-orange-600 bg-orange-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSkillLevelLabel = (level: number) => {
    if (level <= 2) return 'Beginner';
    if (level <= 5) return 'Intermediate';
    if (level <= 7) return 'Advanced';
    return 'Expert';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Skill Gap Analysis</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Identify the skills you need to develop for your target career and get personalized learning recommendations.
          </p>
        </div>

        {/* Career Selection */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Target className="h-6 w-6 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-900">Select Target Career</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {careerOptions.map((career) => (
              <button
                key={career}
                onClick={() => setSelectedCareer(career)}
                className={`p-4 rounded-lg border-2 text-center transition-all ${
                  selectedCareer === career
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                {career}
              </button>
            ))}
          </div>

          <button
            onClick={runAnalysis}
            className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Analyze Skill Gaps
          </button>
        </div>

        {/* Analysis Results */}
        {analysisComplete && (
          <>
            {/* Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Analysis Summary</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg mb-3">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Skills to Develop</h3>
                  <p className="text-2xl font-bold text-red-600">{skillGaps.length}</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-3">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Est. Learning Time</h3>
                  <p className="text-2xl font-bold text-orange-600">3-6 months</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Match After Training</h3>
                  <p className="text-2xl font-bold text-green-600">85%+</p>
                </div>
              </div>
            </div>

            {/* Skill Gap Details */}
            <div className="space-y-6">
              {skillGaps.map((gap, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{gap.skill}</h3>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(gap.priority)}`}>
                          {gap.priority} Priority
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 mb-1">Skill Level Progress</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-600">
                            {getSkillLevelLabel(gap.currentLevel)}
                          </span>
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-indigo-600 h-2 rounded-full"
                              style={{ width: `${(gap.currentLevel / 10) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-600">
                            {getSkillLevelLabel(gap.requiredLevel)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Current: {gap.currentLevel}/10 → Target: {gap.requiredLevel}/10
                        </p>
                      </div>
                    </div>

                    {/* Learning Resources */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <BookOpen className="h-5 w-5 text-indigo-600 mr-2" />
                        Recommended Learning Resources
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {gap.resources.map((resource, resourceIndex) => (
                          <div key={resourceIndex} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h5 className="font-medium text-gray-900 mb-1">{resource.title}</h5>
                                <p className="text-sm text-gray-600">{resource.provider}</p>
                              </div>
                              <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                                resource.type === 'Course' ? 'bg-blue-100 text-blue-800' :
                                resource.type === 'Certification' ? 'bg-purple-100 text-purple-800' :
                                resource.type === 'Book' ? 'bg-green-100 text-green-800' :
                                'bg-orange-100 text-orange-800'
                              }`}>
                                {resource.type}
                              </span>
                            </div>
                            
                            <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {resource.duration}
                                </div>
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                                  {resource.rating}
                                </div>
                              </div>
                              <span className="font-medium text-gray-900">{resource.price}</span>
                            </div>
                            
                            <button className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                              View Course
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Learning Path Recommendation */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 mt-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Recommended Learning Path</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-3">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <h4 className="font-semibold mb-2">Start with High Priority</h4>
                  <p className="text-indigo-100 text-sm">Focus on skills marked as high priority first</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-3">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <h4 className="font-semibold mb-2">Practice Regularly</h4>
                  <p className="text-indigo-100 text-sm">Dedicate 1-2 hours daily to skill development</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-3">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <h4 className="font-semibold mb-2">Build Projects</h4>
                  <p className="text-indigo-100 text-sm">Apply new skills in real-world projects</p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Tips for Success */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Tips for Successful Skill Development</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <TrendingUp className="h-6 w-6 text-indigo-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Set Clear Goals</h4>
                  <p className="text-gray-600 text-sm">Define specific, measurable learning objectives for each skill.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Users className="h-6 w-6 text-indigo-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Join Communities</h4>
                  <p className="text-gray-600 text-sm">Connect with others learning the same skills for support and motivation.</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Award className="h-6 w-6 text-indigo-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Earn Certifications</h4>
                  <p className="text-gray-600 text-sm">Validate your skills with recognized industry certifications.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <BookOpen className="h-6 w-6 text-indigo-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Stay Updated</h4>
                  <p className="text-gray-600 text-sm">Keep learning as technology and industry practices evolve.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};