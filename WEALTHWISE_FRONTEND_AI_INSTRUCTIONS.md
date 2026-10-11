# WealthWise Frontend — AI Engineering Instructions

## 1. Purpose

This document is the persistent engineering context for the **WealthWise Frontend** project.

The goal is to build a maintainable, production-oriented frontend for WealthWise, a personal finance management application. This is a long-term engineering project, not a tutorial-only application.

When an AI assistant receives this document, it must use it as the primary project context and continue development consistently with the existing source code, architecture, coding conventions, product scope, testing strategy, and current milestone.

### Mandatory continuation rules

1. **The current source tree and source code are the source of truth.** If this document conflicts with the repository, inspect the repository and follow the implementation unless the user explicitly approves a change.
2. Do not assume code was applied, committed, or tested merely because an assistant suggested it.
3. Do not redesign, rename, move, or replace existing files without a clear engineering reason.
4. Do not add dependencies, architecture layers, routes, screens, or features unless required by the current milestone.
5. Follow the established roadmap and continue from the actual current milestone.
6. Provide exact file paths, complete corrected code when requested, commands to run, and clear acceptance criteria.
7. Explain significant engineering decisions: what the change does, why it exists, where it belongs, alternatives when relevant, and how it will be verified.
8. Never claim tests, lint, build, browser behavior, or commits are successful without user-provided output or verified tool results.
9. When the user says “continue,” continue from the current milestone and next planned task.
10. If the user opens a new ChatGPT conversation and pastes this document, use it as the starting context. Ask for targeted files or command output only when necessary.
11. Do not ask the user to repeat information already available in this document or the current conversation.
12. Do not start the Accounts feature before the current work has been committed and the actual backend API contract has been reviewed.

---

## 2. Product scope

WealthWise is a personal finance management application.

The backend is developed separately and is the source of truth for API contracts and business rules.

The long-term product scope includes:

- Authentication and authorization
- Dashboard and account overview
- Accounts and account balances
- Income and expenses
- Transactions and transaction history
- Monthly budgets
- Savings and financial goals
- Fixed deposits and recurring deposits
- Mutual funds, stocks, bonds, and other investments

Implement only the frontend work planned for the current milestone. Do not fabricate backend responses, financial functionality, or API behavior.

The goal is a frontend that can grow alongside the backend without premature complexity.

---

## 3. Technology stack

The established stack is:

- React 19
- TypeScript
- Vite 8
- Tailwind CSS 4
- React Router DOM 7
- TanStack Query v5
- Axios
- React Hook Form
- Zod v4
- Vitest
- React Testing Library
- `@testing-library/jest-dom`
- Playwright
- ESLint 10

These versions and scripts are based on previously supplied project information. Verify the actual `package.json` before changing dependencies or configuration.

### Quality-check commands

The known commands are:

```bash
npm test
npm run lint
npm run build
npm run test:e2e
```

Check `package.json` if a script differs. Do not invent a replacement for an existing script.

Vitest should collect only the configured unit/component test patterns, currently expected to resemble:

```ts
include: ["src/**/*.{test,spec}.{ts,tsx}"];
```

Playwright E2E tests must not accidentally be collected by Vitest.

---

## 4. Engineering principles

### 4.1 TypeScript and React

- Use strict TypeScript and explicit types for public component contracts.
- Avoid `any`; use `unknown` and narrow types when appropriate.
- Prefer small, focused components and hooks.
- Use React state for client interaction and TanStack Query for server state.
- Do not duplicate server state in unrelated local state.
- Keep callbacks and effects correct, and clean up event listeners and subscriptions.
- Follow the repository's React and ESLint rules rather than disabling rules to silence warnings.
- Avoid unnecessary effects for state that can be derived from existing state, props, or router location.
- Use semantic HTML and accessible names for interactive elements.

### 4.2 Architecture

Preserve the architecture already present in the repository.

- **Application/bootstrap:** providers and app-level setup.
- **Routes:** route configuration and route-level page composition.
- **Layouts:** shared structural shells such as public and authenticated layouts.
- **Components:** reusable UI primitives and layout components.
- **Features:** feature-specific UI and behavior.
- **API/infrastructure:** HTTP client and backend communication.
- **Tests:** close to the relevant source where the existing convention places them.

Do not introduce extra layers solely for theoretical purity.

### 4.3 Styling

- Continue using Tailwind CSS 4 and existing design tokens.
- Preserve token names such as `bg-background`, `bg-surface`, `text-foreground`, `text-primary`, and `border-border`.
- Reuse shared UI components.
- Keep responsive behavior explicit and testable.
- Do not introduce another styling framework or separate design system without approval.
- Avoid hard-coded colors when an existing token is suitable.

