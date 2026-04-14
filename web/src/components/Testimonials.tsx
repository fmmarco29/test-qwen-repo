const testimonials = [
  {
    quote: "Nexus cut our deployment time by 80%. What used to take hours now takes minutes.",
    author: "Sarah Chen",
    role: "CTO at Flowbase",
    avatar: "SC",
  },
  {
    quote: "The analytics alone paid for the subscription. We finally understand our users.",
    author: "Marcus Rivera",
    role: "Product Lead at Stride",
    avatar: "MR",
  },
  {
    quote: "Best developer experience I've seen in 15 years. The integrations are seamless.",
    author: "Emma Watson",
    role: "Senior Engineer at Cloudpeak",
    avatar: "EW",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 border-t border-[#1e293b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Loved by <span className="gradient-text">builders</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            See what teams around the world are saying about Nexus.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="p-6 rounded-2xl border border-[#1e293b] bg-[#111827]"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-gray-300 leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-sm font-bold">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-medium">{t.author}</div>
                  <div className="text-sm text-gray-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
