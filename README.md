# ECCE Prototype

Static-export Next.js 15 prototype for the ECCE Project website.

## Commands

- `npm run dev` - generate tokens, watch Velite content, and start Next.
- `npm run build` - generate token CSS, build Velite content, validate schemas, and export static HTML to `out/`.
- `npm run build:ci` - run lint, Stylelint, typecheck, Vitest, validation, and build.
- `npm run content:seed` - one-off bootstrap from `../ECCE website 08May2026.docx`.
- `npm run validate` - run content graph validation and key-figure JSON Schema validation.
- `npm run ladle` - review design-system primitives.

## Guardrails

- Static export only. No API routes, server actions, ISR, or runtime data fetching.
- Fonts are self-hosted from `/public/fonts`; no Google Fonts hot-load.
- `content/data/key-figures.json` is the source for public numbers. Every figure must keep source, owner, and `asOf`.
- Velite builds MDX from `/content`; custom validation enforces reference integrity.
- `robots` are `noindex` while this remains a private prototype.

## Key-Figures Update Workflow

Edit `content/data/key-figures.json`, keep the schema fields intact, then run:

```bash
npm run validate
npm run build
```

CI repeats the same checks before the static export artifact is accepted.
