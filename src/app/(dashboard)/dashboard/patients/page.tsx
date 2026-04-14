"use client";

import { useState } from "react";
import { useData } from "@/context/DataContext";

const patientColors = [
  "from-cyan-500 to-teal-500",
  "from-indigo-500 to-purple-500",
  "from-pink-500 to-rose-500",
  "from-amber-500 to-orange-500",
  "from-emerald-500 to-green-500",
  "from-violet-500 to-fuchsia-500",
];

export default function PatientsPage() {
  const { patients, setPatients } = useData();
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const filtered = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search)
  );

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newPatient = {
      id: String(Date.now()),
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") as string,
      dob: fd.get("dob") as string,
      gender: fd.get("gender") as "M" | "F",
      address: fd.get("address") as string,
      insurance: fd.get("insurance") as string,
      emergencyContact: fd.get("emergencyContact") as string,
      notes: fd.get("notes") as string,
      createdAt: new Date().toISOString().split("T")[0],
      lastVisit: "—",
    };
    setPatients((prev: typeof patients) => [...prev, newPatient]);
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setPatients((prev: typeof patients) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Pacientes</h2>
          <p className="text-slate-500">{patients.length} pacientes registrados</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nuevo paciente
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <form onSubmit={handleAdd} className="bg-white rounded-2xl p-6 border border-slate-100 animate-fade-in">
          <h3 className="font-semibold text-slate-900 mb-4">Datos del paciente</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <input name="name" placeholder="Nombre completo" required className="px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none" />
            <input name="email" type="email" placeholder="Email" required className="px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none" />
            <input name="phone" placeholder="Teléfono" required className="px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none" />
            <input name="dob" type="date" required className="px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none" />
            <select name="gender" className="px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none">
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
            <input name="insurance" placeholder="Seguro dental" className="px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none" />
            <input name="address" placeholder="Dirección" className="px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none sm:col-span-2" />
            <input name="emergencyContact" placeholder="Contacto emergencia" className="px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none" />
            <input name="notes" placeholder="Notas / Alergias" className="px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none sm:col-span-3" />
          </div>
          <div className="flex gap-3 mt-4">
            <button type="submit" className="px-6 py-2.5 rounded-xl bg-cyan-600 text-white text-sm font-medium hover:bg-cyan-700 transition-colors">Guardar</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">Cancelar</button>
          </div>
        </form>
      )}

      {/* Search */}
      <div className="relative">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre, email o teléfono..."
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-cyan-500 outline-none transition"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Paciente</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider hidden sm:table-cell">Contacto</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider hidden md:table-cell">Seguro</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider hidden lg:table-cell">Última visita</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((p, i) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${patientColors[i % patientColors.length]} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                        {p.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{p.name}</p>
                        <p className="text-xs text-slate-500">{p.dob} · {p.gender === "M" ? "Masculino" : "Femenino"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <p className="text-sm text-slate-700">{p.email}</p>
                    <p className="text-xs text-slate-500">{p.phone}</p>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="px-2.5 py-1 rounded-lg bg-cyan-50 text-cyan-700 text-xs font-medium">{p.insurance}</span>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <p className="text-sm text-slate-600">{p.lastVisit}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDelete(p.id)} className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="px-6 py-12 text-center text-slate-500">No se encontraron pacientes</div>
        )}
      </div>
    </div>
  );
}
