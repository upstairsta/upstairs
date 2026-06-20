import Navbar from '../hdcomponents/navbar';
import Footer from '../ftcomponents/footer'; 

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      
      {/* 1. MAGIC ONE-LINER: Your entire navigation bar appears here! */}
      <Navbar />

      {/* 2. THE REST OF YOUR PAGE CONTENT */}
      <main className="flex-grow flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-slate-600">
          Find answers to all your questions about the Upstairs [Talent Pipeline] portal right here.
        </p>
        
        {/* You would put your accordion or list of questions down here */}
        
      </main>
      
       {/* Footer */}
            <Footer />
    </div>
  );
}
