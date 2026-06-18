import Navbar from '../hdcomponents/navbar'; 
import Footer from '../ftcomponents/footer';

export default function SuccessStoriesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Success Stories
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl">
          Read inspiring stories of talents and employers who achieved success through TalentForge.
        </p>
        
        {/* Add testimonials, quotes, or story cards here */}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
