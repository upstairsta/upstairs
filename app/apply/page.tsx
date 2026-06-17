import Link from 'next/link';
import Image from 'next/image';

export default function ApplyPage() {
  return (
    <div className="min-h-screen flex flex-col relative">
      
      {/* NAVBAR */}
      <nav className="absolute top-0 left-0 w-full z-20 bg-slate-900/70 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4 text-white">
          <h2 className="font-bold text-lg">TalentForge</h2>
          <div className="flex gap-6 text-sm uppercase tracking-wide">
            <Link href="/" className="hover:text-[#00bcd4] transition-colors">Home</Link>
            <Link href="/apply" className="hover:text-[#00bcd4] transition-colors">Internship Tracks</Link>
            <Link href="/faqs" className="hover:text-[#00bcd4] transition-colors">FAQs</Link>
          </div>
        </div>
      </nav>
  </div>
);
}