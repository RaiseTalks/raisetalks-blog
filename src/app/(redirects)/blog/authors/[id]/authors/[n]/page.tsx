import { Redirect, redirectMetadata } from "@/components/Redirect";
import { getPosts, oldPageNumbers, usedAuthors } from "@/lib/blog/posts";

// Old paginated author pages (/blog/authors/dariiava/authors/2 …): the author page lists every article.
export const dynamicParams = false;
export function generateStaticParams() {
  const posts = getPosts();
  return usedAuthors().flatMap((a) =>
    oldPageNumbers(posts.filter((p) => p.authors.some((x) => x.id === a.id)).length).map((n) => ({ id: a.id, n: String(n) })),
  );
}
export async function generateMetadata({ params }: PageProps<"/blog/authors/[id]/authors/[n]">) {
  return redirectMetadata(`/blog/authors/${(await params).id}/`);
}
export default async function Page({ params }: PageProps<"/blog/authors/[id]/authors/[n]">) {
  return <Redirect to={`/blog/authors/${(await params).id}/`} />;
}
