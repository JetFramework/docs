import { useState } from "react";
import AceEditor from "react-ace";

// Import Ace modes and themes
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-sh";
import "ace-builds/src-noconflict/mode-sql";

import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-twilight";

import ace from "ace-builds";
import { Terminal, Check, Copy, Settings2 } from "lucide-react";

// Set CDN fallback path for ace workers
ace.config.set("basePath", "https://cdn.jsdelivr.net/npm/ace-builds@1.36.2/src-noconflict/");

interface AceCodeBlockProps {
  initialCode: string;
  language?: string;
  filename?: string;
}

const ACE_THEMES = [
  { id: "tomorrow_night", label: "Tomorrow Night" },
  { id: "monokai", label: "Monokai" },
  { id: "dracula", label: "Dracula" },
  { id: "twilight", label: "Twilight" },
];

export default function AceCodeBlock({
  initialCode,
  language = "python",
  filename,
}: AceCodeBlockProps) {
  const [theme, setTheme] = useState("tomorrow_night");
  const [copied, setCopied] = useState(false);

  // Normalize language for Ace
  const getAceMode = (lang: string) => {
    const l = lang.toLowerCase();
    if (l === "py" || l === "python") return "python";
    if (l === "js" || l === "javascript") return "javascript";
    if (l === "ts" || l === "typescript") return "typescript";
    if (l === "json") return "json";
    if (l === "bash" || l === "sh" || l === "shell" || l === "curl") return "sh";
    if (l === "sql") return "sql";
    return "python";
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(initialCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-6 rounded-xl border border-slate-800 bg-[#090d1f] shadow-2xl overflow-hidden">
      {/* Header Toolbar */}
      <div className="bg-[#0f1429] px-4 py-2.5 flex items-center justify-between border-b border-slate-800/80 gap-2 select-none">
        <div className="flex items-center gap-2.5">
          <Terminal className="w-4 h-4 text-yellow-400" />
          <span className="text-xs font-mono font-semibold text-slate-200">
            {filename || `${getAceMode(language)}`}
          </span>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-2">
          {/* Theme Selector */}
          <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-slate-900 border border-slate-800 rounded px-2 py-1">
            <Settings2 className="w-3 h-3 text-slate-500" />
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="bg-transparent text-slate-300 focus:outline-none text-[11px] cursor-pointer"
            >
              {ACE_THEMES.map((t) => (
                <option key={t.id} value={t.id} className="bg-slate-900 text-slate-200">
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Copy Code Button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white text-[11px] font-semibold transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Ace Editor Viewer */}
      <div className="relative">
        <AceEditor
          mode={getAceMode(language)}
          theme={theme}
          name={`code-block-${Math.random().toString(36).substring(7)}`}
          value={initialCode}
          fontSize={13}
          showPrintMargin={false}
          showGutter={true}
          highlightActiveLine={false}
          readOnly={true}
          width="100%"
          maxLines={30}
          minLines={5}
          setOptions={{
            showLineNumbers: true,
            tabSize: 2,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          }}
          className="rounded-b-none border-none"
        />
      </div>
    </div>
  );
}
