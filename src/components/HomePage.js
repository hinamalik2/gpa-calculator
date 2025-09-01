import React from 'react';
import { motion } from 'framer-motion';
import { useGPA } from '../context/GPAContext';

function HomePage() {
  const { dispatch, darkMode } = useGPA();

  const cardVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            GPA & CGPA Calculator
          </h1>
          <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Calculate your Grade Point Average and Cumulative GPA with ease
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className={`${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } p-8 rounded-2xl border shadow-lg cursor-pointer`}
            onClick={() => dispatch({ type: 'SET_CURRENT_VIEW', payload: 'gpa' })}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-3">GPA Calculator</h2>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
                Calculate your semester GPA by adding subjects, credits, and grades
              </p>
              <div className="bg-blue-500 text-white px-6 py-2 rounded-lg inline-block">
                Get Started →
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className={`${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } p-8 rounded-2xl border shadow-lg cursor-pointer`}
            onClick={() => dispatch({ type: 'SET_CURRENT_VIEW', payload: 'cgpa' })}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-3">CGPA Calculator</h2>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
                Calculate your cumulative GPA across multiple semesters
              </p>
              <div className="bg-purple-500 text-white px-6 py-2 rounded-lg inline-block">
                Get Started →
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <h3 className="text-2xl font-semibold mb-6">Features</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
              <h4 className="font-semibold mb-2">Dynamic Input</h4>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Add, edit, and delete subjects or semesters on the fly
              </p>
            </div>
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
              <h4 className="font-semibold mb-2">Data Persistence</h4>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Your data is automatically saved locally
              </p>
            </div>
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
              <h4 className="font-semibold mb-2">Export to PDF</h4>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Download your results as a PDF document
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default HomePage;
