"use client";

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '../hdcomponents/navbar'; // Adjust to ../../hdcomponents/navbar if deeper in folders
import Footer from '../ftcomponents/footer';

// --- DUMMY DATA FOR THE PORTAL ---
const DUMMY_VIDEOS = [
  { id: 1, title: "Mastering React Hooks", duration: "12:45", category: "Software Engineering" },
  { id: 2, title: "Figma Prototyping Basics", duration: "18:20", category: "Product Design" },
  { id: 3, title: "SQL for Beginners", duration: "24:10", category: "Data Science" },
  { id: 4, title: "Agile Project Management", duration: "15:30", category: "Management" },
];

const DUMMY_RESOURCES = [
  { id: 101, title: "Frontend Interview Cheat Sheet", type: "PDF", price: 0, isFree: true },
  { id: 102, title: "Advanced UI/UX Component Kit", type: "Figma File", price: 15, isFree: false },
  { id: 103, title: "Full-Stack Developer Road Map", type: "PDF", price: 0, isFree: true },
  { id: 104, title: "Data Structures & Algorithms Guide", type: "eBook", price: 25, isFree: false },
];

export default function LearningPortalPage() {
  const [activeTab, setActiveTab] = useState('videos');
  
  // Payment & Tracking State
  const [purchasedItems, setPurchasedItems] = useState<number[]>([]);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Trigger Checkout Modal
  const handleBuyClick = (resource: any) => {
    setSelectedResource(resource);
    setPaymentModalOpen(true);
  };

  // Simulate Payment Processing
  const confirmPayment = () => {
    setIsProcessing(true);
    
    // Simulate a 1.5 second delay for communicating with bank/Stripe/Paystack
    setTimeout(() => {
      setPurchasedItems([...purchasedItems, selectedResource.id]);
      setIsProcessing(false);
      setPaymentModalOpen(false);
      alert(`Payment Successful! ${selectedResource.title} is now in your Purchases.`);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col relative text-slate-200 font-sans">
      
      {/* BACKGROUND IMAGE & OVERLAY */}
      <div className="absolute inset-0 z-0 fixed">
        <Image 
          src="/backgrd.jpeg" 
          alt="Portal background" 
          fill 
          className="object-cover" 
          priority 
        />
        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[2px]"></div>
      </div>

      <Navbar />

      {/* HEADER SECTION */}
      <div className="relative z-10 text-white py-12 px-6 text-center mt-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg text-[#00bcd4]">Learning Portal</h1>
        <p className="text-slate-300 max-w-2xl mx-auto text-lg drop-shadow-md">
          Upgrade your skills with our free video lessons, or purchase premium resources to fast-track your career.
        </p>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="relative z-10 flex-grow py-8 px-6 mb-20 max-w-6xl mx-auto w-full">
        
        {/* TABS */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button 
            onClick={() => setActiveTab('videos')}
            className={`px-6 py-3 rounded-lg font-bold transition-all ${activeTab === 'videos' ? 'bg-[#008b9c] text-white shadow-lg shadow-[#008b9c]/20' : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800/80 border border-slate-700/50'}`}
          >
            ▶ Free Videos
          </button>
          <button 
            onClick={() => setActiveTab('resources')}
            className={`px-6 py-3 rounded-lg font-bold transition-all ${activeTab === 'resources' ? 'bg-[#008b9c] text-white shadow-lg shadow-[#008b9c]/20' : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800/80 border border-slate-700/50'}`}
          >
            📚 Resource Library
          </button>
          <button 
            onClick={() => setActiveTab('purchases')}
            className={`px-6 py-3 rounded-lg font-bold transition-all ${activeTab === 'purchases' ? 'bg-[#008b9c] text-white shadow-lg shadow-[#008b9c]/20' : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800/80 border border-slate-700/50'}`}
          >
            🎒 My Purchases ({purchasedItems.length})
          </button>
        </div>

        {/* TAB 1: FREE VIDEOS */}
        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DUMMY_VIDEOS.map((video) => (
              <div key={video.id} className="bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-700/50 overflow-hidden group hover:border-[#00bcd4]/50 transition-colors">
                {/* Simulated Video Thumbnail */}
                <div className="h-40 bg-slate-800 flex items-center justify-center relative group-hover:bg-slate-700 transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-[#00bcd4] rounded-full flex items-center justify-center pl-1 shadow-lg">
                    <span className="text-white text-xl">▶</span>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/70 text-xs px-2 py-1 rounded text-white font-mono">
                    {video.duration}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-xs text-[#00bcd4] font-semibold mb-1 uppercase tracking-wider">{video.category}</p>
                  <h3 className="font-bold text-white text-lg">{video.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: RESOURCE LIBRARY */}
        {activeTab === 'resources' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DUMMY_RESOURCES.map((resource) => {
              const isPurchased = purchasedItems.includes(resource.id);
              
              return (
                <div key={resource.id} className="bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-700/50 p-6 flex flex-col h-full shadow-xl">
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <span className="bg-slate-800 border border-slate-600 text-slate-300 text-xs px-3 py-1 rounded-full">
                        {resource.type}
                      </span>
                      {resource.isFree ? (
                        <span className="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full">FREE</span>
                      ) : (
                        <span className="bg-[#00bcd4]/20 text-[#00bcd4] text-xs font-bold px-3 py-1 rounded-full border border-[#00bcd4]/30">PREMIUM</span>
                      )}
                    </div>
                    <h3 className="font-bold text-white text-xl mb-2">{resource.title}</h3>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-slate-700/50">
                    {resource.isFree || isPurchased ? (
                      <button className="w-full bg-slate-800 hover:bg-slate-700 text-[#00bcd4] font-bold py-3 px-4 rounded-lg transition-colors border border-slate-600">
                        ⬇ Download Now
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleBuyClick(resource)}
                        className="w-full bg-[#008b9c] hover:bg-[#009fb3] text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-lg flex justify-between items-center"
                      >
                        <span>Buy Now</span>
                        <span>${resource.price}</span>
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* TAB 3: MY PURCHASES */}
        {activeTab === 'purchases' && (
          <div className="bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-700/50 p-8 min-h-[40vh]">
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-slate-700/50 pb-4">Unlocked Resources</h2>
            
            {purchasedItems.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <p className="text-lg mb-4">You haven't purchased any premium resources yet.</p>
                <button 
                  onClick={() => setActiveTab('resources')}
                  className="text-[#00bcd4] hover:underline"
                >
                  Browse the Resource Library
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {DUMMY_RESOURCES.filter(r => purchasedItems.includes(r.id)).map(resource => (
                  <div key={resource.id} className="flex justify-between items-center bg-slate-800/50 p-4 rounded-lg border border-slate-600">
                    <div>
                      <h4 className="font-bold text-white text-lg">{resource.title}</h4>
                      <p className="text-sm text-slate-400">{resource.type}</p>
                    </div>
                    <button className="bg-[#008b9c] hover:bg-[#009fb3] text-white px-6 py-2 rounded-lg font-bold transition-colors">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />

      {/* PAYMENT MODAL (Pop-up) */}
      {paymentModalOpen && selectedResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => !isProcessing && setPaymentModalOpen(false)}></div>
          
          <div className="relative bg-slate-900 border border-slate-700 rounded-xl shadow-2xl w-full max-w-md p-8 overflow-hidden">
            <h3 className="text-2xl font-bold text-white mb-2">Checkout Details</h3>
            <p className="text-slate-400 mb-6 pb-6 border-b border-slate-700">You are about to purchase premium material.</p>
            
            <div className="flex justify-between items-center mb-4 text-lg">
              <span className="text-slate-300 font-medium">{selectedResource.title}</span>
              <span className="text-white font-bold">${selectedResource.price}.00</span>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-4 mb-8 border border-slate-600 text-sm text-slate-400 flex items-start space-x-3">
              <span>🔒</span>
              <p>This is a secure, encrypted transaction. In a real environment, this would redirect to Paystack or Stripe.</p>
            </div>

            <div className="space-y-3">
              <button 
                onClick={confirmPayment}
                disabled={isProcessing}
                className="w-full bg-[#218c53] hover:bg-[#28ab65] text-white font-bold py-4 rounded-lg transition-colors flex justify-center items-center disabled:opacity-70 disabled:cursor-wait"
              >
                {isProcessing ? 'Processing Payment...' : `Pay $${selectedResource.price}.00`}
              </button>
              <button 
                onClick={() => setPaymentModalOpen(false)}
                disabled={isProcessing}
                className="w-full bg-transparent hover:bg-slate-800 text-slate-300 font-medium py-3 rounded-lg transition-colors border border-slate-600 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}