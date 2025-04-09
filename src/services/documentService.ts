
import { DocumentSection, LegalDocument, DocumentType } from "../types";
import { storeData, retrieveData, generateId } from "../utils/helpers";
import { getDocumentTemplate } from "../data/mock-data";

// In a real implementation, this would connect to an LLM API
// For the MVP, we'll simulate AI generation with pre-written text
const simulateAiGeneration = (prompt: string, context: string): string => {
  // Simple mock responses based on the section being drafted
  if (prompt.toLowerCase().includes('introduction')) {
    return `This engagement letter confirms that [Client Name] has engaged [Law Firm Name] to provide legal services related to [brief matter description] as described in more detail below.`;
  } 
  else if (prompt.toLowerCase().includes('scope')) {
    return `Our representation will include the following services:\n\n1. Review and analysis of relevant documents\n2. Legal research related to [specific issues]\n3. Preparation of necessary legal documents\n4. Communication with relevant parties\n5. Representation in [specific proceedings/negotiations] as needed\n\nThis engagement does not include:\n- Representation in matters not specifically described above\n- Appeals of any decisions\n- Services related to tax consequences`;
  }
  else if (prompt.toLowerCase().includes('fees')) {
    return `Our fees for legal services will be calculated at the rate of $[X] per hour. You will be billed monthly for services rendered and expenses incurred. Payment is due within 30 days of the date of our invoice.\n\nIn addition to our fees, you will be responsible for expenses incurred on your behalf, including but not limited to filing fees, court costs, travel expenses, copying charges, and other necessary expenditures.`;
  }
  else if (prompt.toLowerCase().includes('client')) {
    return `To assist us in representing you effectively, you agree to:\n\n1. Provide all relevant information and documents promptly\n2. Be truthful and complete in all communications\n3. Cooperate in preparing for meetings, hearings, or other proceedings\n4. Notify us promptly of any changes in contact information\n5. Pay invoices in a timely manner`;
  }
  else if (prompt.toLowerCase().includes('conclusion')) {
    return `If the terms of this engagement are acceptable to you, please sign and return this letter. We look forward to working with you on this matter.\n\nSincerely,\n\n[Lawyer Name]\n[Law Firm]\n\nI agree to the terms of this engagement letter:\n\n_______________________\n[Client Name]\nDate: ________________`;
  }
  else {
    return `Based on the information provided regarding ${context}, here's a draft for your consideration:\n\n${prompt}\n\nThis content addresses the key aspects of your request while maintaining compliance with standard legal practices. You may want to customize specific details to match your client's unique circumstances.`;
  }
};

// Service to manage document drafting
export const documentService = {
  // Get a document template
  getTemplate(documentType: DocumentType, caseId: string): LegalDocument {
    return getDocumentTemplate(documentType, caseId);
  },
  
  // Save a document to local storage
  saveDocument(document: LegalDocument): LegalDocument {
    const savedDocuments = retrieveData<LegalDocument[]>('legalDraftDocuments', []);
    const existingIndex = savedDocuments.findIndex(doc => doc.id === document.id);
    
    document.updatedAt = new Date().toISOString();
    
    if (existingIndex >= 0) {
      savedDocuments[existingIndex] = document;
    } else {
      document.id = document.id || `doc-${generateId()}`;
      document.createdAt = document.createdAt || new Date().toISOString();
      savedDocuments.push(document);
    }
    
    storeData('legalDraftDocuments', savedDocuments);
    return document;
  },
  
  // Get a document by ID
  getDocument(documentId: string): LegalDocument | null {
    const savedDocuments = retrieveData<LegalDocument[]>('legalDraftDocuments', []);
    return savedDocuments.find(doc => doc.id === documentId) || null;
  },
  
  // Get documents for a specific case
  getDocumentsForCase(caseId: string): LegalDocument[] {
    const savedDocuments = retrieveData<LegalDocument[]>('legalDraftDocuments', []);
    return savedDocuments.filter(doc => doc.caseId === caseId);
  },
  
  // Delete a document
  deleteDocument(documentId: string): boolean {
    const savedDocuments = retrieveData<LegalDocument[]>('legalDraftDocuments', []);
    const newDocuments = savedDocuments.filter(doc => doc.id !== documentId);
    storeData('legalDraftDocuments', newDocuments);
    return newDocuments.length < savedDocuments.length;
  },
  
  // Generate AI content for a section
  generateSectionContent(
    sectionTitle: string,
    caseContext: string,
    existingContent?: string
  ): Promise<string> {
    // This would call an LLM API in a real implementation
    // For MVP, we're using a simple simulation function
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        const prompt = existingContent || sectionTitle;
        const generatedContent = simulateAiGeneration(prompt, caseContext);
        resolve(generatedContent);
      }, 1000);
    });
  },
  
  // Update a specific section in a document
  updateSection(
    document: LegalDocument,
    sectionIndex: number,
    newContent: string
  ): LegalDocument {
    const updatedDocument = { ...document };
    if (updatedDocument.sections && updatedDocument.sections[sectionIndex]) {
      updatedDocument.sections = [...updatedDocument.sections];
      updatedDocument.sections[sectionIndex] = {
        ...updatedDocument.sections[sectionIndex],
        content: newContent
      };
      updatedDocument.updatedAt = new Date().toISOString();
    }
    return this.saveDocument(updatedDocument);
  }
};
