import Link from 'next/link';
import Image from 'next/image';
import Navbar from './hdcomponents/navbar';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col relative text-slate-200 font-sans bg-slate-950">
      
      {/* NAVBAR */}
      <Navbar />

      {/* BACKGROUND IMAGE & UNIFIED OVERLAY */}
      <div className="absolute inset-0 z-0 fixed">
        <Image 
          src="/Background.jpeg" 
          alt="Portal background" 
          fill 
          className="object-cover" 
          priority 
        />
        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[2px]"></div>
      </div>

      {/* HERO CONTENT SECTION */}
      <div className="flex flex-col justify-center items-center text-center relative z-10 px-6 pt-28 pb-16 md:py-28 lg:px-32 flex-grow animate-fadeIn">
        
        {/* Core Identifier Badge */}
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00bcd4] bg-[#00bcd4]/10 px-4 py-1.5 rounded-full border border-[#00bcd4]/20 mb-6">
          
        </span>

        {/* Title Block */}
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight drop-shadow-lg tracking-tight">
            Upstairs <span className="text-[#00bcd4]">[Talent Pipeline]</span> Registration Portal
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto drop-shadow-sm font-normal leading-relaxed">
            Empowering tech talent and high-growth startup frameworks through rigorous operational opportunity.
          </p>
        </div>

        {/* Action Registration Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-10 w-full max-w-xl">
          <Link 
            href="/apply/talent" 
            className="bg-[#008b9c] hover:bg-[#009fb3] text-white font-bold text-sm uppercase tracking-wider py-5 px-7 text-center transition-all shadow-lg shadow-cyan-500/10 rounded-lg w-full sm:w-auto flex-1 hover:-translate-y-0.5 duration-150"
          >
            🚀 Talent Registration
          </Link>
          <Link 
            href="/apply/employer" 
            className="bg-[#218c53] hover:bg-[#28ab65] text-white font-bold text-sm uppercase tracking-wider py-5 px-7 text-center transition-all shadow-lg shadow-green-500/10 rounded-lg w-full sm:w-auto flex-1 hover:-translate-y-0.5 duration-150"
          >
            🏢 Employer Registration
          </Link>
        </div>
      </div>

      {/* PORTALS INTERACTIVE SECTIONS ARRAY */}
      <section className="relative z-10 bg-gradient-to-t from-slate-950/90 to-transparent backdrop-blur-sm py-16 px-6 md:px-20 lg:px-32 border-t border-slate-800/40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Card 1: Virtual Academic Portal Link */}
          <div className="bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-cyan-950/70 backdrop-blur-md border border-cyan-500/40 p-8 rounded-xl shadow-[0_0_30px_rgba(0,139,156,0.15)] flex flex-col justify-between items-center text-center hover:border-[#00bcd4] hover:shadow-[0_0_35px_rgba(0,139,156,0.25)] transition-all duration-350 group">
            <div className="mb-6">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center text-xl border border-cyan-500/30 mb-4 group-hover:bg-[#00bcd4]/20 transition-colors">
                📚
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-wide group-hover:text-[#00bcd4] transition-colors">
                Learning Materials Portal
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Access your training track syllabus, conceptual notes arrays, and lecture video streams.
              </p>
            </div>
            <Link 
              href="/learning" 
              className="w-full bg-cyan-600/20 hover:bg-[#008b9c] border border-cyan-500/40 hover:border-transparent text-white font-bold text-xs uppercase tracking-wider py-3.5 px-8 text-center transition-all rounded-lg shadow-md"
            >
              Access Learning Portal
            </Link>
          </div>

          {/* Card 2: Internal Admin Management Dashboard */}
          <div className="bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-emerald-950/70 backdrop-blur-md border border-green-500/40 p-8 rounded-xl shadow-[0_0_30px_rgba(33,140,83,0.15)] flex flex-col justify-between items-center text-center hover:border-green-400 hover:shadow-[0_0_35px_rgba(33,140,83,0.25)] transition-all duration-350 group">
            <div className="mb-6">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center text-xl border border-green-500/30 mb-4 group-hover:bg-green-500/20 transition-colors">
                🛡️
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-wide group-hover:text-green-400 transition-colors">
                Internal Operations
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Administrative pipeline systems for vetting records, scheduling interviews, and placement logic loops.
              </p>
            </div>
            <Link 
              href="/admin" 
              className="w-full bg-green-600/20 hover:bg-[#218c53] border border-green-500/40 hover:border-transparent text-white font-bold text-xs uppercase tracking-wider py-3.5 px-8 text-center transition-all rounded-lg shadow-md"
            >
              Internal Admin Dashboard
            </Link>
          </div>

        </div>
      </section>

      {/* PREMIUM COHESIVE GLASSMORTPHIC FOOTER */}
      <footer className="relative z-10 bg-slate-950/60 backdrop-blur-md text-slate-400 py-16 px-6 md:px-20 lg:px-32 border-t border-slate-800/60">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          
          <div>
            <h3 className="font-bold text-white text-lg mb-4 tracking-wide border-l-2 border-[#00bcd4] pl-3">Contact Framework</h3>
            <p className="text-sm mb-2">📞 Phone: <a href="tel:+2349031753700" className="hover:text-[#00bcd4] text-slate-300 transition-colors font-mono">+234 903 175 3700</a></p>
            <p className="text-sm mb-2">💬 WhatsApp: <a href="https://wa.me/2349031753700" className="hover:text-[#00bcd4] text-slate-300 transition-colors font-semibold">Initialize Secure Chat</a></p>
            <p className="text-sm text-slate-300">✉️ Email: info@upstairstalentpipelineafrica.com</p>
          </div>
          
          <div>
            <h3 className="font-bold text-white text-lg mb-4 tracking-wide border-l-2 border-green-500 pl-3">Quick Link</h3>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><Link href="/" className="hover:text-[#00bcd4] transition-colors">Home Base</Link></li>
              <li><Link href="/how-it-works" className="hover:text-[#00bcd4] transition-colors">How It Works</Link></li>
              <li><Link href="/internship-tracks" className="hover:text-[#00bcd4] transition-colors">Incubation Tracks</Link></li>
              <li><Link href="/partner-companies" className="hover:text-[#00bcd4] transition-colors">Corporate Partners</Link></li>
              <li><Link href="/startups" className="hover:text-[#00bcd4] transition-colors">Upstairs Startups</Link></li>
              <li><Link href="/success-stories" className="hover:text-[#00bcd4] transition-colors">Success Matrices</Link></li>
              <li><Link href="/faq" className="hover:text-[#00bcd4] transition-colors">Operational FAQ</Link></li>
            </ul>
          </div>
          
           <div>
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <p className="text-sm text-blue-400 hover:text-blue-300 cursor-pointer">🌐 Facebook / Twitter / LinkedIn</p>
          </div>
        </div>

        <div className="text-center text-xs mt-16 pt-8 text-slate-600 border-t border-slate-900/40 font-mono tracking-wider">
          © {new Date().getFullYear()} UPSTAIRS [TALENT PIPELINE]. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
}