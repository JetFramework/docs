import { useState } from "react";
import { Check, Terminal, Layers, Sparkles, BookOpen, Cpu, Shield, ArrowRight } from "lucide-react";
import { InteractiveTab } from "../types";
import { motion, AnimatePresence } from "motion/react";

export default function Features() {
  const [activeTab, setActiveTab] = useState<string>("simple");

  const tabs: InteractiveTab[] = [
    {
      id: "simple",
      tabLabel: "Simple & Readable",
      title: "No Magic, No Hidden Abstractions",
      subtitle: "Readable by beginners, built to scale",
      description: "Jet avoids unnecessary magic. Every API is readable by beginners while remaining powerful enough to grow — no decorator-based routing, no hidden abstractions, no invented terminology.",
      featuresList: [
        "Zero decorator magic or obscure magic variables",
        "Transparent control flow you can trace in seconds",
        "Built purely with standard Python concepts",
        "Beginner-friendly structure with zero friction"
      ],
      codeSnippet: `from jet import *

app = Jet()

def login(request):
    return Response.html("<h1>Login page</h1>")

app.page("/", "index.html")
app.route("/login", login)

if __name__ == "__main__":
    serve(app)`
    },
    {
      id: "function-based",
      tabLabel: "Function-Based",
      title: "Routes Are Just Python Functions",
      subtitle: "Pure functions, zero class boilerplate",
      description: "Routes in Jet are simple Python functions. You pass function handlers directly to `app.route('/path', handler)` — no mandatory decorators or mandatory OOP class boilerplate required.",
      featuresList: [
        "Pass handler functions directly to app.route()",
        "Clean, testable functions without decorator coupling",
        "Easy composition and reusable request handlers",
        "Explicit handler mapping for transparent application architecture"
      ],
      codeSnippet: `from jet import *

app = Jet()

def get_user_profile(request):
    user_id = request.params.get("id")
    return Response.json({"user_id": user_id, "status": "active"})

def update_settings(request):
    payload = request.json()
    return Response.json({"updated": True, "data": payload})

# Explicit function-based routing
app.route("/profile", get_user_profile)
app.route("/settings", update_settings, methods=["POST"])`
    },
    {
      id: "config-driven",
      tabLabel: "Configuration-Driven",
      title: "Clean Separation of Concerns",
      subtitle: "config.py and app.py stay separated",
      description: "Jet follows one strict principle — configuration describes the application, application code describes application behavior. Keeping settings in `config.py` keeps codebase clean and modular.",
      featuresList: [
        "Separate configuration file config.py for environment settings",
        "Decoupled application logic in app.py",
        "Zero clutter from inline configuration constants",
        "Seamless deployment tuning across environments"
      ],
      codeSnippet: `# config.py
PORT = 3000
DEBUG = True
TEMPLATE_DIR = "templates"
STATIC_DIR = "static"

# app.py
from jet import *
import config

app = Jet(config=config)

def home(request):
    return Response.html("<h1>Welcome to Jet</h1>")

app.route("/", home)`
    },
    {
      id: "auto-docs",
      tabLabel: "Auto Documentation",
      title: "Automatic Swagger & OpenAPI",
      subtitle: "/docs and /openapi.json out-of-the-box",
      description: "Jet auto-mounts an interactive Swagger UI documentation interface at `/docs` and the full spec at `/openapi.json` — zero extra setup or boilerplate required.",
      featuresList: [
        "Automatic OpenAPI spec generation at /openapi.json",
        "Built-in Swagger UI documentation interface mounted at /docs",
        "Zero configuration or third-party dependencies required",
        "Live request testing interface for all routes"
      ],
      codeSnippet: `from jet import *

app = Jet()

def api_health(request):
    return Response.json({"status": "ok", "version": "0.1"})

app.route("/api/health", api_health)

# When you launch jet run:
# -> /docs auto-mounted (Swagger UI)
# -> /openapi.json auto-mounted`
    }
  ];

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section id="features" className="py-24 relative overflow-hidden bg-[#080a0e] border-t border-slate-900/80">
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-yellow-500/5 rounded-full pointer-events-none filter blur-3xl" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Fumadocs Signature Big Statement Block */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto py-12 mb-16 text-left sm:text-center p-8 rounded-3xl bg-gradient-to-r from-yellow-500/5 via-transparent to-amber-500/5 border border-slate-800/60 backdrop-blur-md"
        >
          <p className="font-display text-2xl sm:text-3xl md:text-4xl text-slate-200 leading-[1.4] tracking-tight font-normal">
            Jet is a <span className="text-yellow-400 font-bold drop-shadow-[0_0_12px_rgba(234,179,8,0.3)]">Python</span> web framework for <span className="text-yellow-400 font-bold drop-shadow-[0_0_12px_rgba(234,179,8,0.3)]">Developers</span>, beautifully designed by <span className="text-yellow-400 font-bold">Code Gear.</span> Bringing powerful routing for your web workflows, with high customizability to fit your preferences, works seamlessly with any deployment, ASGI — anything.
          </p>
        </motion.div>

        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mt-8"
        >
          <span className="text-xs font-mono font-semibold text-yellow-400 uppercase tracking-widest bg-yellow-500/10 border border-yellow-500/20 px-3.5 py-1.5 rounded-full inline-block mb-4 shadow-sm">
            Core Principles
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
            Designed for Simplicity & Speed
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base font-normal">
            Jet avoids unnecessary magic. Every API is readable by beginners while remaining powerful enough to grow.
          </p>
        </motion.div>

        {/* Tab Buttons */}
        <div className="mt-12 flex justify-start md:justify-center overflow-x-auto pb-4 gap-2 md:gap-3 no-scrollbar scroll-smooth">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-full transition-all cursor-pointer relative ${
                  isActive
                    ? "text-slate-950 font-bold shadow-lg shadow-yellow-500/20"
                    : "bg-[#141824] border border-slate-800/80 text-slate-400 hover:text-white hover:border-slate-700"
                }`}
                id={`tab-btn-${tab.id}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-feature-tab"
                    className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-400 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{tab.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panel with AnimatePresence */}
        <div className="mt-10 min-h-[420px]" id="features-tab-content">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentTab.id}
              initial={{ opacity: 0, y: 15, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.99 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Detailed Description Panel */}
              <div className="lg:col-span-5 flex flex-col justify-between bg-[#0e1118]/90 backdrop-blur-xl border border-slate-800/80 hover:border-slate-700 transition-all rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500/10 rounded-full pointer-events-none filter blur-2xl opacity-40" />
                
                <div>
                  <span className="text-xs font-mono font-semibold text-yellow-400 uppercase tracking-widest block mb-2">
                    {currentTab.subtitle}
                  </span>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                    {currentTab.title}
                  </h3>
                  <p className="mt-4 text-slate-300 font-normal text-sm sm:text-base leading-relaxed">
                    {currentTab.description}
                  </p>

                  {/* Bullet checklist */}
                  <ul className="mt-6 flex flex-col gap-3.5">
                    {currentTab.featuresList.map((item, index) => (
                      <motion.li 
                        key={index} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08 }}
                        className="flex items-start gap-3"
                      >
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-yellow-400" />
                        </span>
                        <span className="text-slate-300 text-xs sm:text-sm">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800/60 flex items-center gap-3 text-xs font-mono text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                  <span>Jet Framework Core Principle</span>
                </div>
              </div>

              {/* Code Preview Box */}
              <div className="lg:col-span-7 rounded-3xl bg-[#0a0d14] border border-slate-800/80 hover:border-slate-700/80 transition-all flex flex-col overflow-hidden shadow-2xl min-h-[350px]">
                <div className="bg-[#0e1118] px-6 py-4 flex items-center justify-between border-b border-slate-800/80">
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-1.5 mr-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    </div>
                    <Terminal className="w-4 h-4 text-yellow-400" />
                    <span className="text-xs font-mono text-slate-300 font-medium">app.py</span>
                  </div>
                  <span className="text-[10px] font-mono text-yellow-400/80 bg-yellow-500/10 px-2.5 py-1 rounded-full border border-yellow-500/20">Python 3</span>
                </div>

                <div className="flex-1 p-6 sm:p-7 overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed text-slate-200 text-left bg-gradient-to-br from-[#0a0d14] to-[#07090f]">
                  <pre>{currentTab.codeSnippet}</pre>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Overview Feature Cards Grid */}
        <div className="mt-28">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
              What Jet Offers
            </h3>
            <p className="mt-3 text-slate-400 text-sm font-normal">
              Everything you need to build web applications without clutter or unnecessary abstractions.
            </p>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-6 rounded-3xl bg-[#0e1118]/80 backdrop-blur-xl border border-slate-800/80 hover:border-yellow-500/40 hover:shadow-[0_10px_30px_-10px_rgba(234,179,8,0.15)] transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-amber-500/5 border border-yellow-500/30 text-yellow-400 flex items-center justify-center font-mono font-bold text-xs group-hover:scale-110 transition-transform duration-300 shadow-inner">
                <Layers className="w-5 h-5 text-yellow-400" />
              </div>
              <h4 className="mt-5 font-semibold text-white group-hover:text-yellow-300 transition-colors text-base">Routing and Pages</h4>
              <p className="mt-2.5 text-xs text-slate-400 leading-relaxed font-normal">
                Render template files with <code className="text-yellow-300 bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-800">app.page("/", "index.html")</code> or handle function endpoints with <code className="text-yellow-300 bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-800">app.route("/login", login)</code>.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-6 rounded-3xl bg-[#0e1118]/80 backdrop-blur-xl border border-slate-800/80 hover:border-yellow-500/40 hover:shadow-[0_10px_30px_-10px_rgba(234,179,8,0.15)] transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-amber-500/5 border border-yellow-500/30 text-yellow-400 flex items-center justify-center font-mono font-bold text-xs group-hover:scale-110 transition-transform duration-300 shadow-inner">
                <Sparkles className="w-5 h-5 text-yellow-400" />
              </div>
              <h4 className="mt-5 font-semibold text-white group-hover:text-yellow-300 transition-colors text-base">Templates ({'<%jet %>'} Syntax)</h4>
              <p className="mt-2.5 text-xs text-slate-400 leading-relaxed font-normal">
                Clean and intuitive template rendering syntax powered by Jet's lightweight template parser engine.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-6 rounded-3xl bg-[#0e1118]/80 backdrop-blur-xl border border-slate-800/80 hover:border-yellow-500/40 hover:shadow-[0_10px_30px_-10px_rgba(234,179,8,0.15)] transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-amber-500/5 border border-yellow-500/30 text-yellow-400 flex items-center justify-center font-mono font-bold text-xs group-hover:scale-110 transition-transform duration-300 shadow-inner">
                <Terminal className="w-5 h-5 text-yellow-400" />
              </div>
              <h4 className="mt-5 font-semibold text-white group-hover:text-yellow-300 transition-colors text-base">Request & Response Objects</h4>
              <p className="mt-2.5 text-xs text-slate-400 leading-relaxed font-normal">
                Structured <code className="text-yellow-300 bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-800">Response.html()</code>, <code className="text-yellow-300 bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-800">Response.json()</code>, and request inspection objects.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-6 rounded-3xl bg-[#0e1118]/80 backdrop-blur-xl border border-slate-800/80 hover:border-yellow-500/40 hover:shadow-[0_10px_30px_-10px_rgba(234,179,8,0.15)] transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-amber-500/5 border border-yellow-500/30 text-yellow-400 flex items-center justify-center font-mono font-bold text-xs group-hover:scale-110 transition-transform duration-300 shadow-inner">
                <Cpu className="w-5 h-5 text-yellow-400" />
              </div>
              <h4 className="mt-5 font-semibold text-white group-hover:text-yellow-300 transition-colors text-base">Static Files and Uploads</h4>
              <p className="mt-2.5 text-xs text-slate-400 leading-relaxed font-normal">
                Out-of-the-box static asset serving from <code className="text-yellow-300 bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-800">static/</code> and multipart file upload handling.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-6 rounded-3xl bg-[#0e1118]/80 backdrop-blur-xl border border-slate-800/80 hover:border-yellow-500/40 hover:shadow-[0_10px_30px_-10px_rgba(234,179,8,0.15)] transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-amber-500/5 border border-yellow-500/30 text-yellow-400 flex items-center justify-center font-mono font-bold text-xs group-hover:scale-110 transition-transform duration-300 shadow-inner">
                <BookOpen className="w-5 h-5 text-yellow-400" />
              </div>
              <h4 className="mt-5 font-semibold text-white group-hover:text-yellow-300 transition-colors text-base">Auto Documentation</h4>
              <p className="mt-2.5 text-xs text-slate-400 leading-relaxed font-normal">
                Automatically mounts <code className="text-yellow-300 bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-800">/docs</code> (Swagger UI) and <code className="text-yellow-300 bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-800">/openapi.json</code> without extra configuration.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-6 rounded-3xl bg-[#0e1118]/80 backdrop-blur-xl border border-slate-800/80 hover:border-yellow-500/40 hover:shadow-[0_10px_30px_-10px_rgba(234,179,8,0.15)] transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-amber-500/5 border border-yellow-500/30 text-yellow-400 flex items-center justify-center font-mono font-bold text-xs group-hover:scale-110 transition-transform duration-300 shadow-inner">
                <Shield className="w-5 h-5 text-yellow-400" />
              </div>
              <h4 className="mt-5 font-semibold text-white group-hover:text-yellow-300 transition-colors text-base">The jet CLI</h4>
              <p className="mt-2.5 text-xs text-slate-400 leading-relaxed font-normal">
                Run <code className="text-yellow-300 bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-800">jet run</code> to start the dev server with auto-reload, request logging, and a startup banner.
              </p>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
