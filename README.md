# Mock Notion — Next.js Spatial Multi-Window Demo

This app demonstrates a Notion-like experience with a spatial, multi-window UI powered by the WebSpatial SDK, built with Next.js (App Router), React 19, TypeScript, and Tailwind CSS v4.

## Features
- Dashboard, Documents, AI Chat, TODOs, and Calendar pages.
- Multi-window launch via TabBar, using `initScene` and `window.open`.
- XR-friendly styling with background material variables and Tailwind utilities.

## Tech Stack
- Next.js (App Router), React 19, TypeScript.
- Tailwind CSS v4 via `@import "tailwindcss"` in global CSS.
- WebSpatial SDK (core + React).
- Zustand for local state.

## Project Structure
- App routes:
  - Home/Dashboard: [page.tsx](file:///Users/bytedance/WebstormProjects/mock-notion/src/app/page.tsx)
  - Documents: [doc/page.tsx](file:///Users/bytedance/WebstormProjects/mock-notion/src/app/doc/page.tsx)
  - AI Chat: [ai/page.tsx](file:///Users/bytedance/WebstormProjects/mock-notion/src/app/ai/page.tsx)
  - TODOs: [todo/page.tsx](file:///Users/bytedance/WebstormProjects/mock-notion/src/app/todo/page.tsx)
  - Calendar: [calendar/page.tsx](file:///Users/bytedance/WebstormProjects/mock-notion/src/app/calendar/page.tsx)
- Components: [TabBar.tsx](file:///Users/bytedance/WebstormProjects/mock-notion/src/components/TabBar.tsx)
- State: [dashboardStore.ts](file:///Users/bytedance/WebstormProjects/mock-notion/src/state/dashboardStore.ts)
- Styles: [globals.css](file:///Users/bytedance/WebstormProjects/mock-notion/src/app/globals.css)

## Getting Started
- Install dependencies: `npm install`
- Development: `npm run dev` then open http://localhost:3000
- Production build: `npm run build` and `npm start`

## Notes
- Images are imported from `src/assets` and bundled by Next.js.
- PWA-specific Vite plugins were removed; consider `next-pwa` if PWA is required.
- React Router was removed in favor of Next.js App Router.
