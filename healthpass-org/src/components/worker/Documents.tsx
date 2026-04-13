import React from "react";
import { FileText, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Worker } from "@/lib/mock-data";
import { toast } from "sonner";

const WorkerDocuments: React.FC<{ worker: Worker }> = ({ worker }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">Documents</h2>
        <p className="text-sm text-muted-foreground">Your encrypted medical documents.</p>
      </div>
      <Button className="gradient-primary text-primary-foreground gap-2" onClick={() => toast.success("Upload simulated — document encrypted & stored.")}>
        <Upload className="h-4 w-4" /> Upload
      </Button>
    </div>
    <div className="space-y-3">
      {worker.documents.map(d => (
        <div key={d.name} className="bg-card rounded-xl border border-border p-4 shadow-card flex items-center gap-4">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{d.name}</p>
            <p className="text-xs text-muted-foreground">{d.type} · {d.size}</p>
          </div>
          <span className="text-xs text-muted-foreground shrink-0">{d.uploadedAt}</span>
        </div>
      ))}
    </div>
  </div>
);

export default WorkerDocuments;
