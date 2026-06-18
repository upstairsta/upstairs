import Navbar from '../hdcomponents/navbar';
import Footer from '../ftcomponents/footer';

export default function ApplyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Apply to TalentForge
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mb-8 mx-auto">
          Begin your journey by registering as a talent or employer. Choose the path that fits you best.
        </p>

        {/* Registration Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
          <a 
            href="/apply/talent" 
            className="bg-[#008b9c] hover:bg-[#009fb3] text-white font-semibold text-sm md:text-base py-3 px-8 uppercase tracking-wide text-center transition-colors shadow-lg rounded-md w-full sm:w-auto"
          >
            Talent Registration
          </a>

          <a 
            href="/apply/employer" 
            className="bg-[#218c53] hover:bg-[#28ab65] text-white font-semibold text-sm md:text-base py-3 px-8 uppercase tracking-wide text-center transition-colors shadow-lg rounded-md w-full sm:w-auto"
          >
            Employer Registration
          </a>
        </div>
      </main>

      {/* Footer */}
      <Footer />
      
    </div>
  );
}