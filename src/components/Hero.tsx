import { useState } from "react";
import { Copy, Check, Terminal, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onGetStarted: () => void;
  onReadDocs?: () => void;
}

export default function Hero({ onGetStarted, onReadDocs }: HeroProps) {
  const [copied, setCopied] = useState(false);
  const installCmd = "pip install jet";

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section 
      id="hero" 
      className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-[#080a0e]"
    >
      {/* Fumadocs Signature Grainy Glow Backgrounds */}
      <div className="absolute inset-0 fuma-glow-top pointer-events-none transition-opacity duration-1000" />
      <div className="absolute inset-0 fuma-glow-left pointer-events-none transition-opacity duration-1000" />
      <div className="absolute inset-0 fuma-noise opacity-40 pointer-events-none" />

      {/* Floating Decorative Particles */}
      <motion.div 
        animate={{ y: [-10, 10, -10], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[10%] w-3 h-3 rounded-full bg-yellow-400/40 blur-[1px] pointer-events-none"
      />
      <motion.div 
        animate={{ y: [15, -15, 15], opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[35%] right-[15%] w-2 h-2 rounded-full bg-amber-300/40 blur-[1px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        
        {/* Top Badge matching Fumadocs "the React.js docs framework you love." */}
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.05, y: -2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-yellow-500/15 via-amber-500/10 to-yellow-500/15 border border-yellow-500/30 text-yellow-400 text-xs sm:text-sm font-medium mb-8 shadow-[0_0_20px_rgba(234,179,8,0.15)] hover:border-yellow-400/60 hover:shadow-[0_0_25px_rgba(234,179,8,0.25)] transition-all cursor-pointer backdrop-blur-md group"
        >
          <img 
            src="https://i.ibb.co/LDdqnb1L/6fb40491-3b3c-4c88-a692-e5231bd773e2-1.png" 
            alt="Jet" 
            referrerPolicy="no-referrer"
            className="w-4 h-4 object-contain group-hover:rotate-12 transition-transform duration-300 drop-shadow-[0_0_6px_rgba(234,179,8,0.4)]" 
          />
          <span className="font-semibold tracking-wide">the Python web framework you love.</span>
          <Sparkles className="w-3.5 h-3.5 text-yellow-400/80 group-hover:scale-125 transition-transform" />
        </motion.div>

        {/* Big Fumadocs Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-4xl sm:text-6xl md:text-[76px] leading-[1.08] tracking-tight text-white max-w-5xl"
        >
          Build excellent web applications, your <span className="bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent inline-block hover:scale-[1.02] transition-transform duration-300 cursor-default">style.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed"
        >
          A lightweight, function-based Python web framework designed for simplicity, extreme speed, and zero magic.
        </motion.p>

        {/* CTA Buttons matching Fumadocs Getting Started / Open StackBlitz */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 w-full"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 35px rgba(234, 179, 8, 0.4)" }}
            whileTap={{ scale: 0.96 }}
            onClick={onGetStarted}
            className="px-8 py-3.5 text-sm sm:text-base font-semibold text-slate-950 bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-300 rounded-full transition-all shadow-lg shadow-yellow-500/25 cursor-pointer flex items-center gap-2 group border border-yellow-200/50"
            id="hero-cta-get-started"
          >
            <span>Getting Started</span>
            <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          {onReadDocs && (
            <motion.button
              whileHover={{ scale: 1.05, borderColor: "rgba(234, 179, 8, 0.5)", backgroundColor: "rgba(30, 35, 48, 0.9)" }}
              whileTap={{ scale: 0.96 }}
              onClick={onReadDocs}
              className="px-8 py-3.5 text-sm sm:text-base font-semibold text-slate-200 bg-[#1c202a]/80 backdrop-blur-md hover:bg-[#252a36] border border-slate-700/80 rounded-full transition-all cursor-pointer flex items-center gap-2.5 group shadow-lg shadow-black/20"
              id="hero-cta-read-docs"
            >
              <Terminal className="w-4 h-4 text-yellow-400 group-hover:rotate-6 transition-transform" />
              <span>Open Sandbox</span>
            </motion.button>
          )}
        </motion.div>

        {/* Installation copy box */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.02, borderColor: "rgba(234, 179, 8, 0.4)" }}
          className="mt-8 flex items-center gap-3 bg-[#0e1118]/90 border border-slate-800/80 rounded-2xl py-3 px-5 max-w-sm w-full font-mono text-xs sm:text-sm text-slate-300 backdrop-blur-xl shadow-2xl hover:shadow-[0_0_25px_rgba(234,179,8,0.15)] transition-all duration-300 group"
        >
          <span className="text-yellow-400 select-none font-bold animate-pulse">$</span>
          <span className="flex-1 text-left select-all text-slate-200 truncate group-hover:text-white transition-colors">{installCmd}</span>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleCopy}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-yellow-500/60 hover:text-white hover:bg-slate-800/80 transition-all cursor-pointer text-slate-400 shadow-sm"
            title="Copy installation command"
            id="hero-copy-cmd-btn"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400 scale-110 transition-transform" /> : <Copy className="w-4 h-4 group-hover:text-yellow-300 transition-colors" />}
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}

