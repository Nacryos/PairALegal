
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Scale, User, LogOut } from "lucide-react";

const NavBar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="bg-legal-primary text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Scale className="h-8 w-8 mr-2" />
              <span className="text-3xl font-bold">PairALegal</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  <span className="hidden md:inline">{user?.email}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={logout}
                  className="text-white hover:bg-legal-secondary"
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
                  className="border-white text-legal-primary bg-white hover:bg-legal-secondary hover:text-white"
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
