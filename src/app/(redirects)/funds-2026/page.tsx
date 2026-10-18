import { Redirect, redirectMetadata } from "@/components/Redirect";

// Short link from the LinkedIn post's first comment (raisetalks.com/funds-2026).
const TO = "/blog/new-vc-funds-2026/";
export const metadata = redirectMetadata(TO);
export default function Page() {
  return <Redirect to={TO} />;
}
