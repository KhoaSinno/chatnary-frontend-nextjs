# Chatnary — Real Data Implementation Runbook

**Audience:** fresher developers maintaining both repositories.
**Companion:** API_INTEGRATION_PHASES.md is the phase log. This file is the step-by-step execution guide.

## Current truth

| Area | Verified now | Still required |
| --- | --- | --- |
| Auth and projects | Live Nest API, bearer access token, refresh flow, project CRUD | Browser automation and complete permission coverage |
| Documents | Live upload, BullMQ, parser, PGVector, status polling; tested PDF completed with 38 chunks | Upload authorization, member visibility, true page count, secure preview/download, better error UI |
| Preview/download | Disabled so FE does not call a non-existent endpoint | Secure binary file route and object-URL viewer |
| Chat | Runtime mock-backed | Stable BE history contract, access checks, live list/history/send/rename/delete |
| Redis | Works for development | Persistent noeviction configuration |

## Order of work

1. Commit the already verified Documents baseline. Do not stage .codegraph or unrelated changes.
2. Finish Documents D1 through D4.
3. Freeze and repair the Chat contract C1.
4. Move Chat to live non-streaming requests C2 through C4.
5. Add streaming only after non-streaming passes.
6. Delete production mocks and add CI gates.

Do not start SSE, search, or new UI work before D1 through D4 and non-streaming chat are complete.

## Engineering rules

1. **One behavior per commit.** Example: fix(documents): authorize project upload. Roll back by git revert, never by restoring production mocks.
2. **Red test before code.** Run the failing test first. A green build does not prove a transport contract.
3. **Thin controller.** Controller reads DTO/params/auth user then calls one module. Prisma queries, file-system work, authorization and UI mapping do not belong there.
4. **Browser never supplies userId.** Derive identity only from req.user.userId.
5. **Do not reuse types across layers.** Backend DTOs describe input; BE projections describe output; FE wire types decode HTTP; FE UI types render.
6. **Do not leak secrets.** Never return refresh tokens, physical paths, Prisma internals, or stacks.
7. **Every async UI has four states:** loading, empty, error with retry, success.
8. **No guessed routes.** Inspect controller or add a contract test before FE calls a route.

## Required commands

Before a backend commit:

~~~powershell
# W:\WorkSpace_IT\nestjs\backend-chatnary-nestjs
pnpm exec jest --runInBand
pnpm exec nest build
~~~

Before a frontend commit:

~~~powershell
# W:\WorkSpace_IT\nextjs\chatnary-frontend-nextjs
pnpm exec tsc --noEmit
pnpm build
~~~

Backend pnpm dev runs nest start, not watch mode; restart it after BE source changes. Restart FE when testing auth initialization or environment changes.

# Documents

## D1. Explicit project and document authorization

**Current gaps**

- DocumentService.uploadFiles can link a browser-supplied projectId without first proving the user is allowed to edit that project.
- Project document listing filters by original uploader, preventing valid project members from seeing linked documents.
- PATCH document requires the same access discipline.

**Design**

Create a focused DocumentAccessService backed by PrismaService. Keep this deep interface small:

~~~ts
assertCanReadProject(userId: string, projectId: string): Promise<void>
assertCanEditProject(userId: string, projectId: string): Promise<void>
assertCanReadDocument(userId: string, documentId: string): Promise<Document>
assertCanManageDocument(userId: string, documentId: string): Promise<Document>
~~~

Callers learn four intent-level operations. Owner/member/role predicates remain inside this module. Do not inject ProjectService into DocumentService: ProjectService already depends on DocumentService and that creates a circular dependency.

| Operation | Minimum permission |
| --- | --- |
| Upload into project | Owner or editor |
| List project-linked document | Owner, editor, viewer |
| Read/download linked document | Owner, editor, viewer |
| Rename/delete/unlink | Document owner; editor only if product explicitly permits it |

**Steps**

