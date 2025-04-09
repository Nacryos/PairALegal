
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
      {/* Abstract gradient background inspired by Stripe */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-[100%] bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-pink-500/30"></div>
        <div className="absolute top-[-10%] left-[-5%] w-[70%] h-[60%] rounded-full bg-blue-400/10 blur-[120px]"></div>
        <div className="absolute top-[30%] right-[-5%] w-[50%] h-[60%] rounded-full bg-violet-500/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] rounded-full bg-cyan-400/10 blur-[120px]"></div>
      </div>
      
      {/* Empty container to showcase just the background */}
      <div className="container mx-auto px-4 py-16 md:py-32 min-h-screen">
        {/* Intentionally left empty to display only the background */}
      </div>
    </div>
  );
};

export default Index;
