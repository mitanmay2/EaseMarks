// Engineering College Marks Management System - Main Application Logic

// Global State Management
let currentUser = null;
let currentView = 'dashboard';
let isSidebarOpen = true;

// Face Recognition State
let cameraStream = null;
let isCameraActive = false;
let faceRecognitionMode = false;
let faceData = {}; // Simulated face data storage

// Academic Year Dropdown Debug Flag
const DEBUG_MARKS_ENTRY = true;

function debugLog(message, data = null) {
  if (DEBUG_MARKS_ENTRY) {
    console.log('[MARKS ENTRY DEBUG]', message, data || '');
  }
}

// Data Storage (Simulating database with in-memory storage)
const appData = {
  users: [
    {
      email: "ashwini.mam@lspgcoer.in",
      password: "ashwini@mam",
      role: "Class Coordinator",
      name: "Ashwini Madam",
      department: "Computer Engineering"
    },
    {
      email: "hod@lspgcoer.in",
      password: "hod@lspgcoer.in",
      role: "Hod",
      name: "Raju Sir",
      department: "Computer Engineering"
    },
    {
      email: "Tanmay@lspgcoer.in",
      password: "Tanmay@56",
      role: "admin",
      name: "Tanmay Chaudhary",
      department: "Administration"
    },
    {
      email: "Amruta@lspgcoer.in",
      password: "Amruta@16",
      role: "admin",
      name: "Amruta",
      department: "Administration"
    }
  ],
  academicYears: [
    {
      id: "first_year",
      name: "First Year",
      studentsCount: 40,
      semesters: [
        {
          sem: 1,
          subjects: ["Engineering Mathematics-I", "Engineering Chemistry", "Engineering Mechanics", "Programming for Problem Solving", "Communication Skills", "Yoga"]
        },
        {
          sem: 2,
          subjects: ["Engineering Mathematics-II", "Engineering Physics", "Engineering Graphics", "Basic Electrical and Electronics Engineering", "Basic Civil and Mechanical Engineering", "Energy and Environmental Engineering", "IKS Bucket", "Health and Wellness Education"]
        }
      ]
    },
    {
      id: "second_year",
      name: "Second Year",
      studentsCount: 40,
      semesters: [
        {
          sem: 3,
          subjects: ["Engineering Mathematics-III", "Data Structures", "Object-Oriented Programming", "Object-Oriented Programming in Java Laboratory", "Digital Electronics Laboratory"]
        },
        {
          sem: 4,
          subjects: ["Design and Analysis of Algorithms", "Computer Architecture and Organisation", "Probability and Statistics", "Python Programming", "Design and Analysis of Algorithms Laboratory"]
        }
      ]
    },
    {
      id: "third_year",
      name: "Third Year",
      studentsCount: 47,
      semesters: [
        {
          sem: 5,
          subjects: ["Machine Learning", "Database Management", "Seminar", "Mini Project", "Software Testing", "Cloud Computing", "Computer Network"]
        },
        {
          sem: 6,
          subjects: ["Data Communication & Computer Networks", "Big Data Analytics", "Prompt Engineering", "Full Stack Development", "Deep Learning"]
        }
      ]
    },
    {
      id: "fourth_year",
      name: "Fourth Year",
      studentsCount: 40,
      semesters: [
        {
          sem: 7,
          subjects: ["HTML5", "Project-Phase", "Internship", "Distributed Computing-Lab", "Advanced Algorithms"]
        },
        {
          sem: 8,
          subjects: ["Internship Base", "Viva", "Performance Base"]
        }
      ]
    }
  ],
  assessmentTypes: [
    { type: "Internal Assessment", maxMarks: 20, weightage: 20 },
    { type: "Mid-Semester", maxMarks: 20, weightage: 20 },
    { type: "End-Semester", maxMarks: 60, weightage: 60 }
  ],
  gradingScheme: [
    { grade: "A+", points: 10, minMarks: 90 },
    { grade: "A", points: 9, minMarks: 80 },
    { grade: "B+", points: 8, minMarks: 70 },
    { grade: "B", points: 7, minMarks: 60 },
    { grade: "C", points: 6, minMarks: 50 },
    { grade: "D", points: 5, minMarks: 40 },
    { grade: "F", points: 0, minMarks: 0 }
  ],
  students: generateCompleteStudentDatabase(),
  faculty: [
    { id: "f1", name: "Dr. Rajesh Kumar", department: "Computer Engineering", subjects: ["Programming for Problem Solving", "Data Structures"], email: "rajesh@lspgcoer.in" },
    { id: "f2", name: "Dr. Priya Sharma", department: "Computer Engineering", subjects: ["Machine Learning", "Deep Learning"], email: "priya@lspgcoer.in" },
    { id: "f3", name: "Prof. Amit Singh", department: "Computer Engineering", subjects: ["Database Management", "Computer Networks"], email: "amit@lspgcoer.in" }
  ],
  marks: [
    // First Year - Aarav Sharma (s1) - Engineering Mathematics-I (NEW DISTRIBUTION)
    { studentId: "s1", subject: "Engineering Mathematics-I", assessmentType: "Internal Assessment", marks: 18, maxMarks: 20, semester: 1 },
    { studentId: "s1", subject: "Engineering Mathematics-I", assessmentType: "Mid-Semester", marks: 17, maxMarks: 20, semester: 1 },
    { studentId: "s1", subject: "Engineering Mathematics-I", assessmentType: "End-Semester", marks: 52, maxMarks: 60, semester: 1 },
    
    // First Year - Aarav Sharma (s1) - Engineering Chemistry
    { studentId: "s1", subject: "Engineering Chemistry", assessmentType: "Internal Assessment", marks: 16, maxMarks: 20, semester: 1 },
    { studentId: "s1", subject: "Engineering Chemistry", assessmentType: "Mid-Semester", marks: 15, maxMarks: 20, semester: 1 },
    { studentId: "s1", subject: "Engineering Chemistry", assessmentType: "End-Semester", marks: 48, maxMarks: 60, semester: 1 },
    
    // First Year - Ananya Iyer (s2) - Engineering Mathematics-I
    { studentId: "s2", subject: "Engineering Mathematics-I", assessmentType: "Internal Assessment", marks: 19, maxMarks: 20, semester: 1 },
    { studentId: "s2", subject: "Engineering Mathematics-I", assessmentType: "Mid-Semester", marks: 18, maxMarks: 20, semester: 1 },
    { studentId: "s2", subject: "Engineering Mathematics-I", assessmentType: "End-Semester", marks: 55, maxMarks: 60, semester: 1 },
    
    // First Year - Ananya Iyer (s2) - Programming for Problem Solving
    { studentId: "s2", subject: "Programming for Problem Solving", assessmentType: "Internal Assessment", marks: 17, maxMarks: 20, semester: 1 },
    { studentId: "s2", subject: "Programming for Problem Solving", assessmentType: "Mid-Semester", marks: 16, maxMarks: 20, semester: 1 },
    { studentId: "s2", subject: "Programming for Problem Solving", assessmentType: "End-Semester", marks: 50, maxMarks: 60, semester: 1 },
    
    // Second Year - Aryan Sharma (s41) - Data Structures
    { studentId: "s41", subject: "Data Structures", assessmentType: "Internal Assessment", marks: 16, maxMarks: 20, semester: 3 },
    { studentId: "s41", subject: "Data Structures", assessmentType: "Mid-Semester", marks: 17, maxMarks: 20, semester: 3 },
    { studentId: "s41", subject: "Data Structures", assessmentType: "End-Semester", marks: 49, maxMarks: 60, semester: 3 },
    
    // Second Year - Aryan Sharma (s41) - Object-Oriented Programming
    { studentId: "s41", subject: "Object-Oriented Programming", assessmentType: "Internal Assessment", marks: 15, maxMarks: 20, semester: 3 },
    { studentId: "s41", subject: "Object-Oriented Programming", assessmentType: "Mid-Semester", marks: 14, maxMarks: 20, semester: 3 },
    { studentId: "s41", subject: "Object-Oriented Programming", assessmentType: "End-Semester", marks: 42, maxMarks: 60, semester: 3 },
    
    // Third Year - Tanmay Chaudhary (s81) - Machine Learning
    { studentId: "s81", subject: "Machine Learning", assessmentType: "Internal Assessment", marks: 19, maxMarks: 20, semester: 5 },
    { studentId: "s81", subject: "Machine Learning", assessmentType: "Mid-Semester", marks: 18, maxMarks: 20, semester: 5 },
    { studentId: "s81", subject: "Machine Learning", assessmentType: "End-Semester", marks: 54, maxMarks: 60, semester: 5 },
    
    // Third Year - Tanmay Chaudhary (s81) - Database Management
    { studentId: "s81", subject: "Database Management", assessmentType: "Internal Assessment", marks: 17, maxMarks: 20, semester: 5 },
    { studentId: "s81", subject: "Database Management", assessmentType: "Mid-Semester", marks: 16, maxMarks: 20, semester: 5 },
    { studentId: "s81", subject: "Database Management", assessmentType: "End-Semester", marks: 51, maxMarks: 60, semester: 5 },
    
    // Fourth Year - Aryan Khanna (s128) - Project-Phase
    { studentId: "s128", subject: "Project-Phase", assessmentType: "Internal Assessment", marks: 18, maxMarks: 20, semester: 7 },
    { studentId: "s128", subject: "Project-Phase", assessmentType: "Mid-Semester", marks: 19, maxMarks: 20, semester: 7 },
    { studentId: "s128", subject: "Project-Phase", assessmentType: "End-Semester", marks: 56, maxMarks: 60, semester: 7 },
    
    // Additional sample data for better demonstration
    // First Year - Rohan Gupta (s3) - Engineering Mechanics (Needs improvement)
    { studentId: "s3", subject: "Engineering Mechanics", assessmentType: "Internal Assessment", marks: 12, maxMarks: 20, semester: 1 },
    { studentId: "s3", subject: "Engineering Mechanics", assessmentType: "Mid-Semester", marks: 11, maxMarks: 20, semester: 1 },
    { studentId: "s3", subject: "Engineering Mechanics", assessmentType: "End-Semester", marks: 30, maxMarks: 60, semester: 1 },
    
    // Second Year - Priya Patel (s42) - Engineering Mathematics-III (Good performance)
    { studentId: "s42", subject: "Engineering Mathematics-III", assessmentType: "Internal Assessment", marks: 18, maxMarks: 20, semester: 3 },
    { studentId: "s42", subject: "Engineering Mathematics-III", assessmentType: "Mid-Semester", marks: 19, maxMarks: 20, semester: 3 },
    { studentId: "s42", subject: "Engineering Mathematics-III", assessmentType: "End-Semester", marks: 53, maxMarks: 60, semester: 3 }
  ],
  auditLogs: [
    { timestamp: new Date('2025-01-15T10:30:00'), user: "Admin User", action: "System Access", details: "Logged into Engineering College Management System" },
    { timestamp: new Date('2025-01-15T11:15:00'), user: "Dr. Rajesh Kumar", action: "Entered Marks", details: "Programming for Problem Solving - Internal Assessment for First Year" },
    { timestamp: new Date('2025-01-16T09:20:00'), user: "Dr. Priya Sharma", action: "Faculty Review", details: "Reviewed Machine Learning marks for Third Year" },
    { timestamp: new Date('2025-01-16T14:45:00'), user: "Dr. Rajesh Kumar", action: "Generated Report", details: "Semester Performance Report for Second Year" },
    { timestamp: new Date('2025-01-17T08:30:00'), user: "Admin User", action: "Academic Structure", details: "Updated semester subjects for Fourth Year" }
  ]
};

const STUDENT_BATCH_SIZE = 24;

const ROLE_MAP = {
  admin: 'admin',
  hod: 'hod',
  'head of department': 'hod',
  'class coordinator': 'faculty',
  coordinator: 'faculty',
  professor: 'faculty',
  faculty: 'faculty'
};

function getBackendApiUrl() {
  if (typeof window === 'undefined') {
    return './api/index.php';
  }

  const allowedHosts = new Set(['localhost', '127.0.0.1', '::1']);
  const isLocalHttp = allowedHosts.has(window.location.hostname) && /^https?:$/.test(window.location.protocol);

  return isLocalHttp ? new URL('api/index.php', window.location.href).toString() : '';
}

const BACKEND_API_URL = getBackendApiUrl();

const appState = {
  students: {
    pageSize: STUDENT_BATCH_SIZE,
    visibleCount: STUDENT_BATCH_SIZE,
    searchTerm: '',
    filteredRecords: []
  },
  derived: {
    cgpaCache: new Map()
  },
  backend: {
    mode: 'offline',
    apiUrl: BACKEND_API_URL,
    initialized: false,
    message: ''
  }
};

function normalizeText(value = '') {
  return String(value || '').trim().toLowerCase();
}

function normalizeRole(role = '') {
  return ROLE_MAP[normalizeText(role)] || 'faculty';
}

function getCurrentUserRoleKey() {
  return currentUser ? normalizeRole(currentUser.role) : 'faculty';
}

function getRoleLabel(roleKey) {
  const roleLabels = {
    admin: 'Admin',
    hod: 'HOD',
    faculty: 'Faculty'
  };

  return roleLabels[roleKey] || 'Faculty';
}

function debounce(callback, delay = 250) {
  let timeoutId;

  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => callback(...args), delay);
  };
}

function invalidateDerivedCaches() {
  appState.derived.cgpaCache.clear();
}

function getAcademicYearMap() {
  return new Map(appData.academicYears.map(year => [year.id, year]));
}

function getYearBadgeClass(yearId) {
  const yearClasses = {
    first_year: 'year-first',
    second_year: 'year-second',
    third_year: 'year-third',
    fourth_year: 'year-fourth'
  };

  return yearClasses[yearId] || 'year-first';
}

function refreshAcademicYearCounts() {
  appData.academicYears.forEach(year => {
    year.studentsCount = appData.students.filter(student => student.academicYear === year.id).length;
  });
}

function createSubjectCode(subjectName, fallbackIndex = 0) {
  const chunks = subjectName
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean);

  const baseCode = chunks
    .map(chunk => chunk[0])
    .join('')
    .toUpperCase()
    .slice(0, 6);

  if (baseCode) {
    return fallbackIndex > 0 ? `${baseCode}${fallbackIndex}` : baseCode;
  }

  return `SUB${fallbackIndex || 1}`;
}

function buildSubjectCatalog() {
  const subjectMap = new Map();

  appData.academicYears.forEach(year => {
    year.semesters.forEach(semester => {
      semester.subjects.forEach(subjectName => {
        const subjectKey = normalizeText(subjectName);
        if (!subjectMap.has(subjectKey)) {
          subjectMap.set(subjectKey, {
            id: `subject_${subjectMap.size + 1}`,
            name: subjectName,
            code: createSubjectCode(subjectName, subjectMap.size + 1)
          });
        }
      });
    });
  });

  return Array.from(subjectMap.values()).sort((left, right) => left.name.localeCompare(right.name));
}

function cloneSerializable(value) {
  return JSON.parse(JSON.stringify(value));
}

function mergeSubjectCatalog(existingSubjects = []) {
  const mergedSubjects = new Map();

  existingSubjects.forEach(subject => {
    if (subject?.name) {
      mergedSubjects.set(normalizeText(subject.name), { ...subject });
    }
  });

  buildSubjectCatalog().forEach(subject => {
    const subjectKey = normalizeText(subject.name);
    if (!mergedSubjects.has(subjectKey)) {
      mergedSubjects.set(subjectKey, subject);
    }
  });

  return Array.from(mergedSubjects.values()).sort((left, right) => left.name.localeCompare(right.name));
}

function getStudentsByAcademicYear(yearId) {
  return appData.students
    .filter(student => student.academicYear === yearId)
    .sort((left, right) => left.prn.localeCompare(right.prn));
}

function getStudentSearchIndex(student) {
  return normalizeText(`${student.prn} ${student.name} ${student.email}`);
}

function initializeAppData() {
  if (!Array.isArray(appData.classes)) {
    appData.classes = [];
  }

  appData.subjects = mergeSubjectCatalog(Array.isArray(appData.subjects) ? appData.subjects : []);
  refreshAcademicYearCounts();
  invalidateDerivedCaches();
}

initializeAppData();

function isBackendEnabled() {
  return appState.backend.mode === 'php-mysql';
}

function syncFaceRecognitionStorage() {
  localStorage.setItem('faceRecognitionData', JSON.stringify(faceData));
}

async function apiRequest(action, payload = {}) {
  if (!appState.backend.apiUrl) {
    throw new Error('Open the website from XAMPP localhost, for example http://localhost/EMarks/.');
  }

  const response = await fetch(appState.backend.apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      action,
      ...payload
    })
  });

  const responseText = await response.text();
  let responseData = {};

  try {
    responseData = responseText ? JSON.parse(responseText) : {};
  } catch (error) {
    throw new Error('The PHP backend returned an invalid response.');
  }

  if (!response.ok || responseData.success === false) {
    throw new Error(responseData.message || `Backend request failed with status ${response.status}.`);
  }

  return responseData;
}

function serializeAppDataForBackend() {
  return cloneSerializable({
    users: appData.users,
    academicYears: appData.academicYears,
    assessmentTypes: appData.assessmentTypes,
    gradingScheme: appData.gradingScheme,
    classes: appData.classes || [],
    subjects: appData.subjects || [],
    students: appData.students || [],
    faculty: appData.faculty || [],
    marks: appData.marks || [],
    auditLogs: appData.auditLogs || [],
    faceData: faceData || {}
  });
}

function applyBootstrapData(payload = {}) {
  appData.users = Array.isArray(payload.users) ? payload.users : appData.users;
  appData.academicYears = Array.isArray(payload.academicYears) ? payload.academicYears : appData.academicYears;
  appData.assessmentTypes = Array.isArray(payload.assessmentTypes) ? payload.assessmentTypes : appData.assessmentTypes;
  appData.gradingScheme = Array.isArray(payload.gradingScheme) ? payload.gradingScheme : appData.gradingScheme;
  appData.classes = Array.isArray(payload.classes) ? payload.classes : [];
  appData.subjects = Array.isArray(payload.subjects) ? payload.subjects : [];
  appData.students = Array.isArray(payload.students) ? payload.students : appData.students;
  appData.faculty = Array.isArray(payload.faculty) ? payload.faculty : appData.faculty;
  appData.marks = Array.isArray(payload.marks) ? payload.marks : appData.marks;
  appData.auditLogs = Array.isArray(payload.auditLogs)
    ? payload.auditLogs.map(log => ({
        ...log,
        timestamp: log.timestamp ? new Date(log.timestamp) : new Date()
      }))
    : appData.auditLogs;

  const serverFaceData = payload.faceData && typeof payload.faceData === 'object' ? payload.faceData : {};
  if (Object.keys(serverFaceData).length > 0 || Object.keys(faceData).length === 0) {
    faceData = serverFaceData;
    syncFaceRecognitionStorage();
  }

  initializeAppData();
}

