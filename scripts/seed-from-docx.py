"""Seed ECCE MDX content from the 8 May 2026 source document.

The script intentionally keeps the extracted source document as the authority,
then maps its team, work-package, and institute sections into the v1 content
model. It is a one-off bootstrap helper; edit MDX directly after seeding.
"""

from __future__ import annotations

from pathlib import Path
from typing import Any
from zipfile import ZipFile
import re
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
SOURCE_DOCX = ROOT.parent / "ECCE website 08May2026.docx"
CONTENT = ROOT / "content"
TODAY = "2026-05-08"


def slugify(value: str) -> str:
    value = value.lower()
    value = value.replace("&", " and ")
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-")


def docx_paragraphs(path: Path) -> list[str]:
    ns = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
    with ZipFile(path) as archive:
        xml = archive.read("word/document.xml")
    root = ET.fromstring(xml)
    paragraphs: list[str] = []
    for paragraph in root.findall(".//w:p", ns):
        text = "".join(node.text or "" for node in paragraph.findall(".//w:t", ns)).strip()
        if text:
            paragraphs.append(text)
    return paragraphs


def yaml_scalar(value: Any) -> str:
    if value is True:
        return "true"
    if value is False:
        return "false"
    if value is None:
        return "null"
    if isinstance(value, (int, float)):
        return str(value)
    escaped = str(value).replace("\\", "\\\\").replace('"', '\\"')
    return f'"{escaped}"'


def yaml_dump(data: dict[str, Any]) -> str:
    lines: list[str] = []
    for key, value in data.items():
        if isinstance(value, list):
            if not value:
                lines.append(f"{key}: []")
            elif all(not isinstance(item, dict) for item in value):
                lines.append(f"{key}: [{', '.join(yaml_scalar(item) for item in value)}]")
            else:
                lines.append(f"{key}:")
                for item in value:
                    lines.append("  -")
                    for nested_key, nested_value in item.items():
                        lines.append(f"    {nested_key}: {yaml_scalar(nested_value)}")
        elif isinstance(value, dict):
            lines.append(f"{key}:")
            for nested_key, nested_value in value.items():
                lines.append(f"  {nested_key}: {yaml_scalar(nested_value)}")
        else:
            lines.append(f"{key}: {yaml_scalar(value)}")
    return "\n".join(lines)


def write_mdx(folder: str, slug: str, frontmatter: dict[str, Any], body: str) -> None:
    directory = CONTENT / folder
    directory.mkdir(parents=True, exist_ok=True)
    text = f"---\n{yaml_dump(frontmatter)}\n---\n\n{body.strip()}\n"
    (directory / f"{slug}.mdx").write_text(text, encoding="utf-8")


CORE_INSTITUTES = [
    {
        "slug": "iarc",
        "name": "International Agency for Research on Cancer",
        "shortName": "IARC",
        "city": "Lyon",
        "country": "France",
        "countryCode": "FR",
        "region": "europe",
        "coordinates": [4.8357, 45.764],
    },
    {
        "slug": "wellcome-sanger-institute",
        "name": "Wellcome Sanger Institute",
        "shortName": "Sanger",
        "city": "Cambridge",
        "country": "United Kingdom",
        "countryCode": "GB",
        "region": "europe",
        "coordinates": [0.1218, 52.2053],
    },
    {
        "slug": "uc-san-diego",
        "name": "University of California, San Diego",
        "shortName": "UC San Diego",
        "city": "San Diego",
        "country": "United States",
        "countryCode": "US",
        "region": "n-america",
        "coordinates": [-117.1611, 32.7157],
    },
]

