"use client";

import { useState } from "react";
import { useData, MedicalRecord } from "@/context/DataContext";

export default function RecordsPage() {
  const { records, patients } = useData();
  const [selectedPatient, setSelectedPatient] = useState<string>("");

  const filtered = selectedPatient
    ? records.filter((r) => r.patientId === selectedPatient)
    : records;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Historiales Médicos</h2>
        <p className="text-slate-500">{records.length} registros clínicos</p>
      </div>

      {/* Patient Filter */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100">
        <label className="block text-sm font-medium text-slate-700 mb-2">Filtrar por paciente</label>
        <select value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none bg-white">
          <option value="">Todos los pacientes</option>
          {patients.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>

      {/* Records Timeline */}
      <div className="space-y-4">
        {filtered.map((r) => {
          const patient = patients.find((p) => p.id === r.patientId);
          return (
            <div key={r.id} className="bg-white rounded-2xl border border-slate-100 p-6 animate-fade-in">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-slate-900">{patient?.name || "Desconocido"}</h3>
                    <span className="px-2 py-0.5 bg-cyan-50 text-cyan-700 text-xs rounded-full font-medium">{r.date}</span>
                  </div>
                  <p className="text-sm text-slate-500">Dr. {r.doctor}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-slate-50">
                  <p className="text-xs font-medium text-slate-500 mb-1">Diagnóstico</p>
                  <p className="text-sm text-slate-800">{r.diagnosis}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50">
                  <p className="text-xs font-medium text-slate-500 mb-1">Tratamiento</p>
                  <p className="text-sm text-slate-800">{r.treatment}</p>
                </div>
                {r.toothNumber && (
                  <div className="p-3 rounded-xl bg-slate-50">
                    <p className="text-xs font-medium text-slate-500 mb-1">Pieza dental</p>
                    <p className="text-sm text-slate-800 font-bold text-cyan-600">#{r.toothNumber}</p>
                  </div>
                )}
                {r.prescription && (
                  <div className="p-3 rounded-xl bg-slate-50">
                    <p className="text-xs font-medium text-slate-500 mb-1">Prescripción</p>
                    <p className="text-sm text-slate-800">{r.prescription}</p>
                  </div>
                )}
              </div>

              {r.notes && (
                <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-100">
                  <p className="text-xs font-medium text-amber-700 mb-1">Notas</p>
                  <p className="text-sm text-amber-900">{r.notes}</p>
                </div>
              )}

              {r.followUpDate && (
                <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Seguimiento: <span className="font-medium text-slate-700">{r.followUpDate}</span>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-100 px-6 py-12 text-center text-slate-500">
            No hay registros médicos para este paciente
          </div>
        )}
      </div>
    </div>
  );
}
