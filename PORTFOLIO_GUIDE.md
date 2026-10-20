# Nazifa Nowsin Portfolio — Developer Guide

## Run locally
```bash
npm install
npm run dev
```
Production build:
```bash
npm run build
npm run preview
```

## Six-section navigation structure
The portfolio navigation is intentionally condensed to six destinations while retaining all existing content blocks:
1. **Home** — centered hero and primary actions.
2. **About & Journey** — profile, experience/education timeline and developer mindset.
3. **Skills & Stack** — skill focus, technology playbook and interactive MERN architecture.
4. **Projects** — project cards/details, implementation notes and verified certificate gallery.
5. **Developer Lab** — React concepts plus SQL/MySQL examples.
6. **Contact** — email, GitHub and LinkedIn.

The sections are grouped for simpler navigation; individual content components have not been deleted.

## Main files
- `src/App.jsx`: React sections, content data, theme state, interactive tabs, project details and navigation.
- `src/index.css`: design tokens, dark/light themes, responsive layouts, motion and visual effects.
- `index.html`: document title, description and Open Graph metadata.
- `public/`: static images, favicon and optional CV PDF.

## Dark / light mode
Use the Light/Dark toggle in the navbar. The selected theme is applied with `data-theme` on the document root and remembered in localStorage. If storage is unavailable, the page still uses in-memory state.

## CV
Put the real CV PDF at `public/cv-nazifa.pdf`. Existing download links use that path.

## Projects
Project descriptions are based on known learning/work records. The decorative previews are illustrative UI—not screenshots of deployed projects. Before publishing, replace them with real screenshots and add verified GitHub/live URLs. Do not add fake links.

## Certificates
The certificate list is empty intentionally. Add only verified certificate records to `CERTIFICATES` in `src/App.jsx` and place images in `public/certificates/`. The modal is view-only and has no download button.

## Skills and percentages
Percentages shown in Skills mean **relative learning-focus priority**, not proficiency scores, exam marks or verified skill ratings. Change them to match your priorities; do not present them as mastery.

## Stack Playbook
The Stack Playbook distinguishes concepts used in this React + Vite portfolio from technologies practiced in other learning projects and technologies still being learned. This website itself does not connect to a live MongoDB or SQL database and does not run a Node/Express backend.

## Email and links
The contact CTA currently uses `nazifanowsin2021@gmail.com`. Update all `mailto:` references if your preferred contact email changes. GitHub and LinkedIn links are in `src/App.jsx`.

## Final pre-publish checklist
- Add the real CV PDF.
- Replace illustrative project art with actual screenshots.
- Verify every project description and link.
- Add only genuine certificate images and issuer/date details.
- Confirm email and social links.
- Run `npm run build`.
- Test mobile widths and both themes.

## Compact design update (V7)
The latest stylesheet overrides tighten section spacing, reduce heading sizes and card padding, compact the hero/code visual, and preserve responsive breakpoints. The content sections and existing interaction logic remain in place.


## V8 professional structure
- Professional employment is shown in its own Experience section.
- University, diploma, and current training are grouped separately under Education & Training.
- Update the `EXPERIENCE` and `EDUCATION` arrays in `src/App.jsx` with verified dates and details only.

## Latest refinements
- Education and experience/training are displayed side-by-side in the Background section.
- Education includes B.Sc., Diploma, and SSC records.
- Experience & training includes Dot BD Solutions Ltd., Sohojx, ISDB-BISEW, and Programming Hero. Employment and training are labeled separately.
- The About section uses a `developer.ts` visual instead of repeating education and course details.
- Database Thinking (SQL/MySQL) and Under the Hood remain visible under the Developer Lab navigation item.
- Project records support `repoUrl` and `liveUrl` fields in the `PROJECTS` array near the top of `src/App.jsx`. Replace empty strings with verified URLs, e.g. `repoUrl: 'https://github.com/your-user/your-repo'`. The corresponding links appear automatically only when a URL is present.