### 4.4 Security and financial data

- Never log passwords, tokens, secrets, or sensitive financial information.
- Do not invent authorization rules or API contracts.
- Verify the backend authentication contract before deciding on token storage, refresh behavior, or session lifetime.
- Treat API values as untrusted input.
- Handle loading, error, and empty states deliberately.
- Preserve monetary precision. Do not use floating-point arithmetic for financial calculations involving backend monetary values.
- Never put private secrets in frontend environment variables or source control. Values shipped to a browser are public.
- Frontend route protection is not a replacement for backend authorization.

---

## 5. Project setup and Git status

The last known frontend project directory is:

```text
~/NARAYAN/PROJECTS/1 - WealthWise/frontend
```

The branch previously shown was `main`. Confirm the actual working directory, branch, and worktree status before committing.

Start with:

```bash
cd "$HOME/NARAYAN/PROJECTS/1 - WealthWise/frontend"
git status
git branch --show-current
git log -5 --oneline
```

### Commit status — needs confirmation

The user explicitly requested committing the current changes before beginning the Accounts feature.

A commit message was proposed:

```text
feat(auth): implement login flow and route guard
```

**This commit has not been confirmed.** The user has not yet shared the resulting Git status or commit output.

Do not assume it exists. First inspect the repository, review the staged and unstaged changes, and ensure unrelated work or secrets are not included.

---

## 6. Known project structure

The following paths have been used in the project. Verify the actual source tree before modifying files.

```text
src/
├── app/
│   ├── app-provider.tsx
│   └── query-client.ts
├── components/
│   └── ui/
│       ├── alert/
│       ├── badge/
│       ├── button/
│       ├── card/
│       ├── empty-state/
│       ├── error-state/
│       ├── field-description/
│       ├── field-error/
│       ├── field-label/
│       ├── input/
│       ├── loading/
│       ├── menu-icon/
│       └── select/
├── config/
│   └── env.ts
├── features/
│   └── auth/
│       ├── api/
│       │   └── auth-api.ts
│       ├── components/
│       │   ├── login-form.tsx
│       │   └── login-form.test.tsx
│       ├── context/
│       │   ├── auth-context.ts
│       │   ├── auth-provider.tsx
│       │   └── auth-provider.test.tsx
│       ├── guards/
│       │   ├── require-auth.tsx
│       │   └── require-auth.test.tsx
│       ├── pages/
│       │   ├── login-page.tsx
│       │   └── login-page.test.tsx
│       ├── schemas/
│       │   └── login-schema.ts
│       ├── types/
│       │   └── auth.types.ts
│       └── auth-token.ts
├── layouts/
│   ├── app-header/
│   ├── app-layout/
│   ├── public-layout/
│   └── sidebar/
├── lib/
│   └── api/
│       └── api-client.ts
├── routes/
│   ├── app-router.tsx
│   ├── home-page.tsx
│   └── navigation.ts
├── styles/
│   ├── global.css
│   └── tokens.css
├── test/
│   └── setup.ts
└── main.tsx
```

This tree reflects the last known implementation, not a guarantee that every file currently exists or is unchanged.

**Import-path warning:** retain correct paths from the actual repository. Do not normalize or rewrite imports based on this document.

---

## 7. Application bootstrap and providers

The previously supplied `AppProvider` used TanStack Query and React Router:

```tsx
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { queryClient } from "./query-client";
import { appRouter } from "../routes/app-router";

export function AppProvider() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={appRouter} />
    </QueryClientProvider>
  );
}
```

The known query-client defaults were:

```ts
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
```

These are the last known versions. Inspect the current files before changing them.

---

## 8. UI foundation and application shell

### Phase 0 — Frontend Engineering Foundation

Previously reported complete:

- React, TypeScript, and Vite foundation
- Application bootstrap and providers
- Baseline configuration

A commit was previously discussed:

```text
chore(frontend): establish React application foundation
```

Verify Git history before assuming it exists.

### Phase 1 — UI Foundation

Previously reported complete:

- Reusable UI components
- Design tokens and shared styling
- Component tests

A commit was previously discussed:

```text
feat(frontend): establish reusable ui foundation
```

Verify Git history before assuming it exists.

### Phase 2 — Application Shell

The user previously reported all checks green after fixing an ambiguous accessible-name test failure.

Known shell functionality includes:

