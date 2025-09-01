# GPA & CGPA Calculator

A modern, responsive web application for calculating Grade Point Average (GPA) and Cumulative Grade Point Average (CGPA). Built with React, Tailwind CSS, and featuring a beautiful dark/light mode interface.

## Features

### GPA Calculator
- Add multiple subjects dynamically
- Input subject name, credit hours, and grades
- Real-time GPA calculation using the standard formula: `GPA = (Σ (Credit × Grade Point)) ÷ (Total Credit Hours)`
- Edit and delete subjects
- Visual grade indicators with color coding
- Performance feedback based on GPA ranges

### CGPA Calculator  
- Add multiple semesters with GPA and credit information
- Automatic CGPA calculation: `CGPA = (Σ (GPA × Semester Credit Hours)) ÷ (Total Credit Hours)`
- Semester breakdown display
- Edit and delete semesters
- Average GPA calculation across all semesters

### Additional Features
- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Data Persistence**: Automatic local storage of all data
- **PDF Export**: Download detailed reports for both GPA and CGPA calculations
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Grade Color Coding**: 
  - 🟢 Green: GPA ≥ 3.5 (Excellent)
  - 🟡 Yellow: GPA 2.0-3.49 (Good)
  - 🔴 Red: GPA < 2.0 (Needs Improvement)

## Grade Scale

The application uses the standard 4.0 GPA scale:

| Letter Grade | Grade Points |
|-------------|-------------|
| A+, A       | 4.0         |
| A-          | 3.7         |
| B+          | 3.3         |
| B           | 3.0         |
| B-          | 2.7         |
| C+          | 2.3         |
| C           | 2.0         |
| C-          | 1.7         |
| D+          | 1.3         |
| D           | 1.0         |
| F           | 0.0         |

## Tech Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: React Context API with useReducer
- **PDF Generation**: jsPDF
- **Data Persistence**: localStorage
- **Icons**: Heroicons (via Tailwind)

## Installation & Setup

1. **Clone or download the project**
   ```bash
   cd gpa-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm run build`
Builds the app for production to the `build` folder

### `npm test`
Launches the test runner in interactive watch mode

## Project Structure

```
src/
├── components/
│   ├── Header.js           # Navigation header with dark mode toggle
│   ├── HomePage.js         # Landing page with feature overview
│   ├── GPACalculator.js    # GPA calculation interface
│   └── CGPACalculator.js   # CGPA calculation interface
├── context/
│   └── GPAContext.js       # Global state management
├── utils/
│   └── pdfExport.js        # PDF export functionality
├── App.js                  # Main application component
└── index.js               # Application entry point
```

## Usage Guide

### Calculating GPA
1. Navigate to "GPA Calculator" from the home page
2. Add subjects by entering:
   - Subject name
   - Credit hours
   - Letter grade
3. View real-time GPA calculation in the results panel
4. Edit or delete subjects as needed
5. Export results to PDF

### Calculating CGPA
1. Navigate to "CGPA Calculator" from the home page
2. Add semesters by entering:
   - Semester name (e.g., "Fall 2023")
   - GPA for that semester
   - Total credits for that semester
3. View cumulative GPA calculation
4. See semester breakdown and average GPA
5. Export results to PDF

## Data Persistence

All your data is automatically saved to your browser's local storage, so you won't lose your calculations when you close the app. Data includes:
- All subjects and their details
- All semesters and their GPAs
- Dark/light mode preference

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Contributing

This project follows the PRD specifications and implements all requested features. Future enhancements could include:
- User authentication
- Cloud data sync
- Multiple GPA scales
- Grade trend analysis
- Course planning features

## License

This project is open source and available under the [MIT License](LICENSE).
