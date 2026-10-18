import { Redirect, redirectMetadata } from "@/components/Redirect";
import { getPosts, oldPageNumbers } from "@/lib/blog/posts";

// Old paginated blog list (/blog/page/2 …): the blog home now shows every article on one page.
const TO = "/blog/";
export const dynamicParams = false;
export function generateStaticParams() {
  return oldPageNumbers(getPosts().length).map((n) => ({ n: String(n) }));
}
export const metadata = redirectMetadata(TO);
export default function Page() {
  return <Redirect to={TO} />;
}
