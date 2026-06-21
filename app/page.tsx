import Link from 'next/link';
import Image from 'next/image';
import Navbar from './hdcomponents/navbar';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col relative">
      
      {/* THIS ONE LINE REPLACES ALL THE NAVBAR CODE! */}
      <Navbar />

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/Background.jpeg" 
          alt="Portal background" 
          fill 
          className="object-cover" 
          priority 
        />
        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-slate-900/70"></div>
      </div>

      {/* HERO CONTENT */}
      <div className="flex flex-col justify-center items-center text-center relative z-10 px-6 py-16 md:py-12 lg:px-32 flex-grow">
        
        {/* TITLE */}
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-1 leading-tight drop-shadow-md">
            Upstairs [Talent Pipeline] Registration Portal
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-200 mb-0 drop-shadow-sm font-normal">
            Empowering talent and employers through opportunity
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-7 items-center justify-center mt-8 w-full max-w-2xl">
          <Link 
            href="/apply/talent" 
            className="bg-[#008b9c] hover:bg-[#009fb3] text-white font-bold text-sm md:text-base py-4 px-8 uppercase tracking-widest text-center transition-colors shadow-lg rounded-md w-full sm:w-auto flex-1"
          >
            Talent Registration
          </Link>
          <Link 
            href="/apply/employer" 
            className="bg-[#218c53] hover:bg-[#28ab65] text-white font-bold text-sm md:text-base py-4 px-8 uppercase tracking-widest text-center transition-colors shadow-lg rounded-md w-full sm:w-auto flex-1"
          >
            Employer Registration
          </Link>
        </div>
      </div>

      {/* PORTALS SECTION */}
      <section className="relative z-10 bg-white py-12 px-6 md:px-20 lg:px-32 border-t border-gray-100">
        <div className="flex flex-col items-center text-center space-y-8 max-w-lg mx-auto">
          
          {/* Learning Materials Portal */}
          <div className="flex flex-col items-center space-y-1 w-full">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              Learning Materials Portal
            </h2>
            <Link 
              href="/materials" 
              className="w-full sm:w-auto max-w-xs bg-[#008b9c] hover:bg-[#009fb3] text-white font-bold text-xs md:text-sm py-3 px-8 uppercase tracking-wide text-center transition-colors shadow rounded-md"
            >
              Access Learning Portal
            </Link>
          </div>

          {/* Internal Admin Portal */}
          <div className="flex flex-col items-center space-y-1 w-full border-t border-gray-200 pt-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              Internal Admin
            </h2>
            <Link 
              href="/admin" 
              className="w-full sm:w-auto max-w-xs bg-[#218c53] hover:bg-[#28ab65] text-white font-bold text-xs md:text-sm py-3 px-8 uppercase tracking-wide text-center transition-colors shadow rounded-md"
            >
              Internal Admin Dashboard
            </Link>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 bg-[#0f172a] text-white py-12 px-6 md:px-20 lg:px-32">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <p className="text-sm mb-2">📞 Phone: <a href="tel:+2349031753700" className="hover:text-[#008b9c] transition-colors">+234 903 175 3700</a></p>
            <p className="text-sm mb-2">💬 WhatsApp: <a href="https://wa.me/2349031753700" className="hover:text-[#008b9c] transition-colors">Chat with us</a></p>
            <p className="text-sm">✉️ Email: info@upstairstalentpipelineafrica.com</p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-[#008b9c] transition-colors">Home</Link></li>
              <li><Link href="/how-it-works" className="hover:text-[#008b9c] transition-colors">How It Works</Link></li>
              <li><Link href="/internship-tracks" className="hover:text-[#008b9c] transition-colors">Internship Tracks</Link></li>
              <li><Link href="/partner-companies" className="hover:text-[#008b9c] transition-colors">Partner Companies</Link></li>
              <li><Link href="/upstairs-startups" className="hover:text-[#008b9c] transition-colors">Upstairs [Talent Pipeline] Startups</Link></li>
              <li><Link href="/success-stories" className="hover:text-[#008b9c] transition-colors">Success Stories</Link></li>
              <li><Link href="/faq" className="hover:text-[#008b9c] transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <p className="text-sm text-blue-400 hover:text-blue-300 cursor-pointer">🌐 Facebook / Twitter / LinkedIn</p>
          </div>
        </div>

        <div className="text-center text-xs mt-12 pt-8 text-gray-500 border-t border-slate-800">
          © {new Date().getFullYear()} Upstairs [Talent Pipeline]. All rights reserved.
        </div>
      </footer>
    </div>
  );
}