"use client";

const contactItems = [
  {
    icon: (
      <svg className="w-6 h-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Calle Gran Vía 42, 28013 Madrid",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "910 123 456",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "info@dentalcare.es",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Lun-Vie: 9:00-20:00 | Sáb: 9:00-14:00",
  },
];

export default function Contact() {
  return (
    <section id="contacto" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-cyan-600 font-medium mb-2">Contacto</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Reserva tu <span className="gradient-text">cita ahora</span>
            </h2>
            <p className="text-slate-600 text-lg mb-8">
              Estamos aquí para ayudarte. Contacta con nosotros por cualquier medio.
            </p>

            <div className="space-y-6">
              {contactItems.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
                  <input type="text" placeholder="Tu nombre" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Teléfono</label>
                  <input type="tel" placeholder="612 345 678" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input type="email" placeholder="tu@email.com" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tratamiento</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition text-slate-600">
                  <option>Seleccionar...</option>
                  <option>Limpieza dental</option>
                  <option>Blanqueamiento</option>
                  <option>Ortodoncia</option>
                  <option>Implantes</option>
                  <option>Endodoncia</option>
                  <option>Consulta general</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Mensaje</label>
                <textarea rows={4} placeholder="Cuéntanos qué necesitas..." className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition resize-none" />
              </div>
              <button type="submit" className="w-full py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-medium transition-all hover:shadow-lg hover:shadow-cyan-500/25">
                Solicitar cita
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
