import React from "react";
import { Clock, Eye, Trophy } from "lucide-react";
import { useTheme } from "./HeaderBackground";

// --- 2. UTILITY FUNCTIONS ---

const formatViews = (num) => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

const getRelativeTime = (dateString) => {
  const now = new Date();
  const past = new Date(dateString);
  const diffInMs = now - past;
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInSeconds < 60) return "just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays < 7) return `${diffInDays}d ago`;
  if (diffInWeeks < 4) return `${diffInWeeks}w ago`;
  if (diffInMonths < 12) return `${diffInMonths} months ago`;
  return `${diffInYears} years ago`;
};

const calculateReadTime = (text) => {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

// --- 3. COMPONENT ---

const PostCard = ({ post, onPostClick }) => {
  const { theme } = useTheme();

  const views = post.metrics?.views || 0;
  const dateStr = getRelativeTime(post.date);
  const bodyContent = post.content?.markdown || post.content?.raw || "";

  const readTime = calculateReadTime(bodyContent);
  const viewsStr = formatViews(views);

  // Hero image handler
  const isVideo = post.media?.[0]?.type === 'video';
  const isBadge = post.media?.[0]?.type === 'badge';

  const firstWord = post.title.replace(/[^\w\s]/g, '').trim().split(/\s+/)[0] || "Post";

  const heroImage =
    post.media && post.media.length > 0
      ? post.media[0].url
      : `https://placehold.co/1200x630/1e293b/60a5fa?text=${firstWord}`;

  return (
    <article
      className={`flex flex-col sm:flex-row justify-between items-start py-8 px-8 mb-8 cursor-pointer 
              transition-all duration-300 rounded-2xl border group backdrop-blur-sm shadow-sm ${theme === "dark"
          ? "bg-zinc-900/40 hover:bg-zinc-800/60 border-zinc-800/50 hover:border-zinc-600"
          : "bg-white/10 backdrop-blur-sm hover:bg-slate-50 border-slate-200 hover:border-slate-300 shadow-slate-200/80"
        }`}
      onClick={() => onPostClick(post.id)}
    >
      {/* Text Content */}
      <div className="flex-grow pr-0 sm:pr-8 mb-4 sm:mb-0">
        <p
          className={`text-lg font-medium mb-2 tracking-wide uppercase transition-colors ${theme === "dark" ? "text-slate-500" : "text-slate-800"
            }`}
        >
          {dateStr}
        </p>

        <h2
          className={`text-3xl font-bold leading-tight transition-colors duration-300 ${theme === "dark"
            ? "text-white group-hover:text-slate-300"
            : "text-slate-900 group-hover:text-slate-700"
            }`}
        >
          {post.title}
        </h2>

        <p
          className={`text-base mt-3 leading-relaxed transition-colors ${theme === "dark" ? "text-slate-400" : "text-slate-600"
            }`}
        >
          {post.excerpt}
        </p>

        {/* Metadata and Tags Container */}
        <div
          className={`flex flex-wrap items-center justify-start mt-6 space-x-6 text-lg transition-colors ${theme === "dark" ? "text-slate-500" : "text-slate-800"
            }`}
        >
          {/* Read Time */}
          <div className="flex items-center space-x-1.5">
            <Clock className="w-6 h-6" />
            <span>{readTime} min read</span>
          </div>

          {/* View Count */}
          <div className="flex items-center space-x-1.5 ">
            <Eye className="w-6 h-6" />
            <span>{viewsStr}</span>
          </div>

          {/* Tags: Greyscale theme */}
          <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className={`text-xl md:text-lg font-medium px-3 py-1 rounded-md border transition-all ${theme === "dark"
                  ? "bg-zinc-800/80 text-slate-300 border-zinc-700 group-hover:border-zinc-500"
                  : "bg-slate-100 text-slate-600 border-slate-200 group-hover:bg-slate-200"
                  }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Media Thumbnail */}
      <div className="flex-shrink-0 w-full sm:w-auto mt-4 sm:mt-0 relative">
        <img
          className={`w-full h-80 sm:w-40 sm:h-40 object-cover rounded-xl grayscale group-hover:grayscale-0 
                 transition-all duration-500 shadow-xl border ${theme === "dark" ? "border-zinc-800" : "border-slate-200"
            }`}
          src={heroImage}
          alt={`${firstWord} thumbnail`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              `https://placehold.co/160x160/1a1a1a/ffffff?text=${firstWord}`;
          }}
        />
        {/* Media Type Icons Overlay */}
        {(post.media?.[0]?.type === 'video' || post.media?.[0]?.type === 'badge') && (
          <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 backdrop-blur-md text-white border border-white/10">
            {post.media[0].type === 'video' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            ) : (
              <Trophy size={16} className="text-yellow-500" />
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default PostCard;
