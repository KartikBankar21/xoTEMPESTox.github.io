import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Search, Calendar, Clock, Eye, Heart, ArrowLeft, ChevronDown } from 'lucide-react';

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
        <header className="max-w-3xl mx-auto text-center mb-16">
            
            {/* Icon Container with simulated glow */}
            <div className="inline-block p-3 bg-gray-900 border-2 border-gray-700 rounded-xl mb-6 
                            shadow-xl shadow-green-400/30 transition-shadow duration-300">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
            </div>

            {/* Title with simulated glow */}
            <h1 className="text-6xl sm:text-7xl font-extrabold mb-4">
                <span className="text-white">The</span>
                <span className="text-green-400 drop-shadow-[0_0_10px_rgba(52,211,163,0.4)]">Blog</span>
            </h1>

            {/* Subtitle/Description */}
            <p className="text-lg sm:text-xl text-gray-400 mb-12">
                Thoughts, mental models, and tutorials about front-end development.
            </p>

            {/* Search Input Container with dynamic focus styling */}
            <div className="relative flex items-center w-full max-w-lg mx-auto p-4 rounded-xl transition-all duration-300 
                            bg-slate-800 shadow-xl shadow-black/50 border border-transparent 
                            focus-within:border-green-400 focus-within:shadow-2xl focus-within:shadow-green-500/40">
                
                <Search className="w-6 h-6 text-gray-500 mr-3 flex-shrink-0" />
                
                <input 
                    type="text" 
                    id="search-input"
                    placeholder="Search titles, excerpts, and tags..." 
                    className="flex-grow bg-transparent text-white placeholder-gray-500 text-lg focus:outline-none"
                    value={search}
                    onChange={handleChange}
                />

                <div className="text-sm text-gray-500 bg-gray-900 px-2 py-1 rounded-md border border-gray-700 ml-4 flex-shrink-0 hidden sm:block">
                    Shift S
                </div>
            </div>
        </header>
    );
};

