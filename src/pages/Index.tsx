
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CaseSubmissionForm from "../components/CaseSubmissionForm";
import { 
  Scale, 
  Search, 
  FileText, 
  Shield, 
  MessageCircle,
  ArrowRight 
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="legal-gradient text-white">
        <div className="container mx-auto px-4 py-16 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Connect with the Right Legal Representation
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                Describe your case. Get matched with suitable lawyers. Let AI help draft your initial legal documents.
              </p>
              <div className="pt-4">
                <Button 
                  size="lg"
                  className="bg-legal-accent text-legal-dark hover:bg-white hover:text-legal-primary transition-colors"
                >
                  <a href="#submit-case" className="flex items-center">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <Scale className="h-8 w-8 mr-3 text-legal-accent" />
                <h2 className="text-xl font-semibold">How It Works</h2>
              </div>
              <div className="space-y-4">
                {[
                  {
                    step: "Describe your legal needs",
                    description: "Fill out a simple form detailing your case type, location, and other key details."
                  },
                  {
                    step: "Get matched with lawyers",
                    description: "Our system connects you with lawyers whose expertise matches your case requirements."
                  },
                  {
                    step: "Lawyers review your case",
                    description: "Matched lawyers can review your case details and choose to contact you."
                  },
                  {
                    step: "Legal document drafting",
                    description: "Lawyers use our AI tool to efficiently draft preliminary legal documents."
                  }
                ].map((item, i) => (
                  <div key={i} className="flex">
                    <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-legal-accent text-legal-dark font-bold text-sm mr-4">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-medium">{item.step}</h3>
                      <p className="text-white/80 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="legal-section bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-legal-primary mb-4">Our Platform Benefits</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Legal Match & Draft AI helps clients find the right legal representation 
              while providing lawyers with efficient document drafting tools.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="h-12 w-12 text-legal-primary" />,
                title: "Smart Matching",
                description: "Connect with lawyers based on case type, location, and other key factors."
              },
              {
                icon: <FileText className="h-12 w-12 text-legal-primary" />,
                title: "AI Document Drafting",
                description: "Lawyers can use our AI tool to efficiently draft preliminary legal documents."
              },
              {
                icon: <Shield className="h-12 w-12 text-legal-primary" />,
                title: "Privacy Protected",
                description: "Your case details are shared only with matched legal professionals."
              }
            ].map((feature, i) => (
              <div 
                key={i} 
                className="bg-legal-light p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-legal-primary">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section id="submit-case" className="legal-section bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-legal-primary mb-4">Submit Your Case</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tell us about your legal needs, and we'll connect you with suitable lawyers.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <CaseSubmissionForm />
          </div>
        </div>
      </section>
      
      <section className="legal-section bg-legal-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Are You a Legal Professional?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join our platform to connect with potential clients and utilize our AI-powered document drafting tools.
          </p>
          <Link to="/lawyer-login">
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-legal-primary"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Lawyer Login
            </Button>
          </Link>
        </div>
      </section>
      
      <footer className="bg-legal-dark text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <Scale className="h-6 w-6 mr-2" />
                <span className="text-xl font-bold">Legal Match & Draft AI</span>
              </div>
              <p className="text-sm opacity-75 mt-2">
                Connecting clients with legal professionals
              </p>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-sm opacity-75">
                © 2025 Legal Match & Draft AI. All rights reserved.
              </p>
              <div className="flex justify-center md:justify-end space-x-4 mt-2">
                <a href="#" className="text-sm hover:underline">Privacy Policy</a>
                <a href="#" className="text-sm hover:underline">Terms of Service</a>
                <a href="#" className="text-sm hover:underline">Contact</a>
              </div>
              <p className="text-xs opacity-75 mt-4">
                This platform does not provide legal advice and is not a substitute for the advice of an attorney.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
