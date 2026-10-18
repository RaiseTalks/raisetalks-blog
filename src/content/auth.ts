// Sign in / Sign up copy — RaiseTalks TV page (Figma 3642:3819) adapted to RaiseTalks. Owner: Studio (A)
// Mock only: no accounts on this site. A valid submit redirects to the external platform (`platformUrl`).

export const authContent = {
  signIn: {
    title: "Welcome Back",
    subtitle: "Sign in to continue to RaiseTalks",
    submit: "Sign in",
    switchPrompt: "Don\u2019t have an account?",
    switchLink: "Sign up",
  },
  signUp: {
    title: "Create your account",
    subtitle: "Join RaiseTalks to start your raise",
    submit: "Create account",
    switchPrompt: "Already have an account?",
    switchLink: "Sign in",
  },
  fields: {
    name: { label: "Full name", placeholder: "Enter your name" },
    email: { label: "Email Address", placeholder: "Enter your email" },
    password: { label: "Password", placeholder: "Enter your password" },
    passwordSignUpHint: "At least 8 characters.",
  },
  errors: {
    name: "Please enter your name.",
    email: "Please enter a valid email address.",
    password: "Please enter your password.",
    passwordShort: "Password must be at least 8 characters.",
  },
  remember: "Remember me",
  forgot: "Forgot password?",
  or: "OR",
  social: { google: "Continue with Google", linkedin: "Continue with Linkedin" },
  /**
   * Where a valid submit (and the social / forgot-password links) goes.
   * Developer: final platform URL — update with all other links during the domain migration (docs/handover.md).
   */
  platformUrl: "https://app.raisetalks.com",
  /** One title: the page is static, so it cannot change with ?mode. */
  metaTitle: "Sign in",
} as const;
