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
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Abstract artwork background */}
      <div className="absolute top-0 left-0 right-0 bottom-0 
        bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 
        blur-[200px] rounded-full 
        opacity-70 -z-10 
        transform scale-125"></div>
      
      {/* Abstract shapes */}
      <div className="absolute top-[5%] right-[15%] w-64 h-64 rounded-full bg-blue-100/50 blur-3xl -z-10"></div>
      <div className="absolute top-[30%] left-[10%] w-96 h-96 rounded-full bg-blue-200/40 blur-3xl -z-10"></div>
      <div className="absolute bottom-[20%] right-[5%] w-80 h-80 rounded-full bg-blue-100/50 blur-3xl -z-10"></div>
      <div className="absolute -bottom-[10%] left-[25%] w-72 h-72 rounded-full bg-blue-300/30 blur-3xl -z-10"></div>
      
      {/* Diagonal lines */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-10">
        <div className="absolute top-[10%] left-0 w-full h-0.5 bg-legal-primary/20 transform -rotate-[30deg]"></div>
        <div className="absolute top-[30%] left-0 w-full h-0.5 bg-legal-primary/10 transform -rotate-[15deg]"></div>
        <div className="absolute top-[70%] left-0 w-full h-0.5 bg-legal-primary/20 transform -rotate-[45deg]"></div>
      </div>
      
      <section className="legal-gradient text-white">
        <div className="container mx-auto px-4 py-16 md:py-32 bg-white relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-100 rounded-full blur-3xl opacity-40 -z-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-legal-primary">
                Connect with the Right Legal Representation
              </h1>
              <p className="text-lg md:text-xl opacity-90 text-legal-primary">
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
            
            <div className="backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <Scale className="h-8 w-8 mr-3 text-legal-accent" />
                <h2 className="text-xl font-semibold text-legal-primary">How It Works</h2>
              </div>
              <div className="space-y-6">
                {[
                  {
                    step: "Describe your legal needs",
                    description: "Fill out a simple form detailing your case type, location, and other key details."
                  },
                  {
                    step: "Get matched with lawyers",
                    description: "We will connect you to lawyers with the best expertise in your case domain."
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
                      <h3 className="font-medium text-legal-primary">{item.step}</h3>
                      <p className="text-legal-primary text-sm">{item.description}</p>
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
            <p className="text-xl text-legal-primary max-w-3xl mx-auto">
              PairALegal helps clients find the right legal representation 
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
                <p className="text-legal-primary">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section id="submit-case" className="legal-section bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-legal-primary mb-4">Submit Your Case</h2>
            <p className="text-xl text-legal-primary max-w-2xl mx-auto">
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
          <h2 className="text-3xl font-bold mb-6 text-white">Are You a Legal Professional?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto text-white">
            Join our platform to connect with potential clients and utilize our AI-powered document drafting tools.
          </p>
          <Link to="/lawyer-login">
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-legal-primary bg-white hover:bg-legal-secondary hover:text-white"
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
                <span className="text-xl font-bold">PairALegal</span>
              </div>
              <p className="text-sm opacity-75 mt-2">
                Connecting clients with legal professionals
              </p>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-sm opacity-75">
                © 2025 PairALegal. All rights reserved.
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
