import Navbar from '../hdcomponents/navbar';
import Footer from '../ftcomponents/footer';

export default function InternshipTracksPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Internship Tracks
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl">
          Explore the different internship tracks available to help you build skills and gain experience.
        </p>
        
        {/* Add a grid or list of tracks here */}
      </main>

       {/* Footer */}
            <Footer />
    </div>
  );
}
