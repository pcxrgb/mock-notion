# Mock Notion — Spatial Multi-Window Demo

This app demonstrates a Notion-like experience with a spatial, multi-window UI powered by WebSpatial SDK, built with React, Vite, Tailwind, and React Router.

## What It Is
- A demo workspace with multiple tools: Dashboard, Documents, AI Chat, TODOs, and Calendar.
- Each tool opens in its own spatial window with consistent styling and layout.
- Focuses on UI/UX, multi-window orchestration, and XR-friendly surfaces versus persistence or backend integrations.

## Key Use Cases
- Show how a familiar productivity suite can be rendered as separate windows.
- Demonstrate consistent layouts and responsive behaviors across pages.
- Provide a starting point for integrating real data sources and collaboration features.

## Technology Stack
- React 19, Vite, TypeScript, Tailwind CSS.
- WebSpatial SDK (core + React) for multi-window initialization and XR materials.
- React Router for routing between pages.
- Optional PWA assets via Vite plugins.

## Architecture Overview
- App shell: [App.tsx](file:///Users/bytedance/WebstormProjects/mock-notion/src/App.tsx)
  - Manages routes: `/`, `/doc`, `/ai`, `/todo`, `/calendar`.
  - Renders a floating TabBar on the home route for launching windows.
- Windows launcher: [TabBar.tsx](file:///Users/bytedance/WebstormProjects/mock-notion/src/components/TabBar.tsx)
  - Uses `initScene(name)` to configure each window (e.g., default size 900×700).
  - `window.open(url, name)` opens the route in the named scene.
- Styling and XR materials: [index.css](file:///Users/bytedance/WebstormProjects/mock-notion/src/index.css)
  - Utility classes control background material (`--xr-background-material`) and elevation.
  - Tailwind powers layout and spacing; no global component library is assumed.

## Pages
- Dashboard: [MockDashboard.tsx](file:///Users/bytedance/WebstormProjects/mock-notion/src/components/MockDashboard.tsx)
- Documents: [DocPage.tsx](file:///Users/bytedance/WebstormProjects/mock-notion/src/components/DocPage.tsx)
  - Two-column layout (left sidebar, right content) used as the design reference for Calendar.
- AI Chat: [AiPage.tsx](file:///Users/bytedance/WebstormProjects/mock-notion/src/components/AiPage.tsx)
- TODOs: [TodoPage.tsx](file:///Users/bytedance/WebstormProjects/mock-notion/src/components/TodoPage.tsx)
- Calendar: [CalendarPage.tsx](file:///Users/bytedance/WebstormProjects/mock-notion/src/components/CalendarPage.tsx)
  - Mirrors Document Viewer layout: left sidebar (month + filters), right weekly grid.
  - Responsivity: grid fills the window height via a `ResizeObserver`; events are positioned by time.

## How It Works (Flow)
1. User clicks an icon in the TabBar; `initScene` sets defaults for that window.
2. The app opens a new window pointed at the route for the chosen tool.
3. Each page applies XR background material variables and local Tailwind utilities for layout.
4. Calendar page computes week days and event positioning without external libraries; filters control visibility.

## Running Locally
- Install dependencies: `npm install`
- Start dev server: `npm run dev`
  - Alternative: `npm run dev:avp` sets `XR_ENV=avp` for spatial mode defaults.

- Open the Pico emulator.
- Open the Pico Browser and visit 10.0.2.2:5173.
- Click "Open as App", or "Install" when prompted.

## Build & Preview
- Build: `npm run build`
- Preview static build: `npm run preview`
- PWA asset generation (optional): `npm run generate-pwa-assets`

## Extending the App
- Add a page:
  - Create a React component under `src/components`.
  - Add a route in [App.tsx](file:///Users/bytedance/WebstormProjects/mock-notion/src/App.tsx).
  - Add an icon + handler in [TabBar.tsx](file:///Users/bytedance/WebstormProjects/mock-notion/src/components/TabBar.tsx) to launch a scene.
- Share layout patterns:
  - Mimic `DocPage`’s two-column pattern for consistent UI.
  - Reuse Tailwind utility classes for spacing, scroll management, and rounded surfaces.

## Data & Integrations
- The UI uses demo/static content; there’s no backend or persistence layer.
- Integration points:
  - Replace static lists (Docs/TODOs) with API-backed data.
  - Connect Calendar to a provider; map events to calendar IDs and hydrate filters.
  - Add authentication and user profiles for multi-user scenarios.

## Security & Privacy
- No secrets or keys checked into the repo.
- Avoid logging sensitive information when integrating real services.
- Add CSPs and HTTPS when deploying; integrate auth later as needed.

## Limitations
- No collaboration, permissions, or real-time updates.
- No server-side components or database.
- Calendar is a functional demo (filters, week view, dynamic sizing) but not a full calendar system.

## Roadmap Ideas
- Backend API for documents, tasks, calendar events.
- Auth, roles, and sharing.
- Real-time presence and comments.
- Theming and accessibility pass (contrast, keyboard nav).

## Directory Overview
- `src/App.tsx` — Routes and shell
- `src/components/*` — Page components and TabBar
- `src/index.css` — Tailwind + XR variables
- `package.json` — Scripts and dependencies

