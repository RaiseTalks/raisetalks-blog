import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Post } from "@/lib/blog/posts";
import { cn } from "@/lib/utils";

/**
 * Blog post card: OG image (1200×630), first tag, title, description, reading time.
 * Card surface + hover as ui/Card (no shadow, no lift). `featured` = image beside the text from laptop up.
 */
export function PostCard({ post, featured = false, tone = "page", headingLevel = "h2" }: { post: Post; featured?: boolean; tone?: "page" | "alt"; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  const tag = post.tags[0];
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-lg border transition-[background-color] duration-[var(--duration-card-hover)] ease-[var(--ease-soft)]",
        tone === "alt" ? "border-border-2 bg-card-on-alt hover:bg-card-hover" : "border-border-1 bg-card hover:bg-card-alt-hover",
        featured && "laptop:grid laptop:grid-cols-[1.15fr_1fr]",
      )}
    >
      {post.image && (
        <div className={cn("relative aspect-[1200/630] overflow-hidden border-b", tone === "alt" ? "border-border-2" : "border-border-1", featured && "laptop:aspect-auto laptop:h-full laptop:border-b-0 laptop:border-r")}>
          <Image
            src={post.image}
            alt=""
            fill
            sizes={featured ? "(min-width: 1280px) 760px, 100vw" : "(min-width: 1280px) 460px, (min-width: 768px) 50vw, 100vw"}
            className="object-cover transition-transform duration-[900ms] ease-[var(--ease-soft)] group-hover:scale-[1.02]"
          />
        </div>
      )}
      <div className={cn("flex flex-1 flex-col gap-3 p-5 tablet:p-6", featured && "laptop:justify-center laptop:gap-4 laptop:p-12")}>
        {tag && <p className="text-footnote font-semibold uppercase tracking-[0.12em] text-brand-light-blue">{tag.label}</p>}
        <H className={cn("text-headline", featured ? "text-h4 laptop:text-h3" : "text-h4")}>{post.title}</H>
        <p className={cn("text-body text-copy", !featured && "line-clamp-3")}>{post.description}</p>
        <p className="mt-auto flex items-center justify-between pt-3 text-footnote text-muted">
          <span>{post.readingMinutes} min read</span>
          <span className="flex items-center gap-1.5 font-medium text-brand-light-blue">
            Read article
            <ArrowRight className="size-3.5 transition-transform duration-[var(--duration-hover)] group-hover:translate-x-0.5" aria-hidden />
          </span>
        </p>
      </div>
    </Link>
  );
}
