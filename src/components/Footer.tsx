import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Github, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const handleSectionScroll = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 120);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#080a0e] border-t border-slate-900/80 pt-16 pb-12 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-80 h-80 bg-yellow-500/10 rounded-full pointer-events-none filter blur-2xl opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-slate-900/80 pb-12">
          
          {/* Logo column */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-3 cursor-pointer group">
              <img 
                src="https://i.ibb.co/LDdqnb1L/6fb40491-3b3c-4c88-a692-e5231bd773e2-1.png" 
                alt="Jet Logo" 
                referrerPolicy="no-referrer"
                className="w-8 h-8 object-contain group-hover:scale-105 transition-transform"
              />
              <span className="font-display font-bold text-lg tracking-tight text-white group-hover:text-yellow-300 transition-colors">
                Jet Framework
              </span>
            </Link>
            
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm font-normal leading-relaxed">
              A lightweight, Python-first web framework developed by Code Gear. Simple, function-based, and configuration-driven.
            </p>

            <div className="flex gap-3 pt-2">
              <a 
                href="https://github.com/CodeGear/jet" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-yellow-400 hover:border-yellow-500/50 transition-all"
                title="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
              Framework
            </h5>
            <ul className="space-y-2.5">
              <li>
                <a href="#features" onClick={(e) => handleSectionScroll(e, "features")} className="text-xs text-slate-400 hover:text-yellow-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#sandbox" onClick={(e) => handleSectionScroll(e, "sandbox")} className="text-xs text-slate-400 hover:text-yellow-400 transition-colors">
                  Tutorial & Walkthrough
                </a>
              </li>
              <li>
                <Link to="/introduction" className="text-xs text-slate-400 hover:text-yellow-400 transition-colors">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="md:col-span-4 space-y-3">
            <h5 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
              Code Gear / Community
            </h5>
            <ul className="space-y-2.5">
              <li>
                <a href="https://github.com/CodeGear/jet" target="_blank" rel="noreferrer" className="text-xs text-slate-400 hover:text-yellow-400 transition-colors flex items-center gap-1">
                  GitHub (CodeGear/jet) <ArrowUpRight className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="https://github.com/jetframework/docs" target="_blank" rel="noreferrer" className="text-xs text-slate-400 hover:text-yellow-400 transition-colors flex items-center gap-1">
                  Documentation Repo <ArrowUpRight className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="https://github.com/CodeGear/jet/blob/main/LICENSE" target="_blank" rel="noreferrer" className="text-xs text-slate-400 hover:text-yellow-400 transition-colors flex items-center gap-1">
                  MIT License
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright and status footer */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 font-light">
            &copy; {currentYear} Code Gear & Jet Contributors. Released under the MIT License.
          </p>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <span className="w-2 h-2 rounded-full bg-yellow-400" />
            <span>Jet Framework v0.1</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
