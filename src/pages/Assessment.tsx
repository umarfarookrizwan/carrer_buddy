import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, User, GraduationCap, Heart, Wrench, Brain } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface AssessmentStep {
  id: string;
  title: string;
  icon: React.ElementType;
  component: React.ComponentType<{
    data: any;
    onChange: (data: any) => void;
    onNext: () => void;
  }>;
}

export const Assessment: React.FC = () => {
  const navigate = useNavigate();
  const { updateUserData } = useUser();
  const [currentStep, setCurrentStep] = useState(0);
  const [assessmentData, setAssessmentData] = useState({
    personal: {},
    education: {},
    interests: {},
    skills: {},
    personality: {}
  });

  const updateStepData = (stepKey: string, data: any) => {
    setAssessmentData(prev => ({ ...prev, [stepKey]: data }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete assessment
      completeAssessment();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeAssessment = () => {
    const userData = {
      name: assessmentData.personal.name || '',
      email: assessmentData.personal.email || '',
      education: assessmentData.education.level || '',
      experience: assessmentData.education.experience || '',
      interests: assessmentData.interests.selected || [],
      skills: assessmentData.skills.selected || [],
      personality: assessmentData.personality || {},
      assessmentCompleted: true
    };

    updateUserData(userData);
    navigate('/results');
  };

  const steps: AssessmentStep[] = [
    {
      id: 'personal',
      title: 'Personal Information',
      icon: User,
      component: PersonalStep
    },
    {
      id: 'education',
      title: 'Education & Experience',
      icon: GraduationCap,
      component: EducationStep
    },
    {
      id: 'interests',
      title: 'Interests & Passions',
      icon: Heart,
      component: InterestsStep
    },
    {
      id: 'skills',
      title: 'Skills & Abilities',
      icon: Wrench,
      component: SkillsStep
    },
    {
      id: 'personality',
      title: 'Personality Assessment',
      icon: Brain,
      component: PersonalityStep
    }
  ];

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Career Assessment</h1>
            <span className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.id}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    index === currentStep
                      ? 'bg-indigo-100 text-indigo-700'
                      : index < currentStep
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="hidden sm:block font-medium">{step.title}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Step */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <CurrentStepComponent
            data={assessmentData[steps[currentStep].id]}
            onChange={(data) => updateStepData(steps[currentStep].id, data)}
            onNext={nextStep}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
              currentStep === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <ChevronLeft className="mr-2 h-5 w-5" />
            Previous
          </button>
          
          <button
            onClick={nextStep}
            className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            {currentStep === steps.length - 1 ? 'Complete Assessment' : 'Next'}
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Step Components
const PersonalStep: React.FC<{
  data: any;
  onChange: (data: any) => void;
  onNext: () => void;
}> = ({ data, onChange }) => {
  const [formData, setFormData] = useState({
    name: data.name || '',
    email: data.email || '',
    age: data.age || '',
    location: data.location || ''
  });

  const handleChange = (field: string, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onChange(updated);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter your full name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="your.email@example.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age
          </label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => handleChange('age', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="25"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="City, Country"
          />
        </div>
      </div>
    </div>
  );
};

const EducationStep: React.FC<{
  data: any;
  onChange: (data: any) => void;
  onNext: () => void;
}> = ({ data, onChange }) => {
  const [formData, setFormData] = useState({
    level: data.level || '',
    field: data.field || '',
    experience: data.experience || '',
    currentRole: data.currentRole || ''
  });

  const handleChange = (field: string, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onChange(updated);
  };

  const educationLevels = [
    'High School',
    'Associate Degree',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'PhD/Doctorate',
    'Professional Certification'
  ];

  const experienceLevels = [
    '0-1 years',
    '2-3 years',
    '4-6 years',
    '7-10 years',
    '10+ years'
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Education & Experience</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Education Level
          </label>
          <select
            value={formData.level}
            onChange={(e) => handleChange('level', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">Select education level</option>
            {educationLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Field of Study
          </label>
          <input
            type="text"
            value={formData.field}
            onChange={(e) => handleChange('field', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="e.g., Computer Science, Business Administration"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Work Experience
          </label>
          <select
            value={formData.experience}
            onChange={(e) => handleChange('experience', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">Select experience level</option>
            {experienceLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Role (if applicable)
          </label>
          <input
            type="text"
            value={formData.currentRole}
            onChange={(e) => handleChange('currentRole', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="e.g., Software Developer, Marketing Specialist"
          />
        </div>
      </div>
    </div>
  );
};

const InterestsStep: React.FC<{
  data: any;
  onChange: (data: any) => void;
  onNext: () => void;
}> = ({ data, onChange }) => {
  const [selected, setSelected] = useState<string[]>(data.selected || []);

  const interests = [
    'Technology & Programming',
    'Design & Creativity',
    'Business & Entrepreneurship',
    'Healthcare & Medicine',
    'Education & Teaching',
    'Science & Research',
    'Arts & Entertainment',
    'Sports & Fitness',
    'Social Work & Community',
    'Finance & Economics',
    'Marketing & Sales',
    'Engineering',
    'Environment & Sustainability',
    'Psychology & Counseling',
    'Law & Legal Services',
    'Travel & Tourism',
    'Food & Hospitality',
    'Agriculture & Farming',
    'Fashion & Beauty',
    'Real Estate'
  ];

  const toggleInterest = (interest: string) => {
    const updated = selected.includes(interest)
      ? selected.filter(i => i !== interest)
      : [...selected, interest];
    
    setSelected(updated);
    onChange({ selected: updated });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Interests & Passions</h2>
      <p className="text-gray-600 mb-6">
        Select all areas that interest you. This helps us understand what motivates you.
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {interests.map(interest => (
          <button
            key={interest}
            onClick={() => toggleInterest(interest)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              selected.includes(interest)
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                : 'border-gray-200 hover:border-gray-300 text-gray-700'
            }`}
          >
            {interest}
          </button>
        ))}
      </div>
      
      <p className="text-sm text-gray-500 mt-4">
        Selected: {selected.length} interests
      </p>
    </div>
  );
};

const SkillsStep: React.FC<{
  data: any;
  onChange: (data: any) => void;
  onNext: () => void;
}> = ({ data, onChange }) => {
  const [selected, setSelected] = useState<string[]>(data.selected || []);

  const skills = [
    'Programming/Coding',
    'Data Analysis',
    'Project Management',
    'Leadership',
    'Communication',
    'Problem Solving',
    'Creative Design',
    'Sales & Negotiation',
    'Financial Analysis',
    'Research & Development',
    'Team Collaboration',
    'Public Speaking',
    'Customer Service',
    'Strategic Planning',
    'Technical Writing',
    'Digital Marketing',
    'Quality Assurance',
    'Operations Management',
    'Teaching & Training',
    'Consulting',
    'Event Planning',
    'Social Media Management',
    'Foreign Languages',
    'Graphic Design'
  ];

  const toggleSkill = (skill: string) => {
    const updated = selected.includes(skill)
      ? selected.filter(s => s !== skill)
      : [...selected, skill];
    
    setSelected(updated);
    onChange({ selected: updated });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills & Abilities</h2>
      <p className="text-gray-600 mb-6">
        Select your current skills and abilities. Include both hard and soft skills.
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {skills.map(skill => (
          <button
            key={skill}
            onClick={() => toggleSkill(skill)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              selected.includes(skill)
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                : 'border-gray-200 hover:border-gray-300 text-gray-700'
            }`}
          >
            {skill}
          </button>
        ))}
      </div>
      
      <p className="text-sm text-gray-500 mt-4">
        Selected: {selected.length} skills
      </p>
    </div>
  );
};

const PersonalityStep: React.FC<{
  data: any;
  onChange: (data: any) => void;
  onNext: () => void;
}> = ({ data, onChange }) => {
  const [responses, setResponses] = useState(data || {});

  const questions = [
    {
      id: 'extroversion',
      question: 'I enjoy working in teams and social environments',
      trait: 'Extroversion'
    },
    {
      id: 'detail_oriented',
      question: 'I pay close attention to details and accuracy',
      trait: 'Detail-Oriented'
    },
    {
      id: 'risk_taking',
      question: 'I am comfortable taking calculated risks',
      trait: 'Risk-Taking'
    },
    {
      id: 'creativity',
      question: 'I enjoy creative and innovative thinking',
      trait: 'Creativity'
    },
    {
      id: 'leadership',
      question: 'I naturally take on leadership roles',
      trait: 'Leadership'
    },
    {
      id: 'analytical',
      question: 'I prefer to analyze data before making decisions',
      trait: 'Analytical'
    },
    {
      id: 'helping_others',
      question: 'I find fulfillment in helping others succeed',
      trait: 'Helping Others'
    },
    {
      id: 'independence',
      question: 'I prefer working independently with minimal supervision',
      trait: 'Independence'
    }
  ];

  const handleResponse = (questionId: string, value: number) => {
    const updated = { ...responses, [questionId]: value };
    setResponses(updated);
    onChange(updated);
  };

  const getScaleLabel = (value: number) => {
    const labels = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];
    return labels[value - 1];
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Personality Assessment</h2>
      <p className="text-gray-600 mb-8">
        Rate how much you agree with each statement on a scale of 1-5.
      </p>
      
      <div className="space-y-8">
        {questions.map(question => (
          <div key={question.id} className="border-b border-gray-200 pb-6">
            <h3 className="font-medium text-gray-900 mb-4">{question.question}</h3>
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4, 5].map(value => (
                <button
                  key={value}
                  onClick={() => handleResponse(question.id, value)}
                  className={`w-12 h-12 rounded-full border-2 font-medium transition-all ${
                    responses[question.id] === value
                      ? 'border-indigo-500 bg-indigo-500 text-white'
                      : 'border-gray-300 text-gray-600 hover:border-indigo-300'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
            {responses[question.id] && (
              <p className="text-sm text-gray-500 mt-2">
                {getScaleLabel(responses[question.id])}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};