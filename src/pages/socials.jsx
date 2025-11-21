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
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import BlogHeader from "../components/BlogHeader";
import FilterSidebar from "../components/FilterSidebar";
import PostList from "../components/PostList";
import DetailView from "../components/DetailView";
import "../styles/main.css";

// --- 1. DATA (Now using Markdown for post body) ---
const BLOG_POSTS = [
  {
    id: 1,
    title: "The 2024 Retrospective",
    date: "2024-12-31",
    excerpt:
      "First Full-Time Year, Solo Travel while Working, Socializing, and more!",
    readTime: 10,
    views: 4097,
    tags: ["retro", "life"],
    imageUrl: "https://placehold.co/144x144/222222/FFD700?text=2024",
    heroImage: "https://placehold.co/1200x500/0a0a0a/34d399?text=2024+Review",
    author: "Theodorus Clarence",
    likes: 512,
    body: `# The Retrospective: A Year of Growth

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

This year has set the foundation for even greater things to come, and I'm very excited for 2025!`,
  },
  {
    id: 2,
    title: "List Animation using Motion for React",
    date: "2024-12-17",
    excerpt:
      "An in-depth guide on how to animate enter and exit animation for list using Motion for React (previously Framer Motion).",
    readTime: 6,
    views: 7228,
    tags: ["react", "animation"],
    imageUrl: "https://placehold.co/144x144/282a36/F8F8F2?text=Motion",
    heroImage: "https://placehold.co/1200x500/1e293b/a5f3fc?text=React+Motion",
    author: "Theodorus Clarence",
    likes: 220,
    body: `# Mastering Motion for Seamless Lists

A comprehensive tutorial on creating fluid and beautiful list transitions in React using the latest techniques from [Motion for React](https://www.framer.com/motion/). This guide covers keyframes, layout preservation, and performance optimization. It's a must-read for serious front-end developers.

## Key Techniques Comparison
| Feature | Benefit | Example Hook |
| :--- | :--- | :--- |
| **Keyframes** | Fine-grained control over transitions | \`useAnimationControls\` |
| **Layout** | Prevents Cumulative Layout Shift (CLS) | \`<motion.div layout/>\` |
| **Gestures** | Adds interaction (tap, hover) | \`whileTap\`, \`whileHover\` |

### Performance Tips
The use of \`will-change: transform\` is often done automatically by the library, which significantly reduces the paint load on the GPU. Always ensure you are using stable keys for your list items to help React and Motion track elements correctly.

For more complex examples, check out the official [GitHub Repository](https://github.com/framer/motion).`,
  },
  {
    id: 3,
    title: "CSS Grid vs. Flexbox: A modern guide",
    date: "2024-11-25",
    excerpt:
      "When to use Grid for two-dimensional layouts and when Flexbox is sufficient for one-dimensional flows.",
    readTime: 8,
    views: 5100,
    tags: ["css", "grid", "flexbox"],
    imageUrl: "https://placehold.co/144x144/334155/e0f7fa?text=Layout",
    body: "Deep dive into the differences between CSS Grid and Flexbox. We look at real-world examples and common anti-patterns to ensure you choose the right tool for the job. Mastering both is key to modern web development.",
    heroImage: "https://placehold.co/1200x500/0f172a/94a3b8?text=Grid+vs+Flex",
    author: "Theodorus Clarence",
    likes: 350,
  },
  {
    id: 4,
    title: "Vite for Next-Gen Front-End Setup",
    date: "2024-10-10",
    excerpt:
      "How Vite revolutionized my development workflow and its benefits over traditional bundlers like Webpack.",
    readTime: 5,
    views: 3200,
    tags: ["vite", "tools", "setup"],
    imageUrl: "https://placehold.co/144x144/475569/cbd5e1?text=Vite",
    body: "Exploring the speed and simplicity of Vite.js. We cover configuration, hot module replacement, and deploying a Vite-powered application. This tool drastically reduces build times.",
    heroImage: "https://placehold.co/1200x500/1f2937/d1d5db?text=Vite+Setup",
    author: "Theodorus Clarence",
    likes: 180,
  },
  {
  id: 5,
  title: "The 2024 Retrospective",
  date: "2024-12-31",
  excerpt:
    "First Full-Time Year, Solo Travel while Working, Socializing, and more!",
  readTime: 10,
  views: 4097,
  tags: ["retro", "life"],
  imageUrl: "https://www.cometapi.com/wp-content/uploads/2025/07/elon-musk-launches-grok-4.webp",
  heroImage: "https://cdn.finshots.app/images/2023/11/sam-altman.jpg",
  author: "Theodorus Clarence",
  likes: 512,
  body: `# The Retrospective: A Year of Growth

![Elon Musk Grok Launch](https://www.cometapi.com/wp-content/uploads/2025/07/elon-musk-launches-grok-4.webp)

![AI Image](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUUVlkgM0ok6K3ygXamSGkBWY2GaKvYfoILw&s)

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

This year has set the foundation for even greater things to come, and I'm very excited for 2025!

### Further Viewing
Check out this great video on the AGI race:
[The AGI Race - Video Link](https://www.youtube.com/watch?v=tRsxLLghL1k)`,
}
  
];

