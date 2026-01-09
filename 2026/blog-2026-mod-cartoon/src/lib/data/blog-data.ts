import type { BlogPost } from "@/types/blog";

export const blogPosts: BlogPost[] = [
  {
    slug: "the-art-of-imperfect-design",
    title: "The Art of Imperfect Design: Why Hand-Drawn Elements Matter",
    excerpt: "Exploring how hand-drawn elements and organic shapes bring warmth and personality to digital interfaces, creating more human and memorable experiences.",
    date: "2026-01-15",
    readTime: "5 min",
    category: "Design",
    featured: true,
  },
  {
    slug: "minimalism-vs-maximalism",
    title: "Beyond Minimalism: Finding Balance in Modern Web Design",
    excerpt: "Design trends swing like a pendulum. Let's explore how to find the sweet spot between clean minimalism and expressive maximalism.",
    date: "2026-01-10",
    readTime: "4 min",
    category: "Design",
  },
  {
    slug: "the-future-of-personal-blogs",
    title: "Why Personal Blogs Still Matter in the Age of Social Media",
    excerpt: "In an era of algorithmic feeds and instant content, personal blogs offer something unique: ownership, depth, and genuine connection.",
    date: "2026-01-05",
    readTime: "6 min",
    category: "Writing",
    featured: true,
  },
  {
    slug: "creative-coding-adventures",
    title: "Creative Coding: Where Art Meets Algorithm",
    excerpt: "A journey into generative art, creative coding, and the beautiful intersection of technical precision and artistic expression.",
    date: "2025-12-28",
    readTime: "7 min",
    category: "Code",
  },
  {
    slug: "the-power-of-slow-tech",
    title: "The Power of Slow Technology in a Fast World",
    excerpt: "Sometimes the best feature is the one you don't add. Exploring intentional design and the beauty of constraints.",
    date: "2025-12-20",
    readTime: "5 min",
    category: "Philosophy",
  },
  {
    slug: "building-for-the-long-term",
    title: "Building for the Long Term: Sustainable Digital Products",
    excerpt: "How to create digital products that age gracefully, remain maintainable, and continue to provide value years into the future.",
    date: "2025-12-15",
    readTime: "8 min",
    category: "Engineering",
  },
];

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured);
}

export function getRecentPosts(count: number = 6): BlogPost[] {
  return blogPosts.slice(0, count);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}
