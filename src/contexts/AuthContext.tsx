
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { mockUsers } from "../data/mock-data";
import { User } from "../types";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('legalMatchUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // For MVP, we're just checking if the email exists in our mock data
    // and using any password (no password check in MVP)
    const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('legalMatchUser', JSON.stringify(foundUser));
      toast({
        title: "Login successful",
        description: `Welcome back${foundUser.role === 'lawyer' ? ', counselor' : ''}!`,
      });
      return true;
    }
    
    toast({
      title: "Login failed",
      description: "Invalid email or password. Please try again.",
      variant: "destructive"
    });
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('legalMatchUser');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
