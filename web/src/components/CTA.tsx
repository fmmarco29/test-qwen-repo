export default function CTA() {
  return (
    <section id="cta" className="py-24 border-t border-[#1e293b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-cyan-600 p-8 sm:p-12 md:p-16 text-center">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Join 10,000+ developers building faster with Nexus. Start free — no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#"
                className="px-8 py-3.5 rounded-xl bg-white text-indigo-600 font-medium hover:bg-gray-100 transition-colors"
              >
                Create free account
              </a>
              <a
                href="#"
                className="px-8 py-3.5 rounded-xl border border-white/30 text-white font-medium hover:bg-white/10 transition-colors"
              >
                Schedule a demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
