import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Search, Menu, X, Github, ChevronDown, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Documentation", id: "docs", path: "/introduction" },
    { label: "Features", id: "features", path: "/#features" },
    { label: "Tutorial", id: "sandbox", path: "/#sandbox" },
    { label: "Benchmarks", id: "benchmarks", path: "/#benchmarks" },
  ];

  const handleNavItemClick = (item: { label: string; id: string; path: string }) => {
    setIsMobileMenuOpen(false);
    if (item.id === "docs") {
      navigate("/introduction");
    } else {
      if (!isHomePage) {
        navigate("/");
        setTimeout(() => {
          const el = document.getElementById(item.id);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 120);
      } else {
        const el = document.getElementById(item.id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleLogoClick = () => {
    setIsMobileMenuOpen(false);
    if (!isHomePage) {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0b0f19]/85 backdrop-blur-xl border-b border-slate-800/80 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Left: Logo & Navigation Links */}
        <div className="flex items-center gap-10">
          <motion.div 
            onClick={handleLogoClick}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2.5 cursor-pointer group select-none relative"
            id="nav-logo"
          >
            <div className="absolute -inset-1 rounded-full bg-yellow-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img 
              src="https://i.ibb.co/LDdqnb1L/6fb40491-3b3c-4c88-a692-e5231bd773e2-1.png" 
              alt="Jet Logo" 
              referrerPolicy="no-referrer"
              className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(234,179,8,0.3)] relative z-10"
            />
            <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-yellow-300 transition-colors relative z-10">
              Jet
            </span>
          </motion.div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-6" onMouseLeave={() => setHoveredNav(null)}>
            {navItems.map((item) => {
              const isActive = item.id === "docs" ? !isHomePage : false;
              const isHovered = hoveredNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavItemClick(item)}
                  onMouseEnter={() => setHoveredNav(item.id)}
                  className={`text-xs sm:text-sm transition-colors cursor-pointer relative py-1.5 px-1 ${
                    isActive || isHovered
                      ? "text-yellow-300 font-semibold"
                      : "text-slate-300 hover:text-white"
                  }`}
                  id={`nav-item-${item.id}`}
                >
                  {item.label}
                  {(isActive || isHovered) && (
                    <motion.span
                      layoutId="navbar-underline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-yellow-400 to-amber-300 rounded-full shadow-[0_0_8px_rgba(234,179,8,0.5)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Search & Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Quick Search Pill */}
          <motion.button
            whileHover={{ scale: 1.03, borderColor: "rgba(234, 179, 8, 0.4)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/introduction")}
            className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800/90 text-slate-400 hover:text-slate-200 text-xs transition-all cursor-pointer shadow-md group"
          >
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-yellow-400 transition-colors" />
            <span>Search docs...</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-slate-950 border border-slate-800 rounded text-slate-500 group-hover:text-slate-300">
              Ctrl K
            </kbd>
          </motion.button>

          {/* GitHub Icon Link */}
          <motion.a
            whileHover={{ scale: 1.1, rotate: 6 }}
            whileTap={{ scale: 0.9 }}
            href="https://github.com/CodeGear/jet"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-900/80 transition-all shadow-sm"
            title="GitHub Repository"
          >
            <Github className="w-4.5 h-4.5" />
          </motion.a>

          {/* Version Selector Pill */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/30 text-[11px] font-mono text-yellow-300 select-none shadow-sm">
            <Sparkles className="w-3 h-3 text-yellow-400 animate-pulse" />
            <span>v0.1</span>
            <ChevronDown className="w-3 h-3 text-yellow-400" />
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => navigate("/introduction")}
            className="p-2 text-slate-400 hover:text-white rounded-lg"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
            id="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-yellow-400" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown with AnimatePresence */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-[#0b0f19]/95 backdrop-blur-2xl border-b border-slate-800 px-6 shadow-2xl"
          >
            <div className="py-6 flex flex-col gap-4">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleNavItemClick(item)}
                  className="text-left font-sans text-base font-medium py-2.5 border-b border-slate-900/80 text-slate-300 hover:text-yellow-400 hover:pl-2 transition-all flex items-center justify-between"
                  id={`mobile-nav-${item.id}`}
                >
                  <span>{item.label}</span>
                  <span className="text-yellow-500 text-xs font-mono">→</span>
                </motion.button>
              ))}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col gap-3 mt-4"
              >
                <a
                  href="https://github.com/CodeGear/jet"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold text-slate-950 bg-gradient-to-r from-yellow-300 to-amber-400 rounded-xl shadow-lg"
                >
                  <Github className="w-4 h-4 text-slate-950" />
                  GitHub Repository
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

