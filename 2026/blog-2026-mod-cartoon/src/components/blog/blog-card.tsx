import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@/types/blog";
import { Calendar, Clock } from "lucide-react";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="h-full flex flex-col hover:bg-muted/50 transition-colors">
        <CardHeader>
          <div className="flex justify-between items-start mb-2">
            {post.category && (
              <Badge variant="secondary" className="mb-2">
                {post.category}
              </Badge>
            )}
          </div>
          <CardTitle className="line-clamp-2 text-xl">{post.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="line-clamp-3 text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
        </CardContent>
        <CardFooter className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</time>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{post.readTime} read</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

export function FeaturedBlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <Card className="overflow-hidden hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200">
        <div className="relative h-48 bg-secondary border-b-2 border-black overflow-hidden">
          {/* Neo-brutalist Pattern: Dots */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "10px 10px" }}></div>

          {post.category && (
            <div className="absolute top-4 left-4">
              <Badge variant="default" className="text-white bg-black border-2 border-white shadow-none">
                {post.category}
              </Badge>
            </div>
          )}
        </div>
        <div className="p-6 bg-white">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-2xl font-black group-hover:text-primary transition-colors duration-200">
              {post.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 mb-6">
            <p className="line-clamp-2 text-muted-foreground font-medium">{post.excerpt}</p>
          </CardContent>
          <CardFooter className="p-0 flex items-center justify-between text-sm font-bold text-black/70">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime} read</span>
            </div>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
}
