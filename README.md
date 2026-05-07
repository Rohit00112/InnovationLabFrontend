# IV Labs Website

Modern website for IV Labs built with Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion

## Quick Start

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts

- `npm run dev` - Start local development server
- `npm run build` - Build for production
- `npm run start` - Run production build
- `npm run lint` - Run ESLint

## Folder Structure

```text
ivlabs/
├── public/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── (public)/
│   │       ├── about/page.tsx
│   │       ├── contact/page.tsx
│   │       ├── events/page.tsx
│   │       ├── lab/page.tsx
│   │       ├── login/page.tsx
│   │       └── partners/page.tsx
│   ├── components/
│   │   ├── About-Extended.tsx
│   │   ├── Crausel.tsx
│   │   ├── FadeIn.tsx
│   │   ├── Footer.tsx
│   │   ├── Home-Pg-Hero.tsx
│   │   ├── Maruee.tsx
│   │   ├── NavBar.tsx
│   │   ├── NewsSection.tsx
│   │   ├── SmoothScroll.tsx
│   │   ├── UpcomingEventsSection.tsx
│   │   └── Partners/
│   │       ├── companyCard.tsx
│   │       ├── companyList.tsx
│   │       ├── gallery.tsx
│   │       └── stories.tsx
│   ├── constants/
│   │   └── constants.ts
│   ├── hooks/
│   │   └── smth.ts
│   ├── lib/
│   │   ├── data/data.tsx
│   │   ├── services/apiCall.ts
│   │   └── utils/util.ts
│   ├── styles/
│   │   └── globals.css
│   └── types/
│       └── type.ts
├── eslint.config.mjs
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

## Notes

- Global styles live in `src/styles/globals.css`.
- Route groups are used under `src/app/(public)` for public-facing pages.
- Shared UI components are in `src/components`.

## API Client Generation (Orval)

This project uses Orval to generate typed DTOs and API services from:

- `public/innovation-lab-api-specs.json`

Generated outputs:

- Frontend React Query + fetch client: `src/lib/services/generated/frontend`
- Node fetch client: `src/lib/services/generated/node`

Commands:

```bash
npm run api:generate
npm run api:watch
```

Convenience re-exports:

- `src/lib/services/apiCall.ts`

Frontend local BFF helper layer:

- `src/lib/services/bff-client.ts`

Use `bffApi` / `localApi` from `src/lib/services/apiCall.ts` in UI code so client-side code consistently talks only to local `/api/*` routes.

Server-only Orval exports for BFF route handlers:

- `src/lib/services/server-api.ts`

Regenerate the client whenever the backend OpenAPI spec changes.

## BFF Layer (Next.js Route Handlers)

This project now includes a server-side BFF under `src/app/api/**`.

Key design points:

- All backend calls happen server-side via the Orval node client.
- Frontend can call local Next.js routes (`/api/...`) instead of calling backend APIs directly.
- Auth tokens are stored as HttpOnly cookies in the Next.js BFF layer.
- Bearer token forwarding is supported by passing the incoming `Authorization` header or the HttpOnly access-token cookie to the backend.
- Responses are normalized into a standard envelope with `success`, `data`, `error`, and `meta`.
- Admin routes are protected by middleware that refreshes the access token when needed and redirects to login when the refresh token is missing or expired.

Configured route groups:

- `src/app/api/auth/[[...segments]]/route.ts`
- `src/app/api/about/[[...segments]]/route.ts`
- `src/app/api/banners/[[...segments]]/route.ts`
- `src/app/api/categories/[[...segments]]/route.ts`
- `src/app/api/contacts/[[...segments]]/route.ts`
- `src/app/api/events/[[...segments]]/route.ts`
- `src/app/api/faqs/[[...segments]]/route.ts`
- `src/app/api/testimonials/[[...segments]]/route.ts`

Shared BFF utilities:

- `src/lib/bff/common.ts`
- `src/lib/auth/session.ts`

Auth endpoints currently supported:

- `POST /api/auth/login`
- `POST /api/auth/refresh-token`
- `POST /api/auth/logout`

### Environment Variables

Create a local env file from `.env.example` and set:

- `BACKEND_API_BASE_URL` (for example `https://api.example.com`)
- `AUTH_BACKEND_API_BASE_URL` (optional, overrides auth-only calls such as `/api/auth/login` and `/api/auth/refresh-token`)

The generated node client uses this at runtime.
