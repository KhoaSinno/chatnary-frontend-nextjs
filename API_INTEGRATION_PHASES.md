# Chatnary FE–BE Integration Phases

**Status:** In progress
**Created:** 2026-09-04
**Frontend baseline:** `dev` at `d768bb8`
**Backend baseline:** `main` at `98801e2`

**Implementation guide:** Read [REAL_DATA_IMPLEMENTATION_RUNBOOK.md](REAL_DATA_IMPLEMENTATION_RUNBOOK.md) before beginning the remaining Documents or Chat work. It is the detailed, fresher-oriented checklist and definition of done for these phases.

## Goal

Replace the frontend's runtime mock paths with the live NestJS backend without
changing the visible UI contract accidentally. The end state has one
authenticated HTTP client, one response-envelope decoder, and no production
branch that reads `mockData.ts`.

This document is the execution log. Mark a phase **Done** only after its
verification commands and browser scenarios pass. Do not enable a later
domain globally before the preceding phase is done.

## Current evidence

### Runtime baseline

- Backend starts on `http://localhost:8080`, with the global `/api/v1` prefix.
  `GET /api/v1/docs` returned `200` on 2026-09-04.
- Backend connects to PostgreSQL, pgvector, and Redis. Redis currently warns
  that its `volatile-lru` eviction policy should be changed to `noeviction` for
  BullMQ reliability.
- `POST /api/v1/auth/login` with `{}` now returns `400`; unauthenticated
  `GET /api/v1/project` returns `401`. The global validation pipe is active.
- Frontend authentication no longer starts with a fake user or token. Its
  auth pages use the real login/register/refresh/logout endpoints.
- Project list/create/update/delete calls are live. Document and chat domains
  are deliberately still mock-backed until their separate contracts are fixed.

### Mock inventory (remove in this order)

| Area | Current frontend files | Migration phase |
| --- | --- | --- |
| Authentication and fake identity | `src/lib/auth.ts`, `src/lib/api.ts`, `src/contexts/AuthContext.tsx` | 2 |
| Project detail/list | `src/hooks/useProject.ts`, `src/app/dashboard/page.tsx`, `src/app/notebook/page.tsx`, `src/lib/api.ts` | 3 |
| Documents and upload simulation | `src/hooks/useDocuments.ts`, `src/lib/api.ts` | 4 |
| Chat/session/message simulation | `src/hooks/useChat.ts`, `src/lib/api.ts` | 5 |
| Fixtures | `src/lib/mockData.ts` | 6 |

## Contract gaps to resolve deliberately

The backend response interceptor wraps successful bodies as:

```ts
{ statusCode: number; success: true; data: T }
```

The current `ApiClient.request()` wraps that envelope a second time rather than
decoding it. Consequently, login looks for `accessToken` at the wrong level.

| Capability | Frontend expectation today | Backend behavior today | Required decision |
| --- | --- | --- | --- |
| Auth | Two competing clients; cookie/fake token in `api.ts`, localStorage refresh token in `auth.ts` | Login returns `accessToken`, `refreshToken`, and user inside the response envelope | Keep one auth implementation and one token policy. |
| Project | UI type needs `icon`, `documentsCount`, `chatsCount` | Project list returns Prisma fields, project members, and `_count.projectResources` | Map wire data to a UI projection in one adapter; do not spread mapping across pages. |
| Document upload | sends multipart `file` and top-level `projectId`; expects one UI document | Backend expects multipart `files` plus JSON string `data`; service creates many documents but controller returns upload URLs | Define a stable upload response. Recommended: backend returns its created document records plus job IDs; frontend maps them to its UI projection. |
| Document status | UI uses demo-oriented values such as `processing`/`processed` | Backend uses `PENDING`, `PROCESSING`, `DONE`, `ERROR` | Normalize in the adapter or deliberately update UI types. |
| Chat fetch | `GET /chat/:id`; messages at `/project/:projectId/chats/:chatId/messages` | `GET /chat/:chatId/messages` is the route present; project message route is not mapped | Change the frontend client to the live route or add a deliberate backend endpoint—never leave a guessed URL. |
| Chat creation/send | UI has a separate draft creation shape `{ project_id, title }` | Backend creates a chat on first `POST /chat` message `{ message, projectId, chatId? }` | Use a local draft until the first message, or add a dedicated backend create-chat resource. This plan defaults to the existing backend behavior. |

## Target seam