PARTNER_INSTITUTES = [
    ("Ain Shams University", "Cairo", "Egypt", "EG", "africa", [31.2357, 30.0444], ["Hesham Elghazaly"]),
    ("Obafemi Awolowo University", "Ile Ife", "Nigeria", "NG", "africa", [4.5667, 7.4667], ["Olusegun Isaac Alatise"]),
    ("Kilimanjaro Clinical Research Institute", "Moshi", "Tanzania", "TZ", "africa", [37.3414, -3.3349], ["Athanasia Maro", "Blandina Theophil Mmbaga"]),
    ("Mengo Hospital", "Kampala", "Uganda", "UG", "africa", [32.5825, 0.3476], ["Gerald Tumusiime"]),
    ("National Cancer Center Japan", "Tokyo", "Japan", "JP", "asia", [139.6917, 35.6895], ["Tatsuhiro Shibata"]),
    ("Liaquat University of Medical and Health Sciences", "Jamshoro", "Pakistan", "PK", "asia", [68.2809, 25.4169], ["Amjad Khan"]),
    ("National Cancer Center Korea", "Seoul", "South Korea", "KR", "asia", [126.978, 37.5665], ["Young-Woo Kim"]),
    ("Chiang Mai University", "Chiang Mai", "Thailand", "TH", "asia", [98.9853, 18.7883], ["Taned Chitapanarux"]),
    ("VinUniversity", "Ha Noi", "Vietnam", "VN", "asia", [105.8342, 21.0278], ["Le Thien Thanh", "Nguyen Xuan Hung"]),
    ("Hvidovre Hospital", "Hvidovre", "Denmark", "DK", "europe", [12.4736, 55.642], ["Maria Dorn-Rasmussen", "Johan Burisch"]),
    ("Imperial College London", "London", "United Kingdom", "GB", "europe", [-0.1276, 51.5072], ["James Kinross", "Marc Gunter", "Kevin Monahan"]),
    ("Manchester Cancer Research Centre", "Manchester", "United Kingdom", "GB", "europe", [-2.2426, 53.4808], ["Konstantinos Kamposioras", "Jane Rogan"]),
    ("University of Cambridge", "Cambridge", "United Kingdom", "GB", "europe", [0.1218, 52.2053], ["Nick Colman"]),
    ("Centre Leon Berard", "Lyon", "France", "FR", "europe", [4.8357, 45.764], ["Jean-Yves Blay", "Severine Tabone-Eglinger"]),
    ("University Hospital Aachen", "Aachen", "Germany", "DE", "europe", [6.0839, 50.7753], ["Klaus Tenbrock", "Edgar Dahl"]),
    ("Children's Hospital Bambino Gesu", "Rome", "Italy", "IT", "europe", [12.4964, 41.9028], ["Giulia Angelino", "Luigi Dall'Oglio"]),
    ("University of Turin", "Turin", "Italy", "IT", "europe", [7.6869, 45.0703], ["Lorenzo Richiardi"]),
    ("Catalan Institute of Oncology", "Barcelona", "Spain", "ES", "europe", [2.1734, 41.3851], ["Victor Moreno", "Mireia Obon Santacana"]),
    ("University of Limerick", "Limerick", "Ireland", "IE", "europe", [-8.6267, 52.6638], ["Noor Kherreh", "Aedin Culhane"]),
    ("Institute of Clinical and Preventive Medicine, University of Latvia", "Riga", "Latvia", "LV", "europe", [24.1052, 56.9496], ["Ilmars Stonans"]),
    ("University of Utrecht", "Utrecht", "Netherlands", "NL", "europe", [5.1214, 52.0907], ["Anne May"]),
    ("M. Sklodowska-Curie Institute", "Warsaw", "Poland", "PL", "europe", [21.0122, 52.2297], ["Marta Manczuk"]),
    ("N. N. Blokhin National Medical Research Center of Oncology", "Moscow", "Russia", "RU", "europe", [37.6173, 55.7558], ["David Zaridze", "Anush Mukeria"]),
    ("Ontario Institute for Cancer Research", "Toronto", "Canada", "CA", "n-america", [-79.3832, 43.6532], ["Riley Cox"]),
    ("University of Calgary", "Calgary", "Canada", "CA", "n-america", [-114.0719, 51.0447], ["Darren Brenner"]),
    ("Mayo Clinic", "Rochester", "United States", "US", "n-america", [-92.48, 44.0121], ["Lisa Boardman"]),
    ("M.D. Anderson Cancer Center", "Houston", "United States", "US", "n-america", [-95.3698, 29.7604], ["Dipen Maru", "Scott Kopetz"]),
    ("Italian Hospital", "Buenos Aires", "Argentina", "AR", "s-america", [-58.3816, -34.6037], ["Tamara Pinero", "Veronica Busoni"]),
    ("AC Camargo Cancer Center", "Sao Paulo", "Brazil", "BR", "s-america", [-46.6333, -23.5505], ["Maria Paula Curado"]),
    ("National Cancer Institute Brazil", "Rio de Janeiro", "Brazil", "BR", "s-america", [-43.1729, -22.9068], ["Luis Felipe Ribeiro Pinto", "Simone Guaraldi da Silva"]),
    ("Barretos Cancer Hospital", "Barretos", "Brazil", "BR", "s-america", [-48.5678, -20.5576], ["Rui Manuel Reis"]),
    ("Hospital de Clinicas de Porto Alegre", "Porto Alegre", "Brazil", "BR", "s-america", [-51.2177, -30.0346], ["Patricia Prolla", "Rafael Jose Vargas Alves"]),
    ("Federal University of Pelotas", "Pelotas", "Brazil", "BR", "s-america", [-52.3376, -31.7654], ["Bernardo Horta"]),
    ("University of Chile", "Santiago", "Chile", "CL", "s-america", [-70.6693, -33.4489], ["Alicia Colombo"]),
    ("Central Hospital of the Armed Forces", "Montevideo", "Uruguay", "UY", "s-america", [-56.1645, -34.9011], ["Adriana Della Valle"]),
    ("Valle del Lili Foundation", "Cali", "Colombia", "CO", "s-america", [-76.532, 3.4516], ["Luz Fernanda Sua Villegas"]),
]