const PostCard = ({ post, onPostClick }) => {
    const dateStr = formatDate(post.date);
    const viewsStr = formatViews(post.views);

    return (
        <article 
            className="flex flex-col sm:flex-row justify-between items-start py-8 cursor-pointer 
                       border-b border-dashed border-gray-700 article-card transition-all duration-300
                       hover:bg-gray-900/50 rounded-xl px-4 -mx-4"
            onClick={() => onPostClick(post.id)}
        >
            
            {/* Text Content */}
            <div className="flex-grow pr-0 sm:pr-8 mb-4 sm:mb-0">
                <p className="text-sm font-medium text-gray-400 mb-1">{dateStr}</p>
                <h2 className="text-3xl font-extrabold leading-tight text-green-400 hover:text-green-300 transition-colors duration-300 article-title">
                    {post.title}
                </h2>
                <p className="text-base text-gray-300 mt-2">{post.excerpt}</p>
                
                {/* Metadata and Tags Container */}
                <div className="flex flex-wrap items-center justify-start mt-4 space-x-4 text-sm text-gray-400">
                    
                    {/* Read Time */}
                    <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime} min read</span>
                    </div>
                    
                    {/* View Count */}
                    <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{viewsStr}</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                        {post.tags.map(tag => (
                            <span key={tag} className="bg-gray-800 text-gray-400 text-xs font-medium px-3 py-1 rounded-full">{tag}</span>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Image Thumbnail */}
            <div className="flex-shrink-0 w-full sm:w-auto mt-4 sm:mt-0">
                <img
                    className="w-full h-auto sm:w-36 sm:h-36 object-cover rounded-xl shadow-2xl transition duration-300 
                                glow-on-hover hover:shadow-xl hover:shadow-green-400/40"
                    src={post.imageUrl}
                    alt={`${post.title} thumbnail`}
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/144x144/222222/FFD700?text=Image'; }}
                />
            </div>
        </article>
    );
};

const FilterSidebar = ({ filters, setFilters }) => {

    const toggleSortDirection = useCallback(() => {
        setFilters(prev => ({
            ...prev,
            sortDir: prev.sortDir === 'desc' ? 'asc' : 'desc'
        }));
    }, [setFilters]);

    const toggleTagFilter = useCallback((tag) => {
        setFilters(prev => {
            const currentTags = prev.tags;
            const newTags = currentTags.includes(tag)
                ? currentTags.filter(t => t !== tag)
                : [...currentTags, tag];
            
            return {
                ...prev,
                tags: newTags
            };
        });
    }, [setFilters]);

    const { sortDir, tags } = filters;
    const sortText = sortDir === 'desc' ? 'Sort by date (Newest)' : 'Sort by date (Oldest)';
    const iconRotation = sortDir === 'desc' ? 'rotate-0' : 'rotate-180';

    return (
        <aside className="md:col-span-1 sticky top-8">
            
            {/* Sort Button */}
            <div 
                onClick={toggleSortDirection}
                className="sort-button w-full cursor-pointer p-4 bg-gray-900 rounded-xl shadow-lg border-2 border-green-400 
                           hover:shadow-green-500/20 transition-all duration-200 active:scale-[.99]"
            >
                <div className="flex items-center justify-between text-lg font-medium text-gray-100">
                    <div className="flex items-center space-x-3">
                        <Calendar className="w-6 h-6 text-green-400" />
                        <span id="sort-text">{sortText}</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${iconRotation}`} />
                </div>
            </div>

            {/* Topic Selection */}
            <h3 className="text-xl font-semibold mt-8 mb-4 text-white">Filter by topics</h3>
            
            <div className="flex flex-wrap gap-3">
                {ALL_TAGS.map(tag => {
                    const isActive = tags.includes(tag);
                    const activeClass = isActive 
                        ? 'bg-green-600 text-white shadow-lg shadow-green-500/50 ring-2 ring-green-400' 
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white';
                    return (
                        <button 
                            key={tag}
                            onClick={() => toggleTagFilter(tag)}
                            className={`topic-tag px-4 py-2 text-sm font-medium rounded-lg shadow-md transition-all duration-200 ${activeClass}`}
                        >
                            {tag}
                        </button>
                    );
                })}
            </div>

        </aside>
    );
};

const PostList = ({ filteredPosts, onPostClick }) => {
    if (filteredPosts.length === 0) {
        return (
            <section className="md:col-span-2">
                <div className="text-center py-16 border-2 border-gray-800 rounded-xl bg-gray-900 shadow-xl">
                    <p className="text-xl text-gray-500 font-semibold">No posts found matching your criteria.</p>
                    <p className="text-sm text-gray-600 mt-2">Try adjusting your filters or search terms.</p>
                </div>
            </section>
        );
    }
    return (
        <section className="md:col-span-2">
            {filteredPosts.map(post => (
                <PostCard key={post.id} post={post} onPostClick={onPostClick} />
            ))}
        </section>
    );
};


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
                className="flex items-center space-x-2 text-gray-400 hover:text-green-400 mb-8 transition-colors duration-200 active:scale-95"
            >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Blog</span>
            </button>

            {/* Hero Section Container */}
            <div 
                className="relative min-h-[400px] sm:min-h-[500px] rounded-xl overflow-hidden shadow-2xl" 
                style={heroStyle}
            >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 z-10" style={{
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.7) 30%, rgba(0, 0, 0, 0.2) 70%, rgba(0, 0, 0, 0.1) 100%)'
                }}></div>
                
                {/* Content within the Hero Section */}
                <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-8 pt-20 pb-8 flex flex-col justify-end h-full">
                    
                    {/* Tags */}
                    <div className="flex space-x-2 mb-4 mt-auto">
                        {post.tags.map(tag => (
                            <span key={tag} className="bg-gray-700/50 text-gray-300 text-sm font-medium px-3 py-1 rounded-md backdrop-blur-sm">{tag}</span>
                        ))}
                    </div>

                    {/* Title & Excerpt */}
                    <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight mb-3 text-white">
                        {post.title}
                    </h1>
                    <p className="text-lg text-gray-300 mb-8 max-w-3xl">
                        {post.excerpt}
                    </p>

                    {/* Author Section */}
                    <div className="flex items-center space-x-3 mb-8">
                        <img 
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-green-400" 
                            src="https://placehold.co/40x40/5d5d5d/ffffff?text=TC" 
                            alt={`Author ${post.author}`}
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/40x40/5d5d5d/ffffff?text=TC'; }}
                        />
                        <div>
                            <p className="font-semibold text-white">{post.author}</p>
                            <p className="text-sm text-gray-400">{dateStr}</p>
                        </div>
                    </div>

                    {/* Metadata Footer */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-6 border-t border-gray-700/50 text-sm text-gray-400">
                        <div className="flex space-x-6 mb-4 sm:mb-0">
                            {/* Views */}
                            <div className="flex items-center space-x-1">
                                <Eye className="w-4 h-4" />
                                <span>{viewsStr} views</span>
                            </div>
                            {/* Read Time */}
                            <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{post.readTime} min read</span>
                            </div>
                        </div>
                        
                        {/* Likes */}
                        <div className="flex items-center space-x-1 text-red-400">
                            <Heart className="w-4 h-4 fill-red-400" />
                            <span>{post.likes.toLocaleString()} likes</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Post Body - Now using ReactMarkdown */}
            <article className="max-w-3xl mx-auto mt-12 px-4 sm:px-0">
                {/* The 'prose prose-lg prose-invert' classes provide the custom styling for 
                    the markdown output (headings, lists, code blocks, etc.) 
                    within the dark theme aesthetic.
                */}
                <div className="prose prose-lg prose-invert max-w-none text-gray-300">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {post.body}
                    </ReactMarkdown>
                </div>
            </article>
        </div>
    );
};


// --- 4. MAIN APPLICATION COMPONENT ---
export default function App() {
    const [currentPage, setCurrentPage] = useState('list'); // 'list' or 'detail'
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({
        tags: [],
        sortDir: 'desc' // 'desc' for newest first, 'asc' for oldest first
    });

    // Filtering and Sorting Logic (Memoized for performance)
    const filteredPosts = useMemo(() => {
        let posts = [...BLOG_POSTS];

        // 1. Filtering by Tags
        if (filters.tags.length > 0) {
            posts = posts.filter(post => 
                filters.tags.some(tag => post.tags.includes(tag))
            );
        }

        // 2. Search
        const searchLower = search.toLowerCase().trim();
        if (searchLower) {
            posts = posts.filter(post => 
                post.title.toLowerCase().includes(searchLower) ||
                post.excerpt.toLowerCase().includes(searchLower) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchLower))
            );
        }

        // 3. Sorting
        posts.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            if (filters.sortDir === 'desc') {
                return dateB - dateA; // Newest first
            } else {
                return dateA - dateB; // Oldest first
            }
        });

        return posts;
    }, [search, filters.tags, filters.sortDir]);


    // Navigation Handlers
    const handlePostClick = useCallback((postId) => {
        setSelectedPostId(postId);
        setCurrentPage('detail');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const handleBack = useCallback(() => {
        setCurrentPage('list');
        setSelectedPostId(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    
    const selectedPost = selectedPostId ? getPostById(selectedPostId) : null;
 
    return (
        <div className="font-sans text-gray-100 p-4 sm:p-8 min-h-screen"
             style={{ 
                 fontFamily: 'Inter, sans-serif',
                 background: 'radial-gradient(circle at center, #111827 0%, #000000 100%)' 
             }}
        >
            <div className="max-w-7xl mx-auto">
                
                {/* LIST VIEW */}
                {currentPage === 'list' && (
                    <>
                        <BlogHeader 
                            search={search} 
                            setSearch={setSearch} 
                            setFilters={setFilters}
                        />
                        <main className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <PostList 
                                filteredPosts={filteredPosts} 
                                onPostClick={handlePostClick} 
                            />
                            <FilterSidebar 
                                filters={filters} 
                                setFilters={setFilters}
                            />
                        </main>
                    </>
                )}

                {/* DETAIL VIEW */}
                {currentPage === 'detail' && selectedPost && (
                    <DetailView post={selectedPost} onBack={handleBack} />
                )}

            </div>
        </div>
    );
}