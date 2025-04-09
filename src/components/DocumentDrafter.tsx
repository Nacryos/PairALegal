import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { DocumentType, LegalDocument, DocumentSection, ClientCase } from "../types";
import { documentService } from "../services/documentService";
import { Sparkles, Copy, Save, Download, RefreshCw } from "lucide-react";
import { getDocumentIcon } from "../utils/helpers";

interface DocumentDrafterProps {
  caseDetails: ClientCase;
}

const DOCUMENT_TYPES: DocumentType[] = [
  "Engagement Letter",
  "Client Intake Form",
  "Legal Memorandum",
  "Fee Agreement",
  "Initial Case Assessment",
];

const DocumentDrafter = ({ caseDetails }: DocumentDrafterProps) => {
  const [documentType, setDocumentType] = useState<DocumentType>(DOCUMENT_TYPES[0]);
  const [document, setDocument] = useState<LegalDocument | null>(null);
  const [activeTab, setActiveTab] = useState("draft");
  const [editingSectionIndex, setEditingSectionIndex] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!documentType || !caseDetails) return;
    
    const savedDocuments = documentService.getDocumentsForCase(caseDetails.id);
    const existingDoc = savedDocuments.find(doc => doc.documentType === documentType);
    
    if (existingDoc) {
      setDocument(existingDoc);
    } else {
      const newDocument = documentService.getTemplate(documentType, caseDetails.id);
      setDocument(newDocument);
      documentService.saveDocument(newDocument);
    }
  }, [documentType, caseDetails]);

  const handleDocumentTypeChange = (value: string) => {
    setDocumentType(value as DocumentType);
    setEditingSectionIndex(null);
  };

  const startEditing = (index: number) => {
    if (!document) return;
    setEditingSectionIndex(index);
    setEditContent(document.sections[index].content);
  };

  const saveEdits = () => {
    if (!document || editingSectionIndex === null) return;
    
    const updatedDocument = documentService.updateSection(
      document,
      editingSectionIndex,
      editContent
    );
    
    setDocument(updatedDocument);
    setEditingSectionIndex(null);
    setEditContent("");
    
    toast({
      title: "Section updated",
      description: "Your changes have been saved",
    });
  };

  const cancelEditing = () => {
    setEditingSectionIndex(null);
    setEditContent("");
  };

  const generateContent = async (index: number) => {
    if (!document) return;
    
    setIsGenerating(true);
    setEditingSectionIndex(index);
    
    try {
      const sectionTitle = document.sections[index].title;
      const caseContext = `${caseDetails.caseType} case: ${caseDetails.description}`;
      const existingContent = document.sections[index].content;
      
      const generatedContent = await documentService.generateSectionContent(
        sectionTitle,
        caseContext,
        existingContent
      );
      
      setEditContent(generatedContent);
      
      toast({
        title: "AI content generated",
        description: "Review and save the suggested content",
      });
    } catch (error) {
      console.error("Error generating content:", error);
      toast({
        title: "Generation failed",
        description: "Unable to generate content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (!document) return;
    
    const text = document.sections.map(section => 
      `## ${section.title}\n\n${section.content}\n\n`
    ).join('');
    
    navigator.clipboard.writeText(text);
    
    toast({
      title: "Copied to clipboard",
      description: "Document content has been copied",
    });
  };

  const downloadDocument = () => {
    if (!document) return;
    
    const text = document.sections.map(section => 
      `## ${section.title}\n\n${section.content}\n\n`
    ).join('');
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `${document.documentType.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
    window.document.body.appendChild(a);
    a.click();
    window.document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderSection = (section: DocumentSection, index: number) => {
    const isEditing = editingSectionIndex === index;
    
    return (
      <Card key={index} className="mb-6">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-legal-primary">{section.title}</h3>
            {!isEditing && (
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => startEditing(index)}
                  className="text-xs"
                >
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => generateContent(index)}
                  disabled={isGenerating}
                  className="text-xs flex items-center"
                >
                  {isGenerating && editingSectionIndex === index ? (
                    <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                  ) : (
                    <Sparkles className="h-3 w-3 mr-1" />
                  )}
                  AI Draft
                </Button>
              </div>
            )}
          </div>
          
          {isEditing ? (
            <div className="space-y-4">
              <Textarea 
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="min-h-[150px]"
              />
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={cancelEditing}
                >
                  Cancel
                </Button>
                <Button 
                  size="sm" 
                  onClick={saveEdits}
                  className="bg-legal-primary hover:bg-legal-secondary"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <div className="whitespace-pre-wrap text-sm">
              {section.content || (
                <span className="text-gray-400 italic">
                  Click "Edit" to add content or "AI Draft" for AI-generated suggestions
                </span>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  if (!document) {
    return <div className="p-8 text-center">Loading document...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-semibold text-legal-primary">Document Drafter</h2>
        
        <div className="w-full md:w-auto">
          <Select value={documentType} onValueChange={handleDocumentTypeChange}>
            <SelectTrigger className="w-full md:w-[240px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DOCUMENT_TYPES.map(type => (
                <SelectItem key={type} value={type}>
                  <div className="flex items-center">
                    <span className="mr-2">{getDocumentIcon(type)}</span>
                    {type}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b">
            <div className="flex items-center justify-between px-4">
              <TabsList className="h-12">
                <TabsTrigger value="draft" className="data-[state=active]:text-legal-primary">
                  Document Draft
                </TabsTrigger>
                <TabsTrigger value="preview" className="data-[state=active]:text-legal-primary">
                  Preview
                </TabsTrigger>
              </TabsList>
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={copyToClipboard}
                  className="text-legal-primary border-legal-primary"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={downloadDocument}
                  className="text-legal-primary border-legal-primary"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <TabsContent value="draft" className="mt-0">
              <div>
                {document.sections.map((section, index) => 
                  renderSection(section, index)
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="preview" className="mt-0">
              <div className="prose max-w-none">
                <h1 className="text-2xl font-bold mb-6 text-legal-primary text-center">
                  {document.documentType}
                </h1>
                
                {document.sections.map((section, index) => (
                  <div key={index} className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-legal-primary">
                      {section.title}
                    </h2>
                    <div className="whitespace-pre-wrap">
                      {section.content || "[No content yet]"}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      <div className="text-xs text-gray-500 mt-4">
        <strong>Disclaimer:</strong> This AI-assisted drafting tool provides general templates and suggestions only. 
        All documents should be reviewed by a licensed attorney before use. Documents created using this tool 
        may need significant modifications to address your specific legal situation.
      </div>
    </div>
  );
};

export default DocumentDrafter;