async function persistRequest(action, payload = {}) {
  if (!isBackendEnabled()) {
    const message = appState.backend.message || 'Database is not connected. Start XAMPP Apache and MySQL, then open http://localhost/EMarks/.';
    showToast(message, 'error');
    throw new Error(message);
  }

  try {
    return await apiRequest(action, payload);
  } catch (error) {
    console.error(`Backend request failed for ${action}:`, error);
    showToast(error.message || 'Database sync failed.', 'error');
    throw error;
  }
}

async function persistAuditLog(logEntry) {
  if (!isBackendEnabled()) {
    return;
  }

  try {
    await apiRequest('write_audit_log', {
      log: {
        ...logEntry,
        timestamp: logEntry.timestamp instanceof Date ? logEntry.timestamp.toISOString() : logEntry.timestamp
      }
    });
  } catch (error) {
    console.warn('Audit log sync failed:', error);
  }
}

async function persistFaceProfile(email, profile) {
  if (!isBackendEnabled()) {
    return;
  }

  await apiRequest('save_face_profile', {
    email,
    profile
  });
}

async function deleteFaceProfile(email) {
  if (!isBackendEnabled()) {
    return;
  }

  await apiRequest('delete_face_profile', { email });
}

async function initializeBackend() {
  try {
    const bootstrapResponse = await apiRequest('bootstrap');
    appState.backend.mode = 'php-mysql';

    if (bootstrapResponse.meta?.hasData) {
      applyBootstrapData(bootstrapResponse.data || {});
    } else {
      const seededResponse = await apiRequest('seed_defaults', {
        data: serializeAppDataForBackend()
      });
      applyBootstrapData(seededResponse.data || {});
    }

    appState.backend.message = '';
  } catch (error) {
    console.warn('PHP/MySQL backend unavailable.', error);
    appState.backend.mode = 'offline';
    appState.backend.message = error.message || 'Backend unavailable.';
  } finally {
    appState.backend.initialized = true;
  }
}

// Engineering Chatbot Responses
const chatbotResponses = {
  grades: "Our grading system: A+ (90-100), A (80-89), B+ (70-79), B (60-69), C (50-59), D (40-49), F (0-39). CGPA is calculated based on grade points and credits.",
  marksEntry: "To enter marks: 1) Select Academic Year 2) Choose Semester 3) Select Subject 4) Pick Assessment Type 5) Enter marks for students 6) Calculate grades 7) Submit for approval",
  cgpaCalculation: "CGPA = Sum of (Grade Points × Credits) / Total Credits attempted. SGPA is calculated similarly for each semester.",
  academicCalendar: "Academic year has 2 semesters. Internal assessments are continuous. Mid-sem and End-sem exams are scheduled as per academic calendar.",
  navigate: "Use sidebar: Dashboard, Academic Years, Students, Marks Entry, Reports. HODs see Faculty Management. Admins have full system access."
};

// Utility Functions
function generateId() {
  return 'id_' + Math.random().toString(36).substr(2, 9);
}

function formatDate(date) {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

function calculateGrade(marks) {
  const grading = appData.gradingScheme;
  for (let grade of grading) {
    if (marks >= grade.minMarks) {
      return grade.grade;
    }
  }
  return 'F';
}

function getGradePoints(grade) {
  const gradeInfo = appData.gradingScheme.find(g => g.grade === grade);
  return gradeInfo ? gradeInfo.points : 0;
}

function calculateCGPA(studentId) {
  const cachedCGPA = appState.derived.cgpaCache.get(studentId);
  if (cachedCGPA !== undefined) {
    return cachedCGPA;
  }

  const studentMarks = appData.marks.filter(m => m.studentId === studentId);
  if (studentMarks.length === 0) {
    appState.derived.cgpaCache.set(studentId, '0.00');
    return '0.00';
  }
  
  // Group marks by subject and calculate total percentage for each subject
  const subjectTotals = {};
  
  studentMarks.forEach(mark => {
    if (!subjectTotals[mark.subject]) {
      subjectTotals[mark.subject] = {
        totalMarks: 0,
        maxTotalMarks: 0,
        assessments: {}
      };
    }
    
    subjectTotals[mark.subject].assessments[mark.assessmentType] = {
      marks: mark.marks,
      maxMarks: mark.maxMarks
    };
  });
  
  let totalGradePoints = 0;
  let totalCredits = 0;
  
  // Calculate grade for each subject based on combined assessment scores
  Object.entries(subjectTotals).forEach(([subject, data]) => {
    let subjectTotal = 0;
    let subjectMaxTotal = 100; // Total is always 100 (20+20+60)
    
    // Calculate total marks for the subject
    Object.entries(data.assessments).forEach(([assessmentType, assessment]) => {
      subjectTotal += assessment.marks;
    });
    
    // Calculate percentage and grade
    const percentage = (subjectTotal / subjectMaxTotal) * 100;
    const grade = calculateGrade(percentage);
    const gradePoints = getGradePoints(grade);
    
    // Standard credits per subject (typically 3-4)
    const credits = getSubjectCredits(subject);
    
    totalGradePoints += gradePoints * credits;
    totalCredits += credits;
  });
  
  const computedCGPA = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : '0.00';
  appState.derived.cgpaCache.set(studentId, computedCGPA);
  return computedCGPA;
}

function getSubjectCredits(subject) {
  // Engineering college typical credit distribution
  const creditMap = {
    'Engineering Mathematics-I': 4,
    'Engineering Mathematics-II': 4,
    'Engineering Mathematics-III': 4,
    'Engineering Chemistry': 3,
    'Engineering Physics': 3,
    'Engineering Mechanics': 4,
    'Programming for Problem Solving': 3,
    'Communication Skills': 2,
    'Yoga': 1,
    'Data Structures': 4,
    'Object-Oriented Programming': 4,
    'Machine Learning': 4,
    'Database Management': 4,
    'Computer Network': 3,
    'Project-Phase': 6,
    'Internship': 4
  };
  
  return creditMap[subject] || 3; // Default 3 credits
}

function getGradeClass(grade) {
  const gradeClasses = {
    'A+': 'grade-a-plus',
    'A': 'grade-a',
    'B+': 'grade-b-plus',
    'B': 'grade-b',
    'C': 'grade-c',
    'D': 'grade-d',
    'F': 'grade-f'
  };
  return gradeClasses[grade] || 'grade-f';
}

function getCGPAClass(cgpa) {
  if (cgpa >= 8.5) return 'cgpa-excellent';
  if (cgpa >= 7.0) return 'cgpa-good';
  if (cgpa >= 6.0) return 'cgpa-average';
  return 'cgpa-poor';
}

// Toast Notification System
function showToast(message, type = 'info') {
  const toastContainer = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icons = {
    success: 'fas fa-check-circle',
    error: 'fas fa-exclamation-circle',
    warning: 'fas fa-exclamation-triangle',
    info: 'fas fa-info-circle'
  };
  
  toast.innerHTML = `
    <i class="toast-icon ${icons[type]}"></i>
    <span class="toast-message">${message}</span>
  `;
  
  toastContainer.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 5000);
}

// Face Recognition Functions
function initializeFaceRecognition() {
  console.log('🎭 Initializing face recognition system...');
  
  // Load saved face data from localStorage (simulated)
  try {
    const savedFaces = JSON.parse(localStorage.getItem('faceRecognitionData') || '{}');
    faceData = savedFaces;
    console.log('✅ Face recognition data loaded:', Object.keys(faceData));
  } catch (error) {
    console.log('⚠️ No previous face data found, starting fresh');
    faceData = {};
  }
}

async function requestCameraAccess() {
  console.log('📹 Requesting camera access...');
  const video = document.getElementById('cameraVideo');
  const statusElement = document.getElementById('cameraStatus');
  const verifyBtn = document.getElementById('verifyFaceBtn');
  
  try {
    // Request camera permissions
    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 640 },
        height: { ideal: 480 },
        facingMode: 'user'
      }
    });
    
    video.srcObject = cameraStream;
    video.classList.add('active');
    isCameraActive = true;
    
    statusElement.textContent = 'Camera ready! Position your face in the frame';
    verifyBtn.disabled = false;
    
    console.log('✅ Camera access granted');
    showToast('📹 Camera activated successfully!', 'success');
    
    // Simulate face detection feedback
    setTimeout(() => {
      statusElement.textContent = '✅ Face detected! Ready for verification';
      document.querySelector('.face-frame').classList.add('face-scanning');
    }, 2000);
    
    return true;
  } catch (error) {
    console.error('❌ Camera access error:', error);
    
    let errorMessage = 'Camera access denied. Please allow camera permissions and try again.';
    if (error.name === 'NotFoundError') {
      errorMessage = 'No camera found. Please connect a camera and try again.';
    } else if (error.name === 'NotAllowedError') {
      errorMessage = 'Camera access denied. Please allow camera permissions in your browser.';
    }
    
    statusElement.textContent = '❌ Camera access failed';
    showToast(errorMessage, 'error');
    
    return false;
  }
}

function stopCamera() {
  console.log('🛑 Stopping camera...');
  
  if (cameraStream) {
    cameraStream.getTracks().forEach(track => track.stop());
    cameraStream = null;
  }
  
  const video = document.getElementById('cameraVideo');
  video.classList.remove('active');
  video.srcObject = null;
  
  isCameraActive = false;
  document.getElementById('verifyFaceBtn').disabled = true;
  document.getElementById('cameraStatus').textContent = 'Camera stopped';
  
  // Remove scanning animation
  document.querySelector('.face-frame').classList.remove('face-scanning', 'face-success', 'face-error');
}

async function verifyFace() {
  console.log('🔍 Starting face verification...');
  
  if (!isCameraActive) {
    showToast('❌ Please start the camera first', 'error');
    return;
  }
  
  const statusElement = document.getElementById('cameraStatus');
  const faceFrame = document.querySelector('.face-frame');
  const verifyBtn = document.getElementById('verifyFaceBtn');
  
  // Start verification animation
  verifyBtn.disabled = true;
  statusElement.textContent = '🔍 Verifying face...';
  faceFrame.classList.remove('face-scanning');
  faceFrame.classList.add('face-loading');
  
  // Simulate face verification process (2-3 seconds)
  try {
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Simulate face matching algorithm
    const matchResult = await simulateFaceMatching();
    
    faceFrame.classList.remove('face-loading');
    
    if (matchResult.success) {
      // Face recognized
      console.log('✅ Face verification successful for:', matchResult.user.name);
      
      statusElement.textContent = `✅ Welcome, ${matchResult.user.name}!`;
      faceFrame.classList.add('face-success');
      
      showToast(`🎉 Face recognition successful! Welcome, ${matchResult.user.name}`, 'success');
      
      // Login the user
      currentUser = matchResult.user;
      addAuditLog('Face Recognition Login', `${matchResult.user.name} logged in via face recognition`);
      
      // Stop camera and show main app
      setTimeout(() => {
        stopCamera();
        showMainApp();
      }, 1500);
      
    } else {
      // Face not recognized
      console.log('❌ Face verification failed');
      
      statusElement.textContent = '❌ Face not recognized. Try again or use password login.';
      faceFrame.classList.add('face-error');
      
      showToast('❌ Face not recognized. Please try again or register your face first.', 'error');
      
      verifyBtn.disabled = false;
      
      // Remove error animation after 2 seconds
      setTimeout(() => {
        faceFrame.classList.remove('face-error');
        statusElement.textContent = 'Position your face in the frame and try again';
      }, 2000);
    }
  } catch (error) {
    console.error('❌ Face verification error:', error);
    
    faceFrame.classList.remove('face-loading');
    faceFrame.classList.add('face-error');
    
    statusElement.textContent = '❌ Verification failed. Please try again.';
    showToast('❌ Face verification failed. Please try again.', 'error');
    
    verifyBtn.disabled = false;
  }
}

async function simulateFaceMatching() {
  console.log('🧠 Simulating face matching algorithm...');
  
  // Simulate complex face recognition processing
  const users = appData.users.filter(user => faceData[user.email]);
  
  if (users.length === 0) {
    console.log('⚠️ No registered faces found');
    return { success: false, error: 'No registered faces' };
  }
  
  // Simulate 70% success rate for demonstration
  const recognitionSuccess = Math.random() > 0.3;
  
  if (recognitionSuccess) {
    // Return random registered user for demo
    const recognizedUser = users[Math.floor(Math.random() * users.length)];
    return { success: true, user: recognizedUser };
  } else {
    return { success: false, error: 'Face not recognized' };
  }
}

