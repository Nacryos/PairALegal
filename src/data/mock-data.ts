
import { ClientCase, Lawyer, LegalDocument, User, DocumentType } from '../types';

// Mock Lawyers
export const mockLawyers: Lawyer[] = [
  {
    id: 'law1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@legalmatch.com',
    practiceAreas: ['Business Law', 'Intellectual Property'],
    location: 'New York, NY',
    description: 'Specializing in startup business formation and intellectual property protection.'
  },
  {
    id: 'law2',
    name: 'Michael Chen',
    email: 'michael.chen@legalmatch.com',
    practiceAreas: ['Family Law', 'Estate Planning'],
    location: 'San Francisco, CA',
    description: 'Experienced in family law matters and comprehensive estate planning.'
  },
  {
    id: 'law3',
    name: 'David Rodriguez',
    email: 'david.rodriguez@legalmatch.com',
    practiceAreas: ['Criminal Law', 'Personal Injury'],
    location: 'Chicago, IL',
    description: 'Former prosecutor with extensive trial experience.'
  },
];

// Mock Client Cases
export const mockCases: ClientCase[] = [
  {
    id: 'case1',
    description: 'I need help forming an LLC for my new tech startup and protecting our proprietary software.',
    caseType: 'Business Law',
    location: 'New York, NY',
    budgetSensitivity: 'Medium',
    email: 'entrepreneur@example.com',
    submissionDate: '2025-04-05',
    status: 'Matched'
  },
  {
    id: 'case2',
    description: 'I\'m going through a divorce and need assistance with child custody arrangements and property division.',
    caseType: 'Family Law',
    location: 'San Francisco, CA',
    budgetSensitivity: 'High',
    email: 'parent@example.com',
    submissionDate: '2025-04-06',
    status: 'Pending'
  },
  {
    id: 'case3',
    description: 'I was arrested for DUI and need legal representation. First offense.',
    caseType: 'Criminal Law',
    location: 'Chicago, IL',
    budgetSensitivity: 'Medium',
    email: 'defendant@example.com',
    submissionDate: '2025-04-07',
    status: 'Matched'
  },
  {
    id: 'case4',
    description: 'Our company is negotiating a complex SaaS licensing agreement with a major client. Need review and guidance.',
    caseType: 'Business Law',
    location: 'New York, NY',
    budgetSensitivity: 'Low',
    email: 'bizowner@example.com',
    submissionDate: '2025-04-08',
    status: 'Pending'
  },
];

// Mock documents with sections
export const getDocumentTemplate = (documentType: DocumentType, caseId: string): LegalDocument => {
  const now = new Date().toISOString();
  
  const templates: Record<DocumentType, LegalDocument> = {
    'Engagement Letter': {
      id: `doc-${Math.random().toString(36).substr(2, 9)}`,
      caseId,
      documentType: 'Engagement Letter',
      sections: [
        {
          title: 'Introduction',
          content: 'This letter sets forth the terms of our engagement as legal counsel.'
        },
        {
          title: 'Scope of Services',
          content: 'Our representation will consist of the following: [Scope to be defined]'
        },
        {
          title: 'Fees and Costs',
          content: 'Our fees for legal services are based on [Fee structure to be defined]'
        },
        {
          title: 'Client Responsibilities',
          content: 'To assist us in representing you effectively, you agree to: [Responsibilities to be defined]'
        },
        {
          title: 'Conclusion',
          content: 'If you agree with these terms, please sign and return this letter.'
        }
      ],
      createdAt: now,
      updatedAt: now
    },
    'Client Intake Form': {
      id: `doc-${Math.random().toString(36).substr(2, 9)}`,
      caseId,
      documentType: 'Client Intake Form',
      sections: [
        {
          title: 'Client Information',
          content: '• Full Name:\n• Contact Information:\n• Preferred Contact Method:'
        },
        {
          title: 'Matter Information',
          content: '• Brief Description of Legal Issue:\n• When did this issue begin?\n• Are there any deadlines we should be aware of?'
        },
        {
          title: 'Conflicts Check',
          content: '• Please list any adverse parties related to this matter:\n• Please list any related entities or individuals:'
        }
      ],
      createdAt: now,
      updatedAt: now
    },
    'Legal Memorandum': {
      id: `doc-${Math.random().toString(36).substr(2, 9)}`,
      caseId,
      documentType: 'Legal Memorandum',
      sections: [
        {
          title: 'Issue',
          content: 'The legal question to be addressed is [Issue to be defined]'
        },
        {
          title: 'Brief Answer',
          content: '[Summary answer to be provided]'
        },
        {
          title: 'Facts',
          content: '[Relevant facts to be outlined]'
        },
        {
          title: 'Discussion',
          content: '[Legal analysis to be provided]'
        },
        {
          title: 'Conclusion',
          content: '[Conclusion based on analysis]'
        }
      ],
      createdAt: now,
      updatedAt: now
    },
    'Fee Agreement': {
      id: `doc-${Math.random().toString(36).substr(2, 9)}`,
      caseId,
      documentType: 'Fee Agreement',
      sections: [
        {
          title: 'Parties',
          content: 'This agreement is between [Law Firm] and [Client Name]'
        },
        {
          title: 'Fee Structure',
          content: '[Fee structure details to be defined]'
        },
        {
          title: 'Billing Practices',
          content: '[Billing frequency and policies]'
        },
        {
          title: 'Retainer',
          content: '[Retainer requirements and handling]'
        },
        {
          title: 'Signatures',
          content: '[Signature blocks]'
        }
      ],
      createdAt: now,
      updatedAt: now
    },
    'Initial Case Assessment': {
      id: `doc-${Math.random().toString(36).substr(2, 9)}`,
      caseId,
      documentType: 'Initial Case Assessment',
      sections: [
        {
          title: 'Client Objective',
          content: '[Client\'s stated goals]'
        },
        {
          title: 'Key Facts',
          content: '[Relevant facts of the case]'
        },
        {
          title: 'Legal Issues',
          content: '[Identified legal issues]'
        },
        {
          title: 'Potential Strategies',
          content: '[Initial strategic options]'
        },
        {
          title: 'Next Steps',
          content: '[Recommended immediate actions]'
        }
      ],
      createdAt: now,
      updatedAt: now
    }
  };

  return templates[documentType];
};

// Mock User (for lawyer login)
export const mockUsers: User[] = [
  {
    id: 'law1',
    email: 'sarah.johnson@legalmatch.com',
    role: 'lawyer'
  },
  {
    id: 'law2',
    email: 'michael.chen@legalmatch.com',
    role: 'lawyer'
  },
  {
    id: 'law3',
    email: 'david.rodriguez@legalmatch.com',
    role: 'lawyer'
  },
  {
    id: 'admin1',
    email: 'admin@legalmatch.com',
    role: 'admin'
  }
];

// Helper function to filter cases based on lawyer profile
export const getMatchedCasesForLawyer = (lawyerId: string): ClientCase[] => {
  const lawyer = mockLawyers.find(l => l.id === lawyerId);
  if (!lawyer) return [];
  
  return mockCases.filter(c => 
    lawyer.practiceAreas.includes(c.caseType) && 
    lawyer.location === c.location
  );
};
