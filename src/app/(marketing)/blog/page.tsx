import type { Metadata } from "next";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { getPosts } from "@/lib/blog/posts";
import { blog } from "@/content/blog";

export const metadata: Metadata = { title: blog.title, description: blog.metaDescription, alternates: { canonical: blog.path } };

export default function BlogPage() {
  return <BlogIndex posts={getPosts()} heading={blog.heading} text={blog.text} lead />;
}