async function registerFace(email) {
  console.log('📝 Registering face for:', email);
  
  const user = appData.users.find(u => u.email === email);
  if (!user) {
    showToast('❌ User not found', 'error');
    return;
  }
  
  if (!isCameraActive) {
    showToast('❌ Please start the camera first', 'error');
    return;
  }
  
  const statusElement = document.getElementById('cameraStatus');
  const faceFrame = document.querySelector('.face-frame');
  
  try {
    statusElement.textContent = `📸 Capturing face data for ${user.name}...`;
    faceFrame.classList.add('face-loading');
    
    // Simulate face capture and processing (2 seconds)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate face data creation (in real app, this would be face embedding vectors)
    const faceDataId = `face_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    faceData[email] = {
      id: faceDataId,
      timestamp: new Date().toISOString(),
      user: user.name,
      features: Array.from({ length: 128 }, () => Math.random()) // Simulate 128-dim face embedding
    };
    
    syncFaceRecognitionStorage();
    await persistFaceProfile(email, faceData[email]);
    
    faceFrame.classList.remove('face-loading');
    faceFrame.classList.add('face-success');
    
    statusElement.textContent = `✅ Face registered successfully for ${user.name}!`;
    showToast(`✅ Face registered for ${user.name}! You can now login with face recognition.`, 'success');
    
    addAuditLog('Face Registration', `Face registered for ${user.name}`);
    
    console.log('✅ Face registration completed for:', email);
    
    // Remove success animation after 3 seconds
    setTimeout(() => {
      faceFrame.classList.remove('face-success');
      statusElement.textContent = 'Face registration complete. Ready for next action.';
    }, 3000);
    
  } catch (error) {
    console.error('❌ Face registration error:', error);
    
    faceFrame.classList.remove('face-loading');
    faceFrame.classList.add('face-error');
    
    statusElement.textContent = '❌ Face registration failed';
    showToast('❌ Face registration failed. Please try again.', 'error');
  }
}

function toggleLoginMethod(method) {
  console.log('🔄 Switching to:', method, 'login');
  
  const passwordTab = document.getElementById('passwordLoginTab');
  const faceTab = document.getElementById('faceLoginTab');
  const loginForm = document.getElementById('loginForm');
  const faceSection = document.getElementById('faceLoginSection');
  
  if (method === 'face') {
    // Switch to face recognition
    passwordTab.classList.remove('active');
    faceTab.classList.add('active');
    loginForm.style.display = 'none';
    faceSection.style.display = 'block';
    faceRecognitionMode = true;
    
    showToast('📸 Face Recognition Mode activated. Click "Start Camera" to begin.', 'info');
  } else {
    // Switch to password login
    faceTab.classList.remove('active');
    passwordTab.classList.add('active');
    faceSection.style.display = 'none';
    loginForm.style.display = 'block';
    faceRecognitionMode = false;
    
    // Stop camera if active
    if (isCameraActive) {
      stopCamera();
    }
    
    showToast('🔑 Password Login Mode activated.', 'info');
  }
}

// Authentication Functions
async function login(email, password) {
  let user = null;

  if (!isBackendEnabled()) {
    showToast(appState.backend.message || 'Database is not connected. Open the site from XAMPP localhost.', 'error');
    return false;
  }

  try {
    const response = await apiRequest('login', { email, password });
    user = response.data?.user || null;
  } catch (error) {
    if (error.message !== 'Invalid credentials.') {
      showToast(error.message || 'Database login failed.', 'error');
    }
    return false;
  }

  if (user) {
    currentUser = { ...user };
    addAuditLog(`User logged in`, `${user.name} (${user.role})`);
    return true;
  }
  return false;
}

function logout() {
  if (currentUser) {
    addAuditLog(`User logged out`, `${currentUser.name} (${currentUser.role})`);
    currentUser = null;
  }
  
  // Stop camera if active
  if (isCameraActive) {
    stopCamera();
  }
  
  // Reset login form
  toggleLoginMethod('password');
  
  showLoginPage();
}

// Audit Log Functions
function addAuditLog(action, details) {
  if (currentUser) {
    const logEntry = {
      timestamp: new Date(),
      user: currentUser.name,
      action: action,
      details: details
    };

    appData.auditLogs.unshift(logEntry);
    persistAuditLog(logEntry);
  }
}

// Navigation Functions
function showLoginPage() {
  document.getElementById('loginPage').style.display = 'flex';
  document.getElementById('mainApp').style.display = 'none';
}

function showMainApp() {
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('mainApp').style.display = 'block';
  updateUserInterface();
  navigateToView('dashboard');
}

function updateUserInterface() {
  const userWelcome = document.getElementById('userWelcome');
  const roleKey = getCurrentUserRoleKey();
  userWelcome.innerHTML = `
    <span class="role-pill role-${roleKey}">${getRoleLabel(roleKey)}</span>
    <span>${currentUser.name} - ${currentUser.department}</span>
  `;
  document.body.dataset.role = roleKey;
  
  // Show/hide role-specific elements
  const adminElements = document.querySelectorAll('.admin-only');
  const hodElements = document.querySelectorAll('.hod-only');
  const professorElements = document.querySelectorAll('.professor-only');
  
  adminElements.forEach(element => {
    if (roleKey === 'admin') {
      element.classList.add('show');
    } else {
      element.classList.remove('show');
    }
  });
  
  hodElements.forEach(element => {
    if (roleKey === 'hod' || roleKey === 'admin') {
      element.classList.add('show');
    } else {
      element.classList.remove('show');
    }
  });
  
  professorElements.forEach(element => {
    if (roleKey === 'faculty') {
      element.classList.add('show');
    } else {
      element.classList.remove('show');
    }
  });
  
  updateDashboardSubtitle();
}

function updateDashboardSubtitle() {
  const subtitle = document.getElementById('dashboardSubtitle');
  const roleKey = getCurrentUserRoleKey();

  if (roleKey === 'admin') {
    subtitle.textContent = 'Complete engineering college management and system administration';
  } else if (roleKey === 'hod') {
    subtitle.textContent = 'Department oversight, faculty management, and academic planning';
  } else {
    subtitle.textContent = 'Student assessment, marks entry, and academic progress tracking';
  }
}

function navigateToView(viewName) {
  // Hide all views
  document.querySelectorAll('.view').forEach(view => {
    view.classList.remove('active');
  });
  
  // Show selected view
  const targetView = document.getElementById(viewName + 'View');
  if (targetView) {
    targetView.classList.add('active');
  }
  
  // Update navigation
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });
  
  const activeLink = document.querySelector(`[data-view="${viewName}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }
  
  currentView = viewName;
  
  // Load view-specific data
  switch (viewName) {
    case 'dashboard':
      loadDashboard();
      break;
    case 'academic':
      loadAcademicStructure();
      break;
    case 'subjects':
      loadSubjects();
      break;
    case 'students':
      loadStudents();
      break;
    case 'marks':
      loadMarksEntry();
      break;
    case 'reports':
      loadReports();
      break;
    case 'faculty':
      loadFacultyManagement();
      break;
    case 'audit':
      loadAuditLogs();
      break;
  }
}

// Dashboard Functions
function loadDashboard() {
  loadStatistics();
  loadRecentActivities();
  loadDashboardInsights();
}

function getStudentAnalytics() {
  const yearMap = getAcademicYearMap();
  const studentsWithCGPA = appData.students.map(student => {
    const cgpa = parseFloat(calculateCGPA(student.id));

    return {
      ...student,
      cgpa,
      yearName: yearMap.get(student.academicYear)?.name || 'Unknown'
    };
  });

  const assessedStudents = studentsWithCGPA.filter(student => student.cgpa > 0);
  const topPerformers = [...assessedStudents]
    .sort((left, right) => right.cgpa - left.cgpa)
    .slice(0, 5);
  const weakStudents = [...assessedStudents]
    .filter(student => student.cgpa < 6)
    .sort((left, right) => left.cgpa - right.cgpa)
    .slice(0, 5);
  const assessedStudentIds = new Set(appData.marks.map(mark => mark.studentId));

  return {
    assessedStudents,
    topPerformers,
    weakStudents,
    assessedStudentCount: assessedStudentIds.size
  };
}

function loadStatistics() {
  const statsGrid = document.getElementById('statsGrid');
  const { assessedStudents, assessedStudentCount } = getStudentAnalytics();
  
  // Calculate total subjects across all semesters
  const totalSubjects = appData.academicYears.reduce((total, year) => {
    return total + year.semesters.reduce((semTotal, sem) => semTotal + sem.subjects.length, 0);
  }, 0);
  
  // Calculate average CGPA
  const avgCGPA = assessedStudents.length > 0
    ? (assessedStudents.reduce((sum, student) => sum + student.cgpa, 0) / assessedStudents.length).toFixed(2)
    : '0.00';
  const coveragePercentage = appData.students.length > 0
    ? Math.round((assessedStudentCount / appData.students.length) * 100)
    : 0;
  
  const stats = [
    {
      icon: 'fas fa-users-cog',
      value: appData.students.length,
      label: 'Total Students',
      color: 'var(--color-bg-1)',
      iconColor: 'var(--color-primary)'
    },
    {
      icon: 'fas fa-calendar-alt',
      value: appData.academicYears.length,
      label: 'Academic Years',
      color: 'var(--color-bg-3)',
      iconColor: 'var(--color-success)'
    },
    {
      icon: 'fas fa-book-open',
      value: totalSubjects,
      label: 'Total Subjects',
      color: 'var(--color-bg-2)',
      iconColor: 'var(--color-warning)'
    },
    {
      icon: 'fas fa-chart-line',
      value: avgCGPA,
      label: 'Average CGPA',
      color: 'var(--color-bg-5)',
      iconColor: 'var(--color-info)'
    },
    {
      icon: 'fas fa-clipboard-check',
      value: appData.marks.length,
      label: 'Assessments',
      color: 'var(--color-bg-6)',
      iconColor: 'var(--color-warning)'
    },
    {
      icon: 'fas fa-chalkboard-teacher',
      value: appData.faculty.length,
      label: 'Faculty Members',
      color: 'var(--color-bg-7)',
      iconColor: 'var(--color-danger)'
    },
    {
      icon: 'fas fa-signal',
      value: `${coveragePercentage}%`,
      label: 'Data Coverage',
      color: 'var(--color-bg-8)',
      iconColor: 'var(--color-info)'
    }
  ];
  
  statsGrid.innerHTML = stats.map(stat => `
    <div class="stat-card">
      <div class="stat-icon" style="background-color: ${stat.color}; color: ${stat.iconColor};">
        <i class="${stat.icon}"></i>
      </div>
      <div class="stat-value">${stat.value}</div>
      <div class="stat-label">${stat.label}</div>
    </div>
  `).join('');
}

function loadRecentActivities() {
  const activitiesContainer = document.getElementById('recentActivities');
  const recentLogs = appData.auditLogs.slice(0, 5);

  if (recentLogs.length === 0) {
    activitiesContainer.innerHTML = `
      <div class="empty-state compact">
        <i class="fas fa-stream"></i>
        <p>No recent activities yet.</p>
      </div>
    `;
    return;
  }

  activitiesContainer.innerHTML = recentLogs.map(log => `
    <div class="activity-item">
      <div class="activity-text">${log.action}: ${log.details}</div>
      <div class="activity-time">${formatDate(log.timestamp)}</div>
    </div>
  `).join('');
}

function ensureDashboardInsightsSection() {
  const dashboardView = document.getElementById('dashboardView');
  let insightsSection = document.getElementById('dashboardInsights');

  if (!insightsSection) {
    insightsSection = document.createElement('section');
    insightsSection.id = 'dashboardInsights';
    insightsSection.className = 'dashboard-insights';
    dashboardView.appendChild(insightsSection);
  }

  return insightsSection;
}

function renderInsightStudentList(students, emptyMessage) {
  if (students.length === 0) {
    return `<div class="empty-state compact"><i class="fas fa-chart-line"></i><p>${emptyMessage}</p></div>`;
  }

  return students.map(student => `
    <div class="insight-row">
      <div>
        <div class="insight-name">${student.name}</div>
        <div class="insight-meta">${student.yearName} - PRN ${student.prn}</div>
      </div>
      <span class="metric-chip">${student.cgpa.toFixed(2)}</span>
    </div>
  `).join('');
}

function loadDashboardInsights() {
  const insightsSection = ensureDashboardInsightsSection();
  const roleKey = getCurrentUserRoleKey();
  const {
    assessedStudents,
    assessedStudentCount,
    topPerformers,
    weakStudents
  } = getStudentAnalytics();

  const yearBreakdown = appData.academicYears.map(year => {
    const students = appData.students.filter(student => student.academicYear === year.id);
    const assessed = students
      .map(student => parseFloat(calculateCGPA(student.id)))
      .filter(cgpa => cgpa > 0);
    const average = assessed.length
      ? (assessed.reduce((sum, value) => sum + value, 0) / assessed.length).toFixed(2)
      : '0.00';

    return {
      name: year.name,
      count: students.length,
      average
    };
  });

  const completionRatio = appData.students.length
    ? Math.round((assessedStudentCount / appData.students.length) * 100)
    : 0;

  insightsSection.innerHTML = `
    <article class="insight-card">
      <div class="insight-card-header">
        <div>
          <span class="eyebrow">Highlights</span>
          <h3>Top Performers</h3>
        </div>
        <span class="metric-chip success">${topPerformers.length} ranked</span>
      </div>
      <div class="insight-list">
        ${renderInsightStudentList(topPerformers, 'Marks are still being entered for this cohort.')}
      </div>
    </article>
    <article class="insight-card">
      <div class="insight-card-header">
        <div>
          <span class="eyebrow">Support Queue</span>
          <h3>Needs Attention</h3>
        </div>
        <span class="metric-chip warning">${weakStudents.length} flagged</span>
      </div>
      <div class="insight-list">
        ${renderInsightStudentList(weakStudents, 'No low-CGPA students in the current dataset.')}
      </div>
    </article>
    <article class="insight-card">
      <div class="insight-card-header">
        <div>
          <span class="eyebrow">Coverage</span>
          <h3>Academic Snapshot</h3>
        </div>
        <span class="metric-chip info">${completionRatio}% complete</span>
      </div>
      <div class="coverage-card">
        <div class="coverage-track">
          <span class="coverage-bar" style="width: ${completionRatio}%"></span>
        </div>
        <div class="coverage-meta">
          <span>${assessedStudentCount} of ${appData.students.length} students have recorded assessments</span>
          <span>${assessedStudents.length} active CGPAs</span>
        </div>
      </div>
      <div class="year-performance-list">
        ${yearBreakdown.map(year => `
          <div class="year-performance-row">
            <div>
              <strong>${year.name}</strong>
              <span>${year.count} students</span>
            </div>
            <span class="metric-chip">${year.average}</span>
          </div>
        `).join('')}
      </div>
      <div class="insight-footnote">
        ${roleKey === 'admin'
          ? 'Admin view shows overall coverage and delivery health across the department.'
          : roleKey === 'hod'
            ? 'HOD view highlights cohort-level performance and intervention opportunities.'
            : 'Faculty view focuses on completion status and students who may need follow-up.'}
      </div>
    </article>
  `;
}

// Academic Structure Management Functions
function loadAcademicStructure() {
  const yearCards = document.getElementById('yearCards');
  
  yearCards.innerHTML = appData.academicYears.map(year => `
    <div class="year-card">
      <div class="year-card-header">
        <h3 class="year-title">${year.name}</h3>
        <div class="student-count">${year.studentsCount} Students</div>
      </div>
      <div class="semesters-list">
        ${year.semesters.map(semester => `
          <div class="semester-item">
            <div class="semester-title">
              <i class="fas fa-calendar"></i> Semester ${semester.sem}
              <span style="float: right; font-size: var(--font-size-xs); color: var(--color-text-secondary);">
                ${semester.subjects.length} Subjects
              </span>
            </div>
            <div class="subjects-list">
              ${semester.subjects.map(subject => `
                <span class="subject-tag" title="${subject}">${subject}</span>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// Faculty Management Functions
function loadFacultyManagement() {
  const tbody = document.getElementById('facultyTableBody');
  
  tbody.innerHTML = appData.faculty.map(faculty => `
    <tr>
      <td>${faculty.name}</td>
      <td>${faculty.department}</td>
      <td>
        <div class="subjects-list">
          ${faculty.subjects.map(subject => `<span class="subject-tag">${subject}</span>`).join('')}
        </div>
      </td>
      <td>${faculty.email}</td>
      <td>
        <div class="action-buttons">
          <button class="action-btn edit" onclick="editFaculty('${faculty.id}')">
            <i class="fas fa-edit"></i> Edit
          </button>
          <button class="action-btn delete" onclick="deleteFaculty('${faculty.id}')">
            <i class="fas fa-trash"></i> Delete
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function loadClasses() {
  return [];
}

function showClassModal(classId = null) {
  const modal = document.getElementById('classModal');
  const form = document.getElementById('classForm');
  const title = document.getElementById('classModalTitle');
  
  if (classId) {
    const cls = appData.classes.find(c => c.id === classId);
    title.textContent = 'Edit Class';
    document.getElementById('className').value = cls.name;
    document.getElementById('classGrade').value = cls.grade;
    document.getElementById('classSection').value = cls.section;
    form.dataset.editId = classId;
  } else {
    title.textContent = 'Add Class';
    form.reset();
    delete form.dataset.editId;
  }
  
  modal.classList.add('show');
}

function editClass(classId) {
  showClassModal(classId);
}

async function deleteClass(classId) {
  if (confirm('Are you sure you want to delete this class?')) {
    const index = appData.classes.findIndex(c => c.id === classId);
    if (index > -1) {
      const className = appData.classes[index].name;
      try {
        await persistRequest('delete_class', { id: classId });
      } catch (error) {
        return;
      }
      appData.classes.splice(index, 1);
      addAuditLog('Deleted Class', className);
      showToast(`Class "${className}" deleted successfully`, 'success');
      loadClasses();
    }
  }
}

// Subjects Management Functions
function loadSubjects() {
  const tbody = document.getElementById('subjectsTableBody');

  tbody.innerHTML = appData.subjects.map(subject => `
    <tr>
      <td>${subject.name}</td>
      <td>${subject.code}</td>
      <td>
        <div class="action-buttons">
          <button class="action-btn edit" onclick="editSubject('${subject.id}')">
            <i class="fas fa-edit"></i> Edit
          </button>
          <button class="action-btn delete" onclick="deleteSubject('${subject.id}')">
            <i class="fas fa-trash"></i> Delete
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function showSubjectModal(subjectId = null) {
  const modal = document.getElementById('subjectModal');
  const form = document.getElementById('subjectForm');
  const title = document.getElementById('subjectModalTitle');
  
  if (subjectId) {
    const subject = appData.subjects.find(s => s.id === subjectId);
    title.textContent = 'Edit Subject';
    document.getElementById('subjectName').value = subject.name;
    document.getElementById('subjectCode').value = subject.code;
    form.dataset.editId = subjectId;
  } else {
    title.textContent = 'Add Subject';
    form.reset();
    delete form.dataset.editId;
  }
  
  modal.classList.add('show');
}

function editSubject(subjectId) {
  showSubjectModal(subjectId);
}

async function deleteSubject(subjectId) {
  if (confirm('Are you sure you want to delete this subject?')) {
    const index = appData.subjects.findIndex(s => s.id === subjectId);
    if (index > -1) {
      const subjectName = appData.subjects[index].name;
      try {
        await persistRequest('delete_subject', { id: subjectId });
      } catch (error) {
        return;
      }
      appData.subjects.splice(index, 1);
      addAuditLog('Deleted Subject', subjectName);
      showToast(`Subject "${subjectName}" deleted successfully`, 'success');
      loadSubjects();
    }
  }
}

// Students Management Functions
function ensureStudentsViewEnhancements() {
  const studentsView = document.getElementById('studentsView');
  const tableContainer = studentsView.querySelector('.data-table-container');
  let tableToolbar = document.getElementById('studentsTableToolbar');
  let tableFooter = document.getElementById('studentsTableFooter');
  let emptyState = document.getElementById('studentsEmptyState');

  if (!tableToolbar) {
    tableToolbar = document.createElement('div');
    tableToolbar.id = 'studentsTableToolbar';
    tableToolbar.className = 'table-toolbar';
    tableToolbar.innerHTML = `
      <div id="studentsSummary" class="table-summary"></div>
      <button type="button" id="clearStudentSearchBtn" class="btn btn--ghost btn--sm hidden">Clear search</button>
    `;
    tableContainer.insertAdjacentElement('beforebegin', tableToolbar);
  }

  if (!emptyState) {
    emptyState = document.createElement('div');
    emptyState.id = 'studentsEmptyState';
    emptyState.className = 'empty-state hidden';
    emptyState.innerHTML = `
      <i class="fas fa-user-graduate"></i>
      <h3>No students found</h3>
      <p>Try a different name, PRN, or email search.</p>
    `;
    tableContainer.insertAdjacentElement('afterend', emptyState);
  }

  if (!tableFooter) {
    tableFooter = document.createElement('div');
    tableFooter.id = 'studentsTableFooter';
    tableFooter.className = 'table-footer';
    tableFooter.innerHTML = `
      <span id="studentsRenderStatus" class="table-summary"></span>
      <button type="button" id="studentsLoadMoreBtn" class="btn btn--secondary btn--sm">Load More</button>
    `;
    emptyState.insertAdjacentElement('afterend', tableFooter);
  }

  const clearSearchBtn = document.getElementById('clearStudentSearchBtn');
  if (clearSearchBtn && !clearSearchBtn.dataset.bound) {
    clearSearchBtn.addEventListener('click', () => {
      const searchInput = document.getElementById('studentSearch');
      searchInput.value = '';
      appState.students.searchTerm = '';
      appState.students.visibleCount = appState.students.pageSize;
      loadStudents();
    });
    clearSearchBtn.dataset.bound = 'true';
  }

  const loadMoreBtn = document.getElementById('studentsLoadMoreBtn');
  if (loadMoreBtn && !loadMoreBtn.dataset.bound) {
    loadMoreBtn.addEventListener('click', () => {
      appState.students.visibleCount += appState.students.pageSize;
      loadStudents();
    });
    loadMoreBtn.dataset.bound = 'true';
  }
}

function buildStudentRowMarkup(student) {
  const academicYear = getAcademicYearMap().get(student.academicYear);
  const cgpa = calculateCGPA(student.id);
  const cgpaClass = getCGPAClass(parseFloat(cgpa));

  return `
    <tr>
      <td><span class="prn-number">${student.prn}</span></td>
      <td>${student.name}</td>
      <td><span class="year-badge ${getYearBadgeClass(student.academicYear)}">${academicYear ? academicYear.name : 'Unknown'}</span></td>
      <td>Semester ${student.currentSemester}</td>
      <td>${student.email}</td>
      <td><span class="cgpa-display ${cgpaClass}">${cgpa}</span></td>
      <td>
        <div class="action-buttons">
          <button class="action-btn edit" onclick="editStudent('${student.id}')">
            <i class="fas fa-edit"></i> Edit
          </button>
          <button class="action-btn delete" onclick="deleteStudent('${student.id}')">
            <i class="fas fa-trash"></i> Delete
          </button>
        </div>
      </td>
    </tr>
  `;
}

function updateStudentsViewMeta(totalCount, visibleCount, searchTerm) {
  const summary = document.getElementById('studentsSummary');
  const renderStatus = document.getElementById('studentsRenderStatus');
  const loadMoreBtn = document.getElementById('studentsLoadMoreBtn');
  const clearSearchBtn = document.getElementById('clearStudentSearchBtn');
  const emptyState = document.getElementById('studentsEmptyState');
  const tableContainer = document.querySelector('#studentsView .data-table-container');
  const hasSearch = Boolean(searchTerm);

  summary.textContent = hasSearch
    ? `${totalCount} matching students`
    : `${totalCount} total students`;

  renderStatus.textContent = totalCount === 0
    ? 'No rows to display'
    : `Showing ${Math.min(visibleCount, totalCount)} of ${totalCount}`;

  clearSearchBtn.classList.toggle('hidden', !hasSearch);
  loadMoreBtn.classList.toggle('hidden', visibleCount >= totalCount || totalCount === 0);
  emptyState.classList.toggle('hidden', totalCount !== 0);
  tableContainer.classList.toggle('hidden', totalCount === 0);
}

function loadStudents() {
  ensureStudentsViewEnhancements();

  const tbody = document.getElementById('studentsTableBody');
  const searchInput = document.getElementById('studentSearch');
  const searchTerm = searchInput ? normalizeText(searchInput.value) : '';

  let filteredStudents = [...appData.students];
  if (searchTerm) {
    filteredStudents = filteredStudents.filter(student => getStudentSearchIndex(student).includes(searchTerm));
  }

  filteredStudents.sort((left, right) => left.prn.localeCompare(right.prn));
  appState.students.searchTerm = searchTerm;
  appState.students.filteredRecords = filteredStudents;
  appState.students.visibleCount = Math.min(
    Math.max(appState.students.visibleCount, appState.students.pageSize),
    Math.max(filteredStudents.length, appState.students.pageSize)
  );

  const visibleStudents = filteredStudents.slice(0, appState.students.visibleCount);
  tbody.innerHTML = visibleStudents.map(buildStudentRowMarkup).join('');
  updateStudentsViewMeta(filteredStudents.length, visibleStudents.length, searchTerm);
}

function showStudentModal(studentId = null) {
  const modal = document.getElementById('studentModal');
  const form = document.getElementById('studentForm');
  const title = document.getElementById('studentModalTitle');
  const academicYearSelect = document.getElementById('studentAcademicYear');
  
  // Populate academic year dropdown
  academicYearSelect.innerHTML = '<option value="">Select academic year</option>' +
    appData.academicYears.map(year => `<option value="${year.id}">${year.name}</option>`).join('');
  
  if (studentId) {
    const student = appData.students.find(s => s.id === studentId);
    title.textContent = 'Edit Student';
    document.getElementById('studentName').value = student.name;
    document.getElementById('studentPRN').value = student.prn;
    document.getElementById('studentAcademicYear').value = student.academicYear;
    document.getElementById('studentSemester').value = student.currentSemester;
    document.getElementById('studentEmail').value = student.email;
    form.dataset.editId = studentId;
  } else {
    title.textContent = 'Add Student';
    form.reset();
    delete form.dataset.editId;
  }
  
  modal.classList.add('show');
}

function showFacultyModal(facultyId = null) {
  const modal = document.getElementById('facultyModal');
  const form = document.getElementById('facultyForm');
  const title = document.getElementById('facultyModalTitle');
  
  if (facultyId) {
    const faculty = appData.faculty.find(f => f.id === facultyId);
    title.textContent = 'Edit Faculty';
    document.getElementById('facultyName').value = faculty.name;
    document.getElementById('facultyDepartment').value = faculty.department;
    document.getElementById('facultyEmail').value = faculty.email;
    document.getElementById('facultySubjects').value = faculty.subjects.join(', ');
    form.dataset.editId = facultyId;
  } else {
    title.textContent = 'Add Faculty';
    form.reset();
    delete form.dataset.editId;
  }
  
  modal.classList.add('show');
}

function editStudent(studentId) {
  showStudentModal(studentId);
}

async function deleteStudent(studentId) {
  if (confirm('Are you sure you want to delete this student?')) {
    const index = appData.students.findIndex(s => s.id === studentId);
    if (index > -1) {
      const studentName = appData.students[index].name;
      try {
        await persistRequest('delete_student', { id: studentId });
      } catch (error) {
        return;
      }
      appData.students.splice(index, 1);
      appData.marks = appData.marks.filter(mark => mark.studentId !== studentId);
      refreshAcademicYearCounts();
      invalidateDerivedCaches();
      addAuditLog('Deleted Student', studentName);
      showToast(`Student "${studentName}" deleted successfully`, 'success');
      loadStudents();
      loadDashboard();
    }
  }
}

// Marks Entry Functions
function loadMarksEntry() {
  debugLog('🚀 Loading marks entry system...');
  
  try {
    // Reset everything first
    resetMarksEntry();
    
    // Then populate selectors
    populateMarksSelectors();
    
    // Verify dropdowns are working
    verifyDropdownElements();
    
    debugLog('✅ Marks entry loaded successfully');
    showToast('Marks entry ready! Select Academic Year to begin.', 'success');
  } catch (error) {
    console.error('❌ Error loading marks entry:', error);
    showToast('Error loading marks entry. Please refresh the page.', 'error');
  }
}

function populateMarksSelectors() {
  debugLog('🔄 Populating marks selectors...');
  
  const yearSelect = document.getElementById('marksYearSelect');
  const semesterSelect = document.getElementById('marksSemesterSelect');
  const subjectSelect = document.getElementById('marksSubjectSelect');
  const assessmentSelect = document.getElementById('marksAssessmentSelect');
  
  if (!yearSelect || !semesterSelect || !subjectSelect || !assessmentSelect) {
    console.error('❌ CRITICAL: Marks selector elements not found!');
    showToast('Error: Dropdown elements not found. Please refresh the page.', 'error');
    return;
  }
  
  debugLog('📝 Found all dropdown elements');
  
  // Populate academic years with error checking
  try {
    const yearOptions = '<option value="">Choose academic year</option>' +
      appData.academicYears.map(year => {
        debugLog(`Adding year option: ${year.name} (${year.id})`);
        return `<option value="${year.id}">${year.name}</option>`;
      }).join('');
    
    yearSelect.innerHTML = yearOptions;
    debugLog(`✅ Academic Year dropdown populated with ${appData.academicYears.length} options`);
  } catch (error) {
    console.error('❌ Error populating academic years:', error);
    showToast('Error loading academic years', 'error');
  }
  
  // Reset dependent dropdowns
  semesterSelect.innerHTML = '<option value="">Choose semester</option>';
  subjectSelect.innerHTML = '<option value="">Choose subject</option>';
  
  // Populate assessment types
  try {
    assessmentSelect.innerHTML = '<option value="">Choose assessment</option>' +
      appData.assessmentTypes.map(type => `<option value="${type.type}">${type.type} (${type.maxMarks} marks)</option>`).join('');
    debugLog(`✅ Assessment types populated with ${appData.assessmentTypes.length} options`);
  } catch (error) {
    console.error('❌ Error populating assessment types:', error);
  }
  
  debugLog('✅ All selectors populated successfully');
}

function resetMarksEntry() {
  debugLog('🔄 Resetting marks entry form...');
  
  const yearSelect = document.getElementById('marksYearSelect');
  const semesterSelect = document.getElementById('marksSemesterSelect');
  const subjectSelect = document.getElementById('marksSubjectSelect');
  const assessmentSelect = document.getElementById('marksAssessmentSelect');
  const marksTable = document.getElementById('marksEntryTable');
  const saveBtn = document.getElementById('saveMarksBtn');
  
  // Reset form state
  if (yearSelect) yearSelect.value = '';
  if (semesterSelect) {
    semesterSelect.innerHTML = '<option value="">Choose semester</option>';
    semesterSelect.disabled = true;
  }
  if (subjectSelect) {
    subjectSelect.innerHTML = '<option value="">Choose subject</option>';
    subjectSelect.disabled = true;
  }
  if (assessmentSelect) {
    assessmentSelect.disabled = true;
    assessmentSelect.value = '';
  }
  if (marksTable) marksTable.style.display = 'none';
  if (saveBtn) saveBtn.disabled = true;
  
  debugLog('✅ Form reset completed');
}

function verifyDropdownElements() {
  debugLog('🔍 Verifying dropdown elements...');
  
  const elements = {
    yearSelect: document.getElementById('marksYearSelect'),
    semesterSelect: document.getElementById('marksSemesterSelect'),
    subjectSelect: document.getElementById('marksSubjectSelect'),
    assessmentSelect: document.getElementById('marksAssessmentSelect')
  };
  
  Object.entries(elements).forEach(([name, element]) => {
    if (element) {
      debugLog(`✅ ${name} found: options = ${element.options.length}`);
    } else {
      console.error(`❌ ${name} NOT FOUND!`);
    }
  });
  
  return Object.values(elements).every(el => el !== null);
}

function onMarksYearChange() {
  debugLog('📅 Academic Year selection changed');
  
  const yearSelect = document.getElementById('marksYearSelect');
  const semesterSelect = document.getElementById('marksSemesterSelect');
  const subjectSelect = document.getElementById('marksSubjectSelect');
  const assessmentSelect = document.getElementById('marksAssessmentSelect');
  const marksTable = document.getElementById('marksEntryTable');
  
  if (!yearSelect) {
    console.error('❌ Year select element not found!');
    return;
  }
  
  const yearId = yearSelect.value;
  debugLog(`Selected year ID: "${yearId}"`);
  
  if (yearId && yearId.trim() !== '') {
    try {
      const year = appData.academicYears.find(y => y.id === yearId);
      debugLog('Found year object:', year);
      
      if (year && year.semesters) {
        // Build semester options
        const semesterOptions = '<option value="">Choose semester</option>' +
          year.semesters.map(sem => {
            debugLog(`Adding semester option: Semester ${sem.sem}`);
            return `<option value="${sem.sem}">Semester ${sem.sem}</option>`;
          }).join('');
        
        semesterSelect.innerHTML = semesterOptions;
        semesterSelect.disabled = false;
        
        debugLog(`✅ Loaded ${year.semesters.length} semesters for ${year.name}`);
        showToast(`✅ Selected ${year.name}. Now select a semester.`, 'success');
        
        // Reset dependent dropdowns
        subjectSelect.innerHTML = '<option value="">Choose subject</option>';
        subjectSelect.disabled = true;
        assessmentSelect.disabled = true;
        if (marksTable) marksTable.style.display = 'none';
        
      } else {
        console.error('❌ Year not found or has no semesters:', yearId);
        showToast('Error: Academic year data not found', 'error');
      }
    } catch (error) {
      console.error('❌ Error in onMarksYearChange:', error);
      showToast('Error loading semester data', 'error');
    }
  } else {
    debugLog('⚠️ No year selected, resetting dependent dropdowns');
    
    // Reset all dependent dropdowns
    semesterSelect.innerHTML = '<option value="">Choose semester</option>';
    semesterSelect.disabled = true;
    subjectSelect.innerHTML = '<option value="">Choose subject</option>';
    subjectSelect.disabled = true;
    assessmentSelect.disabled = true;
    if (marksTable) marksTable.style.display = 'none';
  }
}

function onMarksSemesterChange() {
  debugLog('📚 Semester selection changed');
  
  const yearId = document.getElementById('marksYearSelect').value;
  const semesterId = document.getElementById('marksSemesterSelect').value;
  const subjectSelect = document.getElementById('marksSubjectSelect');
  const assessmentSelect = document.getElementById('marksAssessmentSelect');
  const marksTable = document.getElementById('marksEntryTable');
  
  debugLog(`Year: "${yearId}", Semester: "${semesterId}"`);
  
  if (yearId && semesterId && yearId.trim() !== '' && semesterId.trim() !== '') {
    try {
      const year = appData.academicYears.find(y => y.id === yearId);
      
      if (!year) {
        console.error('❌ Year not found:', yearId);
        showToast('Error: Academic year not found', 'error');
        return;
      }
      
      const semester = year.semesters.find(s => s.sem == parseInt(semesterId));
      debugLog('Found semester object:', semester);
      
      if (semester && semester.subjects) {
        const subjectOptions = '<option value="">Choose subject</option>' +
          semester.subjects.map(subject => {
            debugLog(`Adding subject option: ${subject}`);
            return `<option value="${subject}">${subject}</option>`;
          }).join('');
        
        subjectSelect.innerHTML = subjectOptions;
        subjectSelect.disabled = false;
        assessmentSelect.disabled = false;
        
        debugLog(`✅ Loaded ${semester.subjects.length} subjects for Semester ${semesterId}`);
        showToast(`✅ Selected Semester ${semesterId}. Now select a subject.`, 'success');
        
        // Hide marks table until subject is selected
        if (marksTable) marksTable.style.display = 'none';
        
      } else {
        console.error('❌ Semester not found or has no subjects:', semesterId);
        showToast('Error: Semester data not found', 'error');
      }
    } catch (error) {
      console.error('❌ Error in onMarksSemesterChange:', error);
      showToast('Error loading subject data', 'error');
    }
  } else {
    debugLog('⚠️ Incomplete selection, disabling subject dropdown');
    subjectSelect.innerHTML = '<option value="">Choose subject</option>';
    subjectSelect.disabled = true;
    assessmentSelect.disabled = true;
    if (marksTable) marksTable.style.display = 'none';
  }
}

function onMarksSubjectChange() {
  debugLog('📖 Subject selection changed');
  
  const subject = document.getElementById('marksSubjectSelect').value;
  const assessmentSelect = document.getElementById('marksAssessmentSelect');
  const marksTable = document.getElementById('marksEntryTable');
  
  debugLog(`Selected subject: "${subject}"`);
  
  if (subject && subject.trim() !== '') {
    try {
      assessmentSelect.disabled = false;
      debugLog(`✅ Subject "${subject}" selected - assessment dropdown enabled`);
      showToast(`✅ Selected ${subject}. Now select assessment type.`, 'success');
      
      // Hide marks table until assessment is selected
      if (marksTable) marksTable.style.display = 'none';
      
    } catch (error) {
      console.error('❌ Error in onMarksSubjectChange:', error);
      showToast('Error processing subject selection', 'error');
    }
  } else {
    debugLog('⚠️ No subject selected, disabling assessment dropdown');
    assessmentSelect.disabled = true;
    assessmentSelect.value = '';
    if (marksTable) marksTable.style.display = 'none';
  }
}

function onMarksAssessmentChange() {
  debugLog('📝 Assessment selection changed');
  
  const yearId = document.getElementById('marksYearSelect').value;
  const semesterId = document.getElementById('marksSemesterSelect').value;
  const subject = document.getElementById('marksSubjectSelect').value;
  const assessment = document.getElementById('marksAssessmentSelect').value;
  
  debugLog('Current selections:', { yearId, semesterId, subject, assessment });
  
  if (yearId && semesterId && subject && assessment && 
      yearId.trim() !== '' && semesterId.trim() !== '' && 
      subject.trim() !== '' && assessment.trim() !== '') {
    
    debugLog('✅ All fields selected - loading student marks table...');
    showToast('🔄 Loading student list for marks entry...', 'info');
    
    try {
      loadMarksTable(yearId, semesterId, subject, assessment);
    } catch (error) {
      console.error('❌ Error loading marks table:', error);
      showToast('Error loading student list', 'error');
    }
  } else {
    debugLog('⚠️ Not all fields selected yet - hiding marks table');
    const marksTable = document.getElementById('marksEntryTable');
    if (marksTable) marksTable.style.display = 'none';
  }
}

function loadMarksTable(yearId, semesterId, subject, assessment) {
  debugLog('📊 Loading marks table for:', { yearId, semesterId, subject, assessment });
  
  const yearStudents = getStudentsByAcademicYear(yearId);
  debugLog(`✅ Found ${yearStudents.length} students for ${yearId}`);
  
  if (yearStudents.length === 0) {
    console.error('❌ No students found for selected academic year:', yearId);
    showToast('❌ No students found for selected academic year', 'error');
    return;
  }
  
  const expectedCounts = {
    'first_year': 40,
    'second_year': 40,
    'third_year': 47,
    'fourth_year': 40
  };
  
  const expectedCount = expectedCounts[yearId];
  if (yearStudents.length !== expectedCount) {
    console.warn(`⚠️ Student count mismatch: expected ${expectedCount}, got ${yearStudents.length}`);
  }
  
  const tbody = document.getElementById('marksEntryTableBody');
  const assessmentInfo = appData.assessmentTypes.find(a => a.type === assessment);
  const maxMarks = assessmentInfo ? assessmentInfo.maxMarks : 100;
  const existingMarksMap = new Map(
    appData.marks
      .filter(mark =>
        mark.subject === subject &&
        mark.assessmentType === assessment &&
        mark.semester == semesterId
      )
      .map(mark => [mark.studentId, mark])
  );
  
  tbody.innerHTML = yearStudents.map(student => {
    const existingMarks = existingMarksMap.get(student.id);
    
    const marks = existingMarks ? existingMarks.marks : '';
    const totalMarks = marks ? (marks * 100 / maxMarks) : 0; // Convert to percentage for grading
    const grade = marks ? calculateGrade(totalMarks) : '';
    const gradeClass = grade ? getGradeClass(grade) : '';
    const cgpa = calculateCGPA(student.id);
    
    return `
      <tr>
        <td><span class="prn-number">${student.prn}</span></td>
        <td>${student.name}</td>
        <td>
          <input type="number" 
                 class="marks-input" 
                 data-student-id="${student.id}"
                 value="${marks}"
                 min="0" 
                 max="${maxMarks}" 
                 placeholder="0-${maxMarks}">
          <div class="assessment-info">
            <span class="max-marks">Max: ${maxMarks}</span>
          </div>
        </td>
        <td>
          <span class="grade-display ${gradeClass}" data-student-id="${student.id}">
            ${grade}
          </span>
        </td>
        <td>
          <span class="cgpa-display ${getCGPAClass(parseFloat(cgpa))}">
            ${cgpa}
          </span>
        </td>
      </tr>
    `;
  }).join('');
  
  document.getElementById('marksEntryTable').style.display = 'block';
  document.getElementById('saveMarksBtn').disabled = false;
  
  showToast(`Loaded ${yearStudents.length} students for marks entry. Enter marks and click Save.`, 'success');
  console.log('Marks table loaded successfully');
  
  // Add event listeners for marks inputs
  document.querySelectorAll('.marks-input').forEach(input => {
    input.addEventListener('input', updateGrade);
  });
}

function updateGrade(event) {
  const input = event.target;
  const studentId = input.dataset.studentId;
  const marks = input.value.trim() === '' ? 0 : parseFloat(input.value) || 0;
  const maxMarks = parseInt(input.max) || 100;
  
  // Reset border color
  input.style.borderColor = '';
  
  // Validate marks
  if (marks > maxMarks) {
    input.style.borderColor = 'var(--color-error)';
    showToast(`Marks cannot exceed ${maxMarks}`, 'warning');
    return;
  }
  
  if (marks < 0) {
    input.style.borderColor = 'var(--color-error)';
    showToast('Marks cannot be negative', 'warning');
    return;
  }
  
  const percentage = marks > 0 ? (marks * 100) / maxMarks : 0;
  const grade = marks > 0 ? calculateGrade(percentage) : '';
  const gradeClass = grade ? getGradeClass(grade) : '';
  
  const gradeDisplay = document.querySelector(`.grade-display[data-student-id="${studentId}"]`);
  if (gradeDisplay) {
    gradeDisplay.textContent = grade;
    gradeDisplay.className = `grade-display ${gradeClass}`;
  }
  
  console.log(`Updated grade for student ${studentId}: ${marks}/${maxMarks} = ${grade}`);
}

async function saveMarks() {
  console.log('Saving marks...');
  const yearId = document.getElementById('marksYearSelect').value;
  const semesterId = document.getElementById('marksSemesterSelect').value;
  const subject = document.getElementById('marksSubjectSelect').value;
  const assessment = document.getElementById('marksAssessmentSelect').value;
  
  console.log('Save parameters:', { yearId, semesterId, subject, assessment });
  
  if (!yearId || !semesterId || !subject || !assessment) {
    showToast('Please select all fields before saving marks', 'error');
    return;
  }
  
  const inputs = document.querySelectorAll('.marks-input');
  const assessmentInfo = appData.assessmentTypes.find(a => a.type === assessment);
  const maxMarks = assessmentInfo ? assessmentInfo.maxMarks : 100;
  let savedCount = 0;
  let validationErrors = 0;
  const updatedStudentIds = new Set();
  const entriesToPersist = [];
  
  console.log('Processing', inputs.length, 'mark entries...');
  
  inputs.forEach((input, index) => {
    const studentId = input.dataset.studentId;
    const marks = input.value.trim() === '' ? null : parseFloat(input.value);
    
    console.log(`Processing student ${index + 1}:`, { studentId, marks, maxMarks });
    
    if (marks !== null) {
      if (marks >= 0 && marks <= maxMarks) {
        entriesToPersist.push({
          studentId,
          marks,
          maxMarks,
          entryDate: new Date().toISOString()
        });
        updatedStudentIds.add(studentId);
        savedCount++;
        console.log(`Saved marks for student ${studentId}: ${marks}/${maxMarks}`);
      } else {
        validationErrors++;
        input.style.borderColor = 'var(--color-error)';
        console.log(`Validation error for student ${studentId}: marks ${marks} outside range 0-${maxMarks}`);
      }
    }
  });
  
  const yearName = appData.academicYears.find(y => y.id === yearId)?.name;
  
  if (savedCount > 0) {
    try {
      await persistRequest('save_marks_batch', {
        yearId,
        semesterId: parseInt(semesterId),
        subject,
        assessment,
        maxMarks,
        entries: entriesToPersist
      });
    } catch (error) {
      return;
    }

    entriesToPersist.forEach(entry => {
      appData.marks = appData.marks.filter(m => 
        !(m.studentId === entry.studentId && m.subject === subject && m.assessmentType === assessment && m.semester == semesterId)
      );

      appData.marks.push({
        studentId: entry.studentId,
        subject,
        assessmentType: assessment,
        marks: entry.marks,
        maxMarks: entry.maxMarks,
        semester: parseInt(semesterId),
        entryDate: entry.entryDate
      });
    });

    invalidateDerivedCaches();
    addAuditLog('Entered Marks', `${subject} - ${assessment} for ${yearName} Semester ${semesterId} (${savedCount} students)`);
    showToast(`Successfully saved marks for ${savedCount} students.`, 'success');
    console.log(`Marks saved successfully for ${savedCount} students`);
  }
  
  if (validationErrors > 0) {
    showToast(`${validationErrors} entries had invalid marks (must be 0-${maxMarks})`, 'warning');
    console.log(`${validationErrors} validation errors found`);
  }
  
  if (savedCount === 0 && validationErrors === 0) {
    showToast('No marks entered. Please enter marks before saving.', 'info');
  }
  
  // Refresh CGPA displays
  setTimeout(() => {
    document.querySelectorAll('.cgpa-display').forEach(display => {
      const studentId = display.closest('tr').querySelector('.marks-input')?.dataset.studentId;
      if (studentId && updatedStudentIds.has(studentId)) {
        const newCGPA = calculateCGPA(studentId);
        display.textContent = newCGPA;
        display.className = `cgpa-display ${getCGPAClass(parseFloat(newCGPA))}`;
      }
    });
  }, 100);
}

// Reports Functions
function loadReports() {
  populateReportFilters();
}

function populateStudentDropdown() {
  const studentSelect = document.getElementById('reportStudent');
  const yearId = document.getElementById('reportClass').value;
  
  let students = [...appData.students];
  if (yearId) {
    students = students.filter(s => s.academicYear === yearId);
  }

  students.sort((left, right) => left.name.localeCompare(right.name));
  
  studentSelect.innerHTML = '<option value="">Choose student</option>' +
    students.map(student => `<option value="${student.id}">${student.name} (${student.prn})</option>`).join('');
}

function populateReportFilters() {
  console.log('Populating report filters...');
  const yearSelect = document.getElementById('reportClass');
  const subjectSelect = document.getElementById('reportSubject');
  
  // Populate academic years in the class selector
  if (yearSelect) {
    yearSelect.innerHTML = '<option value="">All Academic Years</option>' +
      appData.academicYears.map(year => `<option value="${year.id}">${year.name}</option>`).join('');
  }
  
  // Get all unique subjects from all semesters
  if (subjectSelect) {
    const allSubjects = new Set();
    appData.academicYears.forEach(year => {
      year.semesters.forEach(semester => {
        semester.subjects.forEach(subject => allSubjects.add(subject));
      });
    });
    
    subjectSelect.innerHTML = '<option value="">All Subjects</option>' +
      Array.from(allSubjects).sort().map(subject => `<option value="${subject}">${subject}</option>`).join('');
  }
  
  // Add change handler for year selection to update student dropdown
  if (yearSelect) {
    yearSelect.addEventListener('change', function() {
      if (document.getElementById('reportType').value === 'student-report') {
        populateStudentDropdown();
      }
    });
  }
  
  console.log('Report filters populated successfully');
}

function previewReport() {
  console.log('Generating report preview...');
  const reportType = document.getElementById('reportType').value;
  const yearId = document.getElementById('reportClass').value; // This is actually year ID
  const subjectId = document.getElementById('reportSubject').value;
  
  const preview = document.getElementById('reportPreview');
  
  if (!reportType) {
    showToast('Please select a report type', 'warning');
    return;
  }
  
  let reportContent = '<h3>📊 Report Preview</h3>';
  
  switch (reportType) {
    case 'class-report':
      reportContent += generateClassReport(yearId, subjectId);
      break;
    case 'student-report':
      reportContent += generateStudentReport(yearId, subjectId);
      break;
    case 'marks-summary':
      reportContent += generateMarksSummary(yearId, subjectId);
      break;
    default:
      reportContent += '<p>Please select a valid report type.</p>';
  }
  
  preview.innerHTML = reportContent;
  preview.classList.add('show');
  
  showToast('Report preview generated successfully', 'success');
  console.log('Report preview generated');
}

function generateClassReport(classId, subjectId) {
  let content = '<h4>Class Performance Report</h4>';
  
  const classes = classId ? [appData.classes.find(c => c.id === classId)] : appData.classes;
  
  classes.forEach(cls => {
    if (!cls) return;
    
    const classStudents = appData.students.filter(s => s.classId === cls.id);
    const classMarks = appData.marks.filter(m => 
      classStudents.some(s => s.id === m.studentId) &&
      (!subjectId || m.subjectId === subjectId)
    );
    
    if (classMarks.length > 0) {
      const avgMarks = classMarks.reduce((sum, m) => sum + m.marks, 0) / classMarks.length;
      
      content += `
        <div style="margin-bottom: 20px; padding: 15px; border: 1px solid var(--color-border); border-radius: 8px;">
          <h5>${cls.name}</h5>
          <p>Total Students: ${classStudents.length}</p>
          <p>Average Marks: ${avgMarks.toFixed(2)}</p>
          <p>Total Entries: ${classMarks.length}</p>
        </div>
      `;
    }
  });
  
  return content;
}

function generateStudentReport(classId, subjectId) {
  let content = '<h4>Individual Student Report</h4>';
  
  const students = classId ? 
    appData.students.filter(s => s.classId === classId) : 
    appData.students;
  
  students.forEach(student => {
    const studentMarks = appData.marks.filter(m => 
      m.studentId === student.id &&
      (!subjectId || m.subjectId === subjectId)
    );
    
    if (studentMarks.length > 0) {
      const avgMarks = studentMarks.reduce((sum, m) => sum + m.marks, 0) / studentMarks.length;
      
      content += `
        <div style="margin-bottom: 15px; padding: 10px; border-left: 3px solid var(--color-primary);">
          <strong>${student.name}</strong> (${student.rollNumber})<br>
          Average: ${avgMarks.toFixed(2)} | Entries: ${studentMarks.length}
        </div>
      `;
    }
  });
  
  return content;
}

function generateMarksSummary(classId, subjectId) {
  let content = '<h4>Marks Summary</h4>';
  
  const filteredMarks = appData.marks.filter(m => {
    const student = appData.students.find(s => s.id === m.studentId);
    return (!classId || student?.classId === classId) &&
           (!subjectId || m.subjectId === subjectId);
  });
  
  if (filteredMarks.length === 0) {
    return content + '<p>No marks data available for the selected filters.</p>';
  }
  
  const totalMarks = filteredMarks.reduce((sum, m) => sum + m.marks, 0);
  const avgMarks = totalMarks / filteredMarks.length;
  const maxMarks = Math.max(...filteredMarks.map(m => m.marks));
  const minMarks = Math.min(...filteredMarks.map(m => m.marks));
  
  // Grade distribution
  const gradeDistribution = {
    'A': filteredMarks.filter(m => m.marks >= 90).length,
    'B': filteredMarks.filter(m => m.marks >= 80 && m.marks < 90).length,
    'C': filteredMarks.filter(m => m.marks >= 70 && m.marks < 80).length,
    'D': filteredMarks.filter(m => m.marks >= 60 && m.marks < 70).length,
    'F': filteredMarks.filter(m => m.marks < 60).length
  };
  
  content += `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px;">
      <div style="padding: 10px; background: var(--color-bg-1); border-radius: 6px;">
        <strong>Total Entries:</strong> ${filteredMarks.length}
      </div>
      <div style="padding: 10px; background: var(--color-bg-3); border-radius: 6px;">
        <strong>Average:</strong> ${avgMarks.toFixed(2)}
      </div>
      <div style="padding: 10px; background: var(--color-bg-2); border-radius: 6px;">
        <strong>Highest:</strong> ${maxMarks}
      </div>
      <div style="padding: 10px; background: var(--color-bg-4); border-radius: 6px;">
        <strong>Lowest:</strong> ${minMarks}
      </div>
    </div>
    
    <h5>Grade Distribution:</h5>
    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
      ${Object.entries(gradeDistribution).map(([grade, count]) => `
        <span style="padding: 5px 10px; background: var(--color-bg-${grade === 'A' ? '3' : grade === 'B' ? '1' : grade === 'C' ? '2' : grade === 'D' ? '6' : '4'}); border-radius: 4px;">
          Grade ${grade}: ${count}
        </span>
      `).join('')}
    </div>
  `;
  
  return content;
}

function exportPDF() {
  console.log('PDF export requested...');
  const reportType = document.getElementById('reportType').value;
  const yearId = document.getElementById('reportClass').value;
  const subjectId = document.getElementById('reportSubject').value;
  const studentId = document.getElementById('reportStudent').value;
  
  if (!reportType) {
    showToast('Please select a report type before exporting PDF', 'warning');
    return;
  }
  
  if (reportType === 'student-report' && !studentId) {
    showToast('Please select a student for individual report', 'warning');
    return;
  }
  
  showToast('📄 Generating PDF report...', 'info');
  
  // Generate actual PDF using jsPDF
  generateActualPDF(reportType, yearId, subjectId, studentId);
}

function generateActualPDF(reportType, yearId, subjectId, studentId) {
  try {
    // Initialize jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Set up fonts and colors
    doc.setFont('helvetica');
    
    let fileName = '';
    
    switch (reportType) {
      case 'student-report':
        fileName = generateStudentMarksheetPDF(doc, studentId);
        break;
      case 'class-report':
        fileName = generateClassPerformancePDF(doc, yearId, subjectId);
        break;
      case 'subject-analysis':
        fileName = generateSubjectAnalysisPDF(doc, yearId, subjectId);
        break;
      case 'chatbot-insights':
        fileName = generateChatbotInsightsPDF(doc);
        break;
      case 'semester-results':
        fileName = generateSemesterResultsPDF(doc, yearId);
        break;
      default:
        fileName = generateMarksSummaryPDF(doc, yearId, subjectId);
    }
    
    // Save the PDF
    doc.save(fileName);
    
    const yearName = yearId ? appData.academicYears.find(y => y.id === yearId)?.name : 'All Years';
    const subjectName = subjectId || 'All Subjects';
    addAuditLog('Exported PDF Report', `${reportType} - ${yearName}, ${subjectName}`);
    showToast('✅ PDF report generated successfully and downloaded!', 'success');
    
    return fileName;
  } catch (error) {
    console.error('PDF generation error:', error);
    showToast('❌ Error generating PDF. Please try again.', 'error');
  }
}

// PDF Generation Helper Functions
function addCollegeHeader(doc) {
  // College header
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('L S P G College of Engineering & Research', 105, 25, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Computer Engineering Department', 105, 35, { align: 'center' });
  
  // Draw line under header
  doc.line(20, 40, 190, 40);
  
  return 45; // Return next Y position
}

function addPDFFooter(doc, pageHeight) {
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.text(`Generated on ${formatDate(new Date())} by ${currentUser.name}`, 105, pageHeight - 15, { align: 'center' });
  doc.text('L S P G College of Engineering & Research', 105, pageHeight - 10, { align: 'center' });
}

function generateStudentMarksheetPDF(doc, studentId) {
  const student = appData.students.find(s => s.id === studentId);
  if (!student) {
    showToast('Student not found', 'error');
    return;
  }
  
  let yPos = addCollegeHeader(doc);
  
  // Title
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Academic Performance Report', 105, yPos + 10, { align: 'center' });
  yPos += 25;
  
  // Student Information
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Student Information:', 20, yPos);
  yPos += 10;
  
  doc.setFont('helvetica', 'normal');
  const academicYear = appData.academicYears.find(y => y.id === student.academicYear);
  
  doc.text(`Name: ${student.name}`, 20, yPos);
  doc.text(`PRN: ${student.prn}`, 120, yPos);
  yPos += 8;
  
  doc.text(`Academic Year: ${academicYear?.name || 'N/A'}`, 20, yPos);
  doc.text(`Current Semester: ${student.currentSemester}`, 120, yPos);
  yPos += 8;
  
  doc.text(`Email: ${student.email}`, 20, yPos);
  const cgpa = calculateCGPA(student.id);
  doc.text(`CGPA: ${cgpa}`, 120, yPos);
  yPos += 15;
  
  // Marks Table
  doc.setFont('helvetica', 'bold');
  doc.text('Marks Breakdown:', 20, yPos);
  yPos += 10;
  
  // Table headers
  doc.setFontSize(10);
  doc.rect(20, yPos, 170, 8); // Table header background
  doc.setFillColor(240, 240, 240);
  doc.rect(20, yPos, 170, 8, 'F');
  
  doc.setTextColor(0, 0, 0);
  doc.text('Subject', 22, yPos + 5);
  doc.text('Internal', 85, yPos + 5);
  doc.text('Mid-Sem', 110, yPos + 5);
  doc.text('End-Sem', 135, yPos + 5);
  doc.text('Total', 160, yPos + 5);
  doc.text('Grade', 175, yPos + 5);
  yPos += 8;
  
  // Get student marks grouped by subject
  const studentMarks = appData.marks.filter(m => m.studentId === student.id);
  const subjectGroups = {};
  
  studentMarks.forEach(mark => {
    if (!subjectGroups[mark.subject]) {
      subjectGroups[mark.subject] = {};
    }
    subjectGroups[mark.subject][mark.assessmentType] = mark;
  });
  
  // Add marks data
  doc.setFont('helvetica', 'normal');
  Object.entries(subjectGroups).forEach(([subject, assessments]) => {
    const internal = assessments['Internal Assessment'];
    const midSem = assessments['Mid-Semester'];
    const endSem = assessments['End-Semester'];
    
    let total = 0;
    let internalMarks = internal ? internal.marks : '-';
    let midMarks = midSem ? midSem.marks : '-';
    let endMarks = endSem ? endSem.marks : '-';
    
    if (internal) total += internal.marks;
    if (midSem) total += midSem.marks;
    if (endSem) total += endSem.marks;
    
    const percentage = total > 0 ? (total / 100) * 100 : 0;
    const grade = total > 0 ? calculateGrade(percentage) : '-';
    
    // Draw table row
    doc.rect(20, yPos, 170, 8);
    doc.text(subject.length > 25 ? subject.substring(0, 25) + '...' : subject, 22, yPos + 5);
    doc.text(internalMarks.toString(), 87, yPos + 5);
    doc.text(midMarks.toString(), 115, yPos + 5);
    doc.text(endMarks.toString(), 140, yPos + 5);
    doc.text(total.toString(), 162, yPos + 5);
    doc.text(grade, 177, yPos + 5);
    yPos += 8;
    
    // Check for new page
    if (yPos > 250) {
      doc.addPage();
      yPos = addCollegeHeader(doc);
      yPos += 10;
    }
  });
  
  // CGPA Summary
  yPos += 10;
  doc.setFont('helvetica', 'bold');
  doc.text('Performance Summary:', 20, yPos);
  yPos += 10;
  
  doc.setFont('helvetica', 'normal');
  doc.text(`Current CGPA: ${cgpa}`, 20, yPos);
  yPos += 6;
  
  const performanceLevel = parseFloat(cgpa) >= 8.5 ? 'Excellent' : 
                          parseFloat(cgpa) >= 7.0 ? 'Good' : 
                          parseFloat(cgpa) >= 6.0 ? 'Average' : 'Needs Improvement';
  
  doc.text(`Performance Level: ${performanceLevel}`, 20, yPos);
  yPos += 6;
  
  doc.text(`Total Subjects Assessed: ${Object.keys(subjectGroups).length}`, 20, yPos);
  
  // Add footer
  addPDFFooter(doc, 297);
  
  return `${student.name}_${student.prn}_Marksheet.pdf`;
}

function getReportContent(reportType, yearId, subjectId) {
  switch (reportType) {
    case 'class-report':
      return generateDetailedClassReport(yearId, subjectId);
    case 'student-report':
      return generateDetailedStudentReport(yearId, subjectId);
    case 'marks-summary':
      return generateDetailedMarksSummary(yearId, subjectId);
    default:
      return '<p>Report content not available.</p>';
  }
}

function exportCSV() {
  console.log('Exporting CSV report...');
  const reportType = document.getElementById('reportType').value;
  const yearId = document.getElementById('reportClass').value; // This is actually year ID
  const subjectId = document.getElementById('reportSubject').value;
  
  if (!reportType) {
    showToast('Please select a report type before exporting', 'warning');
    return;
  }
  
  let csvData = [];
  
  try {
    // Generate CSV data based on report type
    switch (reportType) {
      case 'marks-summary':
        csvData = generateCSVMarksSummary(yearId, subjectId);
        break;
      case 'student-report':
      case 'class-report':
      default:
        csvData = generateCSVMarksSummary(yearId, subjectId);
    }
    
    if (csvData.length <= 1) {
      showToast('No data available for export with current filters', 'warning');
      return;
    }
    
    // Create and download CSV file
    const csvContent = csvData.map(row => 
      row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
    ).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `engineering-college-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showToast('✅ CSV report exported successfully!', 'success');
    addAuditLog('Exported Report', `CSV export completed - ${reportType} with ${csvData.length - 1} records`);
    console.log('CSV export completed successfully');
  } catch (error) {
    console.error('CSV export error:', error);
    showToast('Error exporting CSV. Please try again.', 'error');
  }
}

function generateCSVMarksSummary(classId, subjectId) {
  const headers = ['Student Name', 'Roll Number', 'Class', 'Subject', 'Exam Type', 'Marks', 'Grade'];
  const csvData = [headers];
  
  const filteredMarks = appData.marks.filter(m => {
    const student = appData.students.find(s => s.id === m.studentId);
    return (!classId || student?.classId === classId) &&
           (!subjectId || m.subjectId === subjectId);
  });
  
  filteredMarks.forEach(mark => {
    const student = appData.students.find(s => s.id === mark.studentId);
    const subject = appData.subjects.find(s => s.id === mark.subjectId);
    const studentClass = appData.classes.find(c => c.id === student?.classId);
    
    if (student && subject && studentClass) {
      csvData.push([
        student.name,
        student.rollNumber,
        studentClass.name,
        subject.name,
        mark.examType,
        mark.marks,
        calculateGrade(mark.marks)
      ]);
    }
  });
  
  return csvData;
}

// Audit Logs Functions
function loadAuditLogs() {
  const tbody = document.getElementById('auditTableBody');
  
  tbody.innerHTML = appData.auditLogs.map(log => `
    <tr>
      <td>${formatDate(log.timestamp)}</td>
      <td>${log.user}</td>
      <td>${log.action}</td>
      <td>${log.details}</td>
    </tr>
  `).join('');
}

// Chatbot Functions
let chatHistory = [];

function toggleChatbot() {
  const chatWindow = document.getElementById('chatWindow');
  chatWindow.classList.toggle('show');
}

function closeChatbot() {
  const chatWindow = document.getElementById('chatWindow');
  chatWindow.classList.remove('show');
}

function sendChatMessage(message = null) {
  const input = document.getElementById('chatInputField');
  const messageText = message || input.value.trim();
  
  if (!messageText) return;
  
  // Add user message to chat
  addChatMessage(messageText, 'user');
  
  // Generate AI response
  setTimeout(() => {
    const response = generateChatbotResponse(messageText);
    addChatMessage(response, 'bot');
    
    // Add export button for performance analysis
    if (messageText.toLowerCase().includes('performance') || messageText.toLowerCase().includes('analysis')) {
      addChatExportButton();
    }
  }, 500);
  
  input.value = '';
  chatHistory.push({ type: 'user', message: messageText, timestamp: new Date() });
}

function addChatExportButton() {
  const messagesContainer = document.getElementById('chatMessages');
  const exportDiv = document.createElement('div');
  exportDiv.className = 'message bot-message';
  exportDiv.innerHTML = `
    <p>๐ Want to export this analysis?</p>
    <button class="btn btn--primary btn--sm" onclick="exportChatAnalysis()" style="margin-top: 8px;">
      <i class="fas fa-download"></i> Export Analysis as PDF
    </button>
  `;
  messagesContainer.appendChild(exportDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function exportChatAnalysis() {
  const analysisContent = generatePerformanceAnalysis();
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Performance Analysis Report</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
        .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 15px; }
        .content { margin: 20px 0; white-space: pre-line; }
        .footer { border-top: 1px solid #ccc; padding-top: 10px; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>LSPG College of Engineering</h1>
        <h2>AI Performance Analysis Report</h2>
      </div>
      <div class="content">
        ${analysisContent.replace(/\n/g, '<br>')}
      </div>
      <div class="footer">
        Generated by AI Assistant on ${formatDate(new Date())} for ${currentUser.name}
      </div>
    </body>
    </html>
  `;
  
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ai-performance-analysis-${new Date().toISOString().split('T')[0]}.html`;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
  
  showToast('โ AI Performance Analysis exported successfully!', 'success');
  addAuditLog('Exported Analysis', 'AI Performance Analysis Report');
}

function addChatMessage(message, type) {
  const messagesContainer = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}-message`;
  messageDiv.innerHTML = `<p>${message}</p>`;
  
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
  chatHistory.push({ type, message, timestamp: new Date() });
}

function generateChatbotResponse(userMessage) {
  const message = userMessage.toLowerCase();
  
  // Enhanced chatbot with face recognition and performance analysis
  if (message.includes('face') || message.includes('camera') || message.includes('recognition')) {
    return "👤 **Face Recognition Login:**\n\n**How to use:**\n1️⃣ Click **Face Recognition** tab on login page\n2️⃣ Click **Start Camera** to activate webcam\n3️⃣ Position your face in the detection frame\n4️⃣ Click **Verify Face** to login\n\n**First time?** Register your face:\n• Click **Register [Your Name]** button\n• Look at camera for 2 seconds\n• Face data saved for future logins\n\n**Demo Users:**\n• Ashwini Ma'am, HOD, Tanmay, Amruta\n\n**Troubleshooting:**\n• Allow camera permissions in browser\n• Use good lighting for better detection\n• Fallback to password login if needed";
  } else if (message.includes('performance') || message.includes('analysis') || message.includes('improve')) {
    return generatePerformanceAnalysis();
  } else if (message.includes('marks') && message.includes('enter')) {
    return "📝 **Marks Entry Process (Updated):**\n\n1️⃣ Select Academic Year (First/Second/Third/Fourth)\n2️⃣ Choose Semester (1-8)\n3️⃣ Pick Subject from the dropdown\n4️⃣ Select Assessment Type (Internal/Mid-Sem/End-Sem)\n5️⃣ Enter marks for each student\n6️⃣ Click Save to submit\n\n**New Distribution:** Internal: 20 marks | Mid-Sem: 20 marks | End-Sem: 60 marks = 100 total\n\nThe system automatically calculates grades and updates CGPA! Need help with any specific step?";
  } else if (message.includes('grade') || message.includes('grading')) {
    return "🎓 **Engineering Grading System (Updated):**\n\n• **A+** (90-100): Outstanding (10 points)\n• **A** (80-89): Excellent (9 points)\n• **B+** (70-79): Very Good (8 points)\n• **B** (60-69): Good (7 points)\n• **C** (50-59): Average (6 points)\n• **D** (40-49): Pass (5 points)\n• **F** (0-39): Fail (0 points)\n\n**NEW Distribution:** Internal: 20 marks | Mid-Sem: 20 marks | End-Sem: 60 marks";
  } else if (message.includes('cgpa') || message.includes('calculation')) {
    return "📊 **CGPA Calculation:**\n\nCGPA = Sum of (Grade Points × Credits) ÷ Total Credits\n\n**Grade Points:**\nA+ = 10, A = 9, B+ = 8, B = 7, C = 6, D = 5, F = 0\n\n**Example:** If you get A+ in 3-credit subject: 10 × 3 = 30 grade points\n\nThe system automatically calculates your CGPA when marks are entered!";
  } else if (message.includes('problem') || message.includes('issue') || message.includes('not working')) {
    return "🔧 **Troubleshooting Help:**\n\n**General Issues:**\n1️⃣ **Refresh** the page and try again\n2️⃣ **Clear** browser cache (Ctrl+Shift+Delete)\n3️⃣ Make sure you've selected **all required fields** in order\n4️⃣ Check your **internet connection**\n5️⃣ Try using **Chrome or Firefox** browser\n\n**Face Recognition Issues:**\n• Allow camera permissions in browser settings\n• Ensure good lighting for face detection\n• Try different browser if camera doesn't work\n• Use password login as backup\n\nStill having issues? Contact IT support!";
  } else if (message.includes('student') && (message.includes('add') || message.includes('manage'))) {
    return "👥 **Student Management:**\n\n**Current Database:**\n• **First Year:** 40 students (PRN 2303042101-140)\n• **Second Year:** 40 students (PRN 2303042141-180)\n• **Third Year:** 47 students (PRN 2303042181-227)\n• **Fourth Year:** 40 students (PRN 2303042228-267)\n• **Total:** 167 students\n\n**Add Student:**\n• Go to **Students** section\n• Click **Add Student**\n• Fill: Name, PRN, Academic Year, Semester, Email\n• Use correct PRN ranges above";
  } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return `👋 Hello ${currentUser ? currentUser.name : 'there'}! I'm your **Engineering College AI Assistant**! \n\nI can help you with:\n🎓 Grading system & CGPA\n📝 Marks entry process\n👥 Student management (167 students)\n📊 Reports & analytics\n👤 Face recognition login\n🔧 Technical support\n\nWhat would you like to know?`;
  } else if (message.includes('navigate') || message.includes('help') || message.includes('how')) {
    return "🧭 **System Navigation:**\n\n**Login Options:**\n• **Password Login** - Traditional email/password\n• **Face Recognition** - Camera-based login\n\n**Sidebar Menu:**\n• **Dashboard** - Overview & stats\n• **Students** - Manage student records\n• **Marks Entry** - Enter/edit marks\n• **Reports** - Generate performance reports\n• **Academic Years** - View semester structure\n• **Faculty** - Manage teaching staff (HOD access)\n\nClick any menu item to navigate!";
  } else if (message.includes('semester') || message.includes('subject')) {
    return "📚 **Engineering Program Structure:**\n\n**Years & Student Counts:**\n• **First Year** (Sem 1-2): 40 students, Basic engineering subjects\n• **Second Year** (Sem 3-4): 40 students, Core CS subjects\n• **Third Year** (Sem 5-6): 47 students, Advanced topics\n• **Fourth Year** (Sem 7-8): 40 students, Projects & internships\n\n**Key Subjects:** Programming, Data Structures, Machine Learning, Database Management, etc.\n\n**Assessment:** Internal (20) + Mid-Sem (20) + End-Sem (60) = 100 marks";
  } else if (message.includes('assessment') || message.includes('exam')) {
    return "📋 **Assessment Structure (NEW):**\n\n**Three Types:**\n1️⃣ **Internal Assessment** (20 marks) - Continuous evaluation\n2️⃣ **Mid-Semester** (20 marks) - Mid-term exam\n3️⃣ **End-Semester** (60 marks) - Final exam\n\n**Total:** 100 marks per subject\n\nAll assessments contribute to final grade and CGPA calculation.";
  } else if (message.includes('report') || message.includes('export')) {
    return "📈 **Reports & Analytics:**\n\n**Available Reports:**\n• Class Performance Report\n• Individual Student Report\n• Subject-wise Analysis\n• AI Performance Analysis\n• Semester Results Compilation\n• Marks Summary\n\n**Export Options:**\n• PDF format for official documents\n• CSV for data analysis\n\nGo to **Reports** section → Select filters → Preview/Export";
  } else if (message.includes('password') || message.includes('login') || message.includes('credential')) {
    return "🔐 **Updated Access Credentials:**\n\n**Demo Accounts:**\n• **Class Coordinator:** ashwini.mam@lspgcoer.in / ashwini@mam\n• **HOD:** hod@lspgcoer.in / hod@lspgcoer.in\n• **Admin (Tanmay):** Tanmay@lspgcoer.in / Tanmay@56\n• **Admin (Amruta):** Amruta@lspgcoer.in / Amruta@16\n\n**Face Recognition:** Register face for any of these accounts on login page!\n\nEach role has different permissions and access levels.";
  } else {
    return "🤖 **I'm here to help!** I can assist with:\n\n🎓 **Academics:** Grading, CGPA, semester structure\n📝 **Marks Entry:** Step-by-step guidance\n👥 **Students:** Management & records (167 students)\n📊 **Reports:** Generation & export\n👤 **Face Recognition:** Login setup & troubleshooting\n🔧 **Technical:** System navigation & support\n\nJust ask me anything about the Engineering College Management System!";
  }
}

// Event Listeners and Initialization
document.addEventListener('DOMContentLoaded', async function() {
  initializeFaceRecognition();
  await initializeBackend();
  showLoginPage();

  if (!isBackendEnabled() && appState.backend.message) {
    setTimeout(() => {
      showToast(appState.backend.message, 'error');
    }, 500);
  }
  
  // Login method toggle handlers
  document.getElementById('passwordLoginTab').addEventListener('click', () => toggleLoginMethod('password'));
  document.getElementById('faceLoginTab').addEventListener('click', () => toggleLoginMethod('face'));
  
  // Face recognition handlers
  document.getElementById('startCameraBtn').addEventListener('click', async () => {
    const success = await requestCameraAccess();
    if (success) {
      document.getElementById('startCameraBtn').textContent = 'Camera Active';
      document.getElementById('startCameraBtn').disabled = true;
    }
  });
  
  document.getElementById('verifyFaceBtn').addEventListener('click', verifyFace);
  
  // Face registration handlers
  document.querySelectorAll('.demo-face-buttons .btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const userEmail = btn.dataset.user;
      registerFace(userEmail);
    });
  });
  
  // Login form handler
  document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (await login(email, password)) {
      showMainApp();
      showToast(`Welcome back, ${currentUser.name}!`, 'success');
    } else {
      showToast('Invalid credentials. Please try again.', 'error');
    }
  });
  
  // Logout handler
  document.getElementById('logoutBtn').addEventListener('click', logout);
  
  // Sidebar toggle
  document.getElementById('sidebarToggle').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    
    isSidebarOpen = !isSidebarOpen;
    
    if (isSidebarOpen) {
      sidebar.classList.remove('collapsed');
      mainContent.classList.remove('expanded');
    } else {
      sidebar.classList.add('collapsed');
      mainContent.classList.add('expanded');
    }
  });
  
  // Navigation links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const viewName = this.dataset.view;
      navigateToView(viewName);
    });
  });
  
  // Modal close handlers
  document.querySelectorAll('.modal-close, .modal-cancel').forEach(btn => {
    btn.addEventListener('click', function() {
      this.closest('.modal').classList.remove('show');
    });
  });
  
  // Click outside modal to close
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        this.classList.remove('show');
      }
    });
  });
  
  // Add button handlers
  const addSubjectBtn = document.getElementById('addSubjectBtn');
  if (addSubjectBtn) addSubjectBtn.addEventListener('click', () => showSubjectModal());
  
  const addStudentBtn = document.getElementById('addStudentBtn');
  if (addStudentBtn) addStudentBtn.addEventListener('click', () => showStudentModal());
  
  const addFacultyBtn = document.getElementById('addFacultyBtn');
  if (addFacultyBtn) addFacultyBtn.addEventListener('click', () => showFacultyModal());
  
  // Form handlers
  document.getElementById('classForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('className').value;
    const grade = document.getElementById('classGrade').value;
    const section = document.getElementById('classSection').value;
    
    const classData = {
      name,
      grade: parseInt(grade),
      section: section.toUpperCase(),
      students: 0
    };
    
    if (this.dataset.editId) {
      classData.id = this.dataset.editId;
      const index = appData.classes.findIndex(c => c.id === this.dataset.editId);
      if (index > -1) {
        try {
          await persistRequest('upsert_class', { class: classData });
        } catch (error) {
          return;
        }
        appData.classes[index] = { ...appData.classes[index], ...classData };
        addAuditLog('Updated Class', name);
        showToast(`Class "${name}" updated successfully`, 'success');
      }
    } else {
      classData.id = generateId();
      try {
        await persistRequest('upsert_class', { class: classData });
      } catch (error) {
        return;
      }
      appData.classes.push(classData);
      addAuditLog('Created Class', name);
      showToast(`Class "${name}" created successfully`, 'success');
    }
    
    document.getElementById('classModal').classList.remove('show');
    loadClasses();
  });
  
  document.getElementById('subjectForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('subjectName').value;
    const code = document.getElementById('subjectCode').value.toUpperCase();
    
    const subjectData = { name, code };
    
    if (this.dataset.editId) {
      subjectData.id = this.dataset.editId;
      const index = appData.subjects.findIndex(s => s.id === this.dataset.editId);
      if (index > -1) {
        try {
          await persistRequest('upsert_subject', { subject: subjectData });
        } catch (error) {
          return;
        }
        appData.subjects[index] = { ...appData.subjects[index], ...subjectData };
        addAuditLog('Updated Subject', name);
        showToast(`Subject "${name}" updated successfully`, 'success');
      }
    } else {
      subjectData.id = generateId();
      try {
        await persistRequest('upsert_subject', { subject: subjectData });
      } catch (error) {
        return;
      }
      appData.subjects.push(subjectData);
      addAuditLog('Created Subject', name);
      showToast(`Subject "${name}" created successfully`, 'success');
    }
    
    appData.subjects.sort((left, right) => left.name.localeCompare(right.name));
    document.getElementById('subjectModal').classList.remove('show');
    loadSubjects();
  });
  
  document.getElementById('studentForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('studentName').value;
    const prn = document.getElementById('studentPRN').value;
    const academicYear = document.getElementById('studentAcademicYear').value;
    const currentSemester = document.getElementById('studentSemester').value;
    const email = document.getElementById('studentEmail').value;
    
    const studentData = { name, prn, academicYear, currentSemester: parseInt(currentSemester), email };
    
    if (this.dataset.editId) {
      studentData.id = this.dataset.editId;
      const index = appData.students.findIndex(s => s.id === this.dataset.editId);
      if (index > -1) {
        try {
          await persistRequest('upsert_student', { student: studentData });
        } catch (error) {
          return;
        }
        appData.students[index] = { ...appData.students[index], ...studentData };
        addAuditLog('Updated Student', name);
        showToast(`Student "${name}" updated successfully`, 'success');
      }
    } else {
      studentData.id = generateId();
      try {
        await persistRequest('upsert_student', { student: studentData });
      } catch (error) {
        return;
      }
      appData.students.push(studentData);
      const yearName = appData.academicYears.find(y => y.id === academicYear)?.name;
      addAuditLog('Added Student', `${name} to ${yearName}`);
      showToast(`Student "${name}" added successfully`, 'success');
    }
    
    refreshAcademicYearCounts();
    invalidateDerivedCaches();
    appState.students.visibleCount = appState.students.pageSize;
    document.getElementById('studentModal').classList.remove('show');
    loadStudents();
    populateStudentDropdown();
  });
  
  // Faculty form handler
  if (document.getElementById('facultyForm')) {
    document.getElementById('facultyForm').addEventListener('submit', async function(e) {
      e.preventDefault();
      const name = document.getElementById('facultyName').value;
      const department = document.getElementById('facultyDepartment').value;
      const email = document.getElementById('facultyEmail').value;
      const subjectsText = document.getElementById('facultySubjects').value;
      const subjects = subjectsText.split(',').map(s => s.trim()).filter(s => s);
      
      const facultyData = { name, department, email, subjects };
      
      if (this.dataset.editId) {
        facultyData.id = this.dataset.editId;
        const index = appData.faculty.findIndex(f => f.id === this.dataset.editId);
        if (index > -1) {
          try {
            await persistRequest('upsert_faculty', { faculty: facultyData });
          } catch (error) {
            return;
          }
          appData.faculty[index] = { ...appData.faculty[index], ...facultyData };
          addAuditLog('Updated Faculty', name);
          showToast(`Faculty "${name}" updated successfully`, 'success');
        }
      } else {
        facultyData.id = generateId();
        try {
          await persistRequest('upsert_faculty', { faculty: facultyData });
        } catch (error) {
          return;
        }
        appData.faculty.push(facultyData);
        addAuditLog('Added Faculty', `${name} to ${department}`);
        showToast(`Faculty "${name}" added successfully`, 'success');
      }
      
      document.getElementById('facultyModal').classList.remove('show');
      loadFacultyManagement();
    });
  }
  
  // Student search handler
  const debouncedStudentSearch = debounce(() => loadStudents(), 220);
  document.getElementById('studentSearch').addEventListener('input', function() {
    appState.students.visibleCount = appState.students.pageSize;
    appState.students.searchTerm = normalizeText(this.value);
    debouncedStudentSearch();
  });
  
  // Marks entry selectors with enhanced error handling
  const marksYearSelect = document.getElementById('marksYearSelect');
  const marksSemesterSelect = document.getElementById('marksSemesterSelect');
  const marksSubjectSelect = document.getElementById('marksSubjectSelect');
  const marksAssessmentSelect = document.getElementById('marksAssessmentSelect');
  
  if (marksYearSelect) {
    marksYearSelect.addEventListener('change', onMarksYearChange);
    debugLog('✅ Academic Year dropdown event listener attached');
  } else {
    console.error('❌ marksYearSelect element not found!');
  }
  
  if (marksSemesterSelect) {
    marksSemesterSelect.addEventListener('change', onMarksSemesterChange);
    debugLog('✅ Semester dropdown event listener attached');
  } else {
    console.error('❌ marksSemesterSelect element not found!');
  }
  
  if (marksSubjectSelect) {
    marksSubjectSelect.addEventListener('change', onMarksSubjectChange);
    debugLog('✅ Subject dropdown event listener attached');
  } else {
    console.error('❌ marksSubjectSelect element not found!');
  }
  
  if (marksAssessmentSelect) {
    marksAssessmentSelect.addEventListener('change', onMarksAssessmentChange);
    debugLog('✅ Assessment dropdown event listener attached');
  } else {
    console.error('❌ marksAssessmentSelect element not found!');
  }
  
  // Save marks button
  document.getElementById('saveMarksBtn').addEventListener('click', saveMarks);
  
  // Reports handlers
  document.getElementById('previewReportBtn').addEventListener('click', previewReport);
  document.getElementById('exportPDFBtn').addEventListener('click', exportPDF);
  document.getElementById('exportCSVBtn').addEventListener('click', exportCSV);
  
  // Student PDF export handler
  const exportStudentPDFBtn = document.getElementById('exportStudentPDFBtn');
  if (exportStudentPDFBtn) {
    exportStudentPDFBtn.addEventListener('click', () => {
      const studentId = document.getElementById('reportStudent').value;
      if (studentId) {
        generateActualPDF('student-report', null, null, studentId);
      } else {
        showToast('Please select a student first', 'warning');
      }
    });
  }
  
  // Report type change handler
  document.getElementById('reportType').addEventListener('change', function() {
    const reportType = this.value;
    const studentSelect = document.getElementById('reportStudent');
    const studentFilterGroup = studentSelect.closest('.filter-group');
    const exportStudentBtn = document.getElementById('exportStudentPDFBtn');
    
    if (reportType === 'student-report') {
      studentFilterGroup.style.display = 'flex';
      studentSelect.style.display = 'block';
      exportStudentBtn.style.display = 'inline-flex';
      populateStudentDropdown();
    } else {
      studentFilterGroup.style.display = 'none';
      studentSelect.style.display = 'none';
      exportStudentBtn.style.display = 'none';
    }
  });
  document.getElementById('reportType').dispatchEvent(new Event('change'));
  
  // Chatbot handlers
  document.getElementById('chatToggle').addEventListener('click', toggleChatbot);
  document.getElementById('chatClose').addEventListener('click', closeChatbot);
  document.getElementById('chatSend').addEventListener('click', () => sendChatMessage());
  
  document.getElementById('chatInputField').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendChatMessage();
    }
  });
  
  // Quick question handlers with enhanced responses
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('quick-btn')) {
      const question = e.target.dataset.question;
      const questions = {
        face: "How to use face recognition login? Setup and troubleshooting?",
        marks: "How to enter marks? Step by step process?",
        student: "How to add and manage students?",
        export: "How to generate and export reports?",
        navigate: "Help with system navigation and features",
        grades: "Explain grading system and CGPA calculation",
        performance: "Analyze student performance and suggest improvements"
      };
      sendChatMessage(questions[question]);
    }
  });
  
  // Responsive sidebar for mobile
  window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
      document.getElementById('sidebar').classList.add('collapsed');
      document.querySelector('.main-content').classList.add('expanded');
      isSidebarOpen = false;
    } else if (window.innerWidth > 768 && !isSidebarOpen) {
      document.getElementById('sidebar').classList.remove('collapsed');
      document.querySelector('.main-content').classList.remove('expanded');
      isSidebarOpen = true;
    }
  });

  window.dispatchEvent(new Event('resize'));
});

