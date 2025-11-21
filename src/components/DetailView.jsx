import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Search, Calendar, Clock, Eye, Heart, ArrowLeft, ChevronDown } from 'lucide-react';

// --- Markdown Imports (Assumed available in the environment) ---
// Note: Changed import style to resolve module resolution error in the build environment.
// We assume these are globally available or imported via full URLs if necessary.
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // Keeping this structure but knowing the build environment will resolve it.
import './MarkDown.css';
// --- 1. DATA (Now using Markdown for post body) ---
const BLOG_POSTS = [
    { 
        id: 1, 
        title: "The 2024 Retrospective", 
        date: "2024-12-31", 
        excerpt: "First Full-Time Year, Solo Travel while Working, Socializing, and more!", 
        readTime: 10, views: 4097, tags: ["retro", "life"], 
        imageUrl: "https://placehold.co/144x144/222222/FFD700?text=2024", 
        heroImage: "https://placehold.co/1200x500/0a0a0a/34d399?text=2024+Review", 
        author: "Theodorus Clarence", likes: 512,
        body: 
`# The Retrospective: A Year of Growth

This is the full retrospective post content. A detailed look at the year's achievements and lessons learned, covering everything from professional growth to personal travels and social life.

### Career Milestones
* Completed the first full year as a Senior Front-End Engineer.
* Successfully mentored two junior developers on the team.
* Presented at a small local tech conference on React performance.

### Solo Travel & Work
I spent three months traveling across Southeast Asia while maintaining a full-time remote workload. This required strict time management and excellent communication.

> "The hardest part of remote work is knowing when to stop, especially when the beach is calling."

We can clearly see the benefits of modern development environments:
\`\`\`javascript
// Example of a code block in Markdown
const calculateDaysUntilNewYear = (today) => {
    const endOfYear = new Date(today.getFullYear() + 1, 0, 1);
    return Math.ceil((endOfYear - today) / (1000 * 60 * 60 * 24));
};
console.log(calculateDaysUntilNewYear(new Date()));
\`\`\`

This year has set the foundation for even greater things to come, and I'm very excited for 2025!`
    },
    { 
        id: 2, 
        title: "List Animation using Motion for React", 
        date: "2024-12-17", 
        excerpt: "An in-depth guide on how to animate enter and exit animation for list using Motion for React (previously Framer Motion).", 
        readTime: 6, views: 7228, tags: ["react", "animation"], 
        imageUrl: "https://placehold.co/144x144/282a36/F8F8F2?text=Motion", 
        heroImage: "https://placehold.co/1200x500/1e293b/a5f3fc?text=React+Motion", 
        author: "Theodorus Clarence", likes: 220,
        body: 
`# Mastering Motion for Seamless Lists

A comprehensive tutorial on creating fluid and beautiful list transitions in React using the latest techniques from [Motion for React](https://www.framer.com/motion/). This guide covers keyframes, layout preservation, and performance optimization. It's a must-read for serious front-end developers.

## Key Techniques Comparison
| Feature | Benefit | Example Hook |
| :--- | :--- | :--- |
| **Keyframes** | Fine-grained control over transitions | \`useAnimationControls\` |
| **Layout** | Prevents Cumulative Layout Shift (CLS) | \`<motion.div layout/>\` |
| **Gestures** | Adds interaction (tap, hover) | \`whileTap\`, \`whileHover\` |

### Performance Tips
The use of \`will-change: transform\` is often done automatically by the library, which significantly reduces the paint load on the GPU. Always ensure you are using stable keys for your list items to help React and Motion track elements correctly.

For more complex examples, check out the official [GitHub Repository](https://github.com/framer/motion).`
    },
    { id: 3, title: "CSS Grid vs. Flexbox: A modern guide", date: "2024-11-25", excerpt: "When to use Grid for two-dimensional layouts and when Flexbox is sufficient for one-dimensional flows.", readTime: 8, views: 5100, tags: ["css", "grid", "flexbox"], imageUrl: "https://placehold.co/144x144/334155/e0f7fa?text=Layout", body: "Deep dive into the differences between CSS Grid and Flexbox. We look at real-world examples and common anti-patterns to ensure you choose the right tool for the job. Mastering both is key to modern web development.", heroImage: "https://placehold.co/1200x500/0f172a/94a3b8?text=Grid+vs+Flex", author: "Theodorus Clarence", likes: 350 },
    { id: 4, title: "Vite for Next-Gen Front-End Setup", date: "2024-10-10", excerpt: "How Vite revolutionized my development workflow and its benefits over traditional bundlers like Webpack.", readTime: 5, views: 3200, tags: ["vite", "tools", "setup"], imageUrl: "https://placehold.co/144x144/475569/cbd5e1?text=Vite", body: "Exploring the speed and simplicity of Vite.js. We cover configuration, hot module replacement, and deploying a Vite-powered application. This tool drastically reduces build times.", heroImage: "https://placehold.co/1200x500/1f2937/d1d5db?text=Vite+Setup", author: "Theodorus Clarence", likes: 180 },
];

