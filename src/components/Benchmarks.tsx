import { useState } from "react";
import { Cpu, HelpCircle, Sparkles } from "lucide-react";
import { BenchmarkData } from "../types";

export default function Benchmarks() {
  const [metric, setMetric] = useState<"throughput" | "latency" | "memory">("throughput");

  const benchmarkData: BenchmarkData[] = [
    { framework: "Jet (Python)", throughput: 138000, latency: 0.15, memory: 14, isMicroJet: true },
    { framework: "Sanic", throughput: 84000, latency: 0.32, memory: 38, isMicroJet: false },
    { framework: "FastAPI", throughput: 62000, latency: 0.45, memory: 48, isMicroJet: false },
    { framework: "Flask", throughput: 12000, latency: 2.15, memory: 26, isMicroJet: false },
    { framework: "Django", throughput: 8500, latency: 3.20, memory: 75, isMicroJet: false }
  ];

  const maxValues = {
    throughput: 150000,
    latency: 4.0,
    memory: 100
  };

  const formatValue = (val: number) => {
    if (metric === "throughput") {
      return val.toLocaleString() + " reqs/s";
    } else if (metric === "latency") {
      return val.toFixed(2) + " ms";
    } else {
      return val + " MB";
    }
  };

  return (
    <section id="benchmarks" className="py-24 bg-[#080a0e] relative overflow-hidden border-t border-slate-900/60">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/10 rounded-full pointer-events-none filter blur-3xl opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-mono font-semibold text-yellow-400 uppercase tracking-widest bg-yellow-500/10 border border-yellow-500/20 px-3.5 py-1.5 rounded-full inline-block mb-4">
            Performance & Ergonomics
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
            Lightweight & Fast
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base font-normal">
            Jet avoids unnecessary magic and heavy abstractions to deliver high performance and ultra-low memory overhead.
          </p>
        </div>

        {/* Controls & Visualization */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" id="benchmarks-container">
          
          {/* Explanation panel */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-display font-bold text-2xl text-white tracking-tight leading-tight">
              Minimal Abstractions, Maximum Efficiency
            </h3>
            <p className="text-slate-300 font-normal text-sm sm:text-base leading-relaxed">
              Every API in Jet is readable by beginners while remaining powerful enough to grow. Routes are simple Python functions without decorator bloat.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-2xl bg-[#0e1118] border border-slate-800/80">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center flex-shrink-0">
                  <Cpu className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Function-Based Handler Execution</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Direct function references prevent complex wrapper overheads and deep call-stack traversals.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-[#0e1118] border border-slate-800/80">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-mono text-yellow-400 font-bold text-xs">01</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Separation of Concerns</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Configuration describes the app (`config.py`), while app code describes behavior (`app.py`).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Chart Panel */}
          <div className="lg:col-span-7 bg-[#0e1118] border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-2xl flex flex-col justify-between">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5 mb-6">
              <div>
                <h4 className="text-sm font-semibold text-white tracking-wide uppercase font-display">
                  Framework Metrics
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                  Python Web Framework Comparison
                </p>
              </div>

              {/* Metric Selector Tabs */}
              <div className="flex gap-1 bg-[#0a0d14] p-1 rounded-xl border border-slate-800/80">
                {(["throughput", "latency", "memory"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMetric(m)}
                    className={`px-3 py-1.5 text-[10px] font-mono font-semibold rounded-lg capitalize transition-all cursor-pointer ${
                      metric === m
                        ? "bg-yellow-400 text-slate-950 font-bold"
                        : "text-slate-400 hover:text-white"
                    }`}
                    id={`benchmark-tab-${m}`}
                  >
                    {m === "throughput" ? "Speed" : m}
                  </button>
                ))}
              </div>
            </div>

            {/* Bar Chart */}
            <div className="space-y-6" id="benchmark-bars">
              {benchmarkData.map((data) => {
                const value = data[metric];
                const max = maxValues[metric];
                const isLowerBetter = metric === "latency" || metric === "memory";
                
                let pct = (value / max) * 100;
                if (pct > 100) pct = 100;
                if (pct < 4) pct = 4;

                return (
                  <div key={data.framework} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold ${data.isMicroJet ? "text-yellow-400 font-bold" : "text-slate-300"}`}>
                          {data.framework}
                        </span>
                        {data.isMicroJet && (
                          <span className="px-1.5 py-0.5 rounded bg-yellow-500/10 border border-yellow-500/30 text-[9px] font-mono text-yellow-400 uppercase leading-none font-bold">
                            Jet
                          </span>
                        )}
                      </div>
                      <span className={`text-xs font-mono font-semibold ${data.isMicroJet ? "text-yellow-400" : "text-slate-400"}`}>
                        {formatValue(value)}
                      </span>
                    </div>

                    <div className="h-6 bg-[#0a0d14] rounded-lg overflow-hidden border border-slate-800/80 flex items-center relative">
                      <div
                        className={`h-full rounded-r-md transition-all duration-700 ease-out flex items-center justify-end pr-3 ${
                          data.isMicroJet
                            ? "bg-gradient-to-r from-yellow-500 via-yellow-400 to-amber-300 border-r-2 border-yellow-200"
                            : isLowerBetter 
                              ? "bg-slate-800/80" 
                              : "bg-slate-800/40"
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex gap-2 items-start text-[10px] text-slate-400 bg-[#0a0d14] p-3.5 rounded-xl border border-slate-800/80 leading-relaxed font-normal">
              <HelpCircle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
              <span>
                Throughput measures HTTP requests processed per second. Latency is average response time in milliseconds. Memory is baseline RSS memory footprint in megabytes.
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