// Add placeholder functions for faculty management
function editFaculty(facultyId) {
  showFacultyModal(facultyId);
}

async function deleteFaculty(facultyId) {
  if (confirm('Are you sure you want to remove this faculty member?')) {
    const index = appData.faculty.findIndex(f => f.id === facultyId);
    if (index > -1) {
      const facultyName = appData.faculty[index].name;
      try {
        await persistRequest('delete_faculty', { id: facultyId });
      } catch (error) {
        return;
      }
      appData.faculty.splice(index, 1);
      addAuditLog('Removed Faculty', facultyName);
      showToast(`Faculty "${facultyName}" removed successfully`, 'success');
      loadFacultyManagement();
    }
  }
}

// Update reports functions for engineering structure
function populateReportFilters() {
  const yearSelect = document.getElementById('reportClass');
  const subjectSelect = document.getElementById('reportSubject');

  if (!yearSelect || !subjectSelect) {
    return;
  }

  yearSelect.innerHTML = '<option value="">All Academic Years</option>' +
    appData.academicYears.map(year => `<option value="${year.id}">${year.name}</option>`).join('');

  // Get all unique subjects from all semesters
  const allSubjects = new Set();
  appData.academicYears.forEach(year => {
    year.semesters.forEach(sem => {
      sem.subjects.forEach(subject => allSubjects.add(subject));
    });
  });

  subjectSelect.innerHTML = '<option value="">All Subjects</option>' +
    Array.from(allSubjects).sort().map(subject => `<option value="${subject}">${subject}</option>`).join('');

  if (!yearSelect.dataset.studentFilterBound) {
    yearSelect.addEventListener('change', function() {
      if (document.getElementById('reportType').value === 'student-report') {
        populateStudentDropdown();
      }
    });
    yearSelect.dataset.studentFilterBound = 'true';
  }
}

