import React, { createContext, useContext, useReducer, useEffect } from 'react';

const GPAContext = createContext();

// Grade points mapping
export const GRADE_POINTS = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D+': 1.3,
  'D': 1.0,
  'F': 0.0
};

const initialState = {
  subjects: [],
  semesters: [],
  darkMode: false,
  currentView: 'home' // 'home', 'gpa', 'cgpa'
};

function gpaReducer(state, action) {
  switch (action.type) {
    case 'SET_SUBJECTS':
      return { ...state, subjects: action.payload };
    case 'ADD_SUBJECT':
      return { ...state, subjects: [...state.subjects, action.payload] };
    case 'UPDATE_SUBJECT':
      return {
        ...state,
        subjects: state.subjects.map(subject =>
          subject.id === action.payload.id ? action.payload : subject
        )
      };
    case 'DELETE_SUBJECT':
      return {
        ...state,
        subjects: state.subjects.filter(subject => subject.id !== action.payload)
      };
    case 'RESET_SUBJECTS':
      return { ...state, subjects: [] };
    case 'SET_SEMESTERS':
      return { ...state, semesters: action.payload };
    case 'ADD_SEMESTER':
      return { ...state, semesters: [...state.semesters, action.payload] };
    case 'UPDATE_SEMESTER':
      return {
        ...state,
        semesters: state.semesters.map(semester =>
          semester.id === action.payload.id ? action.payload : semester
        )
      };
    case 'DELETE_SEMESTER':
      return {
        ...state,
        semesters: state.semesters.filter(semester => semester.id !== action.payload)
      };
    case 'RESET_SEMESTERS':
      return { ...state, semesters: [] };
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };
    case 'SET_CURRENT_VIEW':
      return { ...state, currentView: action.payload };
    case 'LOAD_FROM_STORAGE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export function GPAProvider({ children }) {
  const [state, dispatch] = useReducer(gpaReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('gpa-calculator-data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: parsedData });
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    const dataToSave = {
      subjects: state.subjects,
      semesters: state.semesters,
      darkMode: state.darkMode
    };
    localStorage.setItem('gpa-calculator-data', JSON.stringify(dataToSave));
  }, [state.subjects, state.semesters, state.darkMode]);

  // Helper functions
  const calculateGPA = (subjects = state.subjects) => {
    if (subjects.length === 0) return 0;
    
    const totalPoints = subjects.reduce((sum, subject) => {
      return sum + (subject.credits * GRADE_POINTS[subject.grade]);
    }, 0);
    
    const totalCredits = subjects.reduce((sum, subject) => {
      return sum + subject.credits;
    }, 0);
    
    return totalCredits > 0 ? totalPoints / totalCredits : 0;
  };

  const calculateCGPA = (semesters = state.semesters) => {
    if (semesters.length === 0) return 0;
    
    const totalWeightedGPA = semesters.reduce((sum, semester) => {
      return sum + (semester.gpa * semester.credits);
    }, 0);
    
    const totalCredits = semesters.reduce((sum, semester) => {
      return sum + semester.credits;
    }, 0);
    
    return totalCredits > 0 ? totalWeightedGPA / totalCredits : 0;
  };

  const getGradeColor = (gpa) => {
    if (gpa >= 3.5) return 'bg-green-500';
    if (gpa >= 2.0) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const value = {
    ...state,
    dispatch,
    calculateGPA,
    calculateCGPA,
    getGradeColor,
    GRADE_POINTS
  };

  return <GPAContext.Provider value={value}>{children}</GPAContext.Provider>;
}

export function useGPA() {
  const context = useContext(GPAContext);
  if (!context) {
    throw new Error('useGPA must be used within a GPAProvider');
  }
  return context;
}
