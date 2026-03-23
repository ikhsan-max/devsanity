# DevSanity

DevSanity is a simple app for tracking resources you actually use, not just collect.

The goal is straightforward: keep useful docs, tools, and references visible, and filter out links that only become bookmark clutter.

## Features

- Add resources with title, URL, category, and notes
- Edit resources inline
- Delete resources with confirmation
- Mark resources as used or unused
- Search by title, URL, or notes
- Filter by category
- View usage stats
- Show loading states and toast feedback

## Tech Stack

- Next.js App Router
- TypeScript
- Prisma ORM
- PostgreSQL
- Tailwind CSS
- shadcn/ui
- Sonner

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/ikhsan-max/devsanity.git
cd devsanity
```

2. Install dependencies

```bash
npm install
```

3. Create `.env`

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME?schema=public"
```

4. Run Prisma migration

```bash
npx prisma migrate dev
```

5. Start the development server

```bash
npm run dev
```

Open `http://localhost:3000`.

## Project Structure

```text
src/
|-- app/
|   |-- resources/        # main feature area
|-- components/ui/        # reusable UI components
|-- lib/                  # helpers and shared utilities
|-- types/                # shared TypeScript types
prisma/
|-- migrations/           # Prisma migration history
|-- schema.prisma         # database schema
```

## Notes

This project is mainly for practicing:

- Next.js App Router
- Prisma CRUD flow
- Server and client component boundaries
- Reusable UI composition