function generateClassReport(yearId, subjectId) {
  let content = '<h4>Academic Year Performance Report</h4>';
  
  const years = yearId ? [appData.academicYears.find(y => y.id === yearId)] : appData.academicYears;
  
  years.forEach(year => {
    if (!year) return;
    
    const yearStudents = appData.students.filter(s => s.academicYear === year.id);
    const yearMarks = appData.marks.filter(m => 
      yearStudents.some(s => s.id === m.studentId) &&
      (!subjectId || m.subject === subjectId)
    );
    
    if (yearMarks.length > 0) {
      const avgMarks = yearMarks.reduce((sum, m) => sum + (m.marks * 100 / m.maxMarks), 0) / yearMarks.length;
      
      content += `
        <div style="margin-bottom: 20px; padding: 15px; border: 1px solid var(--color-border); border-radius: 8px;">
          <h5>${year.name}</h5>
          <p>Total Students: ${yearStudents.length}</p>
          <p>Average Performance: ${avgMarks.toFixed(2)}%</p>
          <p>Total Assessments: ${yearMarks.length}</p>
        </div>
      `;
    }
  });
  
  return content;
}

function generateStudentReport(yearId, subjectId) {
  let content = '<h4>Individual Student Performance Report</h4>';
  
  const students = yearId ? 
    appData.students.filter(s => s.academicYear === yearId) : 
    appData.students;
  
  students.forEach(student => {
    const studentMarks = appData.marks.filter(m => 
      m.studentId === student.id &&
      (!subjectId || m.subject === subjectId)
    );
    
    if (studentMarks.length > 0) {
      const avgMarks = studentMarks.reduce((sum, m) => sum + (m.marks * 100 / m.maxMarks), 0) / studentMarks.length;
      const cgpa = calculateCGPA(student.id);
      
      content += `
        <div style="margin-bottom: 15px; padding: 10px; border-left: 3px solid var(--color-primary);">
          <strong>${student.name}</strong> (PRN: ${student.prn})<br>
          Average: ${avgMarks.toFixed(2)}% | CGPA: ${cgpa} | Assessments: ${studentMarks.length}
        </div>
      `;
    }
  });
  
  return content;
}

