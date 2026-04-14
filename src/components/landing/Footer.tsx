import Link from "next/link";

export default function Footer() {
  const links = {
    Servicios: ["Limpieza dental", "Blanqueamiento", "Ortodoncia", "Implantes", "Endodoncia"],
    Clínica: ["Equipo", "Tecnología", "Horarios", "Ubicación", "Blog"],
    Legal: ["Privacidad", "Términos", "Cookies", "Aviso legal"],
  };

  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">Dental<span className="text-cyan-400">Care</span></span>
            </div>
            <p className="text-sm text-slate-400 mb-4">Tu sonrisa es nuestra prioridad desde 2010.</p>
          </div>
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-medium text-white mb-3">{title}</h4>
              <ul className="space-y-2">
                {items.map((l) => (
                  <li key={l}><Link href="#" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">© 2026 DentalCare Pro. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            {["Twitter", "Instagram", "Facebook"].map((s) => (
              <a key={s} href="#" className="text-slate-500 hover:text-cyan-400 text-sm transition-colors">{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
