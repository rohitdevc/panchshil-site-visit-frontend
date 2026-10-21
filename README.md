# Panchshil Realty — Site Visit Consultation

The frontend application for the Panchshil Realty site-visit and private consultation experience. The website guides prospective customers through a short, multi-step consultation process to share their preferences and connect with the appropriate representative.

- **Live Website:** https://panchshil-site-visit.netlify.app/
- **Repository:** https://github.com/rohitdevc/panchshil-site-visit-frontend

## Overview

This project provides a dedicated consultation interface for Panchshil Realty, featuring a refined presentation of its residential, office, and landmark developments.

The experience is designed around a guided consultation journey, with five steps taking approximately three minutes to complete. The homepage introduces the consultation and invites visitors to begin sharing their requirements.

## Features

- **Private Consultation Experience** — A dedicated entry point for prospective customers.
- **Guided Multi-Step Journey** — A five-step consultation flow designed for a focused user experience.
- **Real Estate Presentation** — Content covering residences, office environments, and landmark developments.
- **API-Driven Content** — Retrieves homepage introduction, banner, and metadata through application service modules.
- **SEO Metadata** — Dynamic page titles, descriptions, canonical URLs, Open Graph metadata, and Twitter card metadata.
- **Responsive UI** — Custom styling built with Tailwind CSS.
- **Interactive Animations** — GSAP-powered animation support.
- **Location and Form Utilities** — Country information, Indian PIN-code utilities, and validation helpers.
- **Netlify Deployment** — Hosted on Netlify with deployment-aware Next.js configuration.
- **Docker Support** — Includes a production Dockerfile and Docker Compose configuration.

## Technology Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | Application framework and routing |
| React 19 | User interface |
| TypeScript | Type safety |
| Tailwind CSS 4 | Styling |
| GSAP | Animations |
| `html-react-parser` | HTML content parsing |
| `countries-list` | Country data |
| `india-pincode` | Indian PIN-code utilities |
| `validator` | Input validation utilities |
| React Icons | UI icons |
| ESLint | Code quality |
| npm | Dependency management |
| Docker | Containerized deployment |
| Netlify | Hosting |

## Getting Started

### Prerequisites

- Node.js 22 or a compatible version
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/rohitdevc/panchshil-site-visit-frontend.git
cd panchshil-site-visit-frontend
```

### 2. Install dependencies

```bash
npm ci
```

### 3. Configure environment variables

Create a `.env` file in the project root with the appropriate values for your environment.

```dotenv
NEXT_PUBLIC_PATH=
BASEPATH_PREFIX=
ASSET_PREFIX=
API_DOMAIN_NAME=
NEXT_PUBLIC_DOMAIN_NAME=
```

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_PATH` | Public asset path configuration |
| `BASEPATH_PREFIX` | Optional application base path |
| `ASSET_PREFIX` | Optional static asset prefix |
| `API_DOMAIN_NAME` | API domain configuration |
| `NEXT_PUBLIC_DOMAIN_NAME` | Public website domain used for canonical and social metadata |

Use the values appropriate to your environment. Verify the API service modules for any additional requirements before starting the application.

**Security note:** Variables prefixed with `NEXT_PUBLIC_` may be exposed to browser-side code. Do not place passwords, private API credentials, or other secrets in public variables.

### 4. Run the development server

```bash
npm run dev
```

Open the application at:

http://localhost:2964

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server on port `2964` |
| `npm run build` | Builds the application for production |
| `npm run start` | Starts the production server on port `2964` |
| `npm run lint` | Runs ESLint |

## Project Structure

```text
panchshil-site-visit-frontend/
├── app/                  # Next.js routes, layout, fonts, and styles
├── components/           # Reusable UI and page components
├── lib/                  # API services and shared utilities
├── public/               # Static assets
├── types/                # TypeScript type definitions
├── Dockerfile             # Production Docker image
├── docker-compose.yml     # Docker Compose configuration
├── next.config.ts         # Next.js and deployment configuration
├── package.json           # Dependencies and npm scripts
├── package-lock.json      # Locked dependency versions
├── eslint.config.mjs      # ESLint configuration
├── postcss.config.mjs     # PostCSS configuration
└── tsconfig.json          # TypeScript configuration
```

## Production Build

To create and run a production build locally:

```bash
npm run build
npm run start
```

The production server uses port `2964` by default.

## Docker Deployment

The repository includes a multi-stage Dockerfile based on Node.js 22 Alpine. It builds the Next.js application and runs the standalone production output.

### Build and start

After configuring the required variables in `.env`, run:

```bash
docker compose up -d --build
```

### View logs

```bash
docker compose logs -f site-visit-web
```

### Stop the application

```bash
docker compose down
```

The Docker Compose service is named `site-visit-web`, and its container name is `panchshil-site-visit`. Port `2964` is exposed by default.

## Deployment on Netlify

The live application is hosted on Netlify.

For a new deployment:

1. Connect the GitHub repository to Netlify.
2. Configure the required environment variables in the Netlify site settings.
3. Ensure the build environment uses a compatible Node.js version.
4. Configure the Next.js framework/build settings according to the project's current Netlify integration.
5. Deploy and verify the consultation flow, API connectivity, and production assets.

The application uses `BASEPATH_PREFIX` and `ASSET_PREFIX` in its Next.js configuration, so confirm both are appropriate for the target domain and deployment path.

### Search engine indexing

The current Next.js configuration adds an `X-Robots-Tag: noindex, nofollow` header to all routes. Review this setting before deploying to a public production domain if the website is intended to appear in search engine results.

## Development Guidelines

- Follow the existing component and service-module structure.
- Keep API integration logic within the appropriate modules under `lib/`.
- Use TypeScript for components, data models, and API responses.
- Run `npm run lint` before submitting changes.
- Run `npm run build` to validate the production build.
- Keep environment-specific configuration out of committed secret files.

## License

No explicit open-source license is specified in this documentation. Contact the repository owner for permission before redistributing or reusing the source code.

---

**Project:** Panchshil Realty Site Visit Consultation  
**Framework:** Next.js · React · TypeScript · Tailwind CSS  
**Hosting:** Netlify  
**Repository:** https://github.com/rohitdevc/panchshil-site-visit-frontend