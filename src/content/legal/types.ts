// Owner: Studio (A)
export type LegalDoc = {
  updated: string;
  title: string;
  subtitle: string;
  /** Blue intro banner paragraphs */
  intro: string[];
  /** Line format — see privacy.ts header */
  body: string;
};