WORK_PACKAGES = [
    ("wp1", 1, "Colorectal cancer epidemiology", "Epidemiology", "Build a diverse global biorepository.", "paul-brennan", "WP1 is creating one of the largest and most diverse international biorepositories dedicated to colorectal cancer research. It brings together biological samples and harmonised epidemiological, clinical, lifestyle, and exposure data from more than 3,700 individuals across Europe, North and South America, and Asia."),
    ("wp2", 2, "Whole genome sequencing", "Genomics", "Map mutational processes across cancers and normal crypts.", "mike-stratton", "WP2 will generate one of the most comprehensive genomic maps created for colorectal cancer and normal colorectal tissue across different ages and populations, including colorectal cancers and normal colorectal crypts."),
    ("wp3", 3, "Microbiome-derived genotoxins", "Microbiome", "Identify bacterial factors that may damage DNA.", "trevor-lawley", "WP3 explores whether bacteria living in the human gut can directly damage DNA and contribute to colorectal cancer development through global microbiome data, bacterial culture systems, organoids, and experimental models."),
    ("wp4", 4, "Integrated causal modelling", "Integration", "Connect epidemiology, genomes, microbiomes, and prevention.", "ludmil-alexandrov", "WP4 is the scientific integration core of ECCE, bringing together epidemiology, genomics, microbiome profiles, and lifetime exposure data to test the consortium's central causal hypothesis."),
    ("wp5", 5, "Coordination, dissemination and training", "Coordination", "Keep the consortium coordinated, reproducible, and open.", "genia-chicherova", "WP5 ensures effective execution, coordination, resource utilisation, open-science practice, dissemination, and training across the ECCE consortium."),
]

