# ASN – Văn phòng Công Chứng Châu Á

## Local Development

```bash
npm install
npm run dev    # Next.js dev server on http://localhost:3000
```

## Build Static Site

```bash
npm run build  # Outputs static files to frontend/out/
```

You can preview the build locally:

```bash
npx serve frontend/out
```

## Deployment

Every push to `main` triggers the GitHub Actions workflow (`.github/workflows/deploy.yml`) which:
1. Installs dependencies
2. Builds the static export
3. Deploys to GitHub Pages

To set up:
1. Push this repo to GitHub
2. Go to **Settings → Pages → Source** → select **GitHub Actions**
3. Done — the site will be live at `https://<username>.github.io`

## Project Structure

```
asn/
├── .github/workflows/deploy.yml   # Auto-deploy to GitHub Pages
├── README.md
└── frontend/
    ├── next.config.js
    ├── tailwind.config.js
    ├── package.json
    ├── tsconfig.json
    └── src/
        ├── app/
        │   ├── layout.tsx
        │   ├── page.tsx           # Home page
        │   ├── dat-lich/page.tsx  # Appointment booking
        │   └── globals.css
        ├── components/
        │   ├── Header.tsx
        │   ├── HeroCarousel.tsx
        │   ├── ServicesSection.tsx
        │   ├── PartnersSection.tsx
        │   ├── TeamSection.tsx
        │   ├── NewsSection.tsx
        │   ├── FaqAccordion.tsx
        │   ├── FaqAppointmentSection.tsx
        │   └── Footer.tsx
        └── types/
            └── index.ts
```
