const team = [
  { name: "Dr. Antonio García", role: "Director - Implantología", specialty: "Cirugía oral e implantes", initials: "AG", color: "from-cyan-500 to-teal-500" },
  { name: "Dra. María López", role: "Endodoncista", specialty: "Tratamiento de conducto", initials: "ML", color: "from-indigo-500 to-purple-500" },
  { name: "Dr. Javier Martín", role: "Ortodoncista", specialty: "Invisalign y brackets", initials: "JM", color: "from-pink-500 to-rose-500" },
  { name: "Dra. Laura Sánchez", role: "Periodoncista", specialty: "Encías y estética", initials: "LS", color: "from-amber-500 to-orange-500" },
];

export default function Team() {
  return (
    <section id="equipo" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-cyan-600 font-medium mb-2">Nuestro equipo</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Profesionales de <span className="gradient-text">confianza</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Un equipo multidisciplinar con amplia formación y experiencia en todas las especialidades dentales.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((m) => (
            <div key={m.name} className="bg-white rounded-2xl p-6 text-center border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4`}>
                {m.initials}
              </div>
              <h3 className="font-semibold text-slate-900">{m.name}</h3>
              <p className="text-cyan-600 text-sm font-medium">{m.role}</p>
              <p className="text-slate-500 text-sm mt-1">{m.specialty}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
