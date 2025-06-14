import React from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Award, 
  Calendar,
  CheckCircle,
  Clock,
  Star,
  ArrowRight
} from 'lucide-react';
import { useUser } from '../context/UserContext';

export const Dashboard: React.FC = () => {
  const { userData } = useUser();

  const quickStats = [
    {
      icon: Target,
      label: 'Assessment Complete',
      value: userData.assessmentCompleted ? 'Yes' : 'No',
      color: userData.assessmentCompleted ? 'text-green-600' : 'text-orange-600'
    },
    {
      icon: Star,
      label: 'Career Matches',
      value: userData.assessmentCompleted ? '3' : '0',
      color: 'text-indigo-600'
    },
    {
      icon: BookOpen,
      label: 'Skills Identified',
      value: userData.skills.length.toString(),
      color: 'text-purple-600'
    },
    {
      icon: Award,
      label: 'Interests Mapped',
      value: userData.interests.length.toString(),
      color: 'text-blue-600'
    }
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'assessment',
      title: userData.assessmentCompleted ? 'Completed Career Assessment' : 'Assessment Pending',
      description: userData.assessmentCompleted ? 'Successfully completed all assessment sections' : 'Complete your assessment to get personalized recommendations',
      timestamp: new Date().toLocaleDateString(),
      status: userData.assessmentCompleted ? 'completed' : 'pending'
    },
    {
      id: '2',
      type: 'chat',
      title: 'AI Career Consultation Available',
      description: 'Get personalized career advice from our AI advisor',
      timestamp: new Date().toLocaleDateString(),
      status: 'available'
    },
    {
      id: '3',
      type: 'skills',
      title: 'Skill Gap Analysis',
      description: 'Identify skills to develop for your target career',
      timestamp: new Date().toLocaleDateString(),
      status: 'available'
    }
  ];

  const careerProgress = [
    {
      title: 'Career Assessment',
      completed: userData.assessmentCompleted,
      description: 'Complete personality, skills, and interests evaluation'
    },
    {
      title: 'Career Recommendations',
      completed: userData.assessmentCompleted,
      description: 'Review AI-generated career matches'
    },
    {
      title: 'Skill Gap Analysis',
      completed: false,
      description: 'Identify skills needed for your target career'
    },
    {
      title: 'Resume Optimization',
      completed: false,
      description: 'Optimize your resume for target positions'
    },
    {
      title: 'Learning Path',
      completed: false,
      description: 'Follow personalized skill development plan'
    }
  ];

  if (!userData.name) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Your Dashboard
          </h1>
          <p className="text-gray-600 mb-8">
            Start your career journey by completing the assessment to unlock personalized insights.
          </p>
          <Link
            to="/assessment"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Start Assessment
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {userData.name}!
          </h1>
          <p className="text-gray-600">
            Track your career development progress and explore new opportunities.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Career Progress */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Career Journey Progress</h2>
              <div className="space-y-4">
                {careerProgress.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      step.completed 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {step.completed ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <Clock className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-sm font-medium ${
                        step.completed ? 'text-gray-900' : 'text-gray-600'
                      }`}>
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-500">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activities</h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="border-l-4 border-indigo-200 pl-4 py-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{activity.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        activity.status === 'completed' 
                          ? 'bg-green-100 text-green-800'
                          : activity.status === 'pending'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {activity.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                    <p className="text-xs text-gray-400 mt-2">{activity.timestamp}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
              <div className="space-y-4">
                {!userData.assessmentCompleted && (
                  <Link
                    to="/assessment"
                    className="block w-full px-4 py-3 bg-indigo-600 text-white text-center rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Complete Assessment
                  </Link>
                )}
                
                {userData.assessmentCompleted && (
                  <Link
                    to="/results"
                    className="block w-full px-4 py-3 bg-indigo-600 text-white text-center rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    View Career Matches
                  </Link>
                )}
                
                <Link
                  to="/chat"
                  className="block w-full px-4 py-3 bg-purple-600 text-white text-center rounded-lg hover:bg-purple-700 transition-colors"
                >
                  AI Career Chat
                </Link>
                
                <Link
                  to="/skills"
                  className="block w-full px-4 py-3 bg-emerald-600 text-white text-center rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Skill Gap Analysis
                </Link>
                
                <Link
                  to="/resume"
                  className="block w-full px-4 py-3 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Resume Analysis
                </Link>
              </div>
            </div>

            {/* Profile Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile Summary</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Contact</h3>
                  <p className="text-sm text-gray-600">{userData.email}</p>
                </div>
                
                {userData.education && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Education</h3>
                    <p className="text-sm text-gray-600">{userData.education}</p>
                  </div>
                )}
                
                {userData.experience && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Experience</h3>
                    <p className="text-sm text-gray-600">{userData.experience}</p>
                  </div>
                )}
                
                {userData.interests.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Top Interests</h3>
                    <div className="flex flex-wrap gap-1">
                      {userData.interests.slice(0, 3).map((interest, index) => (
                        <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {userData.skills.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Key Skills</h3>
                    <div className="flex flex-wrap gap-1">
                      {userData.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Motivational Quote */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="font-semibold mb-2">Daily Motivation</h3>
              <p className="text-indigo-100 text-sm italic">
                "The future belongs to those who believe in the beauty of their dreams." - Eleanor Roosevelt
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};