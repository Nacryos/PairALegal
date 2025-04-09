
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Index from "./pages/Index";
import LawyerLogin from "./pages/LawyerLogin";
import LawyerDashboard from "./pages/LawyerDashboard";
import CaseDetail from "./pages/CaseDetail";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <NavBar />
            <main className="flex-1 bg-gray-50">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/lawyer-login" element={<LawyerLogin />} />
                <Route path="/lawyer-dashboard" element={<LawyerDashboard />} />
                <Route path="/case/:caseId" element={<CaseDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <footer className="py-4 bg-white border-t text-center text-xs text-gray-500">
              © 2025 Legal Match & Draft AI MVP. Not for production use.
            </footer>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