const ALL_TAGS = [...new Set(BLOG_POSTS.flatMap((post) => post.tags))].sort();

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

const getPostById = (id) => BLOG_POSTS.find((p) => p.id === id);

const Socials = () => {
  const [currentPage, setCurrentPage] = useState("list"); // 'list' or 'detail'
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    tags: [],
    sortDir: "desc", // 'desc' for newest first, 'asc' for oldest first
  });

  // Filtering and Sorting Logic (Memoized for performance)
  const filteredPosts = useMemo(() => {
    let posts = [...BLOG_POSTS];

    // 1. Filtering by Tags
    if (filters.tags.length > 0) {
      posts = posts.filter((post) =>
        filters.tags.some((tag) => post.tags.includes(tag))
      );
    }

    // 2. Search
    const searchLower = search.toLowerCase().trim();
    if (searchLower) {
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchLower) ||
          post.excerpt.toLowerCase().includes(searchLower) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    // 3. Sorting
    posts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (filters.sortDir === "desc") {
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
    setCurrentPage("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleBack = useCallback(() => {
    setCurrentPage("list");
    setSelectedPostId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const selectedPost = selectedPostId ? getPostById(selectedPostId) : null;

  return (
    <div className="page-section mt-32">
      <ul className="socials" id="socials" aria-label="Social links">
        <li className="socials__item">
          <a
            className="socials__link"
            href="/mail"
            aria-label="Email Priyanshu Sah"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
              width="24"
              height="24"
            >
              <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
              <path d="m22 7-10 6L2 7" />
            </svg>
          </a>
        </li>
        <li className="socials__item">
          <a
            className="socials__link"
            href="/linkedin"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-hidden="true"
            >
              <path
                d="M4.75 7.75C4.75 6.09315 6.09315 4.75 7.75 4.75H16.25C17.9069 4.75 19.25 6.09315 19.25 7.75V16.25C19.25 17.9069 17.9069 19.25 16.25 19.25H7.75C6.09315 19.25 4.75 17.9069 4.75 16.25V7.75Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M10.75 16.25V14C10.75 12.7574 11.7574 11.75 13 11.75C14.2426 11.75 15.25 12.7574 15.25 14V16.25"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M10.75 11.75V16.25"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M7.75 11.75V16.25"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M7.75 8.75V9.25"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </a>
        </li>
        <li className="socials__item">
          <a
            className="socials__link"
            href="/github"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
          >
            <svg
              stroke="currentColor"
              fill="none"
              stroke-width="1"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
              height="20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-hidden="true"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
          </a>
        </li>
        <li className="socials__item">
          <a
            className="socials__link"
            href="/codolio"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Codolio LeetCode profile"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <title>LeetCode</title>
              <path
                d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"
                fill="currentColor"
                stroke-width="1"
              ></path>
            </svg>
          </a>
        </li>
        <li className="socials__item">
          {/* <!-- https://bit.ly/Priyanshu_Sah-Resume-Foreign --> */}
          <a
            className="socials__link"
            href="/resume-global"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download CV"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              role="img"
              aria-hidden="true"
            >
              <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"></path>
              <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
              <path d="M5 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
              <path d="M7 16.5 8 22l-3-1-3 1 1-5.5"></path>
            </svg>
          </a>
        </li>
      </ul>
      <div className=" max-w-[95%] md:max-w-[85%] lg:max-w-[95rem] mx-auto backdrop-blur-2xl border border-slate-700/50 p-12 rounded-4xl">
        {/* LIST VIEW */}
        {currentPage === "list" && (
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
              <FilterSidebar filters={filters} setFilters={setFilters} />
            </main>
          </>
        )}

        {/* DETAIL VIEW */}
        {currentPage === "detail" && selectedPost && (
          <DetailView post={selectedPost} onBack={handleBack} />
        )}
      </div>
    </div>
  );
};

export default Socials;