Create one deep **module** at `src/lib/chatnary-client/`. Its **interface** is
the only place pages, hooks, and contexts call for authentication, projects,
documents, and chats. Its **implementation** owns URLs, headers, response
envelopes, transport/wire types, error normalization, and mappings to UI
types.

The module has two short-lived **adapters** during migration:

- `LiveChatnaryAdapter` calls NestJS and decodes the backend contract.
- `MockChatnaryAdapter` reuses fixtures only for a domain that has not migrated
  yet.

The caller-facing interface must remain stable while adapters change. This
gives one **seam** for tests and prevents the current mock/live branches from
leaking into pages and hooks. Delete the mock adapter after Phase 6.

## Phase 0 — Freeze the contract and harden backend entry points

**Status:** Partially complete

### Work

1. Capture the live Swagger JSON and write request/response fixtures for auth,
   project list/create/update/delete, document list/upload/delete, chat list,
   chat messages, send message, rename, and delete.
2. In backend `src/main.ts`, install a global `ValidationPipe` with `whitelist`,
   `forbidNonWhitelisted`, and `transform` enabled.
3. Replace raw `Error` throws in auth with Nest HTTP exceptions. Ensure the
   exception filter returns safe client messages and never exposes Prisma call
   details.
4. Make the response interceptor's envelope type explicit and use a safe
   property test instead of calling `data.hasOwnProperty` on `any`.
5. Set Redis to `noeviction` before document-ingest acceptance testing.

### Acceptance

- Invalid login/register payloads return `400` with a stable error body.
- Invalid credentials return `401` or `403`, never `500`.
- Every selected happy-path response matches its fixture/envelope.
- `pnpm test` contains an e2e or integration test for the above cases.

### Rollback

No frontend behavior changes in this phase. Revert only the backend hardening
commit if it breaks an existing documented consumer.

## Phase 1 — Build the live client module and contract tests

**Status:** Partially complete

### Work

1. Add transport types for the backend envelope and endpoint-specific wire
   data. Do not reuse UI types as wire types.
2. Add a single fetch primitive that:
   - reads `NEXT_PUBLIC_API_URL` (including `/api/v1`),
   - attaches a real bearer access token when present,
   - decodes `{ statusCode, success, data }` exactly once,
   - converts non-2xx/envelope failures into one typed client error, and
   - does not log credentials or tokens.
3. Implement pure mapper functions: `toProject`, `toDocument`, `toChat`, and
   `toMessage`. Put all naming/status/count differences there.
4. Add adapter contract tests with recorded, redacted response fixtures.

### Acceptance

- A unit test proves login data is unwrapped before accessing `accessToken`.
- A unit test covers each mapper's missing/optional fields.
- No page or hook needs to know the response envelope or construct a URL.

### Rollback

The module is unused until Phase 2, so it can be removed as a standalone
commit.

## Phase 2 — Replace authentication and identity mocks

**Status:** In progress

### Work

1. Select one implementation: migrate `AuthContext` to the new client module
   and remove the duplicate public auth path in `src/lib/api.ts` / `src/lib/auth.ts`.
2. Remove the initial fake user, `fake-token-for-testing`, and unconditional
   authenticated result.
3. Store access token in memory; retain refresh token only according to the
   chosen policy. The current backend returns refresh token in JSON, so use a
   documented temporary localStorage policy or first change the backend to an
   HttpOnly refresh cookie. Do not silently mix both.
4. Implement login, register, refresh, logout, initial session restore, and
   protected-route redirect against real endpoints.

### Acceptance

- Fresh browser session redirects protected pages to login.
- Valid login unlocks a protected page and sends a bearer token.
- Refresh restores an expired access token; logout clears all token/user state.
- Invalid login and empty form show safe errors, not a Prisma stack or fake
  success.

### Rollback

Feature-gate only the auth adapter while retaining the stable `useAuth()`
interface. Do not restore fake identity in production.

## Phase 3 — Migrate projects

**Status:** In progress

### Work

1. Route project list/create/update/delete through `LiveChatnaryAdapter`.
2. Map backend `_count.projectResources` and optional fields to the UI project
   projection. Establish whether chat count is supplied, derived, or omitted;
   do not invent a value in the page.
3. Replace mock branches in `useProject`, dashboard, and notebook one caller at
   a time. Keep fixture data only in adapter tests.
4. Add ownership/permission error handling for `401`, `403`, and `404`.

### Acceptance

