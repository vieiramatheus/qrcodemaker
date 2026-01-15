# QR Information Maker

A Next.js application that lets you store text-based information, persist it with PostgreSQL via Prisma, and instantly generate QR codes that point to hosted detail pages for each entry.

## Features

- Save any snippet of text with an optional title
- Persist entries with Prisma on Neon-hosted PostgreSQL databases
- Auto-generate QR codes that resolve to shareable `/info/{id}` pages
- Browse saved entries with inline QR previews and download links
- Responsive Tailwind CSS interface optimized for desktop and mobile

## Tech Stack

- [Next.js 14](https://nextjs.org/) with the App Router
- [React 18](https://react.dev/)
- [Prisma](https://www.prisma.io/) + PostgreSQL (Neon)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [qrcode](https://github.com/soldair/node-qrcode) for QR image generation

## Prerequisites

- Node.js 18.18+ or 20+
- npm 9+

## Setup

1. Populate `.env` with your Neon **development** connection string (and optional `SHADOW_DATABASE_URL` for Prisma Migrate). Sample values:
   ```dotenv
   DATABASE_URL="postgresql://<dev-user>:<dev-password>@<dev-host>/<dev-database>?sslmode=require"
   SHADOW_DATABASE_URL="postgresql://<shadow-user>:<shadow-password>@<shadow-host>/<shadow-database>?sslmode=require"
   ```
2. Install dependencies (this also runs `prisma generate` via the postinstall hook):
   ```bash
   npm install
   ```
3. Apply migrations to your development database:
   ```bash
   npx prisma migrate dev --name dev-bootstrap
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Visit http://localhost:3000 to use the app.

## Available Scripts

- `npm run dev` – Start the Next.js development server
- `npm run lint` – Lint the codebase with ESLint
- `npm run build` – Create a production build
- `npm run start` – Run the production server after building
- `npm run prisma:generate` – Regenerate the Prisma client
- `npm run prisma:migrate` – Apply pending database migrations

## Environment

- `.env` – development database credentials (Neon dev branch) plus optional `SHADOW_DATABASE_URL` for migrations.
- `.env.production` – production database credentials (Neon production branch). This file is ignored by git; set the same value in Vercel project settings before deploying.

Production deployments should run `npx prisma migrate deploy` once after setting `DATABASE_URL` to ensure the schema is fully applied.

## Project Structure

```
app/                # App Router routes and layout
components/         # Reusable UI components
lib/                # Prisma client helper
prisma/             # Prisma schema and migrations
```