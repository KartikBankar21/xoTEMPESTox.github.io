import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Search, Calendar, Clock, Eye, Heart, ArrowLeft, ChevronDown } from 'lucide-react';
import PostCard from './PostCard';
// --- Markdown Imports (Assumed available in the environment) ---
// Note: Changed import style to resolve module resolution error in the build environment.
// We assume these are globally available or imported via full URLs if necessary.
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



const PostList = ({ filteredPosts, onPostClick }) => {
    if (filteredPosts.length === 0) {
        return (
            <section className="md:col-span-2 order-2 md:order-none pt-0! ">
                <div className="text-center py-16 border-2 border-gray-800 rounded-xl bg-gray-900 shadow-xl">
                    <p className="text-xl text-gray-500 font-semibold">No posts found matching your criteria.</p>
                    <p className="text-sm text-gray-600 mt-2">Try adjusting your filters or search terms.</p>
                </div>
            </section>
        );
    }
    return (
        <section className="md:col-span-2 order-2 md:order-none pt-0! rounded-4xl ">
            {filteredPosts.map(post => (
                <PostCard key={post.id} post={post} onPostClick={onPostClick} />
            ))}
        </section>
    );
};


export default PostList;