- Desktop sidebar
- Responsive mobile header and navigation drawer
- Navigation based on the shared navigation model
- Backdrop dismissal
- Escape-key dismissal
- Drawer closure after navigation
- Body scroll locking while the drawer is open
- Scroll restoration after closing
- Closing the drawer when the pathname changes
- Accessible toggle labels and `aria-expanded`

The known navigation model includes:

```ts
export interface NavigationItem {
  readonly label: string;
  readonly path: string;
}

export const navigationItems: readonly NavigationItem[] = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Accounts", path: "/accounts" },
  { label: "Transactions", path: "/transactions" },
];
```

These navigation entries do not prove that the corresponding feature pages exist.

#### Accessibility acceptance

Before declaring the shell fully production-ready, verify in the current source code and tests:

- Focus moves to an appropriate control when a modal-style drawer opens.
- Focus remains within the drawer if it is treated as a modal interaction.
- Closing the drawer restores focus to the trigger.
- Hidden controls cannot accidentally retain keyboard focus.
- Drawer semantics and accessible labeling are appropriate.
- Responsive behavior works in a real browser at narrow and wide viewports.

Do not claim these items are complete unless they are verified.

The user's more recent work moved on to authentication, so treat Phase 2 as **previously reported green, with full focus-management acceptance still requiring confirmation if it has not been completed**.

The user explicitly does not want placeholder routes added solely to preview the shell.

---

## 9. Phase 3 — Authentication

**Current implementation stage: authentication frontend implemented and user-reported green. Final Git commit status remains unconfirmed.**

The user has worked through the authentication foundation, login form, login page, and route guard. The user reported all checks green after fixing a React Router test-context error and implementing login redirect behavior.

Do not assume the code is committed or that additional production integration is complete.

### 9.1 Backend authentication contract

The known backend endpoints are:

```text
POST /api/v1/auth/login
GET  /api/v1/users/me
```

The login response previously supplied by the user has this structure:

```json
{
  "success": true,
  "data": {
    "accessToken": "<JWT>",
    "user": {
      "id": "uuid",
      "email": "admin@wealthwise.local",
      "firstName": "System",
      "lastName": "Administrator",
      "createdAt": "2026-08-06T10:00:00.000Z",
      "updatedAt": "2026-08-06T10:00:00.000Z"
    }
  },
  "meta": {}
}
```

The exact current backend DTOs remain the source of truth.

Known backend behavior includes:

- Login accepts email and password.
- Email is normalized server-side.
- Invalid credentials produce a generic authentication error.
- Inactive accounts have a distinct error.
- Login is rate-limited.
- The authenticated user endpoint requires a bearer token.

Do not assume a refresh-token endpoint exists.

### 9.2 Known frontend authentication files

#### `src/features/auth/types/auth.types.ts`

The last known model includes:

- `User`
- `LoginRequest`
- `ApiSuccessResponse<T>`
- `LoginData`
- `LoginResponse`
- `CurrentUserResponse`

The `User` model contains `id`, `email`, `firstName`, `lastName`, `createdAt`, and `updatedAt`.

Verify the actual definitions before modifying them.

#### `src/features/auth/api/auth-api.ts`

The known login function calls:

```text
/api/v1/auth/login
```

using the shared Axios client and returns a typed login response.

#### `src/features/auth/auth-token.ts`

The access-token store holds the token in module memory and provides functions for:

- Getting the token
- Setting the token
- Clearing the token
- Expiring the token
- Registering and removing session-expiration listeners

It does not persist the access token to localStorage or sessionStorage.

#### `src/lib/api/api-client.ts`

The last known client:

- Uses the configured API base URL.
- Adds a bearer token from the in-memory token store when present.
- Removes the authorization header when no token is present.
- Clears the session on applicable unauthorized responses.
- Avoids treating the login endpoint's own `401` as an expired authenticated session.

Inspect the current interceptors before changing behavior.

#### `src/features/auth/context/auth-context.ts`

The context exposes:

- `user`
- `isAuthenticated`
- `isInitialized`
- `login`
- `logout`

The `useAuth` hook requires the provider to be present.

#### `src/features/auth/context/auth-provider.tsx`

The provider coordinates:

- Calling the login API
- Storing the access token
- Updating the authenticated user
- Clearing user and token on logout
- Clearing authentication state when the session expires

The known implementation sets `isInitialized` to `true` immediately. Because no session-restoration mechanism has been implemented, a page reload clears the in-memory session and the user must sign in again.

Do not claim persistent session restoration.

#### `src/features/auth/schemas/login-schema.ts`

The login schema uses Zod and validates email and password. The form normalizes email to lowercase and trims surrounding whitespace before submission. The password itself is not trimmed.

