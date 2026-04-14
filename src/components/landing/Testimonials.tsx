const testimonials = [
  { quote: "Llevaba años sin ir al dentista por miedo. Aquí me hicieron sentir tan cómoda que ahora voy cada 6 meses sin problema.", author: "Ana Martínez", role: "Paciente desde 2020", avatar: "AM" },
  { quote: "El blanqueamiento fue increíble. Resultados desde la primera sesión. Todo el equipo es muy profesional y atento.", author: "Carlos Ruiz", role: "Paciente desde 2021", avatar: "CR" },
  { quote: "Mi hijo de 4 años sale contento de cada visita. El trato con los niños es excepcional. 100% recomendado.", author: "Elena García", role: "Paciente desde 2019", avatar: "EG" },
];

export default function Testimonials() {
  return (
    <section id="testimonios" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-cyan-600 font-medium mb-2">Testimonios</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Lo que dicen nuestros <span className="gradient-text">pacientes</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.author} className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-slate-700 mb-6 leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center text-white text-sm font-bold">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-medium text-slate-900">{t.author}</div>
                  <div className="text-sm text-slate-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
