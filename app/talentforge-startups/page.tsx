import Navbar from '../hdcomponents/navbar';
import Footer from '../ftcomponents/footer';

export default function TalentForgeStartupsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          TalentForge Startups
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl">
          Explore innovative startups nurtured by TalentForge, driving creativity and entrepreneurship.
        </p>
        
        {/* Add startup showcase cards or carousel here */}
      </main>

       {/* Footer */}
            <Footer />
    </div>
  );
}
