"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: "M" | "F";
  address: string;
  insurance: string;
  emergencyContact: string;
  notes: string;
  createdAt: string;
  lastVisit: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  duration: number; // minutes
  type: "checkup" | "cleaning" | "filling" | "extraction" | "root-canal" | "orthodontics" | "whitening" | "implant" | "emergency";
  status: "scheduled" | "in-progress" | "completed" | "cancelled" | "no-show";
  doctor: string;
  notes: string;
  room: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  date: string;
  diagnosis: string;
  treatment: string;
  toothNumber?: number;
  prescription: string;
  notes: string;
  followUpDate?: string;
  doctor: string;
}

export interface TreatmentPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  category: string;
  active: boolean;
}

export interface Invoice {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  items: { description: string; amount: number }[];
  total: number;
  paid: number;
  status: "paid" | "pending" | "overdue" | "partial";
  method?: string;
}

interface DataContextType {
  patients: Patient[];
  setPatients: (p: Patient[] | ((prev: Patient[]) => Patient[])) => void;
  appointments: Appointment[];
  setAppointments: (a: Appointment[] | ((prev: Appointment[]) => Appointment[])) => void;
  records: MedicalRecord[];
  setRecords: (r: MedicalRecord[] | ((prev: MedicalRecord[]) => MedicalRecord[])) => void;
  treatments: TreatmentPlan[];
  setTreatments: (t: TreatmentPlan[] | ((prev: TreatmentPlan[]) => TreatmentPlan[])) => void;
  invoices: Invoice[];
  setInvoices: (i: Invoice[] | ((prev: Invoice[]) => Invoice[])) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Mock data
const MOCK_PATIENTS: Patient[] = [
  { id: "1", name: "Ana Martínez", email: "ana@email.com", phone: "612-345-678", dob: "1985-03-15", gender: "F", address: "Calle Mayor 12, Madrid", insurance: "Sanitas", emergencyContact: "Pedro Martínez: 611-222-333", notes: "Alergia a penicilina", createdAt: "2024-01-10", lastVisit: "2026-04-01" },
  { id: "2", name: "Carlos Ruiz", email: "carlos@email.com", phone: "698-765-432", dob: "1990-07-22", gender: "M", address: "Av. Libertad 45, Barcelona", insurance: "Adeslas", emergencyContact: "Laura Ruiz: 622-333-444", notes: "", createdAt: "2024-02-20", lastVisit: "2026-03-28" },
  { id: "3", name: "Elena García", email: "elena@email.com", phone: "655-123-789", dob: "1978-11-03", gender: "F", address: "Plaza Sol 8, Valencia", insurance: "Mapfre", emergencyContact: "Jorge García: 633-444-555", notes: "Necesita sedación para procedimientos largos", createdAt: "2024-03-05", lastVisit: "2026-04-08" },
  { id: "4", name: "Miguel Torres", email: "miguel@email.com", phone: "677-456-123", dob: "1995-01-28", gender: "M", address: "Calle Luna 23, Sevilla", insurance: "DKV", emergencyContact: "Rosa Torres: 644-555-666", notes: "", createdAt: "2024-04-12", lastVisit: "2026-04-05" },
  { id: "5", name: "Sofía Hernández", email: "sofia@email.com", phone: "688-789-456", dob: "1982-09-14", gender: "F", address: "Av. Constitución 67, Bilbao", insurance: "Cigna", emergencyContact: "David Hernández: 655-666-777", notes: "Embarazada - evitar radiografías", createdAt: "2024-05-18", lastVisit: "2026-03-30" },
  { id: "6", name: "Pablo Sánchez", email: "pablo@email.com", phone: "633-321-987", dob: "2000-06-10", gender: "M", address: "Calle Real 34, Zaragoza", insurance: "Sin seguro", emergencyContact: "Marta Sánchez: 666-777-888", notes: "", createdAt: "2024-06-25", lastVisit: "2026-04-10" },
];

const MOCK_APPOINTMENTS: Appointment[] = [
  { id: "1", patientId: "1", patientName: "Ana Martínez", date: "2026-04-14", time: "09:00", duration: 30, type: "checkup", status: "scheduled", doctor: "Dr. García", notes: "Revisión semestral", room: "1" },
  { id: "2", patientId: "3", patientName: "Elena García", date: "2026-04-14", time: "10:00", duration: 60, type: "root-canal", status: "scheduled", doctor: "Dra. López", notes: "Tratamiento de conducto - sesión 2", room: "2" },
  { id: "3", patientId: "2", patientName: "Carlos Ruiz", date: "2026-04-14", time: "11:30", duration: 45, type: "filling", status: "scheduled", doctor: "Dr. García", notes: "Empaste muela 36", room: "1" },
  { id: "4", patientId: "5", patientName: "Sofía Hernández", date: "2026-04-14", time: "14:00", duration: 30, type: "checkup", status: "scheduled", doctor: "Dra. López", notes: "Control prenatal dental", room: "3" },
  { id: "5", patientId: "4", patientName: "Miguel Torres", date: "2026-04-14", time: "16:00", duration: 45, type: "cleaning", status: "scheduled", doctor: "Dr. García", notes: "Limpieza profunda", room: "1" },
  { id: "6", patientId: "6", patientName: "Pablo Sánchez", date: "2026-04-15", time: "09:30", duration: 90, type: "extraction", status: "scheduled", doctor: "Dra. López", notes: "Extracción cordal inferior izquierdo", room: "2" },
  { id: "7", patientId: "1", patientName: "Ana Martínez", date: "2026-04-13", time: "10:00", duration: 60, type: "whitening", status: "completed", doctor: "Dr. García", notes: "Blanqueamiento LED completado", room: "3" },
  { id: "8", patientId: "3", patientName: "Elena García", date: "2026-04-10", time: "11:00", duration: 60, type: "root-canal", status: "completed", doctor: "Dra. López", notes: "Sesión 1 completada", room: "2" },
];

const MOCK_RECORDS: MedicalRecord[] = [
  { id: "1", patientId: "1", date: "2026-04-13", diagnosis: "Manchas por café y tabaco", treatment: "Blanqueamiento LED Zoom", toothNumber: undefined, prescription: "Gel desensibilizante 3 días", notes: "2 sesiones necesarias", followUpDate: "2026-04-27", doctor: "Dr. García" },
  { id: "2", patientId: "2", date: "2026-03-28", diagnosis: "Caries profunda en pieza 36", treatment: "Empaste de composite", toothNumber: 36, prescription: "Ibuprofeno 600mg cada 8h x 3 días", notes: "", followUpDate: "2026-04-14", doctor: "Dr. García" },
  { id: "3", patientId: "3", date: "2026-04-10", diagnosis: "Pulpitis irreversible pieza 26", treatment: "Endodoncia - sesión 1", toothNumber: 26, prescription: "Amoxicilina 500mg cada 8h x 7 días", notes: "Programar sesión 2", followUpDate: "2026-04-14", doctor: "Dra. López" },
  { id: "4", patientId: "4", date: "2026-04-05", diagnosis: "Gingivitis moderada", treatment: "Limpieza profesional + instrucciones higiene", toothNumber: undefined, prescription: "Clorhexidina 0.12% enjuague 2x día", notes: "Mejorar técnica de cepillado", followUpDate: "2026-07-05", doctor: "Dr. García" },
];

const MOCK_TREATMENTS: TreatmentPlan[] = [
  { id: "1", name: "Limpieza Dental", description: "Profilaxis dental completa con ultrasonido", price: 60, duration: "45 min", category: "Preventivo", active: true },
  { id: "2", name: "Blanqueamiento LED", description: "Blanqueamiento con luz LED Zoom", price: 250, duration: "60 min", category: "Estética", active: true },
  { id: "3", name: "Empaste Composite", description: "Restauración con composite de alta estética", price: 80, duration: "45 min", category: "Restaurativo", active: true },
  { id: "4", name: "Endodoncia", description: "Tratamiento de conducto uniconal/biconal", price: 200, duration: "60-90 min", category: "Endodoncia", active: true },
  { id: "5", name: "Extracción Simple", description: "Extracción de diente sin complicación", price: 70, duration: "30 min", category: "Cirugía", active: true },
  { id: "6", name: "Extracción Cordal", description: "Extracción de muela del juicio", price: 150, duration: "45-60 min", category: "Cirugía", active: true },
  { id: "7", name: "Ortodoncia Brackets", description: "Brackets metálicos - tratamiento completo", price: 2500, duration: "18-24 meses", category: "Ortodoncia", active: true },
  { id: "8", name: "Invisalign", description: "Alineadores invisibles - tratamiento completo", price: 3500, duration: "12-18 meses", category: "Ortodoncia", active: true },
  { id: "9", name: "Implante Dental", description: "Implante de titanio + corona de porcelana", price: 1800, duration: "3-6 meses", category: "Implantes", active: true },
  { id: "10", name: "Corona Porcelana", description: "Corona unitaria de porcelana E-max", price: 450, duration: "2 sesiones", category: "Prótesis", active: true },
];

const MOCK_INVOICES: Invoice[] = [
  { id: "INV-001", patientId: "1", patientName: "Ana Martínez", date: "2026-04-13", items: [{ description: "Blanqueamiento LED Zoom", amount: 250 }], total: 250, paid: 250, status: "paid", method: "Tarjeta" },
  { id: "INV-002", patientId: "2", patientName: "Carlos Ruiz", date: "2026-03-28", items: [{ description: "Empaste Composite pieza 36", amount: 80 }], total: 80, paid: 40, status: "partial", method: "Efectivo" },
  { id: "INV-003", patientId: "3", patientName: "Elena García", date: "2026-04-10", items: [{ description: "Endodoncia - sesión 1", amount: 200 }], total: 200, paid: 0, status: "pending" },
  { id: "INV-004", patientId: "4", patientName: "Miguel Torres", date: "2026-04-05", items: [{ description: "Limpieza profesional", amount: 60 }, { description: "Clorhexidina", amount: 12 }], total: 72, paid: 72, status: "paid", method: "Tarjeta" },
  { id: "INV-005", patientId: "5", patientName: "Sofía Hernández", date: "2026-03-15", items: [{ description: "Consulta + Radiografía", amount: 90 }], total: 90, paid: 0, status: "overdue" },
  { id: "INV-006", patientId: "6", patientName: "Pablo Sánchez", date: "2026-04-10", items: [{ description: "Consulta + Diagnóstico", amount: 50 }], total: 50, paid: 50, status: "paid", method: "Efectivo" },
];

export function DataProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>(MOCK_PATIENTS);
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
  const [records, setRecords] = useState<MedicalRecord[]>(MOCK_RECORDS);
  const [treatments, setTreatments] = useState<TreatmentPlan[]>(MOCK_TREATMENTS);
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES);

  return (
    <DataContext.Provider value={{
      patients, setPatients,
      appointments, setAppointments,
      records, setRecords,
      treatments, setTreatments,
      invoices, setInvoices,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
