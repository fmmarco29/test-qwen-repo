import LandingNavbar from "@/components/landing/LandingNavbar";
import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import Stats from "@/components/landing/Stats";
import Team from "@/components/landing/Team";
import Testimonials from "@/components/landing/Testimonials";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <LandingNavbar />
      <Hero />
      <Services />
      <Stats />
      <Team />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
