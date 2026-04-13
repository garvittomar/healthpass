# HealthPass

A secure, portable digital health record system for migrant workers.

## Features

- AES-256 encrypted health records
- QR code-based instant sharing
- Offline emergency card access
- OTP-verified consent engine for hospital access

## Tech Stack

- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- React Router v6
- Framer Motion
- React Query

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run test` | Run tests |
| `npm run lint` | Lint code |

## Project Structure

```
src/
  pages/          # Route-level page components
  components/     # Reusable UI components
    ui/           # shadcn/ui base components
    worker/       # Worker-specific components
  lib/            # Auth context, utilities, mock data
  hooks/          # Custom React hooks
```
