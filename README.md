# Mohamed Waheed — Personal Website

Personal site of Mohamed Waheed, a business systems builder: internal operating systems, lead-to-sale follow-up, BI dashboards and AI automation for agencies and sales teams in Egypt and the Gulf.

Live: [mohamedwaheed.com](https://mohamedwaheed.com)

## Start here

**Read [`CLAUDE.md`](./CLAUDE.md) first** (Arabic). It covers every page, the owner's decisions and rules (what must never be written on the site), the design system, the lead form, and open items. Any developer or AI agent working on this repo should read it before changing anything.

> This repository is public. Never commit private business information (client or employer names, income, internal pricing).

## Tech

React 18 · TypeScript · Vite 5 · Tailwind 3 · shadcn/ui · framer-motion · Vercel (auto-deploys every merge to `main`).

## Commands

```bash
npm ci
npm run dev
npx tsc -p tsconfig.app.json --noEmit
npx eslint src
npx vitest run
npm run build
```
