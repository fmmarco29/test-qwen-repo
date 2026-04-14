"use client";

import { useData } from "@/context/DataContext";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const appointmentTypeLabels: Record<string, string> = {
  checkup: "Revisión",
  cleaning: "Limpieza",
  filling: "Empaste",
  extraction: "Extracción",
  "root-canal": "Endodoncia",
  orthodontics: "Ortodoncia",
  whitening: "Blanqueamiento",
  implant: "Implante",
  emergency: "Urgencia",
};

const statusStyles: Record<string, string> = {
  scheduled: "bg-blue-100 text-blue-700",
  "in-progress": "bg-amber-100 text-amber-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  "no-show": "bg-gray-100 text-gray-700",
};

const statusLabels: Record<string, string> = {
  scheduled: "Programada",
  "in-progress": "En curso",
  completed: "Completada",
  cancelled: "Cancelada",
  "no-show": "No asistió",
};

export default function OverviewPage() {
  const { appointments, patients, invoices } = useData();
  const { user } = useAuth();

  const today = new Date().toISOString().split("T")[0];
  const todayAppointments = appointments.filter((a) => a.date === today && a.status === "scheduled");
  const totalPatients = patients.length;
  const pendingPayments = invoices.filter((i) => i.status === "pending" || i.status === "overdue").reduce((s, i) => s + (i.total - i.paid), 0);
  const monthRevenue = invoices.filter((i) => i.status === "paid").reduce((s, i) => s + i.paid, 0);

  const stats = [
    { label: "Pacientes totales", value: totalPatients, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />, color: "from-cyan-500 to-teal-500", bg: "bg-cyan-50" },
    { label: "Citas hoy", value: todayAppointments.length, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />, color: "from-indigo-500 to-purple-500", bg: "bg-indigo-50" },
    { label: "Ingresos mes", value: `${monthRevenue.toLocaleString()}€`, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />, color: "from-emerald-500 to-green-500", bg: "bg-emerald-50" },
    { label: "Pagos pendientes", value: `${pendingPayments.toLocaleString()}€`, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />, color: "from-amber-500 to-orange-500", bg: "bg-amber-50" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Buenos días, {user?.name?.split(" ")[1] || "Doctor"}</h2>
        <p className="text-slate-500">Resumen de tu clínica para hoy</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">{s.icon}</svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">{s.value}</p>
            <p className="text-sm text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Today's Appointments */}
      <div className="bg-white rounded-2xl border border-slate-100">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">Citas de hoy</h3>
          <Link href="/dashboard/appointments" className="text-sm text-cyan-600 hover:text-cyan-700 font-medium">Ver todas →</Link>
        </div>
        <div className="divide-y divide-slate-50">
          {todayAppointments.length === 0 ? (
            <div className="px-6 py-12 text-center text-slate-500">No hay citas programadas para hoy</div>
          ) : (
            todayAppointments.map((apt) => (
              <div key={apt.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="text-center px-3 py-2 rounded-xl bg-slate-50 min-w-[60px]">
                    <p className="text-sm font-bold text-slate-800">{apt.time}</p>
                    <p className="text-xs text-slate-500">{apt.duration}min</p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{apt.patientName}</p>
                    <p className="text-sm text-slate-500">{apt.doctor} • Sala {apt.room}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    {appointmentTypeLabels[apt.type] || apt.type}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[apt.status]}`}>
                    {statusLabels[apt.status]}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Recent Activity + Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent */}
        <div className="bg-white rounded-2xl border border-slate-100">
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900">Actividad reciente</h3>
          </div>
          <div className="divide-y divide-slate-50">
            {appointments.filter((a) => a.status === "completed").slice(0, 4).map((apt) => (
              <div key={apt.id} className="px-6 py-3 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{apt.patientName} - {appointmentTypeLabels[apt.type]}</p>
                  <p className="text-xs text-slate-500">{apt.date} con {apt.doctor}</p>
                </div>
                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">✓</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-slate-100">
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900">Acciones rápidas</h3>
          </div>
          <div className="p-4 grid grid-cols-2 gap-3">
            {[
              { label: "Nueva cita", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />, href: "/dashboard/appointments", color: "bg-cyan-50 text-cyan-600 hover:bg-cyan-100" },
              { label: "Nuevo paciente", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />, href: "/dashboard/patients", color: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100" },
              { label: "Ver facturas", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />, href: "/dashboard/billing", color: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" },
              { label: "Tratamientos", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />, href: "/dashboard/treatments", color: "bg-amber-50 text-amber-600 hover:bg-amber-100" },
            ].map((a) => (
              <Link key={a.label} href={a.href} className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-colors ${a.color}`}>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">{a.icon}</svg>
                <span className="text-sm font-medium">{a.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