function generateMarksSummary(yearId, subjectId) {
  let content = '<h4>Assessment Summary Report</h4>';
  
  const filteredMarks = appData.marks.filter(m => {
    const student = appData.students.find(s => s.id === m.studentId);
    return (!yearId || student?.academicYear === yearId) &&
           (!subjectId || m.subject === subjectId);
  });
  
  if (filteredMarks.length === 0) {
    return content + '<p>No assessment data available for the selected filters.</p>';
  }
  
  const totalPercentages = filteredMarks.map(m => (m.marks * 100) / m.maxMarks);
  const avgPercentage = totalPercentages.reduce((a, b) => a + b, 0) / totalPercentages.length;
  const maxPercentage = Math.max(...totalPercentages);
  const minPercentage = Math.min(...totalPercentages);
  
  // Grade distribution based on percentage
  const gradeDistribution = {
    'A+': totalPercentages.filter(p => p >= 90).length,
    'A': totalPercentages.filter(p => p >= 80 && p < 90).length,
    'B+': totalPercentages.filter(p => p >= 70 && p < 80).length,
    'B': totalPercentages.filter(p => p >= 60 && p < 70).length,
    'C': totalPercentages.filter(p => p >= 50 && p < 60).length,
    'D': totalPercentages.filter(p => p >= 40 && p < 50).length,
    'F': totalPercentages.filter(p => p < 40).length
  };
  
  content += `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px;">
      <div style="padding: 10px; background: var(--color-bg-1); border-radius: 6px;">
        <strong>Total Assessments:</strong> ${filteredMarks.length}
      </div>
      <div style="padding: 10px; background: var(--color-bg-3); border-radius: 6px;">
        <strong>Average:</strong> ${avgPercentage.toFixed(2)}%
      </div>
      <div style="padding: 10px; background: var(--color-bg-2); border-radius: 6px;">
        <strong>Highest:</strong> ${maxPercentage.toFixed(2)}%
      </div>
      <div style="padding: 10px; background: var(--color-bg-4); border-radius: 6px;">
        <strong>Lowest:</strong> ${minPercentage.toFixed(2)}%
      </div>
    </div>
    
    <h5>Grade Distribution:</h5>
    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
      ${Object.entries(gradeDistribution).map(([grade, count]) => `
        <span style="padding: 5px 10px; background: var(--color-bg-${grade.includes('+') ? '3' : grade === 'A' ? '3' : grade.includes('B') ? '1' : grade === 'C' ? '2' : grade === 'D' ? '6' : '4'}); border-radius: 4px;">
          Grade ${grade}: ${count}
        </span>
      `).join('')}
    </div>
  `;
  
  return content;
}

