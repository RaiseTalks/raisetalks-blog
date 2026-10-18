import { Redirect, redirectMetadata } from "@/components/Redirect";

// Old Docusaurus archive page: the blog home lists every article.
const TO = "/blog/";
export const metadata = redirectMetadata(TO);
export default function Page() {
  return <Redirect to={TO} />;
}
