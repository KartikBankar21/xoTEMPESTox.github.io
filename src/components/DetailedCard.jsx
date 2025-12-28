import React, { useState, useEffect, useRef } from 'react';
import { 
  X, TrendingUp, Globe, Terminal, Server, Database, 
  Cloud, Palette, Github, ExternalLink, Activity, Box 
} from 'lucide-react';

const TechBadge = ({ icon: Icon, label, colorClass, textColor }) => (
  <div className={`flex items-center bg-slate-800 ${textColor} text-[11px] font-medium px-2 py-1 rounded-full border border-slate-700`}>
    {Icon && <Icon size={12} className={`mr-1.5 ${colorClass}`} />}
    <span>{label}</span>
  </div>
);

const DetailCard = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="w-full max-w-6xl mt-4 mb-[10rem] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-gray-200 animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-6 pb-4 border-b border-slate-800/50 flex justify-between items-start bg-gradient-to-b from-slate-800/20 to-transparent">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-indigo-500/10 rounded-lg">
                <TrendingUp className="text-indigo-400 w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">{project.title}</h1>
            </div>
            <p className="text-lg text-gray-400 max-w-md">{project.tagline}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-all p-2 rounded-xl hover:bg-slate-800"
          >
            <X size={20} />
          </button>
        </header>

        <div className="p-6 space-y-0 max-h-[50vh]  overflow-y-auto custom-scrollbar">
          <section className=" p-4!">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">Description</h2>
            <p className="text-gray-300 leading-relaxed text-[15px]">{project.description}</p>
          </section>

          <section className=" p-4!">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <TechBadge key={tech.name} label={tech.name} icon={tech.icon} colorClass={tech.color} textColor={tech.textColor} />
              ))}
            </div>
          </section>

          <section className=" p-4!">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">Key Highlights</h2>
            <ul className="space-y-3">
              {project.highlights.map((item, index) => (
                <li key={index} className="flex items-start space-x-3 group">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0" />
                  <span className="text-gray-300 text-lg leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

         <footer className="p-6 border-t border-slate-800/50 bg-slate-900/50 flex gap-4">
          <button 
            onClick={() => window.open(project.links.github_link, '_blank')}
            className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center space-x-2 border border-slate-700 active:scale-[0.98]"
          >
            <Github size={18} />
            <span>GitHub</span>
          </button>
          <button 
            onClick={() => window.open(project.links.live_link, '_blank')}
            className="flex-[2] bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center space-x-2 active:scale-[0.98]"
          >
            <Globe size={18} />
            <span>Visit Project</span>
          </button>
        </footer>
      </div>
    </div>
  );
};

export default DetailCard;