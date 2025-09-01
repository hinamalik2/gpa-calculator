import React from 'react';
import { GPAProvider, useGPA } from './context/GPAContext';
import Header from './components/Header';
import HomePage from './components/HomePage';
import GPACalculator from './components/GPACalculator';
import CGPACalculator from './components/CGPACalculator';
import './App.css';

function AppContent() {
  const { currentView, darkMode } = useGPA();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'gpa':
        return <GPACalculator />;
      case 'cgpa':
        return <CGPACalculator />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen transition-colors duration-300">
        <Header />
        {renderCurrentView()}
      </div>
    </div>
  );
}

function App() {
  return (
    <GPAProvider>
      <AppContent />
    </GPAProvider>
  );
}

export default App;
