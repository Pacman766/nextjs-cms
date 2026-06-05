# CinemaDB — Glossary

## Domain Terms

**Movie** — основная единица контента. Поля: `title`, `slug`, `poster` (media), `description`, `year`, `rating` (0–10), `duration` (мин), `featured` (boolean), `genres` (relation → Genre, many-to-many).

**Genre** — категория фильма. Поля: `name`, `slug`. Связан с Movie через many-to-many.

**Featured Movie** — фильм с `featured: true`, отображается в Hero-баннере на главной. В один момент времени — один featured фильм.

**Poster** — обложка фильма, загружается через Strapi Media Library, отдаётся как URL.

## Pages

- `/` — Главная: Hero (featured фильм) + секция "Popular" (карточки всех фильмов)
- `/movies` — Каталог с фильтром по Genre
- `/movies/[slug]` — Детальная страница фильма

## Design

Тёмная cinematic тема: чёрный/тёмно-серый фон, красный акцент, большие постеры, hover-эффекты.

## Stack

- Frontend: Next.js App Router, TypeScript, Tailwind CSS
- Backend: Strapi v5, PostgreSQL
- API: GraphQL
