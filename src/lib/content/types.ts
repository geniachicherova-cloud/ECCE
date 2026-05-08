export type Region = "africa" | "asia" | "europe" | "n-america" | "s-america";
export type Locale = "en" | "fr" | "es";
export type WPSlug = "wp1" | "wp2" | "wp3" | "wp4" | "wp5";

export interface AssetRef {
  src: string;
  alt_en: string;
  alt_fr?: string;
  credit?: string;
  license?: string;
  width?: number;
  height?: number;
}

export interface Person {
  slug: string;
  fullName: string;
  shortName?: string;
  title: string;
  honorific?: string;
  affiliations: string[];
  primaryAffiliation: string;
  workPackages: WPSlug[];
  role: "pi" | "wp-lead" | "core-team" | "partner-lead" | "team-member";
  bio_en: string;
  bio_fr?: string;
  bio_es?: string;
  expertise?: string[];
  email?: string;
  orcid?: string;
  portrait?: AssetRef;
  links?: { label: string; url: string }[];
  isPublic: boolean;
  lastUpdated: string;
}

export interface Institute {
  slug: string;
  name: string;
  shortName?: string;
  city: string;
  country: string;
  countryCode: string;
  region: Region;
  coordinates: [number, number];
  url?: string;
  logo?: AssetRef;
  description_en?: string;
  description_fr?: string;
  description_es?: string;
  leadInvestigators: string[];
  workPackages: WPSlug[];
  isCoreInstitution: boolean;
  joinedDate?: string;
  lastUpdated: string;
}

export interface WorkPackage {
  slug: WPSlug;
  number: 1 | 2 | 3 | 4 | 5;
  title_en: string;
  title_fr?: string;
  title_es?: string;
  shortTitle_en: string;
  hook_en: string;
  summary_en: string;
  body_en: string;
  hook_fr?: string;
  summary_fr?: string;
  body_fr?: string;
  leadPI: string;
  coreTeam: string[];
  diagram?: AssetRef;
  position: 1 | 2 | 3 | 4 | 5;
  isCentral: boolean;
  status: "active" | "planned" | "completed";
  lastUpdated: string;
}

export interface Publication {
  slug: string;
  title: string;
  authors: string[];
  authorPersons?: string[];
  journal: string;
  year: number;
  doi?: string;
  url: string;
  abstract_en?: string;
  workPackages: WPSlug[];
  isFromECCE: boolean;
  isOpenAccess?: boolean;
  publishedDate: string;
  lastUpdated: string;
}

export interface Meeting {
  slug: string;
  title: string;
  date: string;
  endDate?: string;
  location?: string;
  isVirtual?: boolean;
  description_en?: string;
  description_fr?: string;
  attendees?: string[];
  workPackages?: WPSlug[];
  status: "upcoming" | "past";
  publicSummary_en?: string;
  lastUpdated: string;
}

export interface Insight {
  slug: string;
  category: "field-work" | "sample-journey" | "pathology" | "story" | "explainer";
  title_en: string;
  title_fr?: string;
  hook_en: string;
  body_en: string;
  body_fr?: string;
  authorPersons: string[];
  contributingInstitutes?: string[];
  workPackages?: WPSlug[];
  region?: Region;
  coverImage: AssetRef;
  publishedDate: string;
  lastUpdated: string;
  isPublic: boolean;
}

export interface NewsItem {
  slug: string;
  type: "publication" | "meeting" | "field-report" | "press" | "milestone" | "announcement";
  title_en: string;
  title_fr?: string;
  summary_en: string;
  summary_fr?: string;
  body_en?: string;
  publishedDate: string;
  workPackages?: WPSlug[];
  region?: Region;
  relatedPublication?: string;
  relatedMeeting?: string;
  relatedPersons?: string[];
  coverImage?: AssetRef;
  externalUrl?: string;
  isPublic: boolean;
  lastUpdated: string;
}

export interface KeyFigure {
  id: string;
  label_en: string;
  label_fr?: string;
  label_es?: string;
  value: number;
  unit?: string | null;
  prefix?: string | null;
  display: "exact" | "approx" | "target";
  asOf: string;
  source: { label: string; url?: string; doi?: string };
  owner: string;
  showOn?: string[];
  category?: "scope" | "samples" | "genomics" | "microbiome" | "team" | "publications" | "meetings";
  isPublic?: boolean;
  notes?: string;
}
