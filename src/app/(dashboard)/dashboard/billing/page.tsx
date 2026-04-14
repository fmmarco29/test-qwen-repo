"use client";

import { useState } from "react";
import { useData } from "@/context/DataContext";

const statusStyles: Record<string, string> = {
  paid: "bg-green-100 text-green-700",
  pending: "bg-amber-100 text-amber-700",
  overdue: "bg-red-100 text-red-700",
  partial: "bg-blue-100 text-blue-700",
};

const statusLabels: Record<string, string> = {
  paid: "Pagada", pending: "Pendiente", overdue: "Vencida", partial: "Parcial",
};

export default function BillingPage() {
  const { invoices, patients } = useData();
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? invoices : invoices.filter((i) => i.status === filter);

  const totalPaid = invoices.filter((i) => i.status === "paid").reduce((s, i) => s + i.paid, 0);
  const totalPending = invoices.filter((i) => i.status === "pending" || i.status === "partial").reduce((s, i) => s + (i.total - i.paid), 0);
  const totalOverdue = invoices.filter((i) => i.status === "overdue").reduce((s, i) => s + (i.total - i.paid), 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Facturación</h2>
        <p className="text-slate-500">Gestión de pagos y facturas</p>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <p className="text-sm text-slate-500">Cobrado</p>
          </div>
          <p className="text-2xl font-bold text-green-600">{totalPaid.toLocaleString()}€</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <p className="text-sm text-slate-500">Pendiente</p>
          </div>
          <p className="text-2xl font-bold text-amber-600">{totalPending.toLocaleString()}€</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <p className="text-sm text-slate-500">Vencido</p>
          </div>
          <p className="text-2xl font-bold text-red-600">{totalOverdue.toLocaleString()}€</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: "all", label: "Todas" },
          { key: "paid", label: "Pagadas" },
          { key: "pending", label: "Pendientes" },
          { key: "overdue", label: "Vencidas" },
          { key: "partial", label: "Parciales" },
        ].map((f) => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === f.key ? "bg-cyan-600 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}`}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Invoices */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Factura</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Paciente</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider hidden sm:table-cell">Fecha</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider hidden md:table-cell">Conceptos</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Total</th>
                <th className="text-center px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-mono text-sm font-medium text-slate-900">{inv.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-900">{inv.patientName}</p>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <p className="text-sm text-slate-600">{inv.date}</p>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="space-y-0.5">
                      {inv.items.map((item, i) => (
                        <p key={i} className="text-xs text-slate-600">{item.description} <span className="text-slate-400">({item.amount}€)</span></p>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900">{inv.total.toLocaleString()}€</p>
                      {inv.paid < inv.total && (
                        <p className="text-xs text-slate-500">Pagado: {inv.paid}€</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[inv.status]}`}>
                      {statusLabels[inv.status]}
                    </span>
                    {inv.method && (
                      <p className="text-[10px] text-slate-400 mt-1">{inv.method}</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="px-6 py-12 text-center text-slate-500">No hay facturas con este filtro</div>
        )}
      </div>
    </div>
  );
}
