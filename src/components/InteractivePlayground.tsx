import { useState } from "react";
import { Terminal, Check, BookOpen, Layers, Shield, ChevronRight, Sparkles } from "lucide-react";

interface StepItem {
  id: number;
  label: string;
  title: string;
  description: string;
  code: string;
  filename: string;
}

export default function InteractivePlayground() {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps: StepItem[] = [
    {
      id: 1,
      label: "1. Installation & Setup",
      title: "Installing Jet",
      description: "Clone the Jet repository and install in editable mode. This installs the `jet` command CLI locally.",
      filename: "terminal",
      code: `$ git clone https://github.com/CodeGear/jet.git
$ cd jet
$ pip install -e .

[Jet] Installed jet CLI v0.1 successfully`
    },
    {
      id: 2,
      label: "2. Creating app.py",
      title: "Minimal Jet Application",
      description: "Create your main application file. Import Jet, instantiate the app, define your route handlers, and map pages or routes.",
      filename: "app.py",
      code: `from jet import *

app = Jet()

def login(request):
    return Response.html("<h1>Login page</h1>")

# Map index page to template file
app.page("/", "index.html")

# Map /login path to login function handler
app.route("/login", login)

if __name__ == "__main__":
    serve(app)`
    },
    {
      id: 3,
      label: "3. Template <%jet %> Syntax",
      title: "HTML Templates",
      description: "Jet renders HTML templates located in the `templates/` directory using intuitive `<%jet %>` syntax.",
      filename: "templates/index.html",
      code: `<!DOCTYPE html>
<html>
<head>
    <title>Jet Web App</title>
</head>
<body>
    <h1>Welcome to Jet</h1>
    <%jet if request.user %>
        <p>Hello, <%jet request.user.name %></p>
    <%jet else %>
        <a href="/login font-semibold">Login here</a>
    <%jet endif %>
</body>
</html>`
    },
    {
      id: 4,
      label: "4. Launching with CLI",
      title: "Running `jet run`",
      description: "Execute `jet run` in your terminal to start the development server with auto-reload, request logging, and auto-mounted Swagger UI at `/docs`.",
      filename: "terminal",
      code: `$ jet run

⚡ Jet Web Framework v0.1
-----------------------------------------
* Running on http://127.0.0.1:3000
* Auto-reload enabled
* Swagger UI documentation available at /docs
* OpenAPI spec available at /openapi.json
-----------------------------------------
[INFO] GET / 200 OK (1.2ms)`
    }
  ];

  const currentStep = steps.find((s) => s.id === activeStep) || steps[0];

  return (
    <section id="sandbox" className="py-24 relative overflow-hidden bg-[#080a0e] border-t border-slate-900/60">
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-yellow-500/10 rounded-full pointer-events-none filter blur-3xl opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono font-semibold text-yellow-400 uppercase tracking-widest bg-yellow-500/10 border border-yellow-500/20 px-3.5 py-1.5 rounded-full inline-block mb-4">
            Getting Started Guide
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
            How Jet Works
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base font-normal">
            Step through the core components of building applications with Jet.
          </p>
        </div>

        {/* Step Navigation Bar */}
        <div className="mt-12 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`px-4 py-3 text-xs sm:text-sm font-semibold rounded-xl border text-left transition-all cursor-pointer ${
                activeStep === step.id
                  ? "bg-yellow-400 border-yellow-400 text-slate-950 font-bold shadow-lg shadow-yellow-500/10"
                  : "bg-[#0e1118] border-slate-800/80 text-slate-400 hover:text-white hover:border-slate-700"
              }`}
              id={`tutorial-step-${step.id}`}
            >
              <div className={`font-mono text-[10px] mb-1 ${activeStep === step.id ? "text-slate-900 font-bold" : "text-yellow-400/80"}`}>STEP 0{step.id}</div>
              {step.label}
            </button>
          ))}
        </div>

        {/* Code Showcase Display */}
        <div className="mt-8 max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Explanation panel */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-[#0e1118] border border-slate-800/80 p-6 shadow-2xl">
            <div>
              <span className="text-[10px] font-mono text-yellow-400 font-semibold uppercase tracking-wider block mb-2">
                Step 0{currentStep.id} Overview
              </span>
              <h3 className="text-xl font-bold font-display text-white mb-3">
                {currentStep.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {currentStep.description}
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-800/80">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <BookOpen className="w-4 h-4 text-yellow-400" />
                <span>Jet Framework Walkthrough</span>
              </div>
            </div>
          </div>

          {/* Code Viewer */}
          <div className="lg:col-span-7 flex flex-col rounded-2xl bg-[#0a0d14] border border-slate-800/80 overflow-hidden shadow-2xl">
            <div className="bg-[#0e1118] border-b border-slate-800/80 px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-yellow-400" />
                <span className="text-xs font-mono text-slate-200 font-semibold">
                  {currentStep.filename}
                </span>
              </div>
              <span className="text-[10px] font-mono text-yellow-400/80 bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/20">
                Code Snippet
              </span>
            </div>

            <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed text-slate-200 text-left overflow-x-auto whitespace-pre min-h-[240px]">
              {currentStep.code}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
