import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth-context";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import WorkerSignup from "./pages/WorkerSignup";
import WorkerDashboard from "./pages/WorkerDashboard";
import HospitalDashboard from "./pages/HospitalDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/worker/login" element={<LoginPage role="worker" />} />
            <Route path="/worker/signup" element={<WorkerSignup />} />
            <Route path="/worker/dashboard" element={<WorkerDashboard />} />
            <Route path="/hospital/login" element={<LoginPage role="hospital" />} />
            <Route path="/hospital/dashboard" element={<HospitalDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
