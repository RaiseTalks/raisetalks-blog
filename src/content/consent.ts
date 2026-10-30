// Cookie banner, Cookie settings dialog and the footer "Cookie settings" button (components/consent).
// Owner: Studio (A)
// Opt-in for every visitor (EU/UK GDPR + ePrivacy, UAE PDPL; stricter than US opt-out laws): nothing optional
// runs before the visitor accepts it. Reject is as easy as accept; a Global Privacy Control signal counts as no.
// `cookieTypes` is what the dialog lists and what the Privacy Policy's Cookie Policy (section 9) describes, high
// level only (types, not individual cookies). Adding a type or a cookie? Bump CONSENT_VERSION in src/lib/consent.ts
// so everyone is asked again.

// One name for the control that opens the settings, on the banner button, the dialog title and the footer link,
// so visitors learn where to find it again (PitchBook / Preqin pattern, Oct 2026).
const SETTINGS = "Cookie settings";
const POLICY = "/privacy-policy#cookie-policy";

/** The types of cookies, in dialog order. Written to read well in the dialog and in the policy. */
export const cookieTypes = {
  necessary: {
    title: "Strictly necessary",
    text: `Keep the site working and remember settings you choose, such as your cookie choice. They are never used to track you and can't be switched off in ${SETTINGS}. You can block them in your browser, but parts of the site may then not work as expected.`,
  },
  analytics: {
    title: "Analytics",
    text: "Show us how the site is used so we can improve it and our content: which pages are visited, for how long, on what type of device and from roughly where. Google Analytics gives your browser a random ID; we only look at aggregated reports. Data may be processed by Google in the United States.",
  },
  marketing: {
    title: "Marketing and advertising",
    text: `Used by advertising networks to build interest profiles, show ads on other sites or measure ad campaigns. RaiseTalks does not use them on this website. If that ever changes, we will add them to ${SETTINGS} and ask for your consent first.`,
  },
} satisfies Record<string, { title: string; text: string }>;

export const consent = {
  settings: SETTINGS,
  banner: {
    label: "Cookie consent",
    title: { lead: "Your privacy,", accent: "your choice" },
    text: `We use essential cookies to run this site. With your permission, we also use Google Analytics to see which pages help founders and investors most. We don't use advertising cookies, and you can change your choice at any time from ${SETTINGS} at the bottom of every page. [Cookie policy](${POLICY})`,
    reject: "Reject all",
    accept: "Accept all",
  },
  preferences: {
    title: SETTINGS,
    text: `Choose which types of cookies RaiseTalks may use. Reject all keeps only the strictly necessary ones. [Cookie policy](${POLICY})`,
    close: "Close cookie settings",
    gpc: "Your browser sends a Global Privacy Control signal, so analytics stays off unless you switch it on here.",
    alwaysOn: "Always active",
    notUsed: "Not used",
    reject: "Reject all",
    accept: "Accept all",
    save: "Confirm my choices",
  },
};
