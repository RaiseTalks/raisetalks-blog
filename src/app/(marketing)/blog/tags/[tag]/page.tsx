import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndex, topicChips } from "@/components/blog/BlogIndex";
import { getPosts, usedTags } from "@/lib/blog/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return usedTags().map((t) => ({ tag: t.id }));
}

const find = (id: string) => usedTags().find((t) => t.id === id);

export async function generateMetadata({ params }: PageProps<"/blog/tags/[tag]">): Promise<Metadata> {
  const tag = find((await params).tag);
  if (!tag) return {};
  return { title: `${tag.label} articles`, description: tag.description, alternates: { canonical: `/blog/tags/${tag.id}` } };
}

export default async function TagPage({ params }: PageProps<"/blog/tags/[tag]">) {
  const tag = find((await params).tag);
  if (!tag) notFound();
  const posts = getPosts().filter((p) => p.tags.some((t) => t.id === tag.id));
  return <BlogIndex posts={posts} heading={{ lead: tag.label }} text={tag.description} chips={topicChips(tag.id)} />;
}
