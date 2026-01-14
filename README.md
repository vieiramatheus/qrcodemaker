# QR Information Maker

A Next.js application that lets you store text-based information, persist it with SQLite via Prisma, and instantly generate QR codes that point to hosted detail pages for each entry.

## Features

- Save any snippet of text with an optional title
- Persist entries with Prisma on a local SQLite database
- Auto-generate QR codes that resolve to shareable `/info/{id}` pages
- Browse saved entries with inline QR previews and download links
- Responsive Tailwind CSS interface optimized for desktop and mobile

## Tech Stack

- [Next.js 14](https://nextjs.org/) with the App Router
- [React 18](https://react.dev/)
- [Prisma](https://www.prisma.io/) + SQLite
- [Tailwind CSS 3](https://tailwindcss.com/)
- [qrcode](https://github.com/soldair/node-qrcode) for QR image generation

## Prerequisites

- Node.js 18.18+ or 20+
- npm 9+

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Generate the SQLite schema and client:
   ```bash
   npx prisma migrate dev --name init
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Visit http://localhost:3000 to use the app.

## Available Scripts

- `npm run dev` – Start the Next.js development server
- `npm run lint` – Lint the codebase with ESLint
- `npm run build` – Create a production build
- `npm run start` – Run the production server after building
- `npm run prisma:generate` – Regenerate the Prisma client
- `npm run prisma:migrate` – Apply pending database migrations

## Environment

The app uses a local SQLite database by default, configured via the `.env` file:

```
DATABASE_URL="file:./prisma/dev.db"
```

Update this variable if you plan to use a different database provider.

## Project Structure

```
app/                # App Router routes and layout
components/         # Reusable UI components
lib/                # Prisma client helper
prisma/             # Prisma schema and migrations
```