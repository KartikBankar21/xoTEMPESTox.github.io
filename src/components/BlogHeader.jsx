import React, { useEffect } from "react";
import { Search } from "lucide-react";
// --- 3. COMPONENTS ---

// Custom component for the glow aesthetic
const BlogHeader = ({ search, setSearch, setFilters }) => {
  // Handle shift+s shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.shiftKey && e.key === "S") {
        e.preventDefault();
        document.getElementById("search-input").focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearch(newSearchTerm);
  };

  return (
    <header className="max-w-3xl mx-auto text-center mb-20">
      <div
        className="inline-block p-4 bg-zinc-950 border border-blue-900/40 rounded-2xl mb-8 
                shadow-2xl shadow-blue-500/10 transition-all duration-300"
      >
        <svg
          className="w-8 h-8 text-blue-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          ></path>
        </svg>
      </div>

      <h1 className="text-6xl sm:text-8xl font-black mb-6 tracking-tighter">
        <span className="text-slate-500">The</span>
        <span className="text-slate-50 drop-shadow-[0_0_25px_rgba(59,130,246,0.3)]">
          Blog
        </span>
      </h1>

      <p className="text-lg sm:text-xl text-slate-400 mb-12 max-w-xl mx-auto leading-relaxed">
        Thoughts, mental models, and tutorials about{" "}
        <span className="text-blue-400">front-end development</span>.
      </p>

      <div
        className="relative flex items-center w-full max-w-xl mx-auto p-1.5 rounded-2xl transition-all duration-500 
                bg-zinc-950 border border-blue-900/30 
                focus-within:border-blue-500 focus-within:shadow-[0_0_30px_rgba(30,58,138,0.2)]"
      >
        <div className="pl-4">
          <Search className="w-5 h-5 text-slate-500" />
        </div>

        <input
          type="text"
          id="search-input"
          placeholder="Search titles, tags, or topics..."
          className="flex-grow bg-transparent text-slate-100 placeholder-slate-600 text-lg py-3 px-3 focus:outline-none"
          value={search}
          onChange={handleChange}
        />

        <div className="hidden sm:flex items-center space-x-1 text-[10px] font-bold text-slate-400 bg-zinc-900 px-2.5 py-1.5 rounded-lg border border-blue-900/40 mr-2 uppercase tracking-widest">
          <span>Shift</span>
          <span>S</span>
        </div>
      </div>
    </header>
  );
};

export default BlogHeader;