1. Write BE tests for owner, editor, viewer, outsider, missing project, and missing document. Outsider must deterministically receive chosen 403 or 404, never 500.
2. Make UploadMetadataDto.projectId required for this project-scoped page. Invalid/missing JSON metadata returns 400 before a document row is created.
3. In DocumentController.uploadFiles, call assertCanEditProject before upload service. User ID remains server-derived.
4. Keep viewer authorization in ProjectController.getDocumentsProject. Query project links after authorization; do not filter document.userId to current user.
5. Pass authenticated user to PATCH and enforce document-management access.
6. Manual test with two accounts: owner shares with viewer; viewer lists/reads but cannot upload/delete.

**Done:** outsider creates neither document record nor queue job; viewer sees linked metadata.

## D2. One secure binary-file interface

**Goal:** preview/download with bearer auth; upload folder remains private.

Implement one route, rather than separate preview/download implementations:

~~~text
GET /api/v1/document/:id/file?disposition=inline|attachment
Authorization: Bearer <access token>
~~~

| Case | Expected |
| --- | --- |
| Authorized PDF + inline | 200, PDF bytes, Content-Disposition inline |
| Authorized file + attachment | 200, bytes and safe file name |
| Missing document | 404 |
| Unauthorized | consistently chosen 403 or resource-hiding 404 |
| Missing physical file | safe 404; server log contains document ID only |

**BE steps**

1. Add getDocumentFile(userId, documentId) in document module and first call assertCanReadDocument.
2. Resolve DB path under configured upload root and reject a resolved path outside it.
3. Return StreamableFile with database MIME type, safe encoded filename, nosniff header and requested disposition.
4. Do not pass binary response through JSON response-envelope interceptor.
5. Add controller tests for inline, attachment, unauthorized, missing file.

**FE steps**

1. Add getDocumentBlob(documentId, disposition) to API module. It attaches bearer auth but bypasses JSON-envelope decoding.
2. Fetch only after selection and status processed.
3. Create object URL from blob; revoke on effect cleanup and selection change.
4. PDF: object URL iframe. Other supported file: fetch attachment then browser download.
5. Render error/retry state. Never put bearer token in query string or iframe URL.

**Done:** DevTools shows one authorized /file request and no request to obsolete /preview or /download.

## D3. Truthful queue status and page count

Parser max_pages=0 and zero-chunk false success are fixed. Remaining semantic bug: pageCount currently equals chunk count.

1. Replace bare ChunkResult array from ingest with named result:

~~~ts
{ chunks: ChunkResult[]; pageCount: number }
~~~

2. Count non-empty parser pages before splitting. Save page count; log chunk count separately.
3. Empty parse, parser rejection, or vector persistence failure must persist ERROR plus safe truncated error text.
4. Add regression tests:
   - 2 source pages and 5 chunks produces DONE with pageCount 2;
   - zero chunks produces ERROR;
   - parser error produces ERROR;
   - vector error never produces DONE.
5. Map BE errorMessage to FE processingError and render only in error state.

Manual smoke: login → project → readable PDF upload → PENDING/PROCESSING → DONE with true page count → refresh stays DONE.

## D4. Operational readiness

1. Configure Redis maxmemory-policy noeviction persistently. Verify:

~~~powershell
redis-cli CONFIG GET maxmemory-policy
~~~

2. Add FE file-size guidance; BE remains authority.
3. Keep queue retries/backoff in server logs only.
4. Record D1 through D3 smoke evidence in API_INTEGRATION_PHASES.md.

# Chat

## C1. Freeze the non-streaming backend contract

**Blocking discovery:** GET /chat/:chatId/messages currently returns a Chat record because it delegates to getChatById. It must return ChatMessage history before FE migration.

Use explicit projections, never raw Prisma records:

~~~ts
type ChatSummary = {
  id: string; title: string; projectId: string;
  createdAt: string; updatedAt: string;
}

type ChatMessageView = {
  id: string; chatId: string; role: 'user' | 'assistant';
  content: string; citations: CitationView[]; createdAt: string;
}

type SendChatResponse = {
  chatId: string;
  userMessage: ChatMessageView;
  assistantMessage: ChatMessageView;
}
~~~