CORE_PEOPLE = [
    ("paul-brennan", "Paul Brennan", "Dr", "Project lead and lead for Work Package 1", "iarc", ["wp1"], "pi", "I am the Head of the Genetic Epidemiology Branch at the International Agency for Research on Cancer (IARC), based in Lyon, France, and the Principal Investigator of the ECCE Project."),
    ("mike-stratton", "Mike Stratton", "Professor Sir", "Lead for Work Package 2", "wellcome-sanger-institute", ["wp2"], "pi", "I am Senior Group Leader of the Somatic Mutations in Normal and Cancer Cells group at the Wellcome Sanger Institute, based in Cambridge, UK."),
    ("trevor-lawley", "Trevor Lawley", "Dr", "Lead for Work Package 3", "wellcome-sanger-institute", ["wp3"], "pi", "I lead Work Package 3, which aims to discover and identify genotoxic gut bacteria and test mutagenic activity in experimental systems."),
    ("ludmil-alexandrov", "Ludmil Alexandrov", "Dr", "Lead for Work Package 4", "uc-san-diego", ["wp4"], "pi", "I lead Work Package 4, integrating epidemiological, genomic and microbiome data through mathematical models and computational programs."),
    ("laura-humphreys", "Laura Humphreys", "", "Project manager", "wellcome-sanger-institute", [], "core-team", "ECCE core team member at the Wellcome Sanger Institute."),
    ("calli-latimer", "Calli Latimer", "", "Scientist", "wellcome-sanger-institute", [], "core-team", "ECCE core team scientist at the Wellcome Sanger Institute."),
    ("sarah-moody", "Sarah Moody", "", "Scientist", "wellcome-sanger-institute", [], "core-team", "ECCE core team scientist at the Wellcome Sanger Institute."),
    ("andrew-ramos", "Andrew Ramos", "", "Scientist", "wellcome-sanger-institute", [], "core-team", "ECCE core team scientist at the Wellcome Sanger Institute."),
    ("nicolas-wyvekens", "Nicolas Wyvekens", "", "Pathologist", "wellcome-sanger-institute", [], "core-team", "ECCE core team pathologist at the Wellcome Sanger Institute."),
    ("behnoush-abedi-ardekani", "Behnoush Abedi-Ardekani", "", "Pathologist", "iarc", [], "core-team", "ECCE core team pathologist at IARC."),
    ("genia-chicherova", "Genia Chicherova", "", "Project manager and Work Package 5 coordination lead", "iarc", ["wp5"], "core-team", "ECCE project manager at IARC, coordinating operational delivery across partners."),
    ("valerie-gaborieau", "Valerie Gaborieau", "", "Research assistant", "iarc", [], "core-team", "ECCE core team research assistant at IARC."),
    ("christine-carreira", "Christine Carreira", "", "Pathology technician", "iarc", [], "core-team", "ECCE core team pathology technician at IARC."),
    ("priscilia-chopard", "Priscilia Chopard", "", "Laboratory technician", "iarc", [], "core-team", "ECCE core team laboratory technician at IARC."),
    ("thomas-cattiaux", "Thomas Cattiaux", "", "Data manager", "iarc", [], "core-team", "ECCE core team data manager at IARC."),
    ("sandra-perdomo", "Sandra Perdomo", "", "Scientist", "iarc", [], "core-team", "ECCE core team scientist at IARC."),
    ("chris-steele", "Chris Steele", "", "Senior research assistant", "uc-san-diego", [], "core-team", "ECCE core team senior research assistant at UC San Diego."),
]