#### `src/features/auth/components/login-form.tsx`

The login form uses React Hook Form, Zod, and existing shared UI components.

Known behaviors:

- Accessible email and password labels
- Inline validation messages
- Loading and duplicate-submission prevention
- Safe user-facing error messages
- Delegation of authentication state to `useAuth()`
- Optional `onSuccess` callback

#### `src/features/auth/pages/login-page.tsx`

The login page includes:

- Centered WealthWise branding and login card
- Compact input fields
- Responsive layout
- A footer with copyright, Privacy Policy, and Terms of Service
- Login success navigation to the originally requested internal destination, or `/` when no destination is provided

The footer currently links to `/privacy-policy` and `/terms`. These pages have not been implemented in the known route configuration, so the links still need real destinations before they are production-ready.

The outer page uses a full-viewport minimum-height layout so the footer stays at the bottom when content is short and the page can grow naturally on smaller screens.

#### `src/features/auth/guards/require-auth.tsx`

The guard checks authentication state and redirects anonymous users to `/login`, preserving the requested location in router state.

Its unit tests cover anonymous redirection and access by an authenticated user.

**Important:** The guard has been implemented and tested independently, but the production router has not yet been confirmed to contain a real protected feature route beneath it. Do not claim route protection is fully integrated across the application.

### 9.3 Current login and route behavior

The last known intended router structure contains:

- `/` under `PublicLayout`, rendering `HomePage`
- `/login` under `PublicLayout`, rendering `LoginPage`
- `AppLayout` with an empty child list

The exact current router must be inspected before further changes.

The user explicitly rejected placeholder routes just to preview the shell. Do not add a fake dashboard or empty Accounts page as a workaround.

### 9.4 Tests and reported status

Authentication tests have been added for:

- Access-token store behavior
- Login provider behavior
- Successful login
- Failed login
- Logout
- Session expiration
- Login form validation and error handling
- Login page rendering and successful-login redirect
- `RequireAuth` redirect and authenticated rendering

A React Router test failure occurred because `LoginPage` rendered `<Link>` elements without a router context. The tests were corrected to use `MemoryRouter`, and the user subsequently reported all checks green.

**Latest reported status:**

- Tests: user reported green
- Lint: user reported green
- Build: user reported green
- Git commit: not confirmed

These are user-reported results, not independent verification by the assistant.

### 9.5 Remaining authentication acceptance

Before declaring the authentication milestone completely production-ready, verify:

- Current source matches the described implementation.
- The shared Axios interceptors behave correctly for authenticated and anonymous requests.
- Login and session-expiration behavior is consistent.
- Login errors are handled accessibly.
- Redirect destinations cannot become external redirects.
- Route protection is connected when a real protected feature route is introduced.
- Footer legal links eventually lead to real pages.
- Browser behavior is verified where relevant.
- Unit tests, lint, build, and E2E tests pass.
- The completed work is reviewed and committed.

Do not create a placeholder feature just to complete the route-guard milestone.

---

## 10. Current Git workflow and pending commit

The user asked to commit the authentication work before starting Accounts.

The proposed commit message is:

```text
feat(auth): implement login flow and route guard
```

First inspect:

```bash
git status
git diff --check
git diff --stat
```

Then stage only the intended authentication changes and review the staged diff:

```bash
git add src
git status
git diff --cached --check
git diff --cached --stat
```

Do not blindly stage unrelated user work. If other changes exist, stage only the intended files.

After reviewing the staged changes and confirming all quality gates pass, create the commit:

```bash
git commit -m "feat(auth): implement login flow and route guard"
```

Verify the result:

```bash
git status
git log -1 --oneline
```

Do not proceed on the assumption that the commit succeeded until the actual output is known.

---

## 11. Next planned feature — Accounts

After the authentication changes are committed, the next planned feature is **Accounts**, but only after reviewing the backend's actual contract.

The user was asked to share:

- The current backend `accounts.controller.ts`
- The account response DTO
- Any DTO used to return an account balance

These files have not yet been provided in the known conversation state.

**Do not invent API paths, query parameters, response fields, monetary representations, account statuses, or balance semantics.**

### Planned Accounts implementation sequence

1. Inspect the backend controller and DTOs.
2. Verify the current frontend source tree and conventions.
3. Define frontend types from the real API contract.
4. Implement the API layer using the existing Axios client.
5. Implement the query layer using TanStack Query where appropriate.
6. Build the Accounts page with loading, error, empty, and populated states.
7. Use existing UI components and design tokens.
8. Integrate the real Accounts route under `RequireAuth` and `AppLayout`.
9. Add relevant component and integration tests.
10. Add Playwright E2E coverage where appropriate.
11. Run all quality gates.
12. Review and commit the coherent feature slice.

