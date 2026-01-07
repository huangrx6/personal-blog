import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlogCard } from "@/components/blog/blog-card";
import { blogPosts } from "@/lib/blog-data";

const categories = ["All", "Design", "Code", "Writing", "Philosophy", "Engineering"];

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="py-16 bg-surface/50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text mb-4">
                Blog
              </h1>
              <p className="text-xl text-text-muted">
                Thoughts, ideas, and explorations in design, code, and creative work.
              </p>
            </div>

            {/* Category Filter */}
            <div className="mt-8 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    category === "All"
                      ? "bg-primary text-white shadow-md"
                      : "bg-surface text-text-muted hover:bg-border-light hover:text-text"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
