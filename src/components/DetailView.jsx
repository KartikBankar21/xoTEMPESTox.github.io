import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Search,
  Calendar,
  Clock,
  Eye,
  Heart,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";

// --- Markdown Imports (Assumed available in the environment) ---
// Note: Changed import style to resolve module resolution error in the build environment.
// We assume these are globally available or imported via full URLs if necessary.
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Keeping this structure but knowing the build environment will resolve it.
import "./MarkDown.css";

// --- 2. UTILITY FUNCTIONS ---

const formatViews = (num) => {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k views`;
  }
  return `${num} views`;
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// --- 3. COMPONENTS ---

// Custom component for the glow aesthetic

const DetailView = ({ post, onBack }) => {
  if (!post) return <p className="text-red-400">Post not found.</p>;
  const [isLiking, setIsLiking] = useState(false);

  // --- HANDLER: Like Button ---
  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    try {
      const res = await fetch("/api/increment-like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: post.id }),
      });
      const data = await res.json();
      onUpdateStat(post.id, "likes", data.likes);
    } catch (err) {
      console.error("Like error", err);
    } finally {
      setIsLiking(false);
    }
  };

  const dateStr = formatDate(post.date);
  const viewsStr = post.views.toLocaleString();

  // Use inline style for dynamic background image
  const heroStyle = {
    backgroundImage: `url('${post.heroImage}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="pb-16"> <button onClick={onBack} className="flex items-center space-x-2 text-slate-400 hover:text-blue-400 mb-8 transition-colors duration-200 active:scale-95" > <ArrowLeft className="w-5 h-5" /> <span>Back to Blog</span> </button>

    <div
    className="relative min-h-auto sm:min-h-auto rounded-[2rem] overflow-hidden shadow-2xl border border-blue-900/20 pb-2 bg-zinc-950"
    style={heroStyle}
  >
    <div
      className="absolute inset-0 z-10"
      style={{
        background:
          "linear-gradient(to top, rgba(9, 9, 11, 1) 0%, rgba(9, 9, 11, 0.8) 30%, rgba(9, 9, 11, 0.2) 70%, rgba(0, 0, 0, 0) 100%)",
      }}
    ></div>

    <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 pt-24 pb-0 flex flex-col justify-end h-full">
      <div className="flex space-x-2 mb-6 mt-auto">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="bg-zinc-900 text-blue-400 border border-blue-900/30 text-sm uppercase tracking-wider font-bold px-3 py-1 rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="text-5xl sm:text-7xl font-black leading-tight mb-4 text-slate-50 tracking-tighter">
        {post.title}
      </p>
      <p className="text-xl sm:text-2xl text-slate-400 mb-10 max-w-3xl leading-relaxed">
        {post.excerpt}
      </p>

      <div className="flex items-center space-x-4 mb-10">
        <img
          className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          src="[https://placehold.co/40x40/5d5d5d/ffffff?text=TC](https://placehold.co/40x40/5d5d5d/ffffff?text=TC)"
          alt={`Author ${post.author}`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "[https://placehold.co/40x40/5d5d5d/ffffff?text=TC](https://placehold.co/40x40/5d5d5d/ffffff?text=TC)";
          }}
        />
        <div>
          <p className="font-bold text-xl text-slate-100 mb-0">
            {post.author}
          </p>
          <p className="text-md text-slate-500 uppercase tracking-widest font-medium">{dateStr}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-8 border-t border-blue-900/20 text-lg text-slate-400">
        <div className="flex space-x-8 mb-4 sm:mb-0">
          <div className="flex items-center space-x-2">
            <Eye className="w-6 h-6 text-slate-500" />
            <span>{viewsStr} views</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-6 h-6 text-slate-500" />
            <span>{post.readTime} min read</span>
          </div>
        </div>

        <button
          onClick={handleLike}
          disabled={isLiking}
          className={`flex items-center space-x-2 group transition-all active:scale-90 px-6 py-2 rounded-full bg-zinc-900 border border-zinc-800 hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] ${
            isLiking ? "opacity-50" : ""
          }`}
        >
          <Heart
            className={`w-6 h-6 transition-all duration-300 ${
              post.likes > 0
                ? "fill-red-500 text-red-500 scale-110"
                : "text-slate-500 group-hover:text-red-500"
            }`}
          />
          <span className={`${post.likes > 0 ? "text-red-400" : "text-slate-400"} font-bold tracking-tight`}>
            {post.likes.toLocaleString()} likes
          </span>
        </button>
      </div>
    </div>
  </div>

  <article className="max-w-4xl mx-auto mt-16 px-4 sm:px-0">
    <div className="markdownBody prose prose-invert prose-blue max-w-none 
                    prose-headings:text-slate-50 prose-p:text-slate-400 prose-strong:text-slate-200">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
    </div>
  </article>

    </div>
  );
};

export default DetailView;
