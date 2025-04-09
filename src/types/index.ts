
export type CaseType = 
  | 'Business Law'
  | 'Family Law'
  | 'Criminal Law'
  | 'Personal Injury'
  | 'Real Estate'
  | 'Intellectual Property'
  | 'Estate Planning'
  | 'Employment Law'
  | 'Immigration'
  | 'Tax Law'
  | 'Other';

export type BudgetSensitivity = 'Low' | 'Medium' | 'High' | 'Not Specified';

export type ClientCase = {
  id: string;
  description: string;
  caseType: CaseType;
  location: string;
  budgetSensitivity: BudgetSensitivity;
  email: string;
  submissionDate: string;
  status: 'Pending' | 'Matched' | 'In Progress' | 'Closed';
};

export type Lawyer = {
  id: string;
  name: string;
  email: string;
  practiceAreas: CaseType[];
  location: string;
  description?: string;
};

export type DocumentType = 
  | 'Engagement Letter'
  | 'Client Intake Form'
  | 'Legal Memorandum'
  | 'Fee Agreement'
  | 'Initial Case Assessment';

export type DocumentSection = {
  title: string;
  content: string;
};

export type LegalDocument = {
  id: string;
  caseId: string;
  documentType: DocumentType;
  sections: DocumentSection[];
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  email: string;
  role: 'lawyer' | 'admin';
};
