
import { DocumentType } from "../types";

// Format date to a readable string
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

// Get lawyer-case matcher score (simplified for MVP)
export const getMatchScore = (
  lawyerPracticeAreas: string[], 
  caseType: string, 
  lawyerLocation: string, 
  caseLocation: string
): number => {
  let score = 0;
  
  // Practice area match
  if (lawyerPracticeAreas.includes(caseType)) {
    score += 50;
  }
  
  // Location match
  if (lawyerLocation === caseLocation) {
    score += 50;
  }
  
  return score;
};

// Generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

// Function to safely store data in localStorage
export const storeData = (key: string, data: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Error storing data:', e);
  }
};

// Function to retrieve data from localStorage
export const retrieveData = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error('Error retrieving data:', e);
    return defaultValue;
  }
};

// Simple for retrieving a document icon based on document type
export const getDocumentIcon = (docType: DocumentType): string => {
  switch (docType) {
    case 'Engagement Letter':
      return '📝';
    case 'Client Intake Form':
      return '📋';
    case 'Legal Memorandum':
      return '📄';
    case 'Fee Agreement':
      return '💼';
    case 'Initial Case Assessment':
      return '🔍';
    default:
      return '📄';
  }
};

// Get color class based on budget sensitivity
export const getBudgetColor = (sensitivity: string): string => {
  switch (sensitivity) {
    case 'Low':
      return 'bg-green-100 text-green-800';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'High':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
