import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Markdown from "react-markdown";
import { 
  Search, 
  ChevronRight, 
  ChevronLeft, 
  Menu, 
  X, 
  ExternalLink, 
  BookOpen, 
  Lightbulb, 
  Terminal, 
  Info,
  Layers
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import AceCodeBlock from "./AceCodeBlock";

// Import raw markdown contents using Vite's ?raw suffix
import tocRaw from "../docs/table_of_contents.md?raw";
import quickstartRaw from "../docs/quikstart.md?raw";
import introRaw from "../docs/introduction.md?raw";
import installRaw from "../docs/installation.md?raw";
import routingRaw from "../docs/routing.md?raw";
import validationRaw from "../docs/validation.md?raw";
import fruitRaw from "../docs/worlds_fruit_name.md?raw";
import reactHooksRaw from "../docs/react_hooks.md?raw";
import pythonBasicsRaw from "../docs/python_basics.md?raw";

interface DocChapter {
  id: string;
  title: string;
  category: "Getting Started" | "Core Concepts" | "Advanced Guides" | "API Reference";
  content: string;
}

export const CHAPTERS: DocChapter[] = [
  {
    id: "introduction",
    title: "Introduction",
    category: "Getting Started",
    content: introRaw,
  },
  {
    id: "quick-start",
    title: "Quick Start Guide",
    category: "Getting Started",
    content: quickstartRaw,
  },
  {
    id: "installation",
    title: "Installation Guide",
    category: "Getting Started",
    content: installRaw,
  },
  {
    id: "routing",
    title: "Routing & Path Traversals",
    category: "Core Concepts",
    content: routingRaw,
  },
  {
    id: "request-validation",
    title: "Request & Schema Validation",
    category: "Core Concepts",
    content: validationRaw,
  },
  {
    id: "worlds-fruit-name",
    title: "World's Fruit Name API",
    category: "API Reference",
    content: fruitRaw,
  },
  {
    id: "react-hooks",
    title: "React Hooks Integration",
    category: "Advanced Guides",
    content: reactHooksRaw,
  },
  {
    id: "python-basics",
    title: "Python Async Basics",
    category: "Core Concepts",
    content: pythonBasicsRaw,
  },
  {
    id: "table-of-contents",
    title: "Table of Contents",
    category: "Getting Started",
    content: tocRaw,
  },
];

// Helper to create slug IDs for headings
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default function Docs() {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolledHeading, setScrolledHeading] = useState("");

  // Determine active chapter from URL slug
  const activeChapterId = slug || "introduction";

  // Find active chapter or generate dynamic article if custom slug
  const activeChapter = useMemo(() => {
    const matched = CHAPTERS.find((c) => c.id === activeChapterId || c.id === activeChapterId.replace(/^\//, ""));
    if (matched) return matched;

    // Capitalize slug for title
    const formattedTitle = activeChapterId
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    return {
      id: activeChapterId,
      title: formattedTitle || "Documentation Article",
      category: "API Reference" as const,
      content: `# ${formattedTitle || "Documentation Article"}

Welcome to the **${formattedTitle || activeChapterId}** permalink route.

This article has its own unique, shareable URL path: \`/${activeChapterId}\`.

---

## Code Example

Example Jet web application endpoint:

\`\`\`python
from jet import *

app = Jet()

def handle_request(request):
    return Response.json({
        "status": "success",
        "route": "/${activeChapterId}",
        "title": "${formattedTitle}"
    })

app.route("/${activeChapterId}", handle_request)

if __name__ == "__main__":
    serve(app)
\`\`\`

---

## Direct Permalink Navigation

You can link directly to this document anywhere in your web app:
\`\`\`html
<a href="/${activeChapterId}">${formattedTitle}</a>
\`\`\`
`,
    };
  }, [activeChapterId]);

  // Auto scroll to top on chapter change
  useEffect(() => {
    window.scrollTo({ top: 0 });
    const contentEl = document.getElementById("docs-content-area");
    if (contentEl) {
      contentEl.scrollTop = 0;
    }
  }, [activeChapterId]);

  // Extract headings for right-hand "On This Page" outline
  const headings = useMemo(() => {
    const lines = activeChapter.content.split("\n");
    const foundHeadings: { id: string; text: string; level: number }[] = [];
    lines.forEach((line) => {
      const h2Match = line.match(/^##\s+(.*)$/);
      const h3Match = line.match(/^###\s+(.*)$/);
      if (h2Match) {
        const text = h2Match[1].trim();
        foundHeadings.push({ id: slugify(text), text, level: 2 });
      } else if (h3Match) {
        const text = h3Match[1].trim();
        foundHeadings.push({ id: slugify(text), text, level: 3 });
      }
    });
    return foundHeadings;
  }, [activeChapter]);

  // Track active heading on scroll
  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings.map((h) => document.getElementById(h.id)).filter(Boolean);
      let currentActiveId = "";
      
      for (const el of headingElements) {
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            currentActiveId = el.id;
          }
        }
      }
      setScrolledHeading(currentActiveId || (headings[0]?.id ?? ""));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  const categories = ["Getting Started", "Core Concepts", "Advanced Guides", "API Reference"] as const;

  // Filter chapters by search query
  const filteredChapters = CHAPTERS.filter((chapter) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      chapter.title.toLowerCase().includes(query) ||
      chapter.content.toLowerCase().includes(query) ||
      chapter.category.toLowerCase().includes(query) ||
      chapter.id.toLowerCase().includes(query)
    );
  });

  // Next and Previous pagination computation
  const currentIndex = CHAPTERS.findIndex((c) => c.id === activeChapterId);
  const prevChapter = currentIndex > 0 ? CHAPTERS[currentIndex - 1] : null;
  const nextChapter = currentIndex >= 0 && currentIndex < CHAPTERS.length - 1 ? CHAPTERS[currentIndex + 1] : null;

  // Custom markdown component overrides with Ace Editor for code blocks
  const customMarkdownComponents = {
    h1: ({ children, ...props }: any) => (
      <h1 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight mb-6 pb-4 border-b border-slate-800/80" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }: any) => {
      const text = typeof children === "string" ? children : String(children);
      const id = slugify(text);
      return (
        <h2 
          id={id} 
          className="font-display font-semibold text-xl sm:text-2xl text-slate-100 tracking-tight mt-10 mb-4 pb-2 border-b border-slate-900 flex items-center group scroll-mt-24" 
          {...props}
        >
          {children}
          <a href={`#${id}`} className="ml-2 text-slate-600 hover:text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity text-sm font-mono font-normal">
            #
          </a>
        </h2>
      );
    },
    h3: ({ children, ...props }: any) => {
      const text = typeof children === "string" ? children : String(children);
      const id = slugify(text);
      return (
        <h3 
          id={id} 
          className="font-display font-medium text-lg text-slate-200 tracking-tight mt-8 mb-3 flex items-center group scroll-mt-24" 
          {...props}
        >
          {children}
          <a href={`#${id}`} className="ml-2 text-slate-600 hover:text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono font-normal">
            #
          </a>
        </h3>
      );
    },
    p: ({ children, ...props }: any) => (
      <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-5 font-normal" {...props}>
        {children}
      </p>
    ),
    hr: () => <hr className="border-slate-800/80 my-8" />,
    ul: ({ children, ...props }: any) => (
      <ul className="list-disc pl-5 text-slate-400 space-y-2 mb-5 text-sm sm:text-base" {...props}>{children}</ul>
    ),
    ol: ({ children, ...props }: any) => (
      <ol className="list-decimal pl-5 text-slate-400 space-y-2 mb-5 text-sm sm:text-base" {...props}>{children}</ol>
    ),
    li: ({ children, ...props }: any) => (
      <li className="text-slate-300" {...props}>{children}</li>
    ),
    blockquote: ({ children, ...props }: any) => (
      <div className="my-6 p-4 rounded-xl bg-[#090d22]/80 border-l-4 border-yellow-500/80 flex gap-3.5 backdrop-blur-md" {...props}>
        <div className="mt-0.5 text-yellow-400 flex-shrink-0">
          <Info className="w-5 h-5" />
        </div>
        <div className="text-slate-300 text-sm leading-relaxed italic">
          {children}
        </div>
      </div>
    ),
    // Render code blocks using Ace Editor Sandbox!
    pre: ({ children }: any) => {
      const childrenArray = React.Children.toArray(children);
      const codeElement = childrenArray.find(
        (child) => React.isValidElement(child) && ((child as any).type === "code" || (child as any).type?.name === "code")
      ) as any;
      
      const codeText = codeElement && codeElement.props && codeElement.props.children
        ? String(codeElement.props.children).trim()
        : "";
      
      const className = codeElement && codeElement.props ? codeElement.props.className || "" : "";
      const langMatch = className.match(/language-(\w+)/);
      const language = langMatch ? langMatch[1] : "python";

      return (
        <AceCodeBlock
          initialCode={codeText}
          language={language}
          filename={`snippet.${language === "python" ? "py" : language}`}
        />
      );
    },
    code: ({ children, ...props }: any) => (
      <code className="bg-slate-900 text-yellow-400 border border-slate-800 rounded px-1.5 py-0.5 text-xs font-mono font-medium" {...props}>
        {children}
      </code>
    ),
    a: ({ href, children, ...props }: any) => {
      const isExternal = href?.startsWith("http");
      
      const handleAnchorClick = (e: React.MouseEvent) => {
        if (!isExternal && href) {
          if (href.startsWith("#")) {
            e.preventDefault();
            const targetId = href.substring(1);
            const el = document.getElementById(targetId);
            if (el) el.scrollIntoView({ behavior: "smooth" });
          } else if (href.startsWith("/")) {
            e.preventDefault();
            navigate(href);
          }
        }
      };

      return (
        <a 
          href={href} 
          onClick={handleAnchorClick}
          className="text-yellow-400 hover:text-yellow-300 font-medium underline transition-colors inline-flex items-center gap-0.5" 
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          {...props}
        >
          {children}
          {isExternal && <ExternalLink className="w-3 h-3 inline" />}
        </a>
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#080a0e] text-slate-100 flex flex-col font-sans relative">
      {/* Background yellow glow decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-yellow-500/10 rounded-full pointer-events-none filter blur-3xl opacity-20 z-0" />

      {/* Header Bar of Docs */}
      <header className="sticky top-0 z-40 bg-[#080a0e]/90 border-b border-slate-800/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link 
            to="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-900/40 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            Home
          </Link>
          
          <div className="h-6 w-px bg-slate-800" />
          
          <Link to="/introduction" className="flex items-center gap-2.5 group">
            <img 
              src="https://i.ibb.co/LDdqnb1L/6fb40491-3b3c-4c88-a692-e5231bd773e2-1.png" 
              alt="Jet Logo" 
              referrerPolicy="no-referrer"
              className="w-6 h-6 object-contain group-hover:scale-105 transition-transform" 
            />
            <span className="font-display font-bold text-base text-white group-hover:text-yellow-300 transition-colors">
              Jet <span className="text-yellow-400">Docs</span>
            </span>
          </Link>
        </div>

        {/* Right side options: version tag */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-2 py-1 rounded-md">
            v0.1-stable
          </span>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main Grid Workspace */}
      <div className="flex-1 max-w-8xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-0 relative items-stretch">
        
        {/* Left Sidebar Table of Contents with permalinks */}
        <aside className="hidden lg:block lg:col-span-3 border-r border-slate-800/80 p-6 space-y-6 bg-[#080a0e]/40 h-[calc(100vh-73px)] sticky top-[73px] overflow-y-auto">
          {/* Search Bar filter */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search docs or permalinks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9.5 pr-4 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-yellow-500/50 focus:shadow-[0_0_15px_rgba(234,179,8,0.05)] transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
              >
                Clear
              </button>
            )}
          </div>

          {/* Chapters Directory */}
          <div className="space-y-6">
            {categories.map((category) => {
              const categoryChapters = filteredChapters.filter((c) => c.category === category);
              if (categoryChapters.length === 0) return null;
              
              return (
                <div key={category} className="space-y-2">
                  <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-3">
                    {category}
                  </h4>
                  <ul className="space-y-1">
                    {categoryChapters.map((chapter) => {
                      const isActive = chapter.id === activeChapterId;
                      return (
                        <li key={chapter.id}>
                          <Link
                            to={`/${chapter.id}`}
                            className={`w-full text-left px-3 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between ${
                              isActive 
                                ? "bg-yellow-500/10 text-yellow-400 border-l-2 border-yellow-500"
                                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/30"
                            }`}
                          >
                            <span>{chapter.title}</span>
                            {isActive && <ChevronRight className="w-3.5 h-3.5 text-yellow-400" />}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Central Article Container */}
        <main 
          id="docs-content-area"
          className="col-span-1 lg:col-span-6 px-6 sm:px-10 py-10 overflow-y-auto max-w-3xl mx-auto w-full"
        >
          {/* Article breadcrumb path */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 font-mono mb-6">
            <div className="flex items-center gap-1.5">
              <Link to="/" className="hover:text-slate-300">Home</Link>
              <ChevronRight className="w-3 h-3 text-slate-700" />
              <span>Docs</span>
              <ChevronRight className="w-3 h-3 text-slate-700" />
              <span className="text-yellow-400 font-semibold">{activeChapter.title}</span>
            </div>
          </div>

          {/* Main article body */}
          <article className="prose prose-invert max-w-none">
            <Markdown components={customMarkdownComponents as any}>
              {activeChapter.content}
            </Markdown>
          </article>

          {/* Bottom quick pagination navigations */}
          <div className="mt-16 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            {prevChapter ? (
              <Link
                to={`/${prevChapter.id}`}
                className="w-full sm:w-auto flex flex-col items-start p-4 rounded-xl border border-slate-800/80 hover:border-slate-700 bg-[#0e1118]/60 hover:bg-[#0e1118] transition-all text-left cursor-pointer group"
              >
                <span className="text-[10px] font-mono font-medium text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <ChevronLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" /> Previous
                </span>
                <span className="text-sm font-semibold text-slate-200 mt-1">{prevChapter.title}</span>
              </Link>
            ) : (
              <div className="hidden sm:block" />
            )}

            {nextChapter ? (
              <Link
                to={`/${nextChapter.id}`}
                className="w-full sm:w-auto flex flex-col items-end p-4 rounded-xl border border-slate-800/80 hover:border-slate-700 bg-[#0e1118]/60 hover:bg-[#0e1118] transition-all text-right cursor-pointer group ml-auto"
              >
                <span className="text-[10px] font-mono font-medium text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  Next <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
                <span className="text-sm font-semibold text-yellow-400 mt-1">{nextChapter.title}</span>
              </Link>
            ) : (
              <div className="hidden sm:block" />
            )}
          </div>
        </main>

        {/* Right Sidebar Outline List ("On This Page") */}
        <aside className="hidden lg:block lg:col-span-3 p-6 space-y-6 bg-[#080a0e]/10 h-[calc(100vh-73px)] sticky top-[73px] overflow-y-auto">
          {headings.length > 0 && (
            <div className="space-y-3.5 border-l border-slate-800 pl-4 py-1">
              <h5 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 select-none">
                <Layers className="w-3.5 h-3.5 text-yellow-400" />
                On This Page
              </h5>
              <ul className="space-y-2.5 text-xs">
                {headings.map((h) => {
                  const isActive = h.id === scrolledHeading;
                  return (
                    <li 
                      key={h.id}
                      style={{ paddingLeft: `${(h.level - 2) * 12}px` }}
                    >
                      <a
                        href={`#${h.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          const el = document.getElementById(h.id);
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className={`block font-semibold hover:text-yellow-400 transition-colors ${
                          isActive ? "text-yellow-400 font-bold" : "text-slate-500"
                        }`}
                      >
                        {h.text}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Quick Permalinks Box */}
          <div className="p-4 rounded-xl bg-[#0e1118] border border-slate-800/80 space-y-3">
            <h6 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-yellow-400" /> Key Article Permalinks
            </h6>
            <ul className="space-y-2 text-xs font-semibold text-slate-300">
              <li>
                <Link to="/worlds-fruit-name" className="flex items-center justify-between text-slate-400 hover:text-yellow-400 transition-colors">
                  <span>World's Fruit Name</span>
                  <span className="font-mono text-[10px] text-slate-600">/worlds-fruit-name</span>
                </Link>
              </li>
              <li>
                <Link to="/react-hooks" className="flex items-center justify-between text-slate-400 hover:text-yellow-400 transition-colors">
                  <span>React Hooks</span>
                  <span className="font-mono text-[10px] text-slate-600">/react-hooks</span>
                </Link>
              </li>
              <li>
                <Link to="/python-basics" className="flex items-center justify-between text-slate-400 hover:text-yellow-400 transition-colors">
                  <span>Python Basics</span>
                  <span className="font-mono text-[10px] text-slate-600">/python-basics</span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 lg:hidden"
          >
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute left-0 top-0 bottom-0 w-4/5 max-w-sm bg-[#080a0e] border-r border-slate-800 p-6 flex flex-col gap-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-sm tracking-tight text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-yellow-400" /> Table of Contents
                </span>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Mobile Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Search docs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-yellow-500/50"
                />
              </div>

              {/* Directory Content List */}
              <div className="flex-1 space-y-6">
                {categories.map((category) => {
                  const categoryChapters = filteredChapters.filter((c) => c.category === category);
                  if (categoryChapters.length === 0) return null;
                  
                  return (
                    <div key={category} className="space-y-2">
                      <h4 className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500 px-3">
                        {category}
                      </h4>
                      <ul className="space-y-1">
                        {categoryChapters.map((chapter) => {
                          const isActive = chapter.id === activeChapterId;
                          return (
                            <li key={chapter.id}>
                              <Link
                                to={`/${chapter.id}`}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`w-full text-left px-3 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between ${
                                  isActive 
                                    ? "bg-yellow-500/10 text-yellow-400 border-l-2 border-yellow-500"
                                    : "text-slate-400 hover:text-slate-200"
                                }`}
                              >
                                <span>{chapter.title}</span>
                                {isActive && <ChevronRight className="w-3.5 h-3.5 text-yellow-400" />}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>

              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-lg border border-slate-800 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-900/40 text-center transition-colors mt-auto cursor-pointer block"
              >
                Return to Main Site
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