The Accounts feature must be a real feature backed by the backend contract, not a placeholder.

### Financial-data constraints

- Preserve exact monetary values.
- Do not use JavaScript floating-point arithmetic for financial calculations.
- Verify whether monetary values are returned as strings, numbers, or structured amounts.
- Do not fabricate an account balance endpoint or assume that the backend feature is complete.
- Handle empty accounts separately from API errors and loading states.

---

## 12. Later roadmap

Later features include:

- Dashboard and account overview
- Transactions
- Income and expenses
- Monthly budgets
- Savings and financial goals
- Fixed deposits and recurring deposits
- Mutual funds, stocks, bonds, and investments

Do not skip ahead to these features before the planned authentication and Accounts work is ready.

The backend's Account Balance feature was previously described as pending. Verify its actual current implementation and API contract when scheduled.

---

## 13. Testing standards

### Component tests

- Verify user-observable behavior, not merely implementation existence.
- Use accessible roles, names, and state.
- Verify callback behavior when relevant.
- Test navigation and active-route behavior.
- Test authentication loading, success, failure, and session-expiration states.
- Keep tests independent and clean up global state.
- Use React Testing Library semantic queries.
- Wrap components in the necessary providers, including `MemoryRouter` for components using router links or hooks.
- Avoid weakening assertions or disabling lint rules merely to make tests pass.

### E2E tests

Use Playwright for real-browser behavior, including:

- Intended routes are reachable.
- The correct layout renders at each route.
- Narrow and wide viewport behavior.
- Navigation and drawer interactions.
- Authentication flows when a suitable test backend or mock strategy is configured.

Do not assume jsdom verifies real responsive CSS layout.

### Quality gates

Use the project's configured scripts:

```bash
npm test
npm run lint
npm run build
npm run test:e2e
```

Run the appropriate checks after each coherent implementation slice. Do not claim success without actual results.

---

## 14. How the AI should work with the user

The user is an experienced backend developer expanding frontend and broader engineering skills. Act as a long-term engineering mentor and preserve the preference to progress one milestone at a time.

For each implementation step:

1. State the goal and why it belongs at this point in the roadmap.
2. Identify the exact files to inspect or modify.
3. Preserve the existing architecture and folder structure.
4. Provide complete code when requested, with required imports and types.
5. Explain important decisions briefly but clearly.
6. Include relevant tests and exact commands.
7. Define clear acceptance criteria.
8. Wait for actual test results before claiming completion.
9. Diagnose failures from the error and actual code.
10. Summarize completed work, remaining work, Git status, and the next milestone at each handoff.

Do not:

- Add temporary routes solely to make components visible without user approval.
- Invent backend contracts or authentication behavior.
- Assume suggested code was applied or committed.
- Jump to the Accounts feature before the current changes are committed and its backend contract is reviewed.
- Repeat large amounts of established context unnecessarily.
- Ask the user to re-explain the project when this document already contains the relevant information.

---

## 15. New-conversation continuation checklist

When this document is pasted into a new conversation:

1. Acknowledge that this is the WealthWise Frontend project.
2. Treat authentication as the current implementation stage, with user-reported green checks and an unconfirmed Git commit.
3. Start by checking Git status and the latest commit before assuming the current changes are committed.
4. If the changes are still uncommitted, finish reviewing and committing the authentication work first.
5. Once committed, ask for the backend Accounts controller and response DTOs if they have not already been provided.
6. Inspect the actual backend contract before implementing Accounts.
7. Preserve the existing architecture, UI foundation, design tokens, and testing conventions.
8. Do not create placeholder dashboard or Accounts routes.
9. Continue in small, tested implementation slices.
10. Keep the user's explicit preference for following the planned project flow.

### Current handoff summary

- Phase 0 — Frontend Engineering Foundation: previously reported complete.
- Phase 1 — UI Foundation: previously reported complete.
- Phase 2 — Application Shell: previously reported green; complete focus-management acceptance may still require confirmation.
- Phase 3 — Authentication: login API model, in-memory token store, Axios integration, authentication provider, login form, centered login page, footer, route guard, and tests have been implemented according to the latest conversation.
- The user reported tests, lint, and build green after the latest authentication changes.
- The Git commit for authentication has been proposed but is **not confirmed**.
- Next action: verify Git status, review and commit the current authentication changes, then request and inspect the real backend Accounts controller and DTOs.
- Do not begin Accounts implementation using guessed API contracts.
