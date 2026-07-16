"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Internship Tracks', path: '/internship-tracks' },
    { name: 'Partner Companies', path: '/partner-companies' },
    { name: 'Upstairs Talent Pipeline Startups', path: '/upstairs-startups' },
    { name: 'Success Stories', path: '/success-stories' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <header className="bg-brand-dark shadow-md sticky top-0 z-50 border-b border-slate-200/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.jpeg"
                alt="Upstairs [Talent Pipeline] Logo"
                width={180}
                height={60}
                className="object-contain h-12 w-auto rounded-md"
                priority
              />
            </Link>
          </div>

          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="text-slate-300 hover:text-brand-teal px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/apply"
              className="bg-brand-teal text-white hover:bg-brand-teal-hover px-5 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
            >
              Apply
            </Link>
          </div>

          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-teal rounded-md p-2"
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

      {isOpen && (
        <div className="md:hidden bg-brand-dark/95 backdrop-blur-md border-t border-slate-200/10 shadow-lg absolute w-full left-0">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-brand-teal hover:bg-slate-800/50 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 px-3">
              <Link
                href="/apply"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-brand-teal text-white hover:bg-brand-teal-hover px-5 py-3 rounded-md text-base font-medium transition-colors shadow-md"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
