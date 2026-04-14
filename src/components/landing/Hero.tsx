export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Aceptando nuevos pacientes
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
              Tu sonrisa es
              <br />
              nuestra <span className="gradient-text">prioridad</span>
            </h1>

            <p className="text-lg text-slate-600 mb-8 max-w-lg">
              Clínica dental de referencia con tecnología de última generación.
              Tratamientos personalizados para toda la familia en un ambiente cálido y profesional.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contacto" className="px-8 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-medium text-center transition-all hover:shadow-lg hover:shadow-cyan-500/25">
                Reservar cita
              </a>
              <a href="#servicios" className="px-8 py-3.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 font-medium text-center transition-all hover:bg-slate-50">
                Ver servicios
              </a>
            </div>

            <div className="mt-10 flex items-center gap-6">
              <div className="flex -space-x-3">
                {["bg-cyan-500", "bg-indigo-500", "bg-purple-500", "bg-pink-500"].map((c, i) => (
                  <div key={i} className={`w-10 h-10 rounded-full ${c} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}>
                    {["AM", "CR", "EG", "MT"][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-slate-500">+2,500 pacientes satisfechos</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-gradient-to-br from-cyan-500 to-indigo-500 rounded-3xl p-1">
              <div className="bg-white rounded-[22px] overflow-hidden">
                <div className="p-8 bg-gradient-to-br from-cyan-50 to-indigo-50">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Próxima cita</p>
                      <p className="text-sm text-slate-500">Hoy, 14:30</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">Dr. García - Limpieza</span>
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">Confirmada</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      45 minutos
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {["09:00", "10:00", "11:30"].map((t) => (
                      <div key={t} className="text-center p-2 rounded-lg bg-slate-50 text-sm text-slate-600">{t}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-lg p-4 animate-fade-in">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-700">Cita confirmada</p>
                  <p className="text-xs text-slate-500">Hace 2 min</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
