import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category?: string;
  featured?: boolean;
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card variant="default" hover className="h-full flex flex-col">
        {post.category && (
          <div className="mb-3">
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-accent/20 text-accent">
              {post.category}
            </span>
          </div>
        )}
        <CardHeader>
          <CardTitle className="line-clamp-2">{post.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="line-clamp-3 text-sm leading-relaxed">{post.excerpt}</p>
        </CardContent>
        <CardFooter className="flex items-center justify-between text-xs text-text-muted">
          <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</time>
          <span>{post.readTime} read</span>
        </CardFooter>
      </Card>
    </Link>
  );
}

export function FeaturedBlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <Card variant="elevated" hover className="overflow-hidden">
        <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-xl overflow-hidden">
          {/* Decorative hand-drawn circle */}
          <svg
            className="absolute inset-0 w-full h-full opacity-30"
            viewBox="0 0 400 200"
            preserveAspectRatio="xMidYMid slice"
          >
            <circle
              cx="320"
              cy="100"
              r="80"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-primary"
            />
            <circle
              cx="320"
              cy="100"
              r="60"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-primary-light"
            />
          </svg>
          {post.category && (
            <div className="absolute top-4 left-4">
              <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-accent/90 text-white backdrop-blur-sm">
                {post.category}
              </span>
            </div>
          )}
        </div>
        <div className="p-6">
          <CardHeader className="mb-2">
            <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-200">
              {post.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="mb-4">
            <p className="line-clamp-2">{post.excerpt}</p>
          </CardContent>
          <CardFooter className="flex items-center justify-between text-sm text-text-muted">
            <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</time>
            <span>{post.readTime} read</span>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
}
