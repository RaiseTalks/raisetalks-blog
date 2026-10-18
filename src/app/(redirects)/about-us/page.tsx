import { Redirect, redirectMetadata } from "@/components/Redirect";

// Old site's About page (navbar, llms.txt, links in the wild) → the new /about.
const TO = "/about/";
export const metadata = redirectMetadata(TO);
export default function Page() {
  return <Redirect to={TO} />;
}
