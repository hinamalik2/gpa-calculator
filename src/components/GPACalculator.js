import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGPA } from '../context/GPAContext';
import { exportGPAToPDF } from '../utils/pdfExport';

function GPACalculator() {
  const { subjects, dispatch, calculateGPA, getGradeColor, darkMode, GRADE_POINTS } = useGPA();
  const [newSubject, setNewSubject] = useState({
    name: '',
    credits: '',
    grade: ''
  });

  const gpa = calculateGPA();
  const totalCredits = subjects.reduce((sum, subject) => sum + subject.credits, 0);

  const handleAddSubject = () => {
    if (newSubject.name && newSubject.credits && newSubject.grade) {
      const subject = {
        id: Date.now(),
        name: newSubject.name,
        credits: parseInt(newSubject.credits),
        grade: newSubject.grade
      };
      dispatch({ type: 'ADD_SUBJECT', payload: subject });
      setNewSubject({ name: '', credits: '', grade: '' });
    }
  };

  const handleDeleteSubject = (id) => {
    dispatch({ type: 'DELETE_SUBJECT', payload: id });
  };

  const handleUpdateSubject = (id, field, value) => {
    const subject = subjects.find(s => s.id === id);
    if (subject) {
      const updatedSubject = {
        ...subject,
        [field]: field === 'credits' ? parseInt(value) || 0 : value
      };
      dispatch({ type: 'UPDATE_SUBJECT', payload: updatedSubject });
    }
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_SUBJECTS' });
  };

  const handleExportPDF = () => {
    if (subjects.length > 0) {
      exportGPAToPDF(subjects, gpa, totalCredits);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => dispatch({ type: 'SET_CURRENT_VIEW', payload: 'home' })}
            className={`mb-4 px-4 py-2 rounded-lg ${
              darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
            } shadow transition-colors`}
          >
            ← Back to Home
          </button>
          <h1 className="text-4xl font-bold mb-2">GPA Calculator</h1>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Calculate your semester Grade Point Average
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className={`lg:col-span-2 ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            } p-6 rounded-xl shadow-lg`}
          >
            <h2 className="text-2xl font-semibold mb-6">Add Subject</h2>
            
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <input
                type="text"
                placeholder="Subject Name"
                value={newSubject.name}
                onChange={(e) => setNewSubject({...newSubject, name: e.target.value})}
                className={`px-4 py-2 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
              />
              <input
                type="number"
                placeholder="Credits"
                value={newSubject.credits}
                onChange={(e) => setNewSubject({...newSubject, credits: e.target.value})}
                className={`px-4 py-2 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
                min="1"
              />
              <select
                value={newSubject.grade}
                onChange={(e) => setNewSubject({...newSubject, grade: e.target.value})}
                className={`px-4 py-2 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
              >
                <option value="">Select Grade</option>
                {Object.keys(GRADE_POINTS).map(grade => (
                  <option key={grade} value={grade}>
                    {grade} ({GRADE_POINTS[grade]})
                  </option>
                ))}
              </select>
              <button
                onClick={handleAddSubject}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Add Subject
              </button>
            </div>

            {/* Subjects Table */}
            {subjects.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`border-b ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                      <th className="text-left py-3 px-2">Subject</th>
                      <th className="text-left py-3 px-2">Credits</th>
                      <th className="text-left py-3 px-2">Grade</th>
                      <th className="text-left py-3 px-2">Grade Points</th>
                      <th className="text-left py-3 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((subject) => (
                      <motion.tr
                        key={subject.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`border-b ${darkMode ? 'border-gray-600' : 'border-gray-100'}`}
                      >
                        <td className="py-3 px-2">
                          <input
                            type="text"
                            value={subject.name}
                            onChange={(e) => handleUpdateSubject(subject.id, 'name', e.target.value)}
                            className={`w-full px-2 py-1 rounded border ${
                              darkMode 
                                ? 'bg-gray-700 border-gray-600 text-white' 
                                : 'bg-gray-50 border-gray-300'
                            }`}
                          />
                        </td>
                        <td className="py-3 px-2">
                          <input
                            type="number"
                            value={subject.credits}
                            onChange={(e) => handleUpdateSubject(subject.id, 'credits', e.target.value)}
                            className={`w-20 px-2 py-1 rounded border ${
                              darkMode 
                                ? 'bg-gray-700 border-gray-600 text-white' 
                                : 'bg-gray-50 border-gray-300'
                            }`}
                            min="1"
                          />
                        </td>
                        <td className="py-3 px-2">
                          <select
                            value={subject.grade}
                            onChange={(e) => handleUpdateSubject(subject.id, 'grade', e.target.value)}
                            className={`px-2 py-1 rounded border ${
                              darkMode 
                                ? 'bg-gray-700 border-gray-600 text-white' 
                                : 'bg-gray-50 border-gray-300'
                            }`}
                          >
                            {Object.keys(GRADE_POINTS).map(grade => (
                              <option key={grade} value={grade}>
                                {grade}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-3 px-2">
                          {GRADE_POINTS[subject.grade] || 0}
                        </td>
                        <td className="py-3 px-2">
                          <button
                            onClick={() => handleDeleteSubject(subject.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {subjects.length > 0 && (
              <div className="mt-6 flex gap-4">
                <button
                  onClick={handleReset}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Reset All
                </button>
              </div>
            )}
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg h-fit`}
          >
            <h2 className="text-2xl font-semibold mb-6">Results</h2>
            
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="text-sm text-gray-500 mb-1">Current GPA</div>
                <div className={`text-3xl font-bold flex items-center gap-2`}>
                  {gpa.toFixed(2)}
                  <span className={`w-3 h-3 rounded-full ${getGradeColor(gpa)}`}></span>
                </div>
              </div>
              
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="text-sm text-gray-500 mb-1">Total Credits</div>
                <div className="text-2xl font-semibold">{totalCredits}</div>
              </div>
              
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="text-sm text-gray-500 mb-1">Total Subjects</div>
                <div className="text-2xl font-semibold">{subjects.length}</div>
              </div>

              {gpa > 0 && (
                <div className={`p-4 rounded-lg border-l-4 ${
                  gpa >= 3.5 
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                    : gpa >= 2.0 
                    ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' 
                    : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                }`}>
                  <div className="text-sm font-medium">
                    {gpa >= 3.5 
                      ? 'Excellent Performance!' 
                      : gpa >= 2.0 
                      ? 'Good Performance' 
                      : 'Needs Improvement'}
                  </div>
                  <div className={`text-xs mt-1 ${
                    gpa >= 3.5 
                      ? 'text-green-600 dark:text-green-400' 
                      : gpa >= 2.0 
                      ? 'text-yellow-600 dark:text-yellow-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {gpa >= 3.5 
                      ? 'Keep up the great work!' 
                      : gpa >= 2.0 
                      ? 'You\'re doing well!' 
                      : 'Consider focusing on improvement'}
                  </div>
                </div>
              )}
              
              {subjects.length > 0 && (
                <button
                  onClick={handleExportPDF}
                  className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Export PDF
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default GPACalculator;
