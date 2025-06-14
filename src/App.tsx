import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Assessment } from './pages/Assessment';
import { Chat } from './pages/Chat';
import { Results } from './pages/Results';
import { Dashboard } from './pages/Dashboard';
import { ResumeAnalysis } from './pages/ResumeAnalysis';
import { SkillGap } from './pages/SkillGap';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/results" element={<Results />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/resume" element={<ResumeAnalysis />} />
            <Route path="/skills" element={<SkillGap />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;