def seed() -> None:
    if not SOURCE_DOCX.exists():
        raise FileNotFoundError(f"Missing source document: {SOURCE_DOCX}")
    paragraphs = docx_paragraphs(SOURCE_DOCX)
    if "Partner Institutes" not in paragraphs:
        raise RuntimeError("Source document structure changed; Partner Institutes heading not found.")

    for folder in ["people", "institutes", "work-packages", "publications", "meetings", "insights", "news"]:
        (CONTENT / folder).mkdir(parents=True, exist_ok=True)

    people_by_slug: dict[str, dict[str, Any]] = {}
    institutes: list[dict[str, Any]] = []

    for item in CORE_INSTITUTES:
        institutes.append(
            {
                **item,
                "description_en": f"{item['name']} is a core ECCE institution based in {item['city']}, {item['country']}.",
                "leadInvestigators": [],
                "workPackages": ["wp1", "wp2", "wp3", "wp4", "wp5"],
                "isCoreInstitution": True,
                "lastUpdated": TODAY,
            },
        )

    for name, city, country, code, region, coordinates, leads in PARTNER_INSTITUTES:
        institute_slug = slugify(name)
        lead_slugs = []
        for lead in leads:
            lead_slug = slugify(lead)
            lead_slugs.append(lead_slug)
            people_by_slug.setdefault(
                lead_slug,
                {
                    "slug": lead_slug,
                    "fullName": lead,
                    "title": f"Partner lead investigator, {name}",
                    "honorific": "",
                    "affiliations": [institute_slug],
                    "primaryAffiliation": institute_slug,
                    "workPackages": ["wp1"],
                    "role": "partner-lead",
                    "bio_en": f"{lead} is listed in the ECCE source document as a lead investigator for {name}.",
                    "isPublic": True,
                    "lastUpdated": TODAY,
                },
            )
        institutes.append(
            {
                "slug": institute_slug,
                "name": name,
                "city": city,
                "country": country,
                "countryCode": code,
                "region": region,
                "coordinates": coordinates,
                "description_en": f"{name} is an ECCE partner institute in {city}, {country}.",
                "leadInvestigators": lead_slugs,
                "workPackages": ["wp1"],
                "isCoreInstitution": False,
                "lastUpdated": TODAY,
            },
        )

    for slug, full_name, honorific, title, affiliation, wps, role, bio in CORE_PEOPLE:
        people_by_slug[slug] = {
            "slug": slug,
            "fullName": full_name,
            "title": title,
            "honorific": honorific or None,
            "affiliations": [affiliation],
            "primaryAffiliation": affiliation,
            "workPackages": wps,
            "role": role,
            "bio_en": bio,
            "isPublic": True,
            "lastUpdated": TODAY,
        }

    for institute in institutes:
        write_mdx(
            "institutes",
            institute["slug"],
            institute,
            institute.get("description_en", ""),
        )

    for person in people_by_slug.values():
        frontmatter = {key: value for key, value in person.items() if value is not None}
        write_mdx("people", person["slug"], frontmatter, person["bio_en"])

    for slug, number, title, short, hook, lead, summary in WORK_PACKAGES:
        core_team = [person["slug"] for person in people_by_slug.values() if slug in person.get("workPackages", []) and person["slug"] != lead]
        write_mdx(
            "work-packages",
            slug,
            {
                "slug": slug,
                "number": number,
                "title_en": title,
                "shortTitle_en": short,
                "hook_en": hook,
                "summary_en": summary,
                "leadPI": lead,
                "coreTeam": core_team,
                "position": number,
                "isCentral": slug == "wp4",
                "status": "active",
                "lastUpdated": TODAY,
            },
            summary,
        )

    write_mdx(
        "meetings",
        "2026-05-18-ecce-meeting",
        {
            "slug": "2026-05-18-ecce-meeting",
            "title": "ECCE meeting",
            "date": "2026-05-18",
            "isVirtual": False,
            "description_en": "Source document lists an ECCE meeting on May 18th, 2026.",
            "workPackages": ["wp5"],
            "status": "upcoming",
            "lastUpdated": TODAY,
        },
        "Source document lists an ECCE meeting on May 18th, 2026.",
    )

    print(f"Seeded {len(institutes)} institutes, {len(people_by_slug)} people, and 5 work packages.")


if __name__ == "__main__":
    seed()
