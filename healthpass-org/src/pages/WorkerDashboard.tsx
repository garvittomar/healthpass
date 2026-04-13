import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, LogOut, QrCode, FileText, Shield, Activity, Upload, AlertTriangle, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { mockWorker } from "@/lib/mock-data";
import WorkerHealthSummary from "@/components/worker/HealthSummary";
import WorkerQRCode from "@/components/worker/QRCodeCard";
import WorkerDocuments from "@/components/worker/Documents";
import WorkerConsent from "@/components/worker/ConsentManager";
import WorkerEmergency from "@/components/worker/EmergencyCard";

type Tab = "summary" | "qr" | "documents" | "consent" | "emergency";

const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
  { key: "summary", label: "Health Summary", icon: Activity },
  { key: "qr", label: "My QR Code", icon: QrCode },
  { key: "documents", label: "Documents", icon: FileText },
  { key: "consent", label: "Consent", icon: Shield },
  { key: "emergency", label: "Emergency", icon: AlertTriangle },
];

const WorkerDashboard = () => {
  const { logout, userName } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("summary");
  const [mobileNav, setMobileNav] = useState(false);

  const handleLogout = () => { logout(); navigate("/"); };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" fill="currentColor" />
            <span className="font-display font-bold text-foreground">HealthPass</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium ml-2 hidden sm:inline">Worker</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">Hi, {userName || mockWorker.name}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground"><LogOut className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileNav(!mobileNav)}>
              {mobileNav ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto flex gap-6 px-4 py-6">
        {/* Sidebar */}
        <aside className={`${mobileNav ? "fixed inset-0 z-40 bg-background pt-16 px-4" : "hidden"} md:block md:static md:w-56 shrink-0`}>
          <nav className="space-y-1">
            {tabs.map(t => (
              <button key={t.key} onClick={() => { setActiveTab(t.key); setMobileNav(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === t.key ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
                <t.icon className="h-4 w-4" /> {t.label}
              </button>
            ))}
          </nav>
          <div className="mt-6 p-3 rounded-lg bg-muted text-xs text-muted-foreground">
            <p className="font-medium text-foreground mb-1">HealthPass ID</p>
            <p className="font-mono">{mockWorker.healthPassId}</p>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0">
          {activeTab === "summary" && <WorkerHealthSummary worker={mockWorker} />}
          {activeTab === "qr" && <WorkerQRCode worker={mockWorker} />}
          {activeTab === "documents" && <WorkerDocuments worker={mockWorker} />}
          {activeTab === "consent" && <WorkerConsent worker={mockWorker} />}
          {activeTab === "emergency" && <WorkerEmergency worker={mockWorker} />}
        </main>
      </div>
    </div>
  );
};

export default WorkerDashboard;
