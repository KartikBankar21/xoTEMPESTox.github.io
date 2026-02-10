import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Calendar, ChevronDown, Heart, BarChart2, Eye } from "lucide-react";
import { useTheme } from "./HeaderBackground";

// --- COOKIE UTILITIES ---
const LIKED_POSTS_COOKIE = "likedBlogPosts";

const getLikedPostsFromCookie = () => {
  const cookies = document.cookie.split(";");
  const likedCookie = cookies.find((c) =>
    c.trim().startsWith(`${LIKED_POSTS_COOKIE}=`),
  );
  if (likedCookie) {
    try {
      const value = likedCookie.split("=")[1];
      return JSON.parse(decodeURIComponent(value));
    } catch (e) {
      return [];
    }
  }
  return [];
};

const FilterSidebar = ({ filters, setFilters, allTags = [] }) => {
  const { theme } = useTheme();
  const [likedCount, setLikedCount] = useState(0);

  // Update liked count on mount and when filters change
  useEffect(() => {
    const likedPosts = getLikedPostsFromCookie();
    setLikedCount(likedPosts.length);
  }, [filters.showOnlyLiked]);

  const toggleSortDirection = useCallback(() => {
    setFilters((prev) => ({
      ...prev,
      sortDir: prev.sortDir === "desc" ? "asc" : "desc",
    }));
  }, [setFilters]);

  const toggleTagFilter = useCallback(
    (tag) => {
      setFilters((prev) => {
        const currentTags = prev.tags;
        const newTags = currentTags.includes(tag)
          ? currentTags.filter((t) => t !== tag)
          : [...currentTags, tag];

        return {
          ...prev,
          tags: newTags,
        };
      });
    },
    [setFilters],
  );

  const toggleLikedFilter = useCallback(() => {
    setFilters((prev) => ({
      ...prev,
      showOnlyLiked: !prev.showOnlyLiked,
    }));
  }, [setFilters]);

  const { sortBy, sortDir, tags, showOnlyLiked } = filters;

  const setSortBy = useCallback(
    (newSortBy) => {
      setFilters((prev) => ({
        ...prev,
        sortBy: newSortBy,
        sortDir: "desc", // Default to desc when changing sort field
      }));
    },
    [setFilters],
  );

  const getSortConfig = () => {
    switch (sortBy) {
      case "likes":
        return {
          icon: BarChart2,
          text: `Sort by Likes (${sortDir === "desc" ? "Most" : "Least"})`,
        };
      case "views":
        return {
          icon: Eye,
          text: `Sort by Views (${sortDir === "desc" ? "Most" : "Least"})`,
        };
      default:
        return {
          icon: Calendar,
          text: `Sort by Date (${sortDir === "desc" ? "Newest" : "Oldest"})`,
        };
    }
  };

  const sortConfig = getSortConfig();
  const Icon = sortConfig.icon;
  const iconRotation = sortDir === "desc" ? "rotate-0" : "rotate-180";

  return (
    <aside className="md:col-span-1 order-1 md:order-none">
      {/* Sort Options Label */}
      <h3 className="text-sm uppercase tracking-[0.2em] font-bold mb-4 text-slate-500">
        Sort By
      </h3>

      {/* Sort Field Selection */}
      <div
        className={`flex p-1 rounded-xl mb-4 border ${theme === "dark" ? "bg-zinc-950 border-zinc-900" : "bg-white border-slate-100"
          }`}
      >
        {["Date", "Likes", "Views"].map((label) => {
          const field = label.toLowerCase();
          return (
            <button
              key={field}
              onClick={() => setSortBy(field)}
              className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${sortBy === field
                ? theme === "dark"
                  ? "bg-zinc-800 text-white shadow-lg"
                  : "bg-slate-100 text-slate-900 shadow-md"
                : theme === "dark"
                  ? "text-zinc-500 hover:text-zinc-300"
                  : "text-slate-400 hover:text-slate-600"
                }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Sort Direction Toggle */}
      <div
        onClick={toggleSortDirection}
        className={`sort-button w-full cursor-pointer p-4 rounded-xl transition-all duration-300 active:scale-[.98] mb-6 border ${theme === "dark"
          ? "bg-zinc-950 border-zinc-800 shadow-xl hover:border-slate-500 hover:shadow-white/5"
          : "bg-white border-slate-200 shadow-lg hover:border-slate-400 hover:shadow-slate-200"
          }`}
      >
        <div
          className={`flex items-center justify-between text-lg font-medium transition-colors ${theme === "dark" ? "text-slate-100" : "text-slate-900"
            }`}
        >
          <div className="flex items-center space-x-3">
            <Icon
              className={`w-6 h-6 ${theme === "dark" ? "text-slate-100" : "text-slate-900"}`}
            />
            <span id="sort-text" className="text-base tracking-tight">
              {sortConfig.text}
            </span>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${iconRotation}`}
          />
        </div>
      </div>

      {/* Liked Posts Filter */}
      <div
        onClick={toggleLikedFilter}
        className={`w-full cursor-pointer p-4 rounded-xl transition-all duration-300 active:scale-[.98] mb-6 border ${showOnlyLiked
          ? "bg-red-500 border-red-500 shadow-lg shadow-red-500/30"
          : theme === "dark"
            ? "bg-zinc-950 border-zinc-800 shadow-xl hover:border-red-500 hover:shadow-white/5"
            : "bg-white border-slate-200 shadow-lg hover:border-red-500 hover:shadow-slate-200"
          }`}
      >
        <div
          className={`flex items-center justify-between text-lg font-medium transition-colors ${showOnlyLiked
            ? "text-white"
            : theme === "dark"
              ? "text-slate-100"
              : "text-slate-900"
            }`}
        >
          <div className="flex items-center space-x-3">
            <Heart
              className={`w-6 h-6 transition-all ${showOnlyLiked
                ? "fill-white"
                : theme === "dark"
                  ? "text-slate-100"
                  : "text-slate-900"
                }`}
            />
            <span className="tracking-tight">
              {showOnlyLiked ? "Showing Liked" : "Show Liked Only"}
            </span>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-sm font-bold ${showOnlyLiked
              ? "bg-white/20"
              : theme === "dark"
                ? "bg-zinc-800 text-slate-400"
                : "bg-slate-100 text-slate-600"
              }`}
          >
            {likedCount}
          </div>
        </div>
      </div>

      {/* Tag Filters */}
      <div className="mt-12">
        <h3 className="text-sm uppercase tracking-[0.2em] font-bold mb-6 text-slate-500">
          Filter by topics
        </h3>

        <div className="flex flex-wrap gap-2.5">
          {allTags.map((tag) => {
            const isActive = tags.includes(tag);

            // Conditional classes based on theme and active state
            const activeClass = isActive
              ? theme === "dark"
                ? "bg-slate-100 text-zinc-950 shadow-lg shadow-white/5 border-white ring-1 ring-white font-bold"
                : "bg-slate-900 text-white shadow-lg shadow-slate-300 border-slate-900 ring-1 ring-slate-900 font-bold"
              : theme === "dark"
                ? "bg-zinc-900 text-slate-400 border-zinc-800 hover:bg-zinc-800 hover:text-slate-100 hover:border-slate-500"
                : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-white hover:text-slate-900 hover:border-slate-400";

            return (
              <button
                key={tag}
                onClick={() => toggleTagFilter(tag)}
                className={`topic-tag px-4 py-2 text-xs uppercase tracking-wider rounded-md border transition-all duration-300 ${activeClass}`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;