- A real user can create, edit, archive/delete, and reload projects.
- Page reload shows database-backed data, not fixture IDs.
- No project page imports `mockData.ts`.

### Rollback

Re-enable only `MockChatnaryAdapter.projects` in development while preserving
the shared client interface; do not restore page-level `if (USE_MOCK_DATA)`.

## Phase 4 — Migrate documents and asynchronous ingest

**Status:** Planned

### Work

1. Align multipart shape exactly: send `files` and JSON-stringify the `data`
   metadata containing `projectId` and optional metadata.
2. Finalize the upload response contract in Phase 0 and map returned records to
   UI documents. Do not treat an upload URL as a document resource.
3. Normalize backend status transitions and poll/refetch after queue processing
   until a dedicated status event is available.
4. Replace document hooks and document pages; remove simulated upload delays
   and completion timers.

### Acceptance

- Uploading one permitted file creates a real pending document and queue job.
- Reload shows its actual backend status; failed jobs surface a safe error.
- Delete removes the document and its vectors through the real endpoint.
- Invalid extension/oversize/unauthorized upload produces a useful UI error.

### Rollback

Keep upload behind a document-adapter feature gate only until all acceptance
tests pass. Never send a real file to the mock path.

## Phase 5 — Migrate chat and messages

**Status:** Planned

### Work

1. Implement the backend's existing conversation lifecycle: a UI draft has no
   server ID; first send calls `POST /chat` with `message`, `projectId`, and no
   `chatId`; subsequent sends include `chatId`.
2. Use `GET /project/:projectId/chats` for the sidebar/list, `GET
   /chat/:chatId/messages` for history, and `/chat/user/:id` for rename/delete.
3. Map `{ answer, citations, chatId }` into UI message state. Begin with the
   non-streaming path; add the `/chat/stream` SSE adapter only after it passes
   the same scenario.
4. Replace `useChat`, chat sidebar, and chat pages; remove hard-coded mock
   answers and timers.

### Acceptance

- First message creates a persisted chat and renders answer/citations.
- Refreshing a chat reloads real history.
- Rename/delete update the backend and the sidebar.
- A project with no indexed documents shows the backend's no-context result
  safely rather than pretending an assistant answer exists.

### Rollback

Retain a single chat-adapter flag until non-streaming history passes. Streaming
is an additive follow-up and must not block the non-streaming migration.

## Phase 6 — Delete runtime mocks and close the migration

**Status:** Planned

### Work

1. Delete all production imports of `src/lib/mockData.ts`, the global
   `USE_MOCK_DATA` switch, fake token code, fake AuthProvider user, and mock
   timers.
2. Move useful fixtures into test-only files.
3. Replace the obsolete `next lint` script with ESLint 9-compatible execution
   and repair the current flat-config failure.
4. Add CI checks: frontend typecheck/build/lint/tests; backend lint/tests/e2e
   contract tests.
5. Update README environment examples and this document's phase status/results.

### Acceptance

- `rg mockData src` finds no production import.
- Production build succeeds with `NEXT_PUBLIC_BYPASS_AUTH=0`.
- End-to-end smoke flow passes: register/login → project → upload → ingest
  status → first chat → reload history → logout.

### Rollback

Rollback by release/commit, not by restoring demo code. Keep fixtures only in
tests so a regression is reproducible without a second production path.

## Change log

| Date | Phase | Result | Evidence |
| --- | --- | --- | --- |
| 2026-09-04 | Baseline | Plan created; no application behavior changed | CodeGraph index + runtime checks |
| 2026-09-04 | 0 | Added strict Nest validation, safe error handling, and optional project DTO fields | `nest build`; Jest: 2 suites / 3 tests pass; live invalid login is `400` |
| 2026-09-04 | 1–2 | API client decodes the Nest response envelope; fake identity and route bypasses removed | `next build` passes |
| 2026-09-04 | 3 | Dashboard, notebook, and `useProject` now read/write the live project API; wire-to-UI project mapper added | `next build` passes; unauthenticated project endpoint is `401` |
| 2026-09-04 | 3 | Fixed project creation contract: `userId` is now injected from the JWT after validation, never accepted from the browser. Chat/Documents no longer redirect to landing page when the account has no project. | BE DTO regression test passes; `nest build`; `next build` |
| 2026-09-04 | 4 | Upload now uses multipart `files` plus JSON `data`; BE returns created documents and ingest job IDs; document hook reads live API data and maps ingest statuses. | BE upload controller regression test; `nest build`; `next build` |