const ALL_TAGS = [...new Set(BLOG_POSTS.flatMap(post => post.tags))].sort();

// --- 2. UTILITY FUNCTIONS ---

const formatViews = (num) => {
    if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}k views`;
    }
    return `${num} views`;
};

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
};

const getPostById = (id) => BLOG_POSTS.find(p => p.id === id);


// --- 3. COMPONENTS ---

// Custom component for the glow aesthetic

const DetailView = ({ post, onBack }) => {
    if (!post) return <p className="text-red-400">Post not found.</p>;
    
    const dateStr = formatDate(post.date);
    const viewsStr = post.views.toLocaleString();

    // Use inline style for dynamic background image
    const heroStyle = {
        backgroundImage: `url('${post.heroImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <div className="pb-16">
            <button 
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-200 hover:text-green-400 mb-8 transition-colors duration-200 active:scale-95"
            >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Blog</span>
            </button>

            {/* Hero Section Container */}
            <div 
                className="relative min-h-auto sm:min-h-auto rounded-xl overflow-hidden shadow-2xl pb-2" 
                style={heroStyle}
            >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 z-10" style={{
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.7) 30%, rgba(0, 0, 0, 0.2) 70%, rgba(0, 0, 0, 0.1) 100%)'
                }}></div>
                
                {/* Content within the Hero Section */}
                <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 pt-20 pb-0 flex flex-col justify-end h-full">
                    
                    {/* Tags */}
                    <div className="flex space-x-2 mb-4 mt-auto">
                        {post.tags.map(tag => (
                            <span key={tag} className="bg-gray-700/50 text-gray-300 text-lg font-medium px-3 py-1 rounded-md backdrop-blur-sm">{tag}</span>
                        ))}
                    </div>

                    {/* Title & Excerpt */}
                    <p className="text-5xl sm:text-6xl font-extrabold leading-tight mb-3 text-white">
                        {post.title}
                    </p>
                    <p className="text-2xl sm:text-2xl text-gray-300 mb-8 max-w-3xl">
                        {post.excerpt}
                    </p>

                    {/* Author Section */}
                    <div className="flex items-start  space-x-3 mb-8">
                        <img 
                            className="w-16 h-16 rounded-full object-cover ring-2 ring-green-400" 
                            src="https://placehold.co/40x40/5d5d5d/ffffff?text=TC" 
                            alt={`Author ${post.author}`}
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/40x40/5d5d5d/ffffff?text=TC'; }}
                        />
                        <div>
                            <p className="font-semibold text-xl text-white mb-0! ">{post.author}</p>
                            <p className="text-lg text-gray-400">{dateStr}</p>
                        </div>
                    </div>

                    {/* Metadata Footer */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-6 border-t border-gray-700/50 text-lg text-gray-400">
                        <div className="flex space-x-6 mb-4 sm:mb-0">
                            {/* Views */}
                            <div className="flex items-center space-x-1">
                                <Eye className="w-6 h-6" />
                                <span>{viewsStr} views</span>
                            </div>
                            {/* Read Time */}
                            <div className="flex items-center space-x-1">
                                <Clock className="w-6 h-6" />
                                <span>{post.readTime} min read</span>
                            </div>
                        </div>
                        
                        {/* Likes */}
                        <div className="flex items-center space-x-1 text-red-400">
                            <Heart className="w-6 h-6 fill-red-400" />
                            <span>{post.likes.toLocaleString()} likes</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Main Post Body - Now using ReactMarkdown */}
            <article className="max-w-10/12 mx-auto mt-12 px-4 sm:px-0">
                {/* The 'prose prose-lg prose-invert' classes provide the custom styling for 
                    the markdown output (headings, lists, code blocks, etc.) 
                    within the dark theme aesthetic.
                */}
                <div className='markdownBody'>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {post.body}
                    </ReactMarkdown>
                </div>
            </article>

        </div>
    );
};

export default DetailView;