import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, LogOut, ScanLine, FileText, Pill, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth-context";
import { mockWorker, mockHospitalUser } from "@/lib/mock-data";
import { toast } from "sonner";
import WorkerHealthSummary from "@/components/worker/HealthSummary";

type Tab = "scan" | "patient" | "prescribe";

const HospitalDashboard = () => {
  const { logout, userName } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("scan");
  const [scanned, setScanned] = useState(false);
  const [consented, setConsented] = useState(false);
  const [otp, setOtp] = useState("");
  const [mobileNav, setMobileNav] = useState(false);
  const [rxForm, setRxForm] = useState({ medication: "", dosage: "", notes: "" });

  const handleLogout = () => { logout(); navigate("/"); };

  const handleScan = () => {
    setScanned(true);
    toast.info("QR scanned — requesting consent from " + mockWorker.name);
  };

  const handleConsent = () => {
    if (otp.length !== 6) { toast.error("Enter 6-digit OTP"); return; }
    setConsented(true);
    setTab("patient");
    toast.success("Consent granted — 5 min access window");
  };

  const handlePrescribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rxForm.medication) { toast.error("Enter medication name"); return; }
    toast.success("Prescription added & encrypted for " + mockWorker.name);
    setRxForm({ medication: "", dosage: "", notes: "" });
  };

  const tabs = [
    { key: "scan" as Tab, label: "Scan QR", icon: ScanLine },
    { key: "patient" as Tab, label: "Patient Data", icon: FileText, disabled: !consented },
    { key: "prescribe" as Tab, label: "Add Prescription", icon: Pill, disabled: !consented },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" fill="currentColor" />
            <span className="font-display font-bold text-foreground">HealthPass</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-health-blue/10 text-health-blue font-medium ml-2 hidden sm:inline">Hospital</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">{userName || mockHospitalUser.name}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout}><LogOut className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileNav(!mobileNav)}>
              {mobileNav ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto flex gap-6 px-4 py-6">
        <aside className={`${mobileNav ? "fixed inset-0 z-40 bg-background pt-16 px-4" : "hidden"} md:block md:static md:w-56 shrink-0`}>
          <nav className="space-y-1">
            {tabs.map(t => (
              <button key={t.key} disabled={t.disabled}
                onClick={() => { setTab(t.key); setMobileNav(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${tab === t.key ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
                <t.icon className="h-4 w-4" /> {t.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 min-w-0">
          {tab === "scan" && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">Scan Worker QR</h2>
                <p className="text-sm text-muted-foreground">Scan a worker's QR code to request health data access.</p>
              </div>
              {!scanned ? (
                <div className="bg-card rounded-2xl border-2 border-dashed border-border p-16 text-center shadow-card">
                  <ScanLine className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">Point camera at worker's QR code</p>
                  <Button onClick={handleScan} className="gradient-primary text-primary-foreground">Simulate QR Scan</Button>
                </div>
              ) : !consented ? (
                <div className="bg-card rounded-xl border border-border p-6 shadow-card max-w-md">
                  <p className="text-sm font-medium text-foreground mb-1">Worker: {mockWorker.name}</p>
                  <p className="text-xs text-muted-foreground mb-4">ID: {mockWorker.healthPassId}</p>
                  <p className="text-sm text-muted-foreground mb-3">Consent OTP sent to worker. Enter it below:</p>
                  <div className="flex gap-2">
                    <Input placeholder="6-digit OTP" maxLength={6} value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ""))} className="max-w-40 text-center font-mono" />
                    <Button onClick={handleConsent} className="gradient-primary text-primary-foreground">Verify</Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Demo: enter any 6 digits</p>
                </div>
              ) : (
                <div className="bg-health-green/10 rounded-xl p-4 text-health-green text-sm font-medium">
                  ✓ Consent verified. You have 5-minute access to {mockWorker.name}'s records.
                </div>
              )}
            </div>
          )}

          {tab === "patient" && consented && <WorkerHealthSummary worker={mockWorker} />}

          {tab === "prescribe" && consented && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">Add Prescription</h2>
                <p className="text-sm text-muted-foreground">For {mockWorker.name} ({mockWorker.healthPassId})</p>
              </div>
              <form onSubmit={handlePrescribe} className="bg-card rounded-xl border border-border p-6 shadow-card max-w-lg space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Medication *</label>
                  <Input placeholder="e.g. Amoxicillin 500mg" value={rxForm.medication} onChange={e => setRxForm(f => ({ ...f, medication: e.target.value }))} className="mt-1.5" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Dosage</label>
                  <Input placeholder="e.g. 1 tablet 3x daily" value={rxForm.dosage} onChange={e => setRxForm(f => ({ ...f, dosage: e.target.value }))} className="mt-1.5" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Notes</label>
                  <Input placeholder="Additional instructions" value={rxForm.notes} onChange={e => setRxForm(f => ({ ...f, notes: e.target.value }))} className="mt-1.5" />
                </div>
                <Button type="submit" className="gradient-primary text-primary-foreground">Save Prescription (Encrypted)</Button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default HospitalDashboard;
