import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Search, Calendar, Clock, Eye, Heart, ArrowLeft, ChevronDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // Keeping this structure but knowing the build environment will resolve it.

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
const BlogHeader = ({ search, setSearch, setFilters }) => {
    // Handle shift+s shortcut
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.shiftKey && e.key === 'S') {
                e.preventDefault();
                document.getElementById('search-input').focus();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleChange = (e) => {
        const newSearchTerm = e.target.value;
        setSearch(newSearchTerm);
    }

    return (
       <header className="max-w-3xl mx-auto text-center mb-20">
            
    <div className="inline-block p-4 bg-zinc-950 border border-blue-900/40 rounded-2xl mb-8 
                shadow-2xl shadow-blue-500/10 transition-all duration-300">
    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
    </svg>
</div>

<h1 className="text-6xl sm:text-8xl font-black mb-6 tracking-tighter">
    <span className="text-slate-500">The</span>
    <span className="text-slate-50 drop-shadow-[0_0_25px_rgba(59,130,246,0.3)]">Blog</span>
</h1>

<p className="text-lg sm:text-xl text-slate-400 mb-12 max-w-xl mx-auto leading-relaxed">
    Thoughts, mental models, and tutorials about <span className="text-blue-400">front-end development</span>.
</p>

<div className="relative flex items-center w-full max-w-xl mx-auto p-1.5 rounded-2xl transition-all duration-500 
                bg-zinc-950 border border-blue-900/30 
                focus-within:border-blue-500 focus-within:shadow-[0_0_30px_rgba(30,58,138,0.2)]">
    
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