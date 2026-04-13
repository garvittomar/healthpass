import React from "react";
import { AlertTriangle, Droplets, Syringe, Phone } from "lucide-react";
import type { Worker } from "@/lib/mock-data";

const WorkerEmergency: React.FC<{ worker: Worker }> = ({ worker }) => (
  <div className="space-y-6">
    <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 flex items-center gap-3">
      <AlertTriangle className="h-6 w-6 text-destructive shrink-0" />
      <div>
        <h2 className="font-display text-lg font-bold text-foreground">Emergency Health Card</h2>
        <p className="text-sm text-muted-foreground">This page is designed to work offline.</p>
      </div>
    </div>

    <div className="bg-card rounded-2xl border-2 border-destructive/30 shadow-elevated overflow-hidden max-w-md mx-auto">
      <div className="gradient-primary p-4 text-center">
        <p className="text-primary-foreground font-display font-bold text-lg">EMERGENCY HEALTH INFO</p>
        <p className="text-primary-foreground/80 text-sm font-mono">{worker.healthPassId}</p>
      </div>
      <div className="p-5 space-y-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-1">Patient</p>
          <p className="text-lg font-bold text-foreground">{worker.name}</p>
          <p className="text-sm text-muted-foreground">DOB: {worker.dob} · Phone: {worker.phone}</p>
        </div>
        <div>
          <div className="flex items-center gap-1 mb-1">
            <Droplets className="h-4 w-4 text-health-red" />
            <p className="text-xs uppercase tracking-wide text-health-red font-semibold">Allergies</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {worker.allergies.map(a => (
              <span key={a} className="px-2 py-0.5 rounded bg-destructive/10 text-destructive text-sm font-medium">{a}</span>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1 mb-1">
            <Syringe className="h-4 w-4 text-health-green" />
            <p className="text-xs uppercase tracking-wide text-health-green font-semibold">Vaccinations</p>
          </div>
          {worker.vaccinations.map(v => (
            <p key={v.name} className="text-sm text-foreground">{v.name} <span className="text-muted-foreground">({v.date})</span></p>
          ))}
        </div>
        <div className="border-t border-border pt-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="h-4 w-4" /> Emergency: Call 112
        </div>
      </div>
    </div>
  </div>
);

export default WorkerEmergency;
