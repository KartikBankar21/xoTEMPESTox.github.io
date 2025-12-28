import React from 'react';
import { X, TrendingUp, Globe, Terminal, Server, Database, Cloud, Palette } from 'lucide-react';

/**
 * TechBadge Component
 * Renders a stylized badge for technology items
 */
const TechBadge = ({ icon: Icon, label, colorClass, textColor }) => (
  <div className={`flex items-center bg-slate-800 ${textColor} text-sm font-medium px-3 py-1.5 rounded-full border border-slate-700 hover:border-slate-500 transition-colors cursor-default`}>
    <Icon size={14} className={`mr-2 ${colorClass}`} />
    <span>{label}</span>
  </div>
);

const App = () => {
  const techStack = [
    { label: 'React', icon: Terminal, colorClass: 'text-cyan-400', textColor: 'text-cyan-300' },
    { label: 'Node.js', icon: Server, colorClass: 'text-green-500', textColor: 'text-green-400' },
    { label: 'MongoDB', icon: Database, colorClass: 'text-emerald-400', textColor: 'text-emerald-300' },
    { label: 'Tailwind CSS', icon: Palette, colorClass: 'text-sky-400', textColor: 'text-sky-300' },
    { label: 'DigitalOcean', icon: Cloud, colorClass: 'text-blue-500', textColor: 'text-blue-400' },
  ];

  const highlights = [
    "Built custom CMS to add/manage stocks, financials, blogs (via React Quill), and linked news articles",
    "Optimized Express backend with parallel data processing and sampling to reduce latency by 65% and payload size by 85%",
    "Achieved 95+ Lighthouse scores via Cloudinary CDN, skeleton loaders, and preloading of critical assets",
    "Deployed on DigitalOcean with Nginx reverse proxy, custom domain, SSL config, and Google Sheets API for contact form"
  ];

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 font-sans selection:bg-indigo-500/30">
      {/* Main Project Detail Card */}
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-gray-200 animate-in fade-in zoom-in duration-500">
        
        {/* Header Section */}
        <header className="p-6 pb-4 border-b border-slate-800/50 flex justify-between items-start bg-gradient-to-b from-slate-800/20 to-transparent">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-indigo-500/10 rounded-lg">
                <TrendingUp className="text-indigo-400 w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight leading-tight">
                Unlisted Valley
              </h1>
            </div>
            <p className="text-sm text-gray-400 max-w-md">
              Stock analytics platform with admin CMS, SEO, and high-performance backend
            </p>
          </div>
          
          <button 
            className="text-gray-500 hover:text-white transition-all p-2 rounded-xl hover:bg-slate-800 active:scale-95"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </header>

        {/* Scrollable Content Area */}
        <div className="p-6 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">

          {/* 1. Description Section */}
          <section className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              Description
            </h2>
            <p className="text-gray-300 leading-relaxed text-[15px]">
              Full-stack unlisted shares platform with custom CMS to manage stocks, blogs, and news. 
              Features optimized Express backend, high Lighthouse scores, and Google Sheets integration for outreach.
            </p>
          </section>

          {/* 2. Tech Stack Section */}
          <section className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {techStack.map((tech) => (
                <TechBadge key={tech.label} {...tech} />
              ))}
            </div>
          </section>

          {/* 3. Key Highlights Section */}
          <section className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              Key Highlights
            </h2>
            <ul className="space-y-4">
              {highlights.map((item, index) => (
                <li key={index} className="flex items-start space-x-3 group">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0 group-hover:scale-150 transition-transform" />
                  <span className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Footer Actions */}
        <footer className="p-6 border-t border-slate-800/50 bg-slate-900/50">
          <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/20 active:scale-[0.98] flex items-center justify-center space-x-2 group">
            <Globe size={18} className="group-hover:rotate-12 transition-transform" />
            <span>Visit Live Website</span>
          </button>
        </footer>
      </div>

      {/* Global CSS for scrollbar styling */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
      `}</style>
    </div>
  );
};

export default App;