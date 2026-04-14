"use client";

import { useState } from "react";
import { useData, TreatmentPlan } from "@/context/DataContext";

const categories = ["Todos", "Preventivo", "Estética", "Restaurativo", "Endodoncia", "Cirugía", "Ortodoncia", "Implantes", "Prótesis"];

export default function TreatmentsPage() {
  const { treatments, setTreatments } = useData();
  const [filter, setFilter] = useState("Todos");
  const [showForm, setShowForm] = useState(false);

  const filtered = filter === "Todos" ? treatments : treatments.filter((t) => t.category === filter);

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newTreatment: TreatmentPlan = {
      id: String(Date.now()),
      name: fd.get("name") as string,
      description: fd.get("description") as string,
      price: parseFloat(fd.get("price") as string),
      duration: fd.get("duration") as string,
      category: fd.get("category") as string,
      active: true,
    };
    setTreatments((prev: TreatmentPlan[]) => [...prev, newTreatment]);
    setShowForm(false);
  };

  const toggleActive = (id: string) => {
    setTreatments((prev: TreatmentPlan[]) => prev.map((t) => t.id === id ? { ...t, active: !t.active } : t));
  };

  const handleDelete = (id: string) => {
    setTreatments((prev: TreatmentPlan[]) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Tratamientos</h2>
          <p className="text-slate-500">Catálogo de tratamientos y tarifas</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Nuevo tratamiento
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-white rounded-2xl p-6 border border-slate-100 animate-fade-in">
          <h3 className="font-semibold text-slate-900 mb-4">Nuevo tratamiento</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <input name="name" placeholder="Nombre del tratamiento" required className="px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none" />
            <input name="price" type="number" step="0.01" placeholder="Precio (€)" required className="px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none" />
            <input name="duration" placeholder="Duración (ej: 45 min)" required className="px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none" />
            <select name="category" required className="px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none bg-white">
              {categories.filter((c) => c !== "Todos").map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <input name="description" placeholder="Descripción" required className="px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none sm:col-span-2" />
          </div>
          <div className="flex gap-3 mt-4">
            <button type="submit" className="px-6 py-2.5 rounded-xl bg-cyan-600 text-white text-sm font-medium hover:bg-cyan-700 transition-colors">Guardar</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">Cancelar</button>
          </div>
        </form>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button key={c} onClick={() => setFilter(c)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === c ? "bg-cyan-600 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}`}>
            {c}
          </button>
        ))}
      </div>

      {/* Treatments Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((t) => (
          <div key={t.id} className={`bg-white rounded-2xl border transition-all ${t.active ? "border-slate-100 hover:shadow-md" : "border-slate-200 opacity-60"}`}>
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <span className="px-2.5 py-1 rounded-lg bg-cyan-50 text-cyan-700 text-xs font-medium">{t.category}</span>
                <button onClick={() => toggleActive(t.id)} className={`relative w-10 h-5 rounded-full transition-colors ${t.active ? "bg-green-500" : "bg-slate-300"}`}>
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${t.active ? "translate-x-5" : ""}`} />
                </button>
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">{t.name}</h3>
              <p className="text-sm text-slate-500 mb-4">{t.description}</p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-cyan-600">{t.price.toLocaleString()}€</span>
                  <span className="text-xs text-slate-500 ml-2">· {t.duration}</span>
                </div>
                <button onClick={() => handleDelete(t.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 px-6 py-12 text-center text-slate-500">
          No hay tratamientos en esta categoría
        </div>
      )}
    </div>
  );
}
