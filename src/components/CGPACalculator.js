import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGPA } from '../context/GPAContext';
import { exportCGPAToPDF } from '../utils/pdfExport';

function CGPACalculator() {
  const { semesters, dispatch, calculateCGPA, getGradeColor, darkMode } = useGPA();
  const [newSemester, setNewSemester] = useState({
    name: '',
    gpa: '',
    credits: ''
  });

  const cgpa = calculateCGPA();
  const totalCredits = semesters.reduce((sum, semester) => sum + semester.credits, 0);

  const handleAddSemester = () => {
    if (newSemester.name && newSemester.gpa && newSemester.credits) {
      const semester = {
        id: Date.now(),
        name: newSemester.name,
        gpa: parseFloat(newSemester.gpa),
        credits: parseInt(newSemester.credits)
      };
      dispatch({ type: 'ADD_SEMESTER', payload: semester });
      setNewSemester({ name: '', gpa: '', credits: '' });
    }
  };

  const handleDeleteSemester = (id) => {
    dispatch({ type: 'DELETE_SEMESTER', payload: id });
  };

  const handleUpdateSemester = (id, field, value) => {
    const semester = semesters.find(s => s.id === id);
    if (semester) {
      const updatedSemester = {
        ...semester,
        [field]: field === 'credits' ? parseInt(value) || 0 : field === 'gpa' ? parseFloat(value) || 0 : value
      };
      dispatch({ type: 'UPDATE_SEMESTER', payload: updatedSemester });
    }
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_SEMESTERS' });
  };

  const handleExportPDF = () => {
    if (semesters.length > 0) {
      exportCGPAToPDF(semesters, cgpa, totalCredits);
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
          <h1 className="text-4xl font-bold mb-2">CGPA Calculator</h1>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Calculate your Cumulative Grade Point Average across semesters
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
            <h2 className="text-2xl font-semibold mb-6">Add Semester</h2>
            
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <input
                type="text"
                placeholder="Semester Name"
                value={newSemester.name}
                onChange={(e) => setNewSemester({...newSemester, name: e.target.value})}
                className={`px-4 py-2 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
              />
              <input
                type="number"
                placeholder="GPA"
                value={newSemester.gpa}
                onChange={(e) => setNewSemester({...newSemester, gpa: e.target.value})}
                className={`px-4 py-2 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
                min="0"
                max="4"
                step="0.01"
              />
              <input
                type="number"
                placeholder="Credits"
                value={newSemester.credits}
                onChange={(e) => setNewSemester({...newSemester, credits: e.target.value})}
                className={`px-4 py-2 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
                min="1"
              />
              <button
                onClick={handleAddSemester}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Add Semester
              </button>
            </div>

            {/* Semesters List */}
            {semesters.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Semesters</h3>
                {semesters.map((semester) => (
                  <motion.div
                    key={semester.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-4 rounded-lg border ${
                      darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="grid md:grid-cols-4 gap-4 items-center">
                      <div>
                        <label className="block text-sm font-medium mb-1">Semester</label>
                        <input
                          type="text"
                          value={semester.name}
                          onChange={(e) => handleUpdateSemester(semester.id, 'name', e.target.value)}
                          className={`w-full px-3 py-2 rounded border ${
                            darkMode 
                              ? 'bg-gray-600 border-gray-500 text-white' 
                              : 'bg-white border-gray-300'
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">GPA</label>
                        <input
                          type="number"
                          value={semester.gpa}
                          onChange={(e) => handleUpdateSemester(semester.id, 'gpa', e.target.value)}
                          className={`w-full px-3 py-2 rounded border ${
                            darkMode 
                              ? 'bg-gray-600 border-gray-500 text-white' 
                              : 'bg-white border-gray-300'
                          }`}
                          min="0"
                          max="4"
                          step="0.01"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Credits</label>
                        <input
                          type="number"
                          value={semester.credits}
                          onChange={(e) => handleUpdateSemester(semester.id, 'credits', e.target.value)}
                          className={`w-full px-3 py-2 rounded border ${
                            darkMode 
                              ? 'bg-gray-600 border-gray-500 text-white' 
                              : 'bg-white border-gray-300'
                          }`}
                          min="1"
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          onClick={() => handleDeleteSemester(semester.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded transition-colors w-full"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${getGradeColor(semester.gpa)}`}></span>
                        <span className="text-sm text-gray-500">
                          Quality Points: {(semester.gpa * semester.credits).toFixed(2)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        Credits: {semester.credits}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {semesters.length > 0 && (
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
                <div className="text-sm text-gray-500 mb-1">Cumulative GPA</div>
                <div className={`text-3xl font-bold flex items-center gap-2`}>
                  {cgpa.toFixed(2)}
                  <span className={`w-3 h-3 rounded-full ${getGradeColor(cgpa)}`}></span>
                </div>
              </div>
              
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="text-sm text-gray-500 mb-1">Total Credits</div>
                <div className="text-2xl font-semibold">{totalCredits}</div>
              </div>
              
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="text-sm text-gray-500 mb-1">Total Semesters</div>
                <div className="text-2xl font-semibold">{semesters.length}</div>
              </div>

              {semesters.length > 0 && (
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="text-sm text-gray-500 mb-1">Average GPA</div>
                  <div className="text-xl font-semibold">
                    {(semesters.reduce((sum, s) => sum + s.gpa, 0) / semesters.length).toFixed(2)}
                  </div>
                </div>
              )}

              {cgpa > 0 && (
                <div className={`p-4 rounded-lg border-l-4 ${
                  cgpa >= 3.5 
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                    : cgpa >= 2.0 
                    ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' 
                    : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                }`}>
                  <div className="text-sm font-medium">
                    {cgpa >= 3.5 
                      ? 'Outstanding Academic Performance!' 
                      : cgpa >= 2.0 
                      ? 'Good Academic Standing' 
                      : 'Academic Improvement Needed'}
                  </div>
                  <div className={`text-xs mt-1 ${
                    cgpa >= 3.5 
                      ? 'text-green-600 dark:text-green-400' 
                      : cgpa >= 2.0 
                      ? 'text-yellow-600 dark:text-yellow-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {cgpa >= 3.5 
                      ? 'Excellent work across all semesters!' 
                      : cgpa >= 2.0 
                      ? 'Maintaining good academic progress' 
                      : 'Focus on improving future semester performance'}
                  </div>
                </div>
              )}

              {semesters.length > 0 && (
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="text-sm font-medium mb-2">Semester Breakdown</div>
                  <div className="space-y-1 text-xs">
                    {semesters.map((semester) => (
                      <div key={semester.id} className="flex justify-between items-center">
                        <span>{semester.name}</span>
                        <div className="flex items-center gap-1">
                          <span>{semester.gpa.toFixed(2)}</span>
                          <span className={`w-2 h-2 rounded-full ${getGradeColor(semester.gpa)}`}></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {semesters.length > 0 && (
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

export default CGPACalculator;