function generateCSVMarksSummary(yearId, subjectId) {
  const headers = ['Student Name', 'PRN', 'Academic Year', 'Semester', 'Subject', 'Assessment Type', 'Marks', 'Max Marks', 'Percentage', 'Grade', 'CGPA'];
  const csvData = [headers];
  
  const filteredMarks = appData.marks.filter(m => {
    const student = appData.students.find(s => s.id === m.studentId);
    return (!yearId || student?.academicYear === yearId) &&
           (!subjectId || m.subject === subjectId);
  });
  
  filteredMarks.forEach(mark => {
    const student = appData.students.find(s => s.id === mark.studentId);
    const academicYear = appData.academicYears.find(y => y.id === student?.academicYear);
    
    if (student && academicYear) {
      const percentage = (mark.marks * 100) / mark.maxMarks;
      const grade = calculateGrade(percentage);
      const cgpa = calculateCGPA(student.id);
      
      csvData.push([
        student.name,
        student.prn,
        academicYear.name,
        mark.semester,
        mark.subject,
        mark.assessmentType,
        mark.marks,
        mark.maxMarks,
        percentage.toFixed(2) + '%',
        grade,
        cgpa
      ]);
    }
  });
  
  return csvData;
}

// Enhanced Performance Analysis Functions
function generatePerformanceAnalysis() {
  const students = appData.students;
  let analysis = "📊 **Performance Analysis & Improvement Suggestions:**\n\n";
  
  // Analyze student performance
  const performanceData = students.map(student => {
    const studentMarks = appData.marks.filter(m => m.studentId === student.id);
    const cgpa = parseFloat(calculateCGPA(student.id));
    const totalAssessments = studentMarks.length;
    
    // Find weak subjects (below 60%)
    const weakSubjects = studentMarks.filter(m => (m.marks / m.maxMarks) < 0.6)
      .map(m => m.subject);
    
    return {
      name: student.name,
      prn: student.prn,
      cgpa,
      totalAssessments,
      weakSubjects: [...new Set(weakSubjects)]
    };
  }).filter(s => s.totalAssessments > 0);
  
  if (performanceData.length === 0) {
    return analysis + "No performance data available. Please enter some marks first.";
  }
  
  // Overall statistics
  const avgCGPA = performanceData.reduce((sum, s) => sum + s.cgpa, 0) / performanceData.length;
  const studentsNeedingHelp = performanceData.filter(s => s.cgpa < 6.0);
  
  analysis += `📈 **Overall Statistics:**\n`;
  analysis += `• Students analyzed: ${performanceData.length}\n`;
  analysis += `• Average CGPA: ${avgCGPA.toFixed(2)}\n`;
  analysis += `• Students needing improvement: ${studentsNeedingHelp.length}\n\n`;
  
  // Find most common weak subjects
  const allWeakSubjects = performanceData.flatMap(s => s.weakSubjects);
  const subjectFreq = {};
  allWeakSubjects.forEach(subject => {
    subjectFreq[subject] = (subjectFreq[subject] || 0) + 1;
  });
  
  const topWeakSubjects = Object.entries(subjectFreq)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);
  
  if (topWeakSubjects.length > 0) {
    analysis += `⚠️ **Subjects Needing Most Attention:**\n`;
    topWeakSubjects.forEach(([subject, count]) => {
      analysis += `• ${subject} (${count} students struggling)\n`;
    });
    analysis += "\n";
  }
  
  // Individual recommendations for struggling students
  if (studentsNeedingHelp.length > 0) {
    analysis += `🎯 **Individual Improvement Plans:**\n`;
    studentsNeedingHelp.slice(0, 3).forEach(student => {
      analysis += `\n**${student.name}** (CGPA: ${student.cgpa}):ฟ`;
      if (student.weakSubjects.length > 0) {
        analysis += `\n• Focus on: ${student.weakSubjects.join(", ")}\n`;
        analysis += `• Recommend: Extra tutorials, practice sessions\n`;
      }
    });
  }
  
  analysis += "\nℹ️ **Want detailed analysis? Ask me about specific students or subjects!**";
  
  return analysis;
}

function generateDetailedClassReport(yearId, subjectId) {
  let content = '<h3>Class Performance Analysis</h3>';
  
  const years = yearId ? [appData.academicYears.find(y => y.id === yearId)] : appData.academicYears;
  
  years.forEach(year => {
    if (!year) return;
    
    const yearStudents = appData.students.filter(s => s.academicYear === year.id);
    const yearMarks = appData.marks.filter(m => 
      yearStudents.some(s => s.id === m.studentId) &&
      (!subjectId || m.subject === subjectId)
    );
    
    if (yearMarks.length > 0) {
      // Calculate statistics
      const assessmentsByType = {
        'Internal Assessment': yearMarks.filter(m => m.assessmentType === 'Internal Assessment'),
        'Mid-Semester': yearMarks.filter(m => m.assessmentType === 'Mid-Semester'),
        'End-Semester': yearMarks.filter(m => m.assessmentType === 'End-Semester')
      };
      
      content += `<h4>${year.name} Performance Report</h4>`;
      content += '<table>';
      content += '<tr><th>Assessment Type</th><th>Students</th><th>Average</th><th>Highest</th><th>Lowest</th></tr>';
      
      Object.entries(assessmentsByType).forEach(([type, marks]) => {
        if (marks.length > 0) {
          const percentages = marks.map(m => (m.marks / m.maxMarks) * 100);
          const avg = percentages.reduce((a, b) => a + b, 0) / percentages.length;
          const max = Math.max(...percentages);
          const min = Math.min(...percentages);
          
          content += `<tr><td>${type}</td><td>${marks.length}</td><td>${avg.toFixed(2)}%</td><td>${max.toFixed(2)}%</td><td>${min.toFixed(2)}%</td></tr>`;
        }
      });
      
      content += '</table>';
      
      // CGPA distribution
      const cgpaData = yearStudents.map(s => parseFloat(calculateCGPA(s.id))).filter(c => c > 0);
      if (cgpaData.length > 0) {
        const avgCGPA = cgpaData.reduce((a, b) => a + b, 0) / cgpaData.length;
        const excellentCount = cgpaData.filter(c => c >= 8.5).length;
        const goodCount = cgpaData.filter(c => c >= 7.0 && c < 8.5).length;
        const needsImprovementCount = cgpaData.filter(c => c < 6.0).length;
        
        content += '<h5>CGPA Distribution</h5>';
        content += '<table>';
        content += '<tr><th>Category</th><th>Count</th><th>Percentage</th></tr>';
        content += `<tr><td>Excellent (8.5+)</td><td>${excellentCount}</td><td>${((excellentCount/cgpaData.length)*100).toFixed(1)}%</td></tr>`;
        content += `<tr><td>Good (7.0-8.4)</td><td>${goodCount}</td><td>${((goodCount/cgpaData.length)*100).toFixed(1)}%</td></tr>`;
        content += `<tr><td>Needs Improvement (&lt;6.0)</td><td>${needsImprovementCount}</td><td>${((needsImprovementCount/cgpaData.length)*100).toFixed(1)}%</td></tr>`;
        content += `<tr><td><strong>Average CGPA</strong></td><td><strong>${avgCGPA.toFixed(2)}</strong></td><td>-</td></tr>`;
        content += '</table>';
      }
    }
  });
  
  return content;
}

function generateDetailedStudentReport(yearId, subjectId) {
  let content = '<h3>Individual Student Performance Report</h3>';
  
  const students = yearId ? 
    appData.students.filter(s => s.academicYear === yearId) : 
    appData.students.slice(0, 20); // Limit for PDF readability
  
  content += '<table>';
  content += '<tr><th>PRN</th><th>Name</th><th>CGPA</th><th>Assessments</th><th>Average %</th><th>Weak Subjects</th></tr>';
  
  students.forEach(student => {
    const studentMarks = appData.marks.filter(m => 
      m.studentId === student.id &&
      (!subjectId || m.subject === subjectId)
    );
    
    if (studentMarks.length > 0) {
      const percentages = studentMarks.map(m => (m.marks / m.maxMarks) * 100);
      const avgPercentage = percentages.reduce((a, b) => a + b, 0) / percentages.length;
      const cgpa = calculateCGPA(student.id);
      
      const weakSubjects = studentMarks
        .filter(m => (m.marks / m.maxMarks) < 0.6)
        .map(m => m.subject)
        .filter((subject, index, arr) => arr.indexOf(subject) === index);
      
      content += `<tr>`;
      content += `<td>${student.prn}</td>`;
      content += `<td>${student.name}</td>`;
      content += `<td>${cgpa}</td>`;
      content += `<td>${studentMarks.length}</td>`;
      content += `<td>${avgPercentage.toFixed(2)}%</td>`;
      content += `<td>${weakSubjects.length > 0 ? weakSubjects.join(", ") : "None"}</td>`;
      content += `</tr>`;
    }
  });
  
  content += '</table>';
  return content;
}

