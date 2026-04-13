import React, { useState } from "react";
import { Shield, Check, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Worker } from "@/lib/mock-data";
import { toast } from "sonner";

const statusStyles = {
  pending: "bg-accent/20 text-accent-foreground",
  approved: "bg-health-green/10 text-health-green",
  rejected: "bg-destructive/10 text-destructive",
};
const statusIcons = { pending: Clock, approved: Check, rejected: X };

const WorkerConsent: React.FC<{ worker: Worker }> = ({ worker }) => {
  const [requests, setRequests] = useState(worker.consentRequests);
  const [otpFor, setOtpFor] = useState<string | null>(null);
  const [otp, setOtp] = useState("");

  const handleApprove = (id: string) => {
    if (otp.length !== 6) { toast.error("Enter a 6-digit OTP"); return; }
    setRequests(r => r.map(req => req.id === id ? { ...req, status: "approved" as const, expiresAt: new Date(Date.now() + 5 * 60000).toISOString() } : req));
    setOtpFor(null); setOtp("");
    toast.success("Access granted for 5 minutes");
  };

  const handleReject = (id: string) => {
    setRequests(r => r.map(req => req.id === id ? { ...req, status: "rejected" as const } : req));
    toast("Access rejected");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">Consent Approvals</h2>
        <p className="text-sm text-muted-foreground">Manage hospital access to your health data.</p>
      </div>
      <div className="space-y-3">
        {requests.map(req => {
          const Icon = statusIcons[req.status];
          return (
            <div key={req.id} className="bg-card rounded-xl border border-border p-5 shadow-card">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{req.hospital}</p>
                    <p className="text-xs text-muted-foreground">{new Date(req.requestedAt).toLocaleString()}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[req.status]}`}>
                  <Icon className="h-3 w-3" /> {req.status}
                </span>
              </div>
              {req.status === "pending" && (
                otpFor === req.id ? (
                  <div className="flex items-center gap-2 mt-2">
                    <Input placeholder="Enter OTP" maxLength={6} value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ""))} className="max-w-32 text-center font-mono" />
                    <Button size="sm" onClick={() => handleApprove(req.id)} className="gradient-primary text-primary-foreground">Confirm</Button>
                    <Button size="sm" variant="ghost" onClick={() => { setOtpFor(null); setOtp(""); }}>Cancel</Button>
                  </div>
                ) : (
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" onClick={() => { setOtpFor(req.id); toast.info("OTP sent (demo: any 6 digits)"); }} className="gradient-primary text-primary-foreground gap-1">
                      <Check className="h-3 w-3" /> Approve
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleReject(req.id)} className="gap-1">
                      <X className="h-3 w-3" /> Reject
                    </Button>
                  </div>
                )
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkerConsent;
