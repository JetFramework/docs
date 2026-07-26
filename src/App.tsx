import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import InteractivePlayground from "./components/InteractivePlayground";
import Benchmarks from "./components/Benchmarks";
import Footer from "./components/Footer";
import Docs from "./components/Docs";
import { HelpCircle, Sparkles, Zap, Shield, Cpu } from "lucide-react";
import { motion } from "motion/react";

function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to hash section if present in URL
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location.hash]);

  const handleGetStarted = () => {
    const el = document.getElementById("sandbox");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleReadDocs = () => {
    navigate("/introduction");
  };

  return (
    <div className="min-h-screen bg-[#080a0e] text-slate-100 flex flex-col selection:bg-yellow-500/30 selection:text-yellow-300 relative overflow-hidden">
      {/* Dynamic Background Animated Glow Orbs */}
      <div className="fixed top-[-10%] left-[15%] w-[600px] h-[600px] bg-gradient-to-br from-yellow-500/10 via-amber-500/5 to-transparent rounded-full pointer-events-none filter blur-3xl opacity-40 z-0 animate-orb-1" />
      <div className="fixed bottom-[10%] right-[10%] w-[700px] h-[700px] bg-gradient-to-tr from-amber-500/10 via-yellow-500/5 to-transparent rounded-full pointer-events-none filter blur-3xl opacity-30 z-0 animate-orb-2" />
      <div className="fixed top-[40%] right-[30%] w-[450px] h-[450px] bg-yellow-500/5 rounded-full pointer-events-none filter blur-3xl opacity-20 z-0 animate-pulse-subtle" />

      {/* Floating Header Navbar */}
      <Navbar />

      {/* Main content blocks */}
      <main className="flex-1 relative z-10">
        {/* HERO SECTION */}
        <Hero onGetStarted={handleGetStarted} onReadDocs={handleReadDocs} />

        {/* FEATURES SECTION WITH TABS */}
        <Features />

        {/* INTERACTIVE CODING TUTORIAL SANDBOX */}
        <InteractivePlayground />

        {/* PERFORMANCE COMPARISON BENCHMARKS */}
        <Benchmarks />

        {/* ECOSYSTEM INTEGRATION BANNER */}
        <section id="ecosystem" className="py-24 relative overflow-hidden bg-[#080a0e] border-t border-slate-900/80">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/10 rounded-full pointer-events-none filter blur-3xl opacity-30" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-mono mb-4">
                <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
                <span>UNIVERSAL COMPATIBILITY</span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
                Designed to run <span className="bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">anywhere</span>
              </h2>
              <p className="mt-4 text-slate-400 text-sm sm:text-base font-normal leading-relaxed">
                Jet compiles standard Python async routers. Run it seamlessly across ASGI servers, serverless containers, or production clusters with zero friction.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto" id="ecosystem-cards">
              
              {/* Card 1: Python 3.10+ */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="p-6 rounded-2xl bg-[#0e1118]/80 backdrop-blur-xl border border-slate-800/80 hover:border-yellow-500/40 hover:shadow-[0_10px_30px_-10px_rgba(234,179,8,0.15)] transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-amber-500/5 border border-yellow-500/30 text-yellow-400 flex items-center justify-center font-mono font-bold text-sm shadow-inner group-hover:scale-110 transition-transform duration-300">
                    Py
                  </div>
                  <h4 className="mt-5 font-semibold text-white group-hover:text-yellow-300 transition-colors text-base">
                    Python 3.10+ & PyPy
                  </h4>
                  <p className="mt-2.5 text-xs text-slate-400 leading-relaxed font-normal">
                    Fully compatible with standard Python modules and asyncio. Runs with maximum efficiency on PyPy compilers.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 text-yellow-400 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                    Compatible
                  </span>
                  <span className="text-slate-500 text-[10px]">v3.10+</span>
                </div>
              </motion.div>

              {/* Card 2: ASGI */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="p-6 rounded-2xl bg-[#0e1118]/80 backdrop-blur-xl border border-slate-800/80 hover:border-yellow-500/40 hover:shadow-[0_10px_30px_-10px_rgba(234,179,8,0.15)] transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-amber-500/5 border border-yellow-500/30 text-yellow-400 flex items-center justify-center font-mono font-bold text-sm shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-5 h-5 text-yellow-400" />
                  </div>
                  <h4 className="mt-5 font-semibold text-white group-hover:text-yellow-300 transition-colors text-base">
                    ASGI Engine Native
                  </h4>
                  <p className="mt-2.5 text-xs text-slate-400 leading-relaxed font-normal">
                    Achieve extreme performance gains by binding directly to standard ASGI specification servers like Uvicorn & Granian.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 text-yellow-400 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                    Optimized
                  </span>
                  <span className="text-slate-500 text-[10px]">Native</span>
                </div>
              </motion.div>

              {/* Card 3: Cloud Run */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="p-6 rounded-2xl bg-[#0e1118]/80 backdrop-blur-xl border border-slate-800/80 hover:border-yellow-500/40 hover:shadow-[0_10px_30px_-10px_rgba(234,179,8,0.15)] transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-amber-500/5 border border-yellow-500/30 text-yellow-400 flex items-center justify-center font-mono font-bold text-sm shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <Cpu className="w-5 h-5 text-yellow-400" />
                  </div>
                  <h4 className="mt-5 font-semibold text-white group-hover:text-yellow-300 transition-colors text-base">
                    Serverless & Cloud
                  </h4>
                  <p className="mt-2.5 text-xs text-slate-400 leading-relaxed font-normal">
                    Sub-2ms cold-start boot ensures zero lag inside autoscaled Google Cloud Run, AWS Lambda, or Docker containers.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 text-yellow-400 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                    Sub-2ms
                  </span>
                  <span className="text-slate-500 text-[10px]">Docker</span>
                </div>
              </motion.div>

              {/* Card 4: WebSockets */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="p-6 rounded-2xl bg-[#0e1118]/80 backdrop-blur-xl border border-slate-800/80 hover:border-yellow-500/40 hover:shadow-[0_10px_30px_-10px_rgba(234,179,8,0.15)] transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-amber-500/5 border border-yellow-500/30 text-yellow-400 flex items-center justify-center font-mono font-bold text-sm shadow-inner group-hover:scale-110 transition-transform duration-300">
                    WS
                  </div>
                  <h4 className="mt-5 font-semibold text-white group-hover:text-yellow-300 transition-colors text-base">
                    Real-Time Sockets
                  </h4>
                  <p className="mt-2.5 text-xs text-slate-400 leading-relaxed font-normal">
                    First-class real-time pub/sub features for web applications, live interactive dashboards, or telemetry APIs.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 text-yellow-400 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                    Interactive
                  </span>
                  <span className="text-slate-500 text-[10px]">Pub/Sub</span>
                </div>
              </motion.div>

            </div>

            {/* Developer FAQ block */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-20 max-w-3xl mx-auto border border-slate-800/80 bg-gradient-to-b from-[#0e1118] to-[#0a0d14] rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl hover:border-slate-700/80 transition-all duration-500"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-500/10 rounded-full pointer-events-none filter blur-2xl opacity-30" />
              <div className="absolute bottom-0 left-0 w-36 h-36 bg-amber-500/10 rounded-full pointer-events-none filter blur-2xl opacity-20" />
              
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="p-2 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white font-display">
                    Developer Frequently Asked Questions
                  </h4>
                  <p className="text-xs text-slate-400">Everything you need to know about Jet's core architecture</p>
                </div>
              </div>
              
              <div className="space-y-6 text-xs sm:text-sm relative z-10">
                <div className="border-b border-slate-800/80 pb-5">
                  <h5 className="font-semibold text-white text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                    How does Jet achieve such speed?
                  </h5>
                  <p className="text-slate-300 font-normal mt-2 text-xs sm:text-sm leading-relaxed pl-3.5">
                    Jet avoids unnecessary magic and heavy wrapper layers. It routes requests directly to standard Python function handlers with zero decorator overhead, achieving lightning-fast throughput compared to traditional Python servers.
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold text-white text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                    Is Jet configuration-driven?
                  </h5>
                  <p className="text-slate-300 font-normal mt-2 text-xs sm:text-sm leading-relaxed pl-3.5">
                    Yes, Jet follows one principle — configuration describes the application, application code describes application behavior. Keeping settings in `config.py` and logic in `app.py` keeps your codebase clean and modular.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </section>
      </main>

      {/* Modern footer with navigation links */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/docs" element={<Navigate to="/introduction" replace />} />
      <Route path="/docs/:slug" element={<Docs />} />
      <Route path="/:slug" element={<Docs />} />
    </Routes>
  );
}
