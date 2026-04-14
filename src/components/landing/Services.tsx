const services = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Limpieza Dental",
    description: "Profilaxis profesional con ultrasonido y pulido para una higiene bucal perfecta.",
    price: "Desde 60€",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: "Blanqueamiento LED",
    description: "Tecnología Zoom para dientes hasta 8 tonos más blancos en una sesión.",
    price: "Desde 250€",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Ortodoncia Invisible",
    description: "Alineadores transparentes Invisalign para una sonrisa sin brackets metálicos.",
    price: "Desde 3.500€",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: "Implantes Dentales",
    description: "Implantes de titanio con coronas de porcelana para resultados naturales.",
    price: "Desde 1.800€",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    title: "Endodoncia",
    description: "Tratamiento de conducto con tecnología rotativa para salvar tus dientes.",
    price: "Desde 200€",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: "Odontopediatría",
    description: "Atención dental especializada para los más pequeños en ambiente infantil.",
    price: "Desde 40€",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-cyan-600 font-medium mb-2">Nuestros servicios</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Tratamientos de <span className="gradient-text">excelencia</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Ofrecemos una gama completa de servicios dentales con la mejor tecnología y profesionales cualificados.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="group p-6 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-lg hover:shadow-cyan-500/5 transition-all hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                {s.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-slate-600 mb-4">{s.description}</p>
              <p className="text-cyan-600 font-semibold">{s.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
