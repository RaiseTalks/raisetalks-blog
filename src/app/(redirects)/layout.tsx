// Redirect pages for old URLs: no navbar or footer, they forward immediately (components/Redirect).
export default function RedirectsLayout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}
