import React from "react";
import { AlertTriangle, Syringe, Pill, Droplets } from "lucide-react";
import type { Worker } from "@/lib/mock-data";

const WorkerHealthSummary: React.FC<{ worker: Worker }> = ({ worker }) => (
  <div className="space-y-6">
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground">Health Summary</h2>
      <p className="text-sm text-muted-foreground">Your essential health information at a glance.</p>
    </div>

    {/* Allergies */}
    <div className="bg-card rounded-xl border border-border p-5 shadow-card">
      <div className="flex items-center gap-2 mb-3">
        <Droplets className="h-5 w-5 text-health-red" />
        <h3 className="font-display font-semibold text-foreground">Allergies</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {worker.allergies.map(a => (
          <span key={a} className="px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-medium">{a}</span>
        ))}
      </div>
    </div>

    {/* Vaccinations */}
    <div className="bg-card rounded-xl border border-border p-5 shadow-card">
      <div className="flex items-center gap-2 mb-3">
        <Syringe className="h-5 w-5 text-health-green" />
        <h3 className="font-display font-semibold text-foreground">Vaccination History</h3>
      </div>
      <div className="space-y-3">
        {worker.vaccinations.map(v => (
          <div key={v.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div>
              <p className="text-sm font-medium text-foreground">{v.name}</p>
              <p className="text-xs text-muted-foreground">{v.provider}</p>
            </div>
            <span className="text-xs text-muted-foreground">{v.date}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Prescriptions */}
    <div className="bg-card rounded-xl border border-border p-5 shadow-card">
      <div className="flex items-center gap-2 mb-3">
        <Pill className="h-5 w-5 text-health-blue" />
        <h3 className="font-display font-semibold text-foreground">Recent Prescriptions</h3>
      </div>
      <div className="space-y-3">
        {worker.prescriptions.map(p => (
          <div key={p.medication + p.date} className="p-3 rounded-lg bg-muted/50">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-medium text-foreground">{p.medication}</p>
              <span className="text-xs text-muted-foreground">{p.date}</span>
            </div>
            <p className="text-xs text-muted-foreground">{p.dosage} · {p.doctor} · {p.hospital}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default WorkerHealthSummary;
