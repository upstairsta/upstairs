import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative z-10 bg-slate-950 text-white py-16 px-6 md:px-20 lg:px-32 border-t border-slate-800">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        
        {/* CONTACT INFO */}
        <div>
          <h3 className="font-bold text-lg mb-5 text-white">Contact Us</h3>
          <p className="text-sm mb-3 text-slate-400">
            📞 Phone: <a href="tel:+2349031753700" className="hover:text-[#00bcd4] transition-colors duration-300">+234 903 175 3700</a>
          </p>
          <p className="text-sm mb-3 text-slate-400">
            💬 WhatsApp: <a href="https://wa.me/2349031753700" className="hover:text-[#00bcd4] transition-colors duration-300">Chat with us</a>
          </p>
          <p className="text-sm text-slate-400">
            ✉️ Email: <a href="mailto:info@talentforge.org" className="hover:text-[#00bcd4] transition-colors duration-300">info@talentforge.org</a>
          </p>
        </div>
        
        {/* QUICK LINKS */}
        <div>
          <h3 className="font-bold text-lg mb-5 text-white">Quick Links</h3>
          <ul className="space-y-3 text-sm text-slate-400">
            <li><Link href="/" className="hover:text-[#00bcd4] transition-colors duration-300">Home</Link></li>
            <li><Link href="/how-it-works" className="hover:text-[#00bcd4] transition-colors duration-300">How It Works</Link></li>
            <li><Link href="/internship-tracks" className="hover:text-[#00bcd4] transition-colors duration-300">Internship Tracks</Link></li>
            <li><Link href="/partner-companies" className="hover:text-[#00bcd4] transition-colors duration-300">Partner Companies</Link></li>
            <li><Link href="/talentforge-startups" className="hover:text-[#00bcd4] transition-colors duration-300">TalentForge Startups</Link></li>
            <li><Link href="/success-stories" className="hover:text-[#00bcd4] transition-colors duration-300">Success Stories</Link></li>
            <li><Link href="/faq" className="hover:text-[#00bcd4] transition-colors duration-300">FAQ</Link></li>
          </ul>
        </div>
        
        {/* SOCIAL MEDIA */}
        <div>
          <h3 className="font-bold text-lg mb-5 text-white">Follow Us</h3>
          <div className="flex space-x-4 text-sm text-slate-400">
            <span className="hover:text-[#00bcd4] cursor-pointer transition-colors duration-300">Facebook</span>
            <span>/</span>
            <span className="hover:text-[#00bcd4] cursor-pointer transition-colors duration-300">Twitter</span>
            <span>/</span>
            <span className="hover:text-[#00bcd4] cursor-pointer transition-colors duration-300">LinkedIn</span>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="max-w-6xl mx-auto text-center text-sm mt-16 pt-8 text-slate-500 border-t border-slate-800/50">
        © {new Date().getFullYear()} TalentForge. All rights reserved.
      </div>
    </footer>
  );
}