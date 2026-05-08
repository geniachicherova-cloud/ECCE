import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import YAML from "yaml";

type RecordData = Record<string, unknown> & { slug: string };
type CollectionName = "people" | "institutes" | "work-packages" | "publications" | "meetings" | "insights" | "news";

const contentRoot = join(process.cwd(), "content");
const publicRoot = join(process.cwd(), "public");
const wpSlugs = ["wp1", "wp2", "wp3", "wp4", "wp5"] as const;
const doiPattern = /^10\.\d{4,9}\/[-._;()/:A-Z0-9]+$/i;

function files(dir: string): string[] {
  const absolute = join(contentRoot, dir);
  if (!existsSync(absolute)) return [];

  return readdirSync(absolute, { withFileTypes: true }).flatMap((entry) => {
    const path = join(absolute, entry.name);
    if (entry.isDirectory()) {
      return readdirSync(path, { withFileTypes: true })
        .filter((nested) => nested.isFile() && nested.name.endsWith(".mdx"))
        .map((nested) => join(path, nested.name));
    }
    return entry.isFile() && entry.name.endsWith(".mdx") ? [path] : [];
  });
}

function frontmatter(path: string): RecordData {
  const raw = readFileSync(path, "utf8");
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw);
  if (!match) throw new Error(`Missing frontmatter: ${relative(process.cwd(), path)}`);
  return YAML.parse(match[1]) as RecordData;
}

function collection(dir: CollectionName): RecordData[] {
  return files(dir).map(frontmatter);
}

function bySlug(records: RecordData[], name: string): Map<string, RecordData> {
  const map = new Map<string, RecordData>();
  for (const record of records) {
    if (map.has(record.slug)) throw new Error(`Duplicate ${name} slug '${record.slug}'.`);
    map.set(record.slug, record);
  }
  return map;
}

function assertRefs(values: unknown, target: Map<string, RecordData>, label: string): void {
  for (const value of Array.isArray(values) ? values : values ? [values] : []) {
    if (typeof value !== "string" || !target.has(value)) throw new Error(`${label} references missing slug '${String(value)}'.`);
  }
}

function assetRefs(value: unknown): Array<{ src?: string; alt_en?: string }> {
  if (!value || typeof value !== "object") return [];
  const object = value as Record<string, unknown>;
  const own = typeof object.src === "string" || typeof object.alt_en === "string" ? [object as { src?: string; alt_en?: string }] : [];
  return [
    ...own,
    ...Object.values(object).flatMap((child) => (Array.isArray(child) ? child.flatMap(assetRefs) : assetRefs(child))),
  ];
}

const people = collection("people");
const institutes = collection("institutes");
const workPackages = collection("work-packages");
const publications = collection("publications");
const meetings = collection("meetings");
const insights = collection("insights");
const news = collection("news");

const peopleBySlug = bySlug(people, "person");
const institutesBySlug = bySlug(institutes, "institute");
const wpBySlug = bySlug(workPackages, "work-package");
const publicationsBySlug = bySlug(publications, "publication");
const meetingsBySlug = bySlug(meetings, "meeting");

for (const slug of wpSlugs) {
  if (!wpBySlug.has(slug)) throw new Error(`Missing work package file '${slug}'.`);
}

const positions = workPackages.map((wp) => wp.position).sort();
if (JSON.stringify(positions) !== JSON.stringify([1, 2, 3, 4, 5])) {
  throw new Error("WorkPackage.position values must be exactly 1..5 once.");
}

for (const person of people) {
  assertRefs(person.affiliations, institutesBySlug, `Person '${person.slug}' affiliations`);
  assertRefs(person.workPackages, wpBySlug, `Person '${person.slug}' workPackages`);
  if (!Array.isArray(person.affiliations) || person.primaryAffiliation === undefined || !person.affiliations.includes(person.primaryAffiliation)) {
    throw new Error(`Person '${person.slug}' primaryAffiliation must be in affiliations.`);
  }
  if (person.email && person.isPublic !== true) throw new Error(`Person '${person.slug}' has email but is not public.`);
}

for (const institute of institutes) {
  assertRefs(institute.leadInvestigators, peopleBySlug, `Institute '${institute.slug}' leadInvestigators`);
  assertRefs(institute.workPackages, wpBySlug, `Institute '${institute.slug}' workPackages`);
  const [lng, lat] = institute.coordinates as [number, number];
  if (lng < -180 || lng > 180 || lat < -90 || lat > 90) throw new Error(`Institute '${institute.slug}' has invalid coordinates.`);
}

for (const wp of workPackages) {
  assertRefs(wp.leadPI, peopleBySlug, `WorkPackage '${wp.slug}' leadPI`);
  assertRefs(wp.coreTeam, peopleBySlug, `WorkPackage '${wp.slug}' coreTeam`);
}

for (const publication of publications) {
  assertRefs(publication.authorPersons, peopleBySlug, `Publication '${publication.slug}' authorPersons`);
  assertRefs(publication.workPackages, wpBySlug, `Publication '${publication.slug}' workPackages`);
  if (publication.doi && !doiPattern.test(String(publication.doi))) throw new Error(`Publication '${publication.slug}' has invalid DOI.`);
}

for (const insight of insights) {
  assertRefs(insight.authorPersons, peopleBySlug, `Insight '${insight.slug}' authorPersons`);
  assertRefs(insight.contributingInstitutes, institutesBySlug, `Insight '${insight.slug}' contributingInstitutes`);
  assertRefs(insight.workPackages, wpBySlug, `Insight '${insight.slug}' workPackages`);
}

for (const item of news) {
  assertRefs(item.relatedPersons, peopleBySlug, `NewsItem '${item.slug}' relatedPersons`);
  assertRefs(item.workPackages, wpBySlug, `NewsItem '${item.slug}' workPackages`);
  assertRefs(item.relatedPublication, publicationsBySlug, `NewsItem '${item.slug}' relatedPublication`);
  assertRefs(item.relatedMeeting, meetingsBySlug, `NewsItem '${item.slug}' relatedMeeting`);
}

for (const record of [...people, ...institutes, ...workPackages, ...publications, ...meetings, ...insights, ...news]) {
  for (const asset of assetRefs(record)) {
    if (!asset.src || !existsSync(join(publicRoot, asset.src.replace(/^\//, "")))) {
      throw new Error(`Asset '${asset.src ?? "(missing)"}' referenced by '${record.slug}' does not exist.`);
    }
    if (!asset.alt_en || asset.alt_en.trim().split(/\s+/).length < 6) {
      throw new Error(`Asset '${asset.src}' referenced by '${record.slug}' needs alt_en with at least 6 words.`);
    }
  }
}

console.log(
  `Validated content: ${people.length} people, ${institutes.length} institutes, ${workPackages.length} work packages.`,
);
