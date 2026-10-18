import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Article } from "@/components/blog/Article";
import { getPost, getPosts, unpublishedSlugs } from "@/lib/blog/posts";
import { parsePost } from "@/lib/blog/markdown";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date.toISOString(),
      tags: post.tags.map((t) => t.label),
      images: post.image ? [{ url: post.image, width: 1200, height: 630 }] : undefined,
    },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const parsed = await parsePost(post.body, unpublishedSlugs());
  const live = getPosts();
  const related = parsed.readNext.flatMap((s) => live.find((p) => p.slug === s) ?? []);
  return <Article post={post} parsed={parsed} related={related} />;
}
