# Class 10 Hub

A modern, full-stack CBSE Class 10 educational platform built by Priyanshu Taraori (priyanshutaraori).

## Architecture

- **Monorepo** managed by pnpm workspaces
- **Frontend**: React + Vite (`artifacts/class10-hub/`)
- **Backend**: Express API server (`artifacts/api-server/`)
- **Database**: PostgreSQL via Drizzle ORM (`lib/db/`)
- **AI**: Replit AI Integration (OpenAI-compatible, no user API key needed)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with hero, subject cards, stats |
| `/notes` | Subject-wise notes index |
| `/notes/:subject` | Chapter list for a subject |
| `/notes/:subject/:chapter` | Full notes for a chapter |
| `/questions` | Important questions with localStorage progress tracking |
| `/books` | NCERT Books page linking to ncert.nic.in |
| `/pdfs` | CBSE question papers 2022–2025 (from cbse.gov.in) |
| `/tips` | Board exam study tips |
| `/search` | Search across all content |
| `/ai-tutor` | AI chat tutor powered by OpenAI via Replit integration |

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/healthz` | Health check |
| GET | `/api/openai/conversations` | List all conversations |
| POST | `/api/openai/conversations` | Create new conversation |
| GET | `/api/openai/conversations/:id` | Get conversation + messages |
| DELETE | `/api/openai/conversations/:id` | Delete conversation |
| GET | `/api/openai/conversations/:id/messages` | List messages |
| POST | `/api/openai/conversations/:id/messages` | Send message (SSE stream) |

## Key Features

- **AI Tutor**: Streaming chat powered by Replit OpenAI integration (gpt-5.2). Uses SSE for real-time streaming. Conversation history saved in PostgreSQL.
- **Notes**: Subject-wise CBSE notes for Maths, Science, English, SST, Hindi
- **Questions**: Important questions with mark-as-done progress in localStorage
- **NCERT Books**: All 10 CBSE Class 10 textbooks linking to official ncert.nic.in
- **PDFs**: 15 official CBSE question papers 2022–2025 from cbse.gov.in
- **Study Tips**: Board exam preparation advice
- **Dark/Light mode** via next-themes
- **Search** across all content
- **SEO**: Optimised for "priyanshu", "priyanshutaraori", "taraori", CBSE Class 10 keywords with JSON-LD structured data

## Database Tables

- `conversations` — AI chat sessions (id, title, created_at)
- `messages` — Individual messages per conversation (id, conversation_id, role, content, created_at)

## Environment Variables

- `DATABASE_URL` — PostgreSQL connection string (auto-set by Replit)
- `AI_INTEGRATIONS_OPENAI_BASE_URL` — OpenAI-compatible base URL (auto-set by Replit)
- `AI_INTEGRATIONS_OPENAI_API_KEY` — API key (auto-set by Replit)

## Design

- Colors: Blue-to-purple gradient (#4F46E5 → #7C3AED)
- Fonts: Poppins (headings), Inter (body)
- Rounded cards (12–24px border-radius)
- Framer Motion animations throughout

## Content

All static content (notes, questions, tips) is in `artifacts/class10-hub/src/lib/mock-data.ts`.
