import Navbar from '../hdcomponents/navbar';
import Footer from '../ftcomponents/footer'; 

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          How It Works
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl">
          Learn how TalentForge connects talent with employers through a simple, streamlined process.
        </p>
        
        {/* Add step-by-step explanation or visuals here */}
      </main>

       {/* Footer */}
            <Footer />
    </div>
  );
}
