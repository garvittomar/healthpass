import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Heart, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

interface LoginPageProps {
  role: "worker" | "hospital";
}

const LoginPage: React.FC<LoginPageProps> = ({ role }) => {
  const navigate = useNavigate();
  const { login, requestOtp } = useAuth();
  const [step, setStep] = useState<"credentials" | "otp">("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const { verifyOtp } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast.error("Please fill in all fields"); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    login(role, role === "worker" ? "Rajesh Kumar" : "Dr. Ananya Mehta");
    requestOtp(email);
    toast.success("OTP sent to " + email);
    setStep("otp");
    setLoading(false);
  };

  const handleOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    if (verifyOtp(otp)) {
      toast.success("Verified! Welcome back.");
      navigate(role === "worker" ? "/worker/dashboard" : "/hospital/dashboard");
    } else {
      toast.error("Invalid OTP. Enter any 6 digits.");
    }
    setLoading(false);
  };

  const isWorker = role === "worker";

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
        <div className="bg-card rounded-2xl shadow-elevated p-8 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="h-6 w-6 text-primary" fill="currentColor" />
            <span className="font-display font-bold text-lg text-foreground">HealthPass</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-1">
            {isWorker ? "Worker" : "Hospital"} Login
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            {step === "credentials" ? "Enter your credentials to continue" : "Enter the 6-digit OTP sent to your email"}
          </p>

          {step === "credentials" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">{isWorker ? "Phone or Email" : "Hospital Email"}</Label>
                <Input id="email" placeholder={isWorker ? "+91 98765 43210" : "doctor@hospital.com"} value={email} onChange={e => setEmail(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="mt-1.5" />
              </div>
              <Button type="submit" className="w-full gradient-primary text-primary-foreground" disabled={loading}>
                {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />} Continue
              </Button>
            </form>
          ) : (
            <form onSubmit={handleOtp} className="space-y-4">
              <div>
                <Label htmlFor="otp">One-Time Password</Label>
                <Input id="otp" placeholder="123456" maxLength={6} value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ""))} className="mt-1.5 text-center text-xl tracking-[0.5em] font-mono" />
                <p className="text-xs text-muted-foreground mt-2">Demo: enter any 6 digits</p>
              </div>
              <Button type="submit" className="w-full gradient-primary text-primary-foreground" disabled={loading}>
                {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />} Verify & Login
              </Button>
              <Button type="button" variant="ghost" className="w-full text-muted-foreground" onClick={() => setStep("credentials")}>
                Back
              </Button>
            </form>
          )}

          {step === "credentials" && isWorker && (
            <p className="text-center text-sm text-muted-foreground mt-4">
              New worker?{" "}
              <Link to="/worker/signup" className="text-primary font-medium hover:underline">Sign up here</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
