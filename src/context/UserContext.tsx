import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserData {
  name: string;
  email: string;
  education: string;
  experience: string;
  interests: string[];
  skills: string[];
  personality: Record<string, number>;
  assessmentCompleted: boolean;
  careerRecommendations?: CareerRecommendation[];
}

interface CareerRecommendation {
  id: string;
  title: string;
  match: number;
  description: string;
  salary: string;
  growth: string;
  requiredSkills: string[];
  education: string;
  companies: string[];
}

interface UserContextType {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  clearUserData: () => void;
}

const defaultUserData: UserData = {
  name: '',
  email: '',
  education: '',
  experience: '',
  interests: [],
  skills: [],
  personality: {},
  assessmentCompleted: false,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(defaultUserData);

  useEffect(() => {
    const saved = localStorage.getItem('careerBuddyUser');
    if (saved) {
      setUserData(JSON.parse(saved));
    }
  }, []);

  const updateUserData = (data: Partial<UserData>) => {
    const updated = { ...userData, ...data };
    setUserData(updated);
    localStorage.setItem('careerBuddyUser', JSON.stringify(updated));
  };

  const clearUserData = () => {
    setUserData(defaultUserData);
    localStorage.removeItem('careerBuddyUser');
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData, clearUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};