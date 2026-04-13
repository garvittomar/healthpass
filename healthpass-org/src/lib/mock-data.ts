export interface Worker {
  id: string;
  name: string;
  phone: string;
  dob: string;
  idProof: string;
  healthPassId: string;
  allergies: string[];
  vaccinations: { name: string; date: string; provider: string }[];
  prescriptions: { medication: string; dosage: string; doctor: string; date: string; hospital: string }[];
  documents: { name: string; type: string; uploadedAt: string; size: string }[];
  consentRequests: { id: string; hospital: string; requestedAt: string; status: 'pending' | 'approved' | 'rejected'; expiresAt?: string }[];
}

export const mockWorker: Worker = {
  id: "w-001",
  name: "Rajesh Kumar",
  phone: "+91 98765 43210",
  dob: "1990-05-15",
  idProof: "AADHAAR-XXXX-5678",
  healthPassId: "HP-2026-0451-RK",
  allergies: ["Penicillin", "Dust Mites"],
  vaccinations: [
    { name: "COVID-19 (Covishield)", date: "2021-08-12", provider: "PHC Bangalore" },
    { name: "Hepatitis B", date: "2019-03-20", provider: "City Hospital" },
    { name: "Tetanus Booster", date: "2023-11-05", provider: "District Hospital" },
  ],
  prescriptions: [
    { medication: "Amoxicillin 500mg", dosage: "1 tablet 3x daily", doctor: "Dr. Sharma", date: "2026-03-28", hospital: "Apollo Clinic" },
    { medication: "Ibuprofen 400mg", dosage: "As needed", doctor: "Dr. Patel", date: "2026-02-14", hospital: "City Hospital" },
    { medication: "Cetirizine 10mg", dosage: "1 tablet daily", doctor: "Dr. Rao", date: "2026-01-05", hospital: "PHC Bangalore" },
  ],
  documents: [
    { name: "Blood Test Report - March 2026", type: "Lab Report", uploadedAt: "2026-03-30", size: "1.2 MB" },
    { name: "Chest X-Ray", type: "Imaging", uploadedAt: "2026-02-10", size: "3.8 MB" },
    { name: "Vaccination Certificate", type: "Certificate", uploadedAt: "2025-12-01", size: "0.5 MB" },
  ],
  consentRequests: [
    { id: "cr-001", hospital: "Apollo Hospital, Delhi", requestedAt: "2026-04-13T10:30:00", status: "pending" },
    { id: "cr-002", hospital: "City Hospital, Mumbai", requestedAt: "2026-04-10T14:15:00", status: "approved", expiresAt: "2026-04-10T14:20:00" },
    { id: "cr-003", hospital: "District Hospital, Pune", requestedAt: "2026-04-05T09:00:00", status: "rejected" },
  ],
};

export interface HospitalUser {
  id: string;
  name: string;
  hospital: string;
  role: string;
}

export const mockHospitalUser: HospitalUser = {
  id: "h-001",
  name: "Dr. Ananya Mehta",
  hospital: "Apollo Hospital, Delhi",
  role: "Physician",
};