Adopt these routes:

| Purpose | Route | Payload/result |
| --- | --- | --- |
| Project chat list | GET /project/:projectId/chats | ChatSummary[] |
| History | GET /chat/:chatId/messages | ChatMessageView[] ascending |
| First/subsequent message | POST /chat | { message, projectId, chatId? } → SendChatResponse |
| Rename | PATCH /chat/user/:chatId | { title } → ChatSummary |
| Delete | DELETE /chat/user/:chatId | 204 |

**Steps**

1. Validate message: trimmed, non-empty, bounded; validate IDs/title; forbid input userId.
2. Add getChatMessages(userId, chatId): authorize then return ordered ChatMessage rows and map citations intentionally.
3. Before ensureChatExists uses supplied chatId, prove it belongs to the same user and project. Never append to another user chat.
4. Read requires project viewer access; write requires editor/owner, subject to final product policy.
5. Define no-context result. Recommended: persist user message plus safe assistant no-context response so history remains coherent.
6. Add tests: first message, subsequent message, ordered history, citations, cross-user denial, no-context, rename, delete.

**Done:** one integration test creates a chat, gets exactly two ordered messages, and proves another account cannot read it.

## C2. Frontend mapping seam

Keep endpoint/envelope details out of pages. Keep methods in src/lib/api.ts initially; extract a chat adapter only when it removes duplication.

Write fixture tests for:

~~~ts
toChatSummary(wire: BackendChat): ChatSession
toChatMessage(wire: BackendChatMessage): Message
toSendResult(wire: BackendSendChat): { chatId: string; messages: Message[] }
~~~

Rules:

- Map citations deliberately; absent citation is undefined, never fixture data.
- New UI chat is local draft until first send returns chatId.
- Replace optimistic temporary IDs with server IDs.
- Failed send becomes visible retry state; never fabricate assistant answer.

## C3. Migrate useChat in order

1. Sidebar/list: live project chat list, loading/empty/403 states.
2. History: live message list and ignore/cancel stale selected-chat response.
3. Send: non-streaming POST, prevent duplicate send, append server-returned messages only.
4. Rename/delete: live API, reset selected chat after deletion.
5. Remove matching mock imports from useChat only after that behavior passes, then remove matching api.ts mock branches.

## C4. Browser acceptance

With one completed indexed document:

~~~text
open project → draft → send question → pending UI
→ persisted answer/citations → reload history
→ rename/reload → delete → sidebar and selection coherent
~~~

Repeat with empty project: clear no-context state and no fake answer. Repeat as second account to verify denial.

## C5. Streaming is a later additive slice

Browser EventSource cannot attach Authorization. Do not use it with current bearer auth.

1. Make C1 through C4 green first.
2. Choose and document either HttpOnly-cookie SSE or fetch-based streaming with bearer header.
3. Feed stream events to one reducer: pending → token → citations → complete or error.
4. Use AbortController and discard old-chat events.
5. Keep non-streaming fallback only behind the adapter seam until streaming passes C4.

# Mocks and CI

## M1. Delete mocks safely

~~~powershell
rg -n "mockData|USE_MOCK_DATA|simulateDelay|fake-token" src
~~~

Remove production imports by domain: Documents first, then Chat. Move useful objects to test fixtures. Delete USE_MOCK_DATA; do not leave a secret production flag. Update API_INTEGRATION_PHASES.md after each removal.

## M2. CI

Run backend Jest plus Nest build; run frontend tsc, Next build, ESLint and mapper tests. The current FE lint script uses deprecated next lint for Next 16. Repair it using ESLint 9 flat config in its own maintenance commit; never add an empty passing lint script.

## Final definition of done

Real-data flow passes after browser refresh:

~~~text
register/login → create project → upload → ingest completes
→ preview/download → first chat message → reload history → logout
~~~

Release only when Redis reports noeviction, no protected UI mounts before auth restore, no unimplemented endpoint is called, production code has no mock/fake-token import, both builds and all regressions pass, and the phase log contains test evidence and deferred work.

