"use client";

import { useState } from "react";
import Link from "next/link";

export default function LandingNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-slate-800">Dental<span className="text-cyan-600">Care</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#servicios" className="text-sm text-slate-600 hover:text-cyan-600 transition-colors">Servicios</a>
            <a href="#equipo" className="text-sm text-slate-600 hover:text-cyan-600 transition-colors">Equipo</a>
            <a href="#testimonios" className="text-sm text-slate-600 hover:text-cyan-600 transition-colors">Testimonios</a>
            <a href="#contacto" className="text-sm text-slate-600 hover:text-cyan-600 transition-colors">Contacto</a>
            <Link href="/dashboard" className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium transition-all hover:shadow-lg hover:shadow-cyan-500/25">
              Acceder al Portal
            </Link>
          </div>

          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <a href="#servicios" className="block px-3 py-2 text-sm text-slate-600" onClick={() => setIsOpen(false)}>Servicios</a>
            <a href="#equipo" className="block px-3 py-2 text-sm text-slate-600" onClick={() => setIsOpen(false)}>Equipo</a>
            <a href="#testimonios" className="block px-3 py-2 text-sm text-slate-600" onClick={() => setIsOpen(false)}>Testimonios</a>
            <a href="#contacto" className="block px-3 py-2 text-sm text-slate-600" onClick={() => setIsOpen(false)}>Contacto</a>
            <Link href="/dashboard" className="block px-3 py-2 text-sm text-cyan-600 font-medium" onClick={() => setIsOpen(false)}>Acceder al Portal →</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
