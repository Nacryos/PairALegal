
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "../contexts/AuthContext";
import { mockCases, mockLawyers } from "../data/mock-data";
import { ClientCase } from "../types";
import DocumentDrafter from "../components/DocumentDrafter";
import { ArrowLeft, Calendar, MapPin, User, Mail, DollarSign } from "lucide-react";
import { formatDate, getBudgetColor } from "../utils/helpers";

const CaseDetail = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [caseDetails, setCaseDetails] = useState<ClientCase | null>(null);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/lawyer-login");
      return;
    }
    
    // Get case details
    if (caseId) {
      const foundCase = mockCases.find(c => c.id === caseId);
      if (foundCase) {
        setCaseDetails(foundCase);
      } else {
        navigate("/lawyer-dashboard");
      }
    }
  }, [caseId, isAuthenticated, navigate]);
  
  if (!caseDetails) {
    return <div className="p-8 text-center">Loading case details...</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6">
        <Link 
          to="/lawyer-dashboard" 
          className="inline-flex items-center text-legal-primary hover:text-legal-secondary"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>
      </div>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-legal-primary mb-2">
          {caseDetails.caseType} Matter
        </h1>
        <div className="flex flex-wrap items-center text-gray-600 gap-x-4 gap-y-2">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Submitted on {formatDate(caseDetails.submissionDate)}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{caseDetails.location}</span>
          </div>
          <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${getBudgetColor(caseDetails.budgetSensitivity)}`}>
            <div className="flex items-center">
              <DollarSign className="h-3 w-3 mr-1" />
              <span>Budget Sensitivity: {caseDetails.budgetSensitivity}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-legal-primary">Case Summary</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Client Description</div>
                  <div className="text-gray-800 p-3 bg-gray-50 rounded-md">
                    {caseDetails.description}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Case Type</div>
                  <div className="text-gray-800">{caseDetails.caseType}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Client Contact</div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="text-gray-800">{caseDetails.email}</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="text-sm font-medium text-gray-500 mb-2">Notes</div>
                  <p className="text-gray-600 text-sm">
                    This is an initial case submission. Review the details and use the document drafter
                    to prepare preliminary documents if you wish to proceed with this client.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-legal-primary">Actions</h2>
              <div className="space-y-3">
                <Button className="w-full bg-legal-primary hover:bg-legal-secondary">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Client
                </Button>
                <Button variant="outline" className="w-full">
                  Save for Later
                </Button>
              </div>
              <div className="mt-4 text-xs text-gray-500">
                <p>
                  ⓘ Client contact will be facilitated outside this platform. 
                  This will not establish an attorney-client relationship automatically.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content area */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="document-drafter" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="document-drafter">Document Drafter</TabsTrigger>
              <TabsTrigger value="notes">Case Notes</TabsTrigger>
            </TabsList>
            
            <div className="mt-6">
              <TabsContent value="document-drafter" className="mt-0">
                <DocumentDrafter caseDetails={caseDetails} />
              </TabsContent>
              
              <TabsContent value="notes" className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4 text-legal-primary">Case Notes</h2>
                    <p className="text-gray-600 mb-4">
                      No notes have been added to this case yet.
                    </p>
                    <div className="bg-gray-50 p-4 rounded-md text-center text-gray-500">
                      Case notes functionality will be available in a future update.
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CaseDetail;
