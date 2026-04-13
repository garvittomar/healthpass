import React from "react";
import { QRCodeSVG } from "qrcode.react";
import type { Worker } from "@/lib/mock-data";

const WorkerQRCode: React.FC<{ worker: Worker }> = ({ worker }) => (
  <div className="space-y-6">
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground">My QR Code</h2>
      <p className="text-sm text-muted-foreground">Show this to a hospital to share your health profile.</p>
    </div>
    <div className="bg-card rounded-2xl border border-border p-8 shadow-elevated max-w-sm mx-auto text-center">
      <div className="bg-background rounded-xl p-6 inline-block mb-4">
        <QRCodeSVG
          value={JSON.stringify({ healthPassId: worker.healthPassId, name: worker.name, id: worker.id })}
          size={200}
          fgColor="hsl(173, 58%, 39%)"
          level="H"
        />
      </div>
      <p className="font-display font-bold text-lg text-foreground">{worker.name}</p>
      <p className="font-mono text-sm text-primary font-medium">{worker.healthPassId}</p>
      <p className="text-xs text-muted-foreground mt-2">Scan to request health data access</p>
      <div className="mt-4 relative">
        <div className="absolute inset-0 rounded-full animate-pulse_ring border-2 border-primary/30" />
        <div className="h-3 w-3 rounded-full bg-health-green mx-auto" />
      </div>
      <p className="text-xs text-health-green mt-2 font-medium">Active</p>
    </div>
  </div>
);

export default WorkerQRCode;