function generateDetailedMarksSummary(yearId, subjectId) {
  let content = '<h3>Comprehensive Marks Summary</h3>';
  
  const filteredMarks = appData.marks.filter(m => {
    const student = appData.students.find(s => s.id === m.studentId);
    return (!yearId || student?.academicYear === yearId) &&
           (!subjectId || m.subject === subjectId);
  });
  
  if (filteredMarks.length === 0) {
    return content + '<p>No marks data available for the selected filters.</p>';
  }
  
  // Assessment type breakdown
  const assessmentTypes = ['Internal Assessment', 'Mid-Semester', 'End-Semester'];
  
  content += '<h4>Assessment Type Analysis</h4>';
  content += '<table>';
  content += '<tr><th>Assessment Type</th><th>Count</th><th>Average %</th><th>Pass Rate</th></tr>';
  
  assessmentTypes.forEach(type => {
    const typeMarks = filteredMarks.filter(m => m.assessmentType === type);
    if (typeMarks.length > 0) {
      const percentages = typeMarks.map(m => (m.marks / m.maxMarks) * 100);
      const avgPercentage = percentages.reduce((a, b) => a + b, 0) / percentages.length;
      const passRate = (percentages.filter(p => p >= 40).length / percentages.length) * 100;
      
      content += `<tr><td>${type}</td><td>${typeMarks.length}</td><td>${avgPercentage.toFixed(2)}%</td><td>${passRate.toFixed(1)}%</td></tr>`;
    }
  });
  
  content += '</table>';
  
  // Subject-wise analysis if not filtered by subject
  if (!subjectId) {
    const subjects = [...new Set(filteredMarks.map(m => m.subject))];
    
    content += '<h4>Subject-wise Performance</h4>';
    content += '<table>';
    content += '<tr><th>Subject</th><th>Students</th><th>Average %</th><th>Difficulty Index</th></tr>';
    
    subjects.forEach(subject => {
      const subjectMarks = filteredMarks.filter(m => m.subject === subject);
      const percentages = subjectMarks.map(m => (m.marks / m.maxMarks) * 100);
      const avgPercentage = percentages.reduce((a, b) => a + b, 0) / percentages.length;
      
      let difficulty = "Easy";
      if (avgPercentage < 60) difficulty = "Difficult";
      else if (avgPercentage < 75) difficulty = "Moderate";
      
      content += `<tr><td>${subject}</td><td>${subjectMarks.length}</td><td>${avgPercentage.toFixed(2)}%</td><td>${difficulty}</td></tr>`;
    });
    
    content += '</table>';
  }
  
  return content;
}

// Complete Student Database Generator (167 total students)
function generateCompleteStudentDatabase() {
  const allStudents = [];
  const appendStudents = (names, startPRN, academicYear, currentSemester) => {
    names.forEach((name, index) => {
      const prn = (startPRN + index).toString();

      allStudents.push({
        id: `s${allStudents.length + 1}`,
        name,
        prn,
        academicYear,
        currentSemester,
        email: `${name.toLowerCase().replace(/ /g, '.')}.${prn.slice(-3)}@lspgcoerzoho.in`
      });
    });
  };
  
  // First Year Students (40 students: PRN 2303042101-2303042140)
  const firstYearNames = [
    'Aarav Sharma', 'Ananya Iyer', 'Rohan Gupta', 'Sneha Reddy', 'Aditya Verma',
    'Kavya Nair', 'Manav Joshi', 'Ishita Mehta', 'Siddharth Rao', 'Neha Kulkarni',
    'Arjun Deshmukh', 'Tanya Bhatt', 'Krish Patel', 'Meera Choudhary', 'Yash Malhotra',
    'Pooja Agarwal', 'Vivaan Bansal', 'Aishwarya Singh', 'Kunal Ghosh', 'Riya Jain',
    'Harsh Venkatesh', 'Divya Pillai', 'Tanishq Dubey', 'Nidhi Saxena', 'Omkar Shetty',
    'Shruti Das', 'Dhruv Mishra', 'Sanika Joshi', 'Rajat Kapoor', 'Isha Tripathi',
    'Abhinav Rathi', 'Simran Kaur', 'Tejas Chauhan', 'Bhavya Sinha', 'Ayush Thakur',
    'Charvi Menon', 'Pranav Bhattacharya', 'Rachana Yadav', 'Veer Khanna', 'Aditi Mahajan'
  ];
  
  appendStudents(firstYearNames, 2303042101, 'first_year', 2);
  
  // Second Year Students (40 students: PRN 2303042141-2303042180)
  const secondYearNames = [
    'Aryan Sharma', 'Priya Patel', 'Rohan Kumar', 'Anjali Singh', 'Vikram Joshi',
    'Sneha Reddy', 'Arjun Mehta', 'Divya Iyer', 'Karan Malhotra', 'Pooja Gupta',
    'Rahul Verma', 'Sakshi Nair', 'Aditya Ghosh', 'Kavya Jain', 'Siddharth Kapoor',
    'Ishita Agarwal', 'Manav Bansal', 'Neha Singh', 'Yash Reddy', 'Tanya Mehta',
    'Krish Venkatesh', 'Meera Pillai', 'Vivaan Dubey', 'Aishwarya Saxena', 'Kunal Shetty',
    'Riya Das', 'Harsh Mishra', 'Divya Joshi', 'Tanishq Kapoor', 'Nidhi Tripathi',
    'Omkar Rathi', 'Shruti Kaur', 'Dhruv Chauhan', 'Sanika Sinha', 'Rajat Thakur',
    'Isha Menon', 'Abhinav Bhattacharya', 'Simran Yadav', 'Tejas Khanna', 'Aisha Ansari'
  ];
  
  appendStudents(secondYearNames, 2303042141, 'second_year', 4);
  
  // Third Year Students (47 students: PRN 2303042181-2303042227)
  const thirdYearNames = [
    'Tanmay Chaudhary', 'Himanshi Choubal', 'Karan Kashayp', 'Swaroop Naik', 'Amruta Singh',
    'Rahul Sharma', 'Snehal Patil', 'Vaibhav Kumar', 'Nikita Joshi', 'Harsh Agarwal',
    'Deepika Verma', 'Aman Reddy', 'Shreya Nair', 'Karthik Gupta', 'Anjali Iyer',
    'Rohan Malhotra', 'Sakshi Ghosh', 'Aditya Jain', 'Kavya Kapoor', 'Siddharth Bansal',
    'Ishita Singh', 'Manav Mehta', 'Neha Venkatesh', 'Yash Pillai', 'Tanya Dubey',
    'Krish Saxena', 'Meera Shetty', 'Vivaan Das', 'Aishwarya Mishra', 'Kunal Joshi',
    'Riya Tripathi', 'Harsh Rathi', 'Divya Kaur', 'Tanishq Chauhan', 'Nidhi Sinha',
    'Omkar Thakur', 'Shruti Menon', 'Dhruv Bhattacharya', 'Sanika Yadav', 'Rajat Khanna',
    'Isha Mahajan', 'Abhinav Ansari', 'Simran Sharma', 'Tejas Patel', 'Bhavya Kumar',
    'Ayush Singh', 'Tanvi Bansal'
  ];
  
  appendStudents(thirdYearNames, 2303042181, 'third_year', 6);
  
  // Fourth Year Students (40 students: PRN 2303042228-2303042267)
  const fourthYearNames = [
    'Aryan Khanna', 'Ishani Mukherjee', 'Dev Verma', 'Zara Fernandes', 'Rohan Srinivasan',
    'Kavitha Iyer', 'Abhishek Gupta', 'Anisha Reddy', 'Siddharth Nair', 'Priyanka Singh',
    'Karan Sharma', 'Sneha Patel', 'Aditya Kumar', 'Divya Joshi', 'Vikram Malhotra',
    'Anjali Ghosh', 'Rahul Jain', 'Sakshi Kapoor', 'Manav Bansal', 'Neha Agarwal',
    'Yash Venkatesh', 'Tanya Pillai', 'Krish Dubey', 'Meera Saxena', 'Vivaan Shetty',
    'Aishwarya Das', 'Kunal Mishra', 'Riya Tripathi', 'Harsh Rathi', 'Ishita Kaur',
    'Tanishq Chauhan', 'Nidhi Sinha', 'Omkar Thakur', 'Shruti Menon', 'Dhruv Bhattacharya',
    'Sanika Yadav', 'Rajat Khanna', 'Isha Mahajan', 'Abhinav Ansari', 'Meera Krishnan'
  ];
  
  appendStudents(fourthYearNames, 2303042228, 'fourth_year', 8);
  
  console.log(`✅ Generated complete student database:`);
  console.log(`- First Year: ${firstYearNames.length} students (PRN 2303042101-2303042140)`);
  console.log(`- Second Year: ${secondYearNames.length} students (PRN 2303042141-2303042180)`);
  console.log(`- Third Year: ${thirdYearNames.length} students (PRN 2303042181-2303042227)`);
  console.log(`- Fourth Year: ${fourthYearNames.length} students (PRN 2303042228-2303042267)`);
  console.log(`- Total: ${allStudents.length} students`);
  
  return allStudents;
}

// Student data generator function
function generateStudentList(count, startPRN, yearName) {
  const students = [];
  const firstNames = [
    'Aarav', 'Ananya', 'Rohan', 'Sneha', 'Aditya', 'Kavya', 'Manav', 'Ishita', 'Siddharth', 'Neha',
    'Arjun', 'Tanya', 'Krish', 'Meera', 'Yash', 'Pooja', 'Vivaan', 'Aishwarya', 'Kunal', 'Riya',
    'Aryan', 'Priya', 'Vikram', 'Shreya', 'Karthik', 'Divya', 'Aman', 'Sakshi', 'Rahul', 'Anjali',
    'Tanmay', 'Himanshi', 'Karan', 'Swaroop', 'Amruta', 'Snehal', 'Vaibhav', 'Nikita', 'Harsh', 'Deepika',
    'Ishani', 'Dev', 'Zara', 'Abhishek', 'Anisha', 'Kavitha', 'Nishant'
  ];
  
  const lastNames = [
    'Sharma', 'Iyer', 'Gupta', 'Reddy', 'Verma', 'Nair', 'Joshi', 'Mehta', 'Rao', 'Kulkarni',
    'Deshmukh', 'Bhatt', 'Patel', 'Choudhary', 'Malhotra', 'Agarwal', 'Bansal', 'Singh', 'Ghosh', 'Jain',
    'Kumar', 'Chaudhary', 'Choubal', 'Kashayp', 'Naik', 'Patil', 'Khanna', 'Mukherjee', 'Fernandes', 'Srinivasan'
  ];
  
  for (let i = 0; i < count; i++) {
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[i % lastNames.length];
    const prn = (startPRN + i).toString();
    
    students.push({
      id: `student_${prn}`,
      name: `${firstName} ${lastName}`,
      prn: prn
    });
  }
  
  debugLog(`Generated ${count} students for ${yearName}: PRN ${startPRN} to ${startPRN + count - 1}`);
  return students;
}

// Global functions for onclick handlers
window.navigateToView = navigateToView;
window.showFacultyModal = showFacultyModal;
window.editFaculty = editFaculty;
window.deleteFaculty = deleteFaculty;
window.editSubject = editSubject;
window.deleteSubject = deleteSubject;
window.editStudent = editStudent;
window.deleteStudent = deleteStudent;

function generateClassPerformancePDF(doc, yearId, subjectId) {
  let yPos = addCollegeHeader(doc);
  
  const yearName = yearId ? appData.academicYears.find(y => y.id === yearId)?.name : 'All Years';
  const subjectName = subjectId || 'All Subjects';
  
  // Title
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Class Performance Report', 105, yPos + 10, { align: 'center' });
  yPos += 20;
  
  doc.setFontSize(12);
  doc.text(`Academic Year: ${yearName}`, 20, yPos);
  doc.text(`Subject: ${subjectName}`, 20, yPos + 8);
  yPos += 25;
  
  const years = yearId ? [appData.academicYears.find(y => y.id === yearId)] : appData.academicYears;
  
  years.forEach(year => {
    if (!year) return;
    
    const yearStudents = appData.students.filter(s => s.academicYear === year.id);
    const yearMarks = appData.marks.filter(m => 
      yearStudents.some(s => s.id === m.studentId) &&
      (!subjectId || m.subject === subjectId)
    );
    
    if (yearMarks.length > 0 && yPos < 250) {
      doc.setFont('helvetica', 'bold');
      doc.text(`${year.name} Statistics:`, 20, yPos);
      yPos += 10;
      
      doc.setFont('helvetica', 'normal');
      doc.text(`Total Students: ${yearStudents.length}`, 20, yPos);
      yPos += 6;
      
      const avgMarks = yearMarks.reduce((sum, m) => sum + (m.marks * 100 / m.maxMarks), 0) / yearMarks.length;
      doc.text(`Average Performance: ${avgMarks.toFixed(2)}%`, 20, yPos);
      yPos += 6;
      
      doc.text(`Total Assessments: ${yearMarks.length}`, 20, yPos);
      yPos += 15;
    }
  });
  
  addPDFFooter(doc, 297);
  return `Class_Performance_Report_${new Date().toISOString().split('T')[0]}.pdf`;
}

function generateSubjectAnalysisPDF(doc, yearId, subjectId) {
  let yPos = addCollegeHeader(doc);
  
  // Title
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Subject-wise Analysis Report', 105, yPos + 10, { align: 'center' });
  yPos += 25;
  
  if (subjectId) {
    // Specific subject analysis
    doc.setFontSize(14);
    doc.text(`Subject: ${subjectId}`, 20, yPos);
    yPos += 15;
    
    const subjectMarks = appData.marks.filter(m => m.subject === subjectId);
    if (subjectMarks.length > 0) {
      const percentages = subjectMarks.map(m => (m.marks / m.maxMarks) * 100);
      const avgPercentage = percentages.reduce((a, b) => a + b, 0) / percentages.length;
      
      doc.setFont('helvetica', 'normal');
      doc.text(`Total Assessments: ${subjectMarks.length}`, 20, yPos);
      yPos += 8;
      doc.text(`Average Performance: ${avgPercentage.toFixed(2)}%`, 20, yPos);
      yPos += 8;
      doc.text(`Highest Score: ${Math.max(...percentages).toFixed(2)}%`, 20, yPos);
      yPos += 8;
      doc.text(`Lowest Score: ${Math.min(...percentages).toFixed(2)}%`, 20, yPos);
    }
  } else {
    // All subjects overview
    const allSubjects = [...new Set(appData.marks.map(m => m.subject))];
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('All Subjects Overview:', 20, yPos);
    yPos += 15;
    
    allSubjects.forEach(subject => {
      if (yPos > 250) {
        doc.addPage();
        yPos = addCollegeHeader(doc) + 20;
      }
      
      const subjectMarks = appData.marks.filter(m => m.subject === subject);
      if (subjectMarks.length > 0) {
        const percentages = subjectMarks.map(m => (m.marks / m.maxMarks) * 100);
        const avgPercentage = percentages.reduce((a, b) => a + b, 0) / percentages.length;
        
        doc.setFont('helvetica', 'bold');
        doc.text(subject, 20, yPos);
        yPos += 6;
        
        doc.setFont('helvetica', 'normal');
        doc.text(`Average: ${avgPercentage.toFixed(2)}% | Assessments: ${subjectMarks.length}`, 25, yPos);
        yPos += 10;
      }
    });
  }
  
  addPDFFooter(doc, 297);
  return `Subject_Analysis_Report_${new Date().toISOString().split('T')[0]}.pdf`;
}

function generateChatbotInsightsPDF(doc) {
  let yPos = addCollegeHeader(doc);
  
  // Title
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('AI Performance Analysis Report', 105, yPos + 10, { align: 'center' });
  yPos += 25;
  
  // Generate performance analysis
  const analysisText = generatePerformanceAnalysis();
  const lines = analysisText.split('\n');
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  lines.forEach(line => {
    if (yPos > 280) {
      doc.addPage();
      yPos = addCollegeHeader(doc) + 20;
    }
    
    if (line.trim()) {
      // Handle different line types
      if (line.includes('**') || line.includes('📊') || line.includes('📈')) {
        doc.setFont('helvetica', 'bold');
        doc.text(line.replace(/\*\*/g, '').replace(/📊|📈|⚠️|🎯|ℹ️/g, ''), 20, yPos);
        doc.setFont('helvetica', 'normal');
      } else {
        doc.text(line.replace(/•/g, '-'), 20, yPos);
      }
      yPos += 5;
    } else {
      yPos += 3;
    }
  });
  
  addPDFFooter(doc, 297);
  return `AI_Performance_Analysis_${new Date().toISOString().split('T')[0]}.pdf`;
}

function generateSemesterResultsPDF(doc, yearId) {
  let yPos = addCollegeHeader(doc);
  
  const yearName = yearId ? appData.academicYears.find(y => y.id === yearId)?.name : 'All Years';
  
  // Title
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Semester Results Compilation', 105, yPos + 10, { align: 'center' });
  yPos += 20;
  
  doc.setFontSize(12);
  doc.text(`Academic Year: ${yearName}`, 20, yPos);
  yPos += 20;
  
  const students = yearId ? 
    appData.students.filter(s => s.academicYear === yearId) : 
    appData.students;
  
  // Table headers
  doc.setFontSize(10);
  doc.rect(20, yPos, 170, 8);
  doc.setFillColor(240, 240, 240);
  doc.rect(20, yPos, 170, 8, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.text('PRN', 25, yPos + 5);
  doc.text('Student Name', 55, yPos + 5);
  doc.text('Semester', 110, yPos + 5);
  doc.text('CGPA', 140, yPos + 5);
  doc.text('Performance', 160, yPos + 5);
  yPos += 8;
  
  // Student data
  doc.setFont('helvetica', 'normal');
  students.slice(0, 30).forEach(student => { // Limit for PDF readability
    if (yPos > 270) {
      doc.addPage();
      yPos = addCollegeHeader(doc) + 20;
    }
    
    const cgpa = calculateCGPA(student.id);
    const performance = parseFloat(cgpa) >= 8.5 ? 'Excellent' : 
                       parseFloat(cgpa) >= 7.0 ? 'Good' : 
                       parseFloat(cgpa) >= 6.0 ? 'Average' : 'Poor';
    
    doc.rect(20, yPos, 170, 8);
    doc.text(student.prn, 25, yPos + 5);
    doc.text(student.name.substring(0, 20), 55, yPos + 5);
    doc.text(student.currentSemester.toString(), 115, yPos + 5);
    doc.text(cgpa, 142, yPos + 5);
    doc.text(performance, 162, yPos + 5);
    yPos += 8;
  });
  
  addPDFFooter(doc, 297);
  return `Semester_Results_${yearName.replace(' ', '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
}

function generateMarksSummaryPDF(doc, yearId, subjectId) {
  let yPos = addCollegeHeader(doc);
  
  // Title
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Marks Summary Report', 105, yPos + 10, { align: 'center' });
  yPos += 25;
  
  const content = generateDetailedMarksSummary(yearId, subjectId);
  
  // Convert HTML content to PDF text (simplified)
  const textContent = content.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&');
  const lines = textContent.split('\n');
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  lines.forEach(line => {
    if (yPos > 280) {
      doc.addPage();
      yPos = addCollegeHeader(doc) + 20;
    }
    
    if (line.trim()) {
      doc.text(line.trim().substring(0, 80), 20, yPos);
      yPos += 5;
    }
  });
  
  addPDFFooter(doc, 297);
  return `Marks_Summary_Report_${new Date().toISOString().split('T')[0]}.pdf`;
}

// Global export functions
window.exportChatAnalysis = exportChatAnalysis;
