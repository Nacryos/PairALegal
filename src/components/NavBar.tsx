
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Scale, User, LogOut } from "lucide-react";

const NavBar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="bg-white shadow-md relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-100 rounded-full w-[80%] h-[80%] mx-auto blur-3xl opacity-30"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Scale className="h-8 w-8 mr-2 text-legal-primary" />
              <span className="text-3xl font-bold text-legal-primary">PairALegal</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-legal-primary" />
                  <span className="hidden md:inline text-legal-primary">{user?.email}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={logout}
                  className="text-legal-primary hover:bg-legal-secondary hover:text-white"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  <span className="hidden md:inline">Logout</span>
                </Button>
              </>
            ) : (
              <Link to="/lawyer-login">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-legal-primary text-legal-primary bg-white hover:bg-legal-secondary hover:text-white"
                >
                  Lawyer Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
