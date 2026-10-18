import { Redirect, redirectMetadata } from "@/components/Redirect";
import { getPosts, oldPageNumbers, usedTags } from "@/lib/blog/posts";

// Old paginated topic pages (/blog/tags/fundraising/page/2 …): topic pages now list every article.
export const dynamicParams = false;
export function generateStaticParams() {
  const posts = getPosts();
  return usedTags().flatMap((t) =>
    oldPageNumbers(posts.filter((p) => p.tags.some((x) => x.id === t.id)).length, 0).map((n) => ({ tag: t.id, n: String(n) })),
  );
}
export async function generateMetadata({ params }: PageProps<"/blog/tags/[tag]/page/[n]">) {
  return redirectMetadata(`/blog/tags/${(await params).tag}/`);
}
export default async function Page({ params }: PageProps<"/blog/tags/[tag]/page/[n]">) {
  return <Redirect to={`/blog/tags/${(await params).tag}/`} />;
}
