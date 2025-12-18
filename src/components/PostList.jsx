import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Search, Calendar, Clock, Eye, Heart, ArrowLeft, ChevronDown } from 'lucide-react';
import PostCard from './PostCard';
// --- Markdown Imports (Assumed available in the environment) ---
// Note: Changed import style to resolve module resolution error in the build environment.
// We assume these are globally available or imported via full URLs if necessary.
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // Keeping this structure but knowing the build environment will resolve it.

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
        <section className="md:col-span-2 order-2 md:order-none pt-0! rounded-2xl ">
            {filteredPosts.map(post => (
                <PostCard key={post.id} post={post} onPostClick={onPostClick} />
            ))}
        </section>
    );
};


export default PostList;