"use client";

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative z-10 bg-brand-dark text-white py-16 px-6 md:px-20 lg:px-32 border-t border-slate-200/10 w-full mt-auto">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 mb-12">
        <div>
          <h3 className="font-bold text-lg mb-5 text-white">Contact Us</h3>
          <p className="text-sm mb-3 text-slate-400">
            📞 Phone: <a href="tel:+2349031753700" className="hover:text-brand-teal transition-colors duration-300">+234 903 175 3700</a>
          </p>
          <p className="text-sm mb-3 text-slate-400">
            💬 WhatsApp: <a href="https://wa.me/2349031753700" className="hover:text-brand-teal transition-colors duration-300">Chat with us</a>
          </p>
          <p className="text-sm text-slate-400">
            ✉️ Email: <a href="mailto:info@upstairstalentpipelineafrica.com" className="hover:text-brand-teal transition-colors duration-300">info@upstairstalentpipelineafrica.com</a>
          </p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-5 text-white">Quick Links</h3>
          <ul className="space-y-3 text-sm text-slate-400">
            <li><Link href="/" className="hover:text-brand-teal transition-colors duration-300">Home</Link></li>
            <li><Link href="/how-it-works" className="hover:text-brand-teal transition-colors duration-300">How It Works</Link></li>
            <li><Link href="/internship-tracks" className="hover:text-brand-teal transition-colors duration-300">Internship Tracks</Link></li>
            <li><Link href="/partner-companies" className="hover:text-brand-teal transition-colors duration-300">Partner Companies</Link></li>
            <li><Link href="/upstairs-startups" className="hover:text-brand-teal transition-colors duration-300">Upstairs Talent Pipeline Startups</Link></li>
            <li><Link href="/success-stories" className="hover:text-brand-teal transition-colors duration-300">Success Stories</Link></li>
            <li><Link href="/faq" className="hover:text-brand-teal transition-colors duration-300">FAQ</Link></li>
            <li><Link href="/jobs" className="hover:text-brand-teal transition-colors duration-300">Jobs</Link></li>
            <li><Link href="/learning" className="hover:text-brand-teal transition-colors duration-300">Learning</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-5 text-white">Account</h3>
          <ul className="space-y-3 text-sm text-slate-400">
            <li><Link href="/login" className="hover:text-brand-teal transition-colors duration-300">Sign In</Link></li>
            <li><Link href="/signup" className="hover:text-brand-teal transition-colors duration-300">Sign Up</Link></li>
            <li><Link href="/signout" className="hover:text-brand-teal transition-colors duration-300">Sign Out</Link></li>
            <li><Link href="/apply" className="hover:text-brand-teal transition-colors duration-300">Apply Portal</Link></li>
          </ul>

          <h3 className="font-bold text-lg mb-5 mt-8 text-white">Follow Us</h3>
          <div className="flex space-x-4 text-sm text-slate-400">
            <a href="https://www.facebook.com/share/18yeFwJzMF/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-teal cursor-pointer transition-colors duration-300">Facebook</a>
            <span>/</span>
            <a href="https://x.com/UpStairsOfficia" target="_blank" rel="noopener noreferrer" className="hover:text-brand-teal cursor-pointer transition-colors duration-300">Twitter</a>
            <span>/</span>
            <a href="https://www.instagram.com/upstairsofficial?igsh=MWxiZncxdG16enh1aQ==" target="_blank" rel="noopener noreferrer" className="hover:text-brand-teal cursor-pointer transition-colors duration-300">Instagram</a>
            <span>/</span>
            <a href="https://www.linkedin.com/in/upstairs-upstairs-164a77420?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="hover:text-brand-teal cursor-pointer transition-colors duration-300">LinkedIn</a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left border-t border-slate-200/10 mt-12 pt-8">
        {[
          { title: 'Professional', desc: 'Built for growth and excellence', icon: '🎯' },
          { title: 'Collaborative', desc: 'Work together, achieve together', icon: '🤝' },
          { title: 'Accountable', desc: 'Track progress, own results', icon: '📢' },
          { title: 'Growth-Oriented', desc: 'Every step moves you up', icon: '🚀' },
        ].map((v) => (
          <div key={v.title} className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-2.5">
            <span className="text-base opacity-80 select-none">{v.icon}</span>
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wide">{v.title}</h4>
              <p className="text-[10px] text-slate-400 leading-tight mt-0.5">{v.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto text-center text-[10px] mt-12 pt-6 text-slate-500 border-t border-slate-200/5 font-mono tracking-wider">
        © {new Date().getFullYear()} Upstairs Talent Pipeline. All rights reserved.
      </div>
    </footer>
  );
}
