import { Redirect, redirectMetadata } from "@/components/Redirect";

// Old Docusaurus authors index (one author): the blog home.
const TO = "/blog/";
export const metadata = redirectMetadata(TO);
export default function Page() {
  return <Redirect to={TO} />;
}
