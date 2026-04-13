import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Heart, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

const SignupPage = () => {
  const navigate = useNavigate();
  const { login, requestOtp, verifyOtp } = useAuth();
  const [step, setStep] = useState<"info" | "otp">("info");
  const [form, setForm] = useState({ name: "", phone: "", dob: "", idProof: "", password: "" });
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.dob || !form.password) { toast.error("Please fill in all required fields"); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    login("worker", form.name);
    requestOtp(form.phone);
    toast.success("OTP sent to " + form.phone);
    setStep("otp");
    setLoading(false);
  };

  const handleOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    if (verifyOtp(otp)) {
      toast.success("Account created! Your HealthPass ID: HP-2026-0451-RK");
      navigate("/worker/dashboard");
    } else {
      toast.error("Invalid OTP. Enter any 6 digits.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
        <div className="bg-card rounded-2xl shadow-elevated p-8 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="h-6 w-6 text-primary" fill="currentColor" />
            <span className="font-display font-bold text-lg text-foreground">HealthPass</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-1">Create Account</h1>
          <p className="text-sm text-muted-foreground mb-6">
            {step === "info" ? "Register to get your digital HealthPass" : "Verify with the OTP sent to your phone"}
          </p>

          {step === "info" ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><Label>Full Name *</Label><Input placeholder="Rajesh Kumar" value={form.name} onChange={update("name")} className="mt-1.5" /></div>
              <div><Label>Phone Number *</Label><Input placeholder="+91 98765 43210" value={form.phone} onChange={update("phone")} className="mt-1.5" /></div>
              <div><Label>Date of Birth *</Label><Input type="date" value={form.dob} onChange={update("dob")} className="mt-1.5" /></div>
              <div><Label>ID Proof Number</Label><Input placeholder="Aadhaar / Passport" value={form.idProof} onChange={update("idProof")} className="mt-1.5" /></div>
              <div><Label>Password *</Label><Input type="password" placeholder="Min 8 characters" value={form.password} onChange={update("password")} className="mt-1.5" /></div>
              <Button type="submit" className="w-full gradient-primary text-primary-foreground" disabled={loading}>
                {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />} Sign Up & Verify
              </Button>
            </form>
          ) : (
            <form onSubmit={handleOtp} className="space-y-4">
              <div>
                <Label>One-Time Password</Label>
                <Input placeholder="123456" maxLength={6} value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ""))} className="mt-1.5 text-center text-xl tracking-[0.5em] font-mono" />
                <p className="text-xs text-muted-foreground mt-2">Demo: enter any 6 digits</p>
              </div>
              <Button type="submit" className="w-full gradient-primary text-primary-foreground" disabled={loading}>
                {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />} Verify & Create Account
              </Button>
            </form>
          )}

          <p className="text-center text-sm text-muted-foreground mt-4">
            Already have an account?{" "}
            <Link to="/worker/login" className="text-primary font-medium hover:underline">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
