
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "../contexts/AuthContext";
import { ClientCase, Lawyer } from "../types";
import { getMatchedCasesForLawyer, mockLawyers } from "../data/mock-data";
import CaseList from "../components/CaseList";
import { BriefcaseIcon, InboxIcon, UserIcon, MapPinIcon } from "lucide-react";

const LawyerDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [lawyer, setLawyer] = useState<Lawyer | null>(null);
  const [matchedCases, setMatchedCases] = useState<ClientCase[]>([]);
  const [activeTab, setActiveTab] = useState("cases");
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/lawyer-login");
      return;
    }
    
    if (user) {
      // Find lawyer details based on user ID
      const lawyerDetails = mockLawyers.find(l => l.id === user.id);
      setLawyer(lawyerDetails || null);
      
      // Get matched cases
      const cases = getMatchedCasesForLawyer(user.id);
      setMatchedCases(cases);
    }
  }, [user, isAuthenticated, navigate]);

  if (!lawyer) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-legal-primary mb-2">Lawyer Dashboard</h1>
        <p className="text-gray-600">
          Manage your matched cases and create legal documents
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-legal-primary font-medium text-lg">
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <div className="bg-legal-primary text-white p-3 rounded-full mr-4">
                  <UserIcon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold">{lawyer.name}</p>
                  <p className="text-sm text-gray-500">{lawyer.email}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start">
                  <MapPinIcon className="h-5 w-5 text-legal-primary mr-2 mt-0.5" />
                  <span>{lawyer.location}</span>
                </div>
                
                <div className="flex items-start">
                  <BriefcaseIcon className="h-5 w-5 text-legal-primary mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium mb-1">Practice Areas</p>
                    <ul className="space-y-1">
                      {lawyer.practiceAreas.map((area, i) => (
                        <li key={i} className="text-sm">• {area}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-gray-600">
                  {lawyer.description || "Legal professional specializing in various practice areas."}
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-legal-primary font-medium text-lg">
                Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-gray-600">Matched Cases</div>
                  <div className="font-semibold">{matchedCases.length}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-gray-600">Documents Created</div>
                  <div className="font-semibold">0</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-gray-600">Engagement Rate</div>
                  <div className="font-semibold">0%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content area */}
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="cases" className="flex items-center">
                <InboxIcon className="h-4 w-4 mr-2" />
                Matched Cases
              </TabsTrigger>
              <TabsTrigger value="documents" className="flex items-center">
                <BriefcaseIcon className="h-4 w-4 mr-2" />
                My Documents
              </TabsTrigger>
            </TabsList>
            
            <div className="mt-6">
              <TabsContent value="cases" className="mt-0">
                {matchedCases.length > 0 ? (
                  <CaseList 
                    cases={matchedCases} 
                    title="Cases Matched to Your Profile" 
                  />
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <InboxIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-medium mb-2">No Matched Cases Yet</h3>
                      <p className="text-gray-600">
                        When clients submit cases matching your profile, they will appear here.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="documents" className="mt-0">
                <Card>
                  <CardContent className="p-8 text-center">
                    <BriefcaseIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">Your Document Library</h3>
                    <p className="text-gray-600 mb-6">
                      Documents you create for your cases will appear here.
                    </p>
                    <p className="text-sm text-gray-500">
                      To create a document, navigate to a case and use the document drafter tool.
                    </p>
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

export default LawyerDashboard;
