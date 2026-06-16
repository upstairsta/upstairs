
"use client";

import { useState } from 'react';
import Link from 'next/link';
import supabase from "./supabaseClient";

export default function Navbar() {
  console.log(supabase);
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
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo / Brand Name */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-800">
              TalentForge
            </Link>
          </div>

          {/* Desktop Navigation Links (Hidden on Mobile) */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.path}
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            {/* Desktop Apply Button */}
            <Link 
              href="/apply"
              className="bg-blue-600 text-white hover:bg-blue-700 px-5 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Apply
            </Link>
          </div>

          {/* Mobile Menu Button (Hamburger Icon) */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-md p-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon changes based on isOpen state (Hamburger vs X) */}
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

      {/* Mobile Menu Dropdown (Visible only when isOpen is true) */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)} // Closes menu when a link is clicked
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile Apply Button */}
            <div className="pt-2">
              <Link
                href="/apply"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-blue-600 text-white hover:bg-blue-700 px-5 py-3 rounded-md text-base font-medium transition-colors"
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