# Tivra — AI SaaS Generator

> Type a prompt. Get a deployed SaaS app in minutes.

Tivra is a multi-agent pipeline that converts a plain-English description into a fully-functional, live Next.js SaaS application — complete with a Postgres database, authentication, file storage, and a Vercel deployment — all without writing a single line of code.

---

## How It Works

```
User Prompt
    │
    ▼
[1] Spec Parser       — claude-sonnet-4-6 converts your prompt into a structured JSON spec
    │                   (entities, DB schema, features, template selection)
    ▼
[2] Backend Provisioner — Spins up real Postgres tables + storage buckets on InsForge
    │
    ▼
[3] Code Generator    — Multi-pass Claude generation:
    │                   • Pass 1: template scaffold + core auth + first ~3 entities
    │                   • Pass 2+: extend app with remaining entities (smart nav update)
    │                   • Merge: patches combined, tests generated, vitest passes
    │                   → Result: ~15–30 files per entity, full CRUD + Vitest coverage
    ▼
[4] Deployer          — @insforge/cli deploys the generated app to InsForge hosting
    │
    ▼
    Live URL
```

The demo UI streams every agent step in real-time via Server-Sent Events so you can watch the app being built live.

---

## Stack

| Layer | Technology |
|---|---|
| Demo UI | Next.js 14, Tailwind CSS, TypeScript |
| Orchestrator | Node.js / Express, TypeScript |
| Spec parsing | Anthropic `claude-sonnet-4-6` |
| Code generation | Qoder Quest API |
| Database & Storage | InsForge (Postgres + S3-compatible storage) |
| Deployment | InsForge hosting via `@insforge/cli` |
| Package manager | pnpm workspaces |

---

## Project Structure

```
hackathon-saas-agent/
├── apps/
│   ├── demo-ui/          # Next.js frontend — prompt input, live activity feed, deployment link
│   └── orchestrator/     # Express API — runs the 4-agent pipeline
│       └── src/
│           ├── agents/
│           │   ├── specParser.ts       # Prompt → SaaSSpec (Claude)
│           │   ├── backendProvisioner.ts # SaaSSpec → InsForge DB + storage
           │   ├── codeGenerator.ts    # Multi-pass Claude generation → Next.js app
           │   │                        # (batches entities ~3 per pass, merges patches)
│           │   └── deployer.ts         # Generated app → InsForge hosting
│           ├── clients/
│           │   ├── insforge.ts         # InsForge REST client
│           │   └── qoder.ts            # Qoder Quest client
│           ├── prompts/
│           │   └── specSystem.txt      # System prompt for spec parsing
│           └── types/
│               └── spec.ts             # Zod schemas + TypeScript types
├── templates/
│   ├── template-taskboard/             # Kanban-style starter
│   ├── template-crm/                   # CRM starter
│   └── template-saas-starter/          # Generic SaaS starter
├── generated/                          # Output dir — gitignored, one folder per build
└── docs/                               # Architecture notes + specs
```

---

## Prerequisites

