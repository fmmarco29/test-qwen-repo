"use client";

import { useState } from "react";
import { useData, Appointment } from "@/context/DataContext";

const typeLabels: Record<string, string> = {
  checkup: "Revisión", cleaning: "Limpieza", filling: "Empaste",
  extraction: "Extracción", "root-canal": "Endodoncia", orthodontics: "Ortodoncia",
  whitening: "Blanqueamiento", implant: "Implante", emergency: "Urgencia",
};

const statusStyles: Record<string, string> = {
  scheduled: "bg-blue-100 text-blue-700", "in-progress": "bg-amber-100 text-amber-700",
  completed: "bg-green-100 text-green-700", cancelled: "bg-red-100 text-red-700",
  "no-show": "bg-gray-100 text-gray-700",
};

const statusLabels: Record<string, string> = {
  scheduled: "Programada", "in-progress": "En curso", completed: "Completada",
  cancelled: "Cancelada", "no-show": "No asistió",
};

export default function AppointmentsPage() {
  const { appointments, setAppointments, patients } = useData();
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const filtered = filter === "all"
    ? appointments
    : appointments.filter((a) => a.status === filter);

  const sorted = [...filtered].sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const patient = patients.find((p) => p.id === fd.get("patientId"));
    const newApt: Appointment = {
      id: editingId || String(Date.now()),
      patientId: fd.get("patientId") as string,
      patientName: patient?.name || "",
      date: fd.get("date") as string,
      time: fd.get("time") as string,
      duration: parseInt(fd.get("duration") as string) || 30,
      type: fd.get("type") as Appointment["type"],
      status: (fd.get("status") as Appointment["status"]) || "scheduled",
      doctor: fd.get("doctor") as string,
      notes: fd.get("notes") as string,
      room: fd.get("room") as string,
    };
    if (editingId) {
      setAppointments((prev: Appointment[]) => prev.map((a) => (a.id === editingId ? newApt : a)));
      setEditingId(null);
    } else {
      setAppointments((prev: Appointment[]) => [...prev, newApt]);
    }
    setShowForm(false);
  };

  const handleEdit = (apt: Appointment) => {
    setEditingId(apt.id);
    setShowForm(true);
  };

  const handleStatusChange = (id: string, status: Appointment["status"]) => {
    setAppointments((prev: Appointment[]) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  const handleDelete = (id: string) => {
    setAppointments((prev: Appointment[]) => prev.filter((a) => a.id !== id));
  };

  const formContent = (apt?: Appointment) => (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <select name="patientId" defaultValue={apt?.patientId} required className="px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none bg-white">
        <option value="">Seleccionar paciente...</option>
        {patients.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>
      <input name="date" type="date" defaultValue={apt?.date} required className="px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none" />
      <input name="time" type="time" defaultValue={apt?.time} required className="px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none" />
      <input name="duration" type="number" defaultValue={apt?.duration || 30} placeholder="Duración (min)" className="px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none" />
      <select name="type" defaultValue={apt?.type} required className="px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none bg-white">
        <option value="">Tipo de cita...</option>
        {Object.entries(typeLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
      </select>
      <select name="status" defaultValue={apt?.status || "scheduled"} className="px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none bg-white">
        <option value="scheduled">Programada</option>
        <option value="in-progress">En curso</option>
        <option value="completed">Completada</option>
        <option value="cancelled">Cancelada</option>
        <option value="no-show">No asistió</option>
      </select>
      <input name="doctor" defaultValue={apt?.doctor} placeholder="Doctor" className="px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none" />
      <input name="room" defaultValue={apt?.room} placeholder="Sala" className="px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none" />
      <input name="notes" defaultValue={apt?.notes} placeholder="Notas" className="px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none sm:col-span-2" />
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Citas</h2>
          <p className="text-slate-500">{appointments.length} citas registradas</p>
        </div>
        <button onClick={() => { setEditingId(null); setShowForm(!showForm); }} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Nueva cita
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-white rounded-2xl p-6 border border-slate-100 animate-fade-in">
          <h3 className="font-semibold text-slate-900 mb-4">{editingId ? "Editar cita" : "Nueva cita"}</h3>
          {formContent(editingId ? appointments.find((a) => a.id === editingId) : undefined)}
          <div className="flex gap-3 mt-4">
            <button type="submit" className="px-6 py-2.5 rounded-xl bg-cyan-600 text-white text-sm font-medium hover:bg-cyan-700 transition-colors">
              {editingId ? "Actualizar" : "Crear cita"}
            </button>
            <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">Cancelar</button>
          </div>
        </form>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: "all", label: "Todas" },
          { key: "scheduled", label: "Programadas" },
          { key: "completed", label: "Completadas" },
          { key: "cancelled", label: "Canceladas" },
        ].map((f) => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === f.key ? "bg-cyan-600 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}`}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-50">
        {sorted.map((apt) => (
          <div key={apt.id} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="text-center px-3 py-2 rounded-xl bg-slate-50 min-w-[60px]">
                <p className="text-sm font-bold text-slate-800">{apt.time}</p>
                <p className="text-[11px] text-slate-500">{apt.date}</p>
              </div>
              <div>
                <p className="font-medium text-slate-900">{apt.patientName}</p>
                <p className="text-sm text-slate-500">{apt.doctor} · Sala {apt.room} · {apt.duration}min</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">{typeLabels[apt.type]}</span>
              <select value={apt.status} onChange={(e) => handleStatusChange(apt.id, e.target.value as Appointment["status"])}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium border-0 outline-none cursor-pointer ${statusStyles[apt.status]}`}>
                <option value="scheduled">Programada</option>
                <option value="in-progress">En curso</option>
                <option value="completed">Completada</option>
                <option value="cancelled">Cancelada</option>
                <option value="no-show">No asistió</option>
              </select>
              <button onClick={() => handleEdit(apt)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-cyan-600 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              </button>
              <button onClick={() => handleDelete(apt.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          </div>
        ))}
        {sorted.length === 0 && (
          <div className="px-6 py-12 text-center text-slate-500">No hay citas con este filtro</div>
        )}
      </div>
    </div>
  );
}
