import React, { useState, useEffect } from "react";
import {
  Clock,
  Eye,
  Heart,
  ArrowLeft,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import { useTheme } from "./HeaderBackground";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./MarkDown.css";

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

const saveLikedPostsToCookie = (likedPosts) => {
  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + 1);
  document.cookie = `${LIKED_POSTS_COOKIE}=${encodeURIComponent(JSON.stringify(likedPosts))}; expires=${expiryDate.toUTCString()}; path=/`;
};

// --- UTILITY FUNCTIONS ---
const formatViews = (num) => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const calculateReadTime = (text) => {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

const ImageGalleryGrid = ({ images, theme, onImageClick }) => {
  if (!images || images.length === 0) return null;

  const count = images.length;

  // Single image
  if (count === 1) {
    return (
      <div
        onClick={() => onImageClick(0)}
        className={`relative overflow-hidden rounded-lg cursor-pointer group border ${
          theme === "dark"
            ? "bg-zinc-900 border-zinc-800"
            : "bg-slate-100 border-slate-200"
        }`}
        style={{ aspectRatio: "16/10" }}
      >
        <img
          src={images[0].url}
          alt={images[0].alt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 rounded-xl overflow-hidden shadow-sm">
      {/* Featured Large Top Image */}
      <div
        onClick={() => onImageClick(0)}
        className={`relative w-full overflow-hidden cursor-pointer group ${
          theme === "dark" ? "bg-zinc-900" : "bg-slate-100"
        }`}
        style={{ aspectRatio: "16/11" }}
      >
        <img
          src={images[0].url}
          alt={images[0].alt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Bottom Thumbnails Grid (3 Columns) */}
      {count > 1 && (
        <div className="grid grid-cols-3 gap-1 h-32 md:h-48">
          {images.slice(1, 4).map((img, idx) => {
            const actualIndex = idx + 1;
            const isLastThumbnail = idx === 2;
            const hasMore = count > 4;

            return (
              <div
                key={actualIndex}
                onClick={() => onImageClick(actualIndex)}
                className={`relative h-full overflow-hidden cursor-pointer group ${
                  theme === "dark" ? "bg-zinc-900" : "bg-slate-100"
                }`}
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* +N Overlay as seen in the reference image */}
                {isLastThumbnail && hasMore && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[2px] text-white">
                    <span className="text-2xl md:text-4xl font-semibold">
                      +{count - 3}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// --- DETAIL VIEW COMPONENT ---
const DetailView = ({ post, onBack, onGalleryImageClick }) => {
  const { theme } = useTheme();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (post?.id) {
      const likedPosts = getLikedPostsFromCookie();
      setIsLiked(likedPosts.includes(post.id));
    }
  }, [post?.id]);

  const handleLikeToggle = () => {
    if (!post?.id) return;

    const likedPosts = getLikedPostsFromCookie();
    let updatedLikedPosts;

    if (isLiked) {
      updatedLikedPosts = likedPosts.filter((id) => id !== post.id);
    } else {
      updatedLikedPosts = [...likedPosts, post.id];
    }

    saveLikedPostsToCookie(updatedLikedPosts);
    setIsLiked(!isLiked);
  };

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-400 text-xl">Post not found.</p>
      </div>
    );
  }

  const authorName = post.author?.name || "Unknown Author";
  const authorAvatar = post.author?.avatar || null;
  const authorUrl = post.author?.profileUrl || null;

  const likes = post.metrics?.likes || 0;
  const comments = post.metrics?.comments || 0;
  const views = post.metrics?.views || 0;

  const excerpt = post.content?.summary || "";
  const bodyContent = post.content?.markdown || post.content?.raw || "";

  const readTime = calculateReadTime(bodyContent);

  const heroImage =
    post.media && post.media.length > 0
      ? post.media[0].url
      : "https://placehold.co/1200x630/1e293b/60a5fa?text=No+Image";

  const galleryImages =
    post.media && post.media.length > 1 ? post.media.slice(1) : [];

  const dateStr = formatDate(post.date);
  const viewsStr = formatViews(views);

  const heroStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url('${heroImage}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="pb-16" data-theme={theme}>
      {/* Back Button */}
      <button
        onClick={onBack}
        className={`flex items-center space-x-2 mb-8 transition-all duration-200 active:scale-95 group ${
          theme === "dark"
            ? "text-slate-400 hover:text-slate-100"
            : "text-slate-600 hover:text-slate-900"
        }`}
      >
        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
        <span className="font-medium">Back to Blog</span>
      </button>

      {/* Hero Section */}
      <div
        className={`relative min-h-[600px] rounded-3xl overflow-hidden shadow-2xl border transition-colors duration-500 ${
          theme === "dark"
            ? "bg-zinc-950 border-zinc-800"
            : "bg-white border-slate-200"
        }`}
        style={heroStyle}
      >
        <div
          className="absolute inset-0 z-10 transition-opacity duration-500"
          style={{
            background:
              theme === "dark"
                ? "linear-gradient(to top, rgba(9, 9, 11, 1) 0%, rgba(9, 9, 11, 0.85) 40%, rgba(0, 0, 0, 0.4) 100%)"
                : "linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.85) 40%, rgba(255, 255, 255, 0.3) 100%)",
          }}
        ></div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 pt-32 pb-8 flex flex-col justify-end h-full min-h-[600px]">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags &&
              post.tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-xs uppercase tracking-wider font-bold px-3 py-1.5 rounded-lg border transition-all hover:scale-105 ${
                    theme === "dark"
                      ? "bg-zinc-900/60 text-slate-300 border-zinc-700 backdrop-blur-sm hover:bg-zinc-800"
                      : "bg-white/60 text-slate-700 border-slate-300 backdrop-blur-sm hover:bg-slate-50"
                  }`}
                >
                  #{tag}
                </span>
              ))}
          </div>

          {/* Title */}
          <h1
            className={`text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.95] mb-6 tracking-tighter transition-colors max-w-5xl ${
              theme === "dark" ? "text-slate-50" : "text-slate-900"
            }`}
          >
            {post.title}
          </h1>

          {/* Excerpt */}
          {excerpt && (
            <p
              className={`text-xl sm:text-2xl mb-10 max-w-3xl leading-relaxed transition-colors ${
                theme === "dark" ? "text-slate-300" : "text-slate-700"
              }`}
            >
              {excerpt}
            </p>
          )}

          {/* Author Info */}
          <div className="flex items-center space-x-4 mb-8">
            <img
              className={`w-16 h-16 rounded-full object-cover ring-4 transition-all ${
                theme === "dark"
                  ? "ring-zinc-800 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  : "ring-slate-200 shadow-xl"
              }`}
              src={
                authorAvatar ||
                `https://placehold.co/64x64/5d5d5d/ffffff?text=${authorName.charAt(0)}`
              }
              alt={`Author ${authorName}`}
            />
            <div>
              <p
                className={`font-bold text-xl ${theme === "dark" ? "text-slate-100" : "text-slate-900"}`}
              >
                {authorName}
              </p>
              <p
                className={`text-sm uppercase tracking-widest font-medium ${
                  theme === "dark" ? "text-slate-400" : "text-slate-600"
                }`}
              >
                {dateStr}
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div
            className={`flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 py-6 border-t text-lg transition-colors ${
              theme === "dark"
                ? "border-zinc-800 text-slate-400"
                : "border-slate-200 text-slate-600"
            }`}
          >
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-2">
                <Eye
                  className={`w-6 h-6 ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}
                />
                <span className="font-medium">{viewsStr} views</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock
                  className={`w-6 h-6 ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}
                />
                <span className="font-medium">{readTime} min read</span>
              </div>
              {comments > 0 && (
                <div className="flex items-center space-x-2">
                  <MessageCircle
                    className={`w-6 h-6 ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}
                  />
                  <span className="font-medium">{comments} comments</span>
                </div>
              )}
              {likes > 0 && (
                <button
                  onClick={handleLikeToggle}
                  className={`flex h-fit items-center space-x-2 px-6 py-3 rounded-xl font-semibold border transition-all duration-200 active:scale-95 hover:scale-105 group ${
                    isLiked
                      ? "bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/30"
                      : theme === "dark"
                        ? "bg-zinc-900/50 border-zinc-700 text-slate-300 hover:border-red-500 hover:text-red-400"
                        : "bg-white/50 border-slate-300 text-slate-700 hover:border-red-500 hover:text-red-500"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 transition-all ${
                      isLiked ? "fill-white" : "group-hover:fill-current"
                    }`}
                  />
                  <span>
                    {isLiked
                      ? Number(formatViews(likes)) + 1
                      : Number(formatViews(likes))}{" "}
                    {isLiked ? "Liked" : "Like"}
                  </span>
                </button>
              )}
              {post.originalUrl && (
                <div className="flex justify-start mb-0 p-0">
                  <a
                    href={post.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold border transition-all hover:scale-105 ${
                      theme === "dark"
                        ? "bg-zinc-900 border-zinc-700 text-slate-300 hover:border-slate-500"
                        : "bg-slate-50 border-slate-300 text-slate-700 hover:border-slate-400"
                    }`}
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>View Original on LinkedIn</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-7xl mx-auto mt-16 px-4 sm:px-0">
        {/* Markdown Body */}
        <div
          className={`markdownBody prose max-w-none transition-colors duration-500 ${
            theme === "dark" ? "prose-invert" : "prose-slate"
          }`}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {bodyContent}
          </ReactMarkdown>
        </div>

        {/* Image Constraints for Markdown Content */}
        <style>{`
          .markdownBody img {
            max-height: 600px !important;
            width: auto !important;
            height: auto !important;
            object-fit: contain !important;
            margin-left: auto !important;
            margin-right: auto !important;
            display: block !important;
          }
          
          .markdownBody figure {
            max-height: 600px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
        `}</style>

        {/* LinkedIn-Style Image Gallery Grid */}
        {galleryImages.length > 0 && (
          <div className="mt-12">
            <h3
              className={`text-2xl font-bold mb-6 ${
                theme === "dark" ? "text-slate-100" : "text-slate-900"
              }`}
            >
              Post Gallery
            </h3>
            <ImageGalleryGrid
              images={galleryImages}
              theme={theme}
              onImageClick={(index) =>
                onGalleryImageClick && onGalleryImageClick(galleryImages, index)
              }
            />
          </div>
        )}

        {/* Author Card */}
        <div
          className={`mt-16 p-8 rounded-2xl border transition-colors ${
            theme === "dark"
              ? "bg-zinc-900/50 border-zinc-800"
              : "bg-slate-50 border-slate-200"
          }`}
        >
          <div className="flex items-start space-x-4">
            <img
              className="w-20 h-20 rounded-full object-cover ring-2 ring-offset-4 ring-offset-transparent"
              src={
                authorAvatar ||
                `https://placehold.co/80x80/5d5d5d/ffffff?text=${authorName.charAt(0)}`
              }
              alt={authorName}
            />
            <div className="flex-1">
              <h3
                className={`text-2xl font-bold mb-2 ${
                  theme === "dark" ? "text-slate-100" : "text-slate-900"
                }`}
              >
                {authorName}
              </h3>
              <p
                className={`mb-4 leading-relaxed ${
                  theme === "dark" ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Developer, writer, and tech enthusiast. Passionate about
                building great software and sharing knowledge with the
                community.
              </p>
              {authorUrl && (
                <a
                  href={authorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center space-x-2 font-semibold transition-colors ${
                    theme === "dark"
                      ? "text-blue-400 hover:text-blue-300"
                      : "text-blue-600 hover:text-blue-700"
                  }`}
                >
                  <span>Follow on LinkedIn</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default DetailView;