- **Node.js** ≥ 20
- **pnpm** ≥ 8 (`npm i -g pnpm`)
- **Anthropic API key** — [console.anthropic.com](https://console.anthropic.com)
- **InsForge project** — [insforge.dev](https://insforge.dev)

---

## Setup

### 1. Clone & install

```bash
git clone <repo-url>
cd hackathon-saas-agent
pnpm install
```

### 2. Configure the orchestrator

Copy the example env file and fill in your keys:

```bash
cp apps/orchestrator/.env.example apps/orchestrator/.env
```

```env
# InsForge — from your project dashboard at insforge.dev
INSFORGE_ACCESS_TOKEN=your_insforge_access_token_here
INSFORGE_PROJECT_ID=your_insforge_project_id_here
INSFORGE_BASE_URL=https://your-project.region.insforge.app
INSFORGE_ANON_KEY=your_insforge_anon_key_here

# Anthropic — used for spec parsing (specParser)
ANTHROPIC_API_KEY=sk-ant-...

# Qoder — used for code generation
OPENAI_API_KEY=your_qoder_key_here

# Server
CORS_ORIGIN=http://localhost:3000
PORT=3001
```

### 3. Configure the demo UI (optional)

The UI talks to the orchestrator at `http://localhost:3001` by default. To change this, create `apps/demo-ui/.env.local`:

```env
NEXT_PUBLIC_ORCHESTRATOR_URL=http://localhost:3001
```

---

## Running Locally

Start both services in parallel:

```bash
pnpm dev
```

Or start them separately:

```bash
# Terminal 1 — orchestrator on :3001
pnpm orchestrator

# Terminal 2 — demo UI on :3000
pnpm demo-ui
```

Open [http://localhost:3000](http://localhost:3000), type a prompt, and click **Generate**.

---

## Example Prompts

| Label | Prompt |
|---|---|
| Task Board | Build a project management tool with teams, task boards, and file attachments |
| CRM | Create a CRM for a sales team with contacts, deal pipeline, and notes |
| SaaS Starter | Make a SaaS starter with user auth, team invites, and a usage dashboard |
| Invoice App | Build an invoicing app with clients, line items, PDF export, and payment status tracking |
| Hiring Tracker | Create a hiring pipeline tracker with job postings, candidates, interview stages, and offer management |
| Knowledge Base | Build an internal knowledge base with articles, categories, search, and team editing |
| Event Planner | Make an event planning tool with events, guests, and a schedule |
| Inventory | Create an inventory management system with products, stock levels, suppliers, and low-stock alerts |

---

## API Reference

The orchestrator exposes a minimal REST + SSE API.

### `POST /api/build`

Start a new build pipeline.

**Request body:**
```json
{ "prompt": "Build a CRM with contacts and deals" }
```

**Response:**
```json
{ "buildId": "uuid-v4" }
```

---

### `GET /api/build/:buildId/stream`

Server-Sent Events stream for real-time build progress. Each event is a JSON-encoded `AgentEvent`.

**Event shape:**
```typescript
interface AgentEvent {
  step: 'spec_parsed' | 'db_created' | 'code_generated' | 'app_deployed' | 'error';
  message: string;
  ts: number;        // Unix ms
  data?: unknown;    // step-specific payload
}
```

**Steps in order:**

| Step | Description |
|---|---|
| `spec_parsed` | Claude has parsed the prompt into a SaaS spec |
| `db_created` | InsForge tables and storage buckets are ready |
| `code_generated` | Per-file write events (one per generated file) |
| `app_deployed` | InsForge deployment complete — includes live URL |
| `error` | Pipeline failed — error message included |

---

### `GET /api/build/:buildId`

Fetch the current state of a build (useful for reconnecting after a page refresh).

---

## Generated App

Each build produces a complete Next.js 14 application under `generated/<app-name>/`:

```
generated/my-app/
├── src/
│   ├── app/
│   │   ├── (auth)/login, register, verify
│   │   ├── dashboard/
│   │   └── <entity>/        # One route per entity (CRUD pages)
│   ├── components/
│   │   ├── AppShell.tsx
│   │   ├── AuthProvider.tsx
│   │   └── ...
│   ├── hooks/
│   └── lib/
│       └── insforge.ts      # Pre-configured InsForge client
├── vitest.config.ts
└── package.json
```

Generated apps include:
- **Auth** — sign-up, log-in, email verification
- **CRUD pages** — list, create, edit, and delete views per entity
- **AppShell** — sidebar navigation, responsive layout
- **InsForge client** — pre-configured with your project URL and anon key
- **Vitest tests** — basic component and page tests

---

## Limits & Notes

- **No hard table limit** — Multi-pass generation handles specs with any number of entities. Each pass covers ~3 tables (`PASS_BATCH_SIZE = 3`). A 6-table spec runs 2 passes; 9 tables runs 3 passes, etc.
- **Generation time** — 1–2 tables ≈ 4–6 min; 3–6 tables ≈ 6–10 min; 7+ tables ≈ 10–15 min. Breakdown: spec parsing ~10s, provisioning ~30s, code gen ~2–4 min/pass, test loop ~1–2 min, deploy ~1 min.
- **`generated/` is gitignored** — built apps are not committed to the repo.

---

## Development

### Build

```bash
pnpm build           # builds both apps
```

### Type-check only

```bash
cd apps/orchestrator && pnpm tsc --noEmit
cd apps/demo-ui && pnpm tsc --noEmit
```

### Adding a new template

1. Create `templates/template-<name>/` with a standard Next.js 14 + Tailwind structure
2. Add the mapping in `apps/orchestrator/src/agents/codeGenerator.ts` (`templatePath` function)
3. Add `'<name>'` to the `template` enum in `apps/orchestrator/src/types/spec.ts`
4. Update the spec system prompt in `apps/orchestrator/src/prompts/specSystem.txt`

---

## Built With

- **[Qoder](https://qoder.dev)** — AI code generation via Quest
- **[InsForge](https://insforge.dev)** — Backend provisioning and hosting

---

## License

MIT
