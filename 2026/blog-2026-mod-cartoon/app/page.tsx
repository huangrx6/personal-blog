import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FeaturedBlogCard, BlogCard } from "@/components/blog/blog-card";
import { getFeaturedPosts, getRecentPosts } from "@/lib/blog-data";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const featuredPosts = getFeaturedPosts();
  const recentPosts = getRecentPosts(3);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <svg
              className="absolute -top-40 -right-40 w-80 h-80 text-primary-light"
              viewBox="0 0 320 320"
              fill="none"
            >
              <circle
                cx="160"
                cy="160"
                r="120"
                stroke="currentColor"
                strokeWidth="2"
                className="animate-[spin_20s_linear_infinite]"
              />
              <circle
                cx="160"
                cy="160"
                r="90"
                stroke="currentColor"
                strokeWidth="1.5"
                className="animate-[spin_15s_linear_infinite_reverse]"
              />
              <circle
                cx="160"
                cy="160"
                r="60"
                stroke="currentColor"
                strokeWidth="1"
                className="animate-[spin_10s_linear_infinite]"
              />
            </svg>
            <svg
              className="absolute bottom-0 left-10 w-40 h-40 text-accent-light"
              viewBox="0 0 160 160"
              fill="none"
            >
              <path
                d="M80 20 C120 20, 140 60, 140 80 C140 120, 100 140, 80 140 C40 140, 20 100, 20 80 C20 40, 60 20, 80 20 Z"
                stroke="currentColor"
                strokeWidth="2"
                className="animate-[pulse_4s_ease-in-out_infinite]"
              />
            </svg>
          </div>

          <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-text leading-tight mb-6">
                Welcome to{" "}
                <span className="text-primary relative inline-block">
                  Blog 2026
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 200 12"
                    fill="none"
                  >
                    <path
                      d="M2 8 C50 2, 150 2, 198 8"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="text-primary-light"
                    />
                  </svg>
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-text-muted leading-relaxed mb-8">
                A creative space for sharing thoughts, ideas, and explorations in design, code, and everything in between.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg">
                  <Link href="/blog">Explore Blog</Link>
                </Button>
                <Button variant="outline" size="lg">
                  <Link href="/about">About Me</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Posts Section */}
        <section className="py-16 bg-surface/50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text mb-4">
                Featured Posts
              </h2>
              <p className="text-lg text-text-muted">
                Hand-picked articles worth your time
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <FeaturedBlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>

        {/* Recent Posts Section */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex items-end justify-between">
              <div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text mb-4">
                  Recent Writing
                </h2>
                <p className="text-lg text-text-muted">
                  Fresh thoughts and ideas
                </p>
              </div>
              <Link
                href="/blog"
                className="hidden sm:inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-200"
              >
                View all posts
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
            <div className="mt-8 text-center sm:hidden">
              <Button variant="outline" size="lg" fullWidth>
                <Link href="/blog">View All Posts</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter/CTA Section */}
        <section className="py-16 bg-surface/50">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <div className="relative">
              {/* Decorative elements */}
              <svg
                className="absolute -top-12 -left-12 w-24 h-24 text-primary/10"
                viewBox="0 0 96 96"
                fill="none"
              >
                <circle
                  cx="48"
                  cy="48"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <svg
                className="absolute -bottom-12 -right-12 w-24 h-24 text-accent/10"
                viewBox="0 0 96 96"
                fill="none"
              >
                <rect
                  x="24"
                  y="24"
                  width="48"
                  height="48"
                  stroke="currentColor"
                  strokeWidth="2"
                  rx="8"
                />
              </svg>

              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text mb-4">
                Stay in the Loop
              </h2>
              <p className="text-lg text-text-muted mb-8">
                Subscribe to receive new posts directly in your inbox. No spam, just thoughtful content.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-6 py-3 rounded-xl border-2 border-border bg-surface text-text placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors duration-200"
                  required
                />
                <Button type="submit" size="lg">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
