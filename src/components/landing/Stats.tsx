export default function Stats() {
  const stats = [
    { value: "15+", label: "Años de experiencia" },
    { value: "2,500+", label: "Pacientes satisfechos" },
    { value: "8", label: "Especialistas" },
    { value: "98%", label: "Tasa de satisfacción" },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-cyan-600 to-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">{s.value}</div>
              <div className="text-cyan-100 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
