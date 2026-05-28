# nextjs-cms

Full-stack monorepo: Next.js frontend + Strapi 5 backend. Explores the headless CMS pattern with a typed frontend consuming content via REST and GraphQL.

## Structure

```
frontend/   — Next.js 16, Strapi blocks renderer, Tailwind, shadcn/ui
backend/    — Strapi 5, GraphQL plugin, users & permissions
```

## Stack

**Frontend**
- Next.js 16 (App Router), React 19, TypeScript
- `@strapi/blocks-react-renderer` for rich text content
- Tailwind CSS v4, shadcn/ui, Radix UI

**Backend**
- Strapi 5
- GraphQL API plugin
- Users & permissions plugin

## Local setup

```bash
# Backend
cd backend && npm install && npm run dev

# Frontend (new terminal)
cd frontend && npm install && npm run dev
```

Frontend runs at `http://localhost:3000`, Strapi admin at `http://localhost:1337/admin`.

