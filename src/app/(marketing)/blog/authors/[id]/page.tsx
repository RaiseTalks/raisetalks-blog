import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { getPosts, usedAuthors } from "@/lib/blog/posts";
import { blog } from "@/content/blog";

export const dynamicParams = false;

export function generateStaticParams() {
  return usedAuthors().map((a) => ({ id: a.id }));
}

const find = (id: string) => usedAuthors().find((a) => a.id === id);

export async function generateMetadata({ params }: PageProps<"/blog/authors/[id]">): Promise<Metadata> {
  const a = find((await params).id);
  if (!a) return {};
  return { title: `Articles by ${a.name}`, description: `${a.name}${a.title ? `, ${a.title}` : ""}: articles on the RaiseTalks blog.`, alternates: { canonical: `/blog/authors/${a.id}/` } };
}

export default async function AuthorPage({ params }: PageProps<"/blog/authors/[id]">) {
  const a = find((await params).id);
  if (!a) notFound();
  const posts = getPosts().filter((p) => p.authors.some((x) => x.id === a.id));
  return <BlogIndex posts={posts} heading={{ lead: a.name }} text={blog.authorPage.text(a.title)} chips={[{ label: blog.allLabel, href: "/blog", strong: true }, { label: blog.allTopicsLabel, href: "/blog/tags" }]} />;
}
