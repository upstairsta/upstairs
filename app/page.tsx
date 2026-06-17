"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Internship Tracks', path: '/internship-tracks' },
    { name: 'Partner Companies', path: '/partner-companies' },
    { name: 'TalentForge Startups', path: '/talentforge-startups' },
    { name: 'Success Stories', path: '/success-stories' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <div className="min-h-screen flex flex-col relative">
      
      {/* NAVBAR */}
      <header className="bg-slate-900 shadow-md sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <Image 
                  src="/talentfox.jpeg" 
                  alt="TalentForge Logo" 
                  width={180} 
                  height={60} 
                  className="object-contain h-16 w-auto rounded-md" 
                  priority
                />
              </Link>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-6 items-center">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.path}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                href="/apply"
                className="bg-blue-600 text-white hover:bg-blue-500 px-5 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Apply
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-slate-800 border-t border-slate-700 shadow-lg absolute w-full">
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-slate-700"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2">
                <Link
                  href="/apply"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-blue-600 text-white hover:bg-blue-500 px-5 py-3 rounded-md text-base font-medium transition-colors"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/background.jpeg" 
          alt="Portal background" 
          fill 
          className="object-cover" 
          priority 
        />
        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-slate-900/70"></div>
      </div>

      {/* HERO CONTENT */}
      <div className="flex flex-col justify-center items-center text-center relative z-10 px-6 py-16 md:py-24 lg:px-32 flex-grow">
        
        {/* TITLE */}
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-md">
            TalentForge Registration Portal
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-200 mb-0 drop-shadow-sm font-normal">
            Empowering talent and employers through opportunity
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center mt-8 w-full max-w-2xl">
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
          <div className="flex flex-col items-center space-y-4 w-full">
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
          <div className="flex flex-col items-center space-y-4 w-full border-t border-gray-200 pt-6">
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
            <p className="text-sm">✉️ Email: info@talentforge.org</p>
          </div>
          
          {/* UPDATED QUICK LINKS */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-[#008b9c] transition-colors">Home</Link></li>
              <li><Link href="/how-it-works" className="hover:text-[#008b9c] transition-colors">How It Works</Link></li>
              <li><Link href="/internship-tracks" className="hover:text-[#008b9c] transition-colors">Internship Tracks</Link></li>
              <li><Link href="/partner-companies" className="hover:text-[#008b9c] transition-colors">Partner Companies</Link></li>
              <li><Link href="/talentforge-startups" className="hover:text-[#008b9c] transition-colors">TalentForge Startups</Link></li>
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
          © {new Date().getFullYear()} TalentForge. All rights reserved.
        </div>
      </footer>
    </div>
  );
}