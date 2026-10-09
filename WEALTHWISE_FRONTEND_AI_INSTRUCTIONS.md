# WealthWise Frontend — AI Engineering Instructions

## 1. Purpose

This document is the persistent engineering context for the **WealthWise Frontend** project.

When an AI assistant receives this document, it must use it as the primary project context and continue development consistently with the existing source code, architecture, coding conventions, product scope, testing strategy, and current milestone.

The goal is to build a maintainable, production-oriented frontend for WealthWise, a personal finance management application. This is a long-term engineering project, not a tutorial-only application.

### Mandatory continuation rules

1. **The current source tree and source code are the source of truth.** If this document conflicts with the actual repository, inspect the repository and follow the implementation unless the user explicitly approves a change.
2. Do not assume code was applied, committed, or tested merely because an assistant previously suggested it.
3. Do not redesign, rename, move, or replace existing files without a clear engineering reason and alignment with the user.
4. Do not add dependencies, architecture layers, routes, screens, or features unless required by the current milestone.
5. Follow the established roadmap. Do not skip ahead to authentication or financial features while the current milestone is unfinished.
6. Provide exact file paths, complete corrected code when requested, commands to run, and clear acceptance criteria.
7. Explain significant engineering decisions: what the change does, why it exists, where it belongs, alternatives when relevant, and how it will be verified.
8. Never claim tests, lint, build, browser behavior, or commits are successful without user-provided output or verified tool results.
9. When the user says “continue,” continue from the current milestone and next planned task—not from a new plan.
10. If the user opens a new ChatGPT tab and pastes this file, use it as the starting context. Ask for targeted files or command output only when necessary; do not make the user repeat information already present here.

---

## 2. Product scope

WealthWise is a personal finance management application. The backend is developed separately and is the API source of truth.

The product scope includes:

- User authentication and authorization
- Dashboard and account overview
- Accounts and account balances
- Income and expenses
- Transactions and transaction history
- Monthly budgets
- Savings and financial goals
- Fixed deposits and recurring deposits
- Mutual funds, stocks, bonds, and other investments

Implement only the frontend work planned for the current milestone. Do not create placeholder financial functionality or fabricate backend responses.

The long-term goal is a clean, maintainable frontend that can grow alongside the backend without premature complexity.

---

## 3. Frontend technology stack

The project has been established with the following stack. Confirm the actual package files before changing versions or configuration.

- React 19
- TypeScript
- Vite 8
- Tailwind CSS 4
- React Router DOM 7
- TanStack Query
- Axios
- Vitest
- React Testing Library
- `@testing-library/jest-dom`
- Playwright
- ESLint 10

Use the versions and package scripts in the repository as the source of truth. Do not upgrade dependencies or replace tools without a specific need.

### Common quality-check commands

The current project workflow uses these commands:

```bash
npm test
npm run lint
npm run build
npm run test:e2e
```

Check `package.json` if a script differs. Do not invent a new script when an existing one already covers the task.

The Vitest configuration should limit unit/component test collection to the configured source test pattern, currently:

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
- Keep components readable and avoid unnecessary abstraction.
- Use React state for client interaction and TanStack Query for server state.
- Do not duplicate server state in unrelated local state.
- Keep callbacks and effects correct and ensure event listeners, subscriptions, and global DOM changes are cleaned up.
- Follow the repository's React and ESLint rules rather than disabling rules to silence warnings.
- Avoid unnecessary effects for state that can be derived from existing state, props, or router location.
- Use semantic HTML and accessible names for interactive elements.

### 4.2 Architecture

Preserve the architecture already present in the repository. Keep concerns separated:

- **Application/bootstrap:** providers and app-level setup.
- **Routes:** route configuration and route-level page composition.
- **Layouts:** shared structural shells such as public and authenticated application layouts.
- **Components:** reusable UI primitives and layout components.
- **Features:** feature-specific UI and behavior when introduced by the roadmap.
- **API/infrastructure:** HTTP client and backend communication when the API milestone is reached.
- **Tests:** close to the relevant source where the existing project convention places them.

Do not introduce additional folders or layers solely for theoretical purity. Follow existing conventions and expand them only when the feature justifies it.

### 4.3 Styling

- Continue using Tailwind CSS 4 and the existing design tokens.
- Preserve current token naming conventions, including classes such as `bg-background`, `bg-surface`, `text-foreground`, `text-primary`, and `border-border`.
- Reuse the existing UI foundation components instead of reimplementing buttons and other primitives.
- Keep responsive behavior explicit and testable.
- Do not introduce another styling framework or a separate design system without approval.
- Avoid hard-coded colors when an existing token is suitable.

### 4.4 Security and financial data

- Do not log passwords, tokens, secrets, or sensitive financial information.
- Do not invent authorization rules or API contracts.
- Do not assume token storage, refresh behavior, or session lifetime. Verify the backend contract and make an explicit design decision when the authentication milestone begins.
- Treat API values as untrusted input and handle loading, error, and empty states deliberately.
- Keep monetary values precise. Do not convert backend monetary strings into floating-point arithmetic for financial calculations. Format values for display according to the agreed contract.
- Never put secrets in source control or frontend environment variables intended to be private. Values shipped to a browser are public.

---

## 5. Project setup and known baseline

The frontend repository has previously been worked on locally at:

```text
~/NARAYAN/PROJECTS/1 - WealthWise/frontend
```

This is the last reported path. Confirm the actual working directory before running commands.

The branch previously shown was `main`. Confirm the current branch and worktree status before committing.

### Bootstrap and providers

Previously supplied implementation:

`src/main.tsx`

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { AppProvider } from "./app/app-provider";
import "./styles/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider />
  </StrictMode>,
);
```

`src/app/app-provider.tsx`

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

`src/app/query-client.ts`

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

These are the last known versions supplied in conversation, not a guarantee that the current working tree still matches them. Inspect the repository before changing them.

---

## 6. Current known architecture and components

The following paths and code conventions have appeared in the conversation. Verify the current physical tree before relying on import paths.

- `src/main.tsx`
- `src/app/app-provider.tsx`
- `src/app/query-client.ts`
- `src/routes/app-router.tsx`
- `src/routes/home-page.tsx`
- `src/routes/navigation.ts`
- `src/layouts/public-layout/public-layout.tsx`
- `src/layouts/app-layout/app-layout.tsx`
- App header component and its tests
- Sidebar component and its tests
- `src/components/ui/button/button.tsx`
- `src/components/ui/menu-icon/menu-icon.tsx`
- Component tests alongside source files, where that matches existing conventions

**Important import-path warning:** The user has shown both sibling imports such as `../app-header/app-header` and component imports such as `../../components/ui/button/button`. Do not normalize or rewrite imports based on this document. Inspect the actual file locations and retain correct existing paths.

### Navigation model

The known navigation model was:

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

These navigation entries are not proof that actual feature pages have been implemented. Do not invent completed pages just because a navigation item exists.

### UI Button

The previously supplied reusable button supports:

- Variants: `primary`, `secondary`, `danger`, `ghost`
- Sizes: `sm`, `md`, `lg`
- Native button attributes
- A loading state that disables the button

Reuse it for interactive buttons where suitable. Check its actual implementation before changing its contract.

### Menu icon

The menu icon receives an `open: boolean` prop and renders either hamburger or close paths. Tests should verify which path is rendered rather than merely asserting that an SVG exists.

### Sidebar

The sidebar uses `navigationItems` and React Router `NavLink`. It supports an optional `onNavigate` callback so a mobile drawer can close after selecting a navigation link. The desktop sidebar can omit the callback.

### Header

The header receives controlled props:

```ts
interface AppHeaderProps {
  navigationOpen: boolean;
  onToggleNavigation: () => void;
}
```

It exposes an accessible menu toggle with a dynamic accessible name and `aria-expanded`, and references the mobile navigation element through `aria-controls`.

Avoid duplicate accessible names for distinct buttons in the same state. The header toggle and backdrop-dismiss button should have different accessible names, for example:

- Header toggle: `Open navigation` / `Close navigation`
- Backdrop button: `Dismiss navigation overlay`

---

## 7. Roadmap and progress

Follow this sequence unless the user explicitly changes the plan.

### Phase 0 — Frontend Engineering Foundation

Previously reported as completed:

- React/TypeScript/Vite application foundation
- Application bootstrap and providers
- Baseline configuration

A commit was previously discussed with this message:

```text
chore(frontend): establish React application foundation
```

Verify Git history before assuming this commit exists.

### Phase 1 — UI Foundation

Previously reported as completed:

- Reusable UI components
- Design tokens and shared styling foundation
- Component tests

A commit was previously discussed with this message:

```text
feat(frontend): establish reusable ui foundation
```

Verify Git history and current code before assuming the changes are committed.

During review, the `MenuIcon` tests were identified as too weak because they only checked for an SVG. Strengthen them to verify the menu path versus the close path.

### Phase 2 — Application Shell

This is the latest known active milestone.

Scope:

1. Router and layout boundaries
2. Navigation model
3. Sidebar
4. Header
5. Responsive shell
6. Navigation behavior and accessibility review
7. Unit/component tests and E2E verification
8. Commit the milestone after all checks pass

Previously reported shell behavior:

- Desktop sidebar visible at medium and larger breakpoints.
- Mobile header toggle opens and closes the navigation drawer.
- Selecting a navigation link calls the drawer-close callback.
- Backdrop closes the drawer.
- Escape key closes the drawer.
- Background scrolling is disabled while the drawer is open and restored afterward.
- Pathname changes close the drawer by deriving the open state from the current pathname.

The user encountered a test failure because both the header toggle and overlay backdrop were named `Close navigation`. The intended correction is to give the backdrop a distinct label such as `Dismiss navigation overlay`, while keeping the header toggle label dynamic.

The user subsequently reported **all green** after the fix. The exact final command output was not included. Treat that as the user's report that the latest checks passed; do not imply independent verification.

#### Accessibility work still needing confirmation

Full focus management was identified as unfinished. Before calling Phase 2 production-ready, inspect and implement where appropriate:

- Focus moves to an appropriate control inside the mobile drawer when opened.
- Keyboard focus stays within the drawer if it is treated as a modal interaction.
- Closing the drawer restores focus to the trigger.
- Drawer semantics and accessible labeling are appropriate.
- The overlay cannot leave focus in hidden or inaccessible controls.
- Responsive behavior is tested in a real browser at narrow and wide viewports.

Do not claim these are complete unless verified in the current code and tests.

### Phase 3 — Authentication

**Do not begin until Phase 2 is complete and the user has confirmed the milestone.**

Backend login endpoint known from project context:

```text
POST /api/v1/auth/login
```

The backend also has a `GET /api/v1/users/me` endpoint. Inspect the actual backend DTOs and response types before implementing frontend authentication.

Planned work, subject to existing repository structure:

1. Inspect the login request/response contract and error semantics.
2. Design typed API request and response models.
3. Implement or reuse the shared Axios HTTP client according to existing code.
4. Implement the login form and validation.
5. Implement authentication state and session lifecycle according to the real backend contract.
6. Add protected route handling and unauthorized/error handling.
7. Add unit, integration/component, and E2E tests.
8. Verify keyboard accessibility, loading states, and error messaging.
9. Run quality gates and commit.

Do not assume a refresh-token endpoint exists. Do not choose localStorage, sessionStorage, or cookie-based storage without checking the actual backend architecture and making an explicit, security-aware decision.

### Later phases

Later work will include real dashboard and financial feature screens, accounts, transactions, budgets, goals, and investments. Do not jump to these until the planned authentication and routing foundations are ready.

The backend's Account Balance feature was described as pending in the project context. Do not design a frontend balance API around assumptions; verify its current backend state and contract when the feature is scheduled.

---

## 8. Router and browser visibility

The last known router shape included a public route for `/` and an `AppLayout` route with an empty child list. The `HomePage` rendered the WealthWise title inside `PublicLayout`.

This is important when diagnosing why a browser does not show the sidebar/header:

- `AppLayout` only renders for routes assigned to it.
- A route with no matching child content will not show a useful page in its `<Outlet />`.
- Components can pass unit tests without being reachable in the actual browser router.
- The root route `/` may use `PublicLayout`, so the authenticated application shell will not appear there unless the router explicitly assigns it.

The user explicitly chose to follow the planned project flow rather than add temporary routes solely to see the shell.

**Do not add a temporary dashboard route or placeholder feature as a workaround.** Continue the architecture milestone in order. When visual verification is due, inspect the intended router design and implement only the route structure planned for that milestone.

---

## 9. Testing standards

Tests should verify user-observable behavior, not merely implementation existence.

### Component tests

- Verify accessible names, roles, state, and meaningful behavior.
- For icons, test the rendered path or state-specific output.
- For navigation, test links and active-route behavior.
- For callback props, verify invocation when relevant.
- For mobile navigation, cover open/close, backdrop, Escape, route changes, and scroll restoration as implemented.
- Avoid ambiguous queries when multiple controls share a role or name.
- If desktop and mobile sidebars are both present in the DOM, account for duplicate navigation regions deliberately rather than hiding real behavior to satisfy a test.
- Keep tests independent and restore global DOM state such as `document.body.style.overflow`.
- Prefer React Testing Library's semantic queries.
- Use `userEvent` if it is already installed and follows project conventions; otherwise do not add a dependency just for stylistic preference.

### E2E tests

- Use Playwright for real-browser route and responsive behavior.
- Verify the app route is reachable and the expected shell renders at the intended URL.
- Test narrow and wide viewport behavior.
- Do not assume jsdom verifies CSS breakpoints or actual layout visibility; it does not render responsive CSS like a real browser.
- Keep E2E test collection separate from Vitest component tests.

### Quality gates

Run the project's actual configured commands, commonly:

```bash
npm test
npm run lint
npm run build
npm run test:e2e
```

Do not claim the project is green until results are known. Fix the underlying issue rather than disabling lint rules or weakening assertions.

---

## 10. Git workflow

Before modifying code:

```bash
git status
git branch --show-current
```

Review the relevant source files and tests. Do not overwrite uncommitted user work.

After implementing a coherent milestone:

```bash
git diff --check
git diff
npm test
npm run lint
npm run build
npm run test:e2e
```

Use the scripts actually present in `package.json`. Review the final status and staged diff before committing. Never stage secrets or unrelated changes.

For the completed shell milestone, a proposed commit message is:

```text
feat(frontend): complete application shell
```

This is a proposed message, not proof that the commit has been created. Check `git log -1 --oneline` and `git status` before assuming the repository state.

---

## 11. How the AI should work with the user

The user is an experienced backend developer expanding into frontend and broader engineering skills. Act as a long-term engineering mentor while respecting the user's preference to progress one milestone at a time.

For each implementation step:

1. State the goal and why it belongs at this point in the roadmap.
2. Identify the exact files to inspect or modify.
3. Preserve the existing architecture and folder structure.
4. Provide complete code when requested, not disconnected snippets that omit required imports or types.
5. Explain important decisions briefly but clearly.
6. Include relevant tests and exact commands.
7. Define what passing acceptance criteria look like.
8. Wait for the user's actual test results before claiming completion.
9. When an issue appears, diagnose it from the error and actual code; avoid unnecessary redesign.
10. At milestone completion, summarize what is complete, what remains, the proposed commit, and the next planned milestone.

Do not:

- Add temporary routes just to make components visible unless the user agrees this is part of the plan.
- Start authentication before the shell milestone is complete.
- Invent backend API response fields or authentication behavior.
- Repeat large amounts of already established context instead of continuing the next task.
- Ask the user to re-explain the project if this file already contains the relevant information.

---

## 12. New-tab continuation checklist

When this file is pasted into a new conversation:

1. Acknowledge that this is the WealthWise Frontend project.
2. Treat Phase 2 — Application Shell as the last known active milestone unless the user provides newer progress.
3. Ask for current `git status`, relevant files, or latest test output only if needed to determine what has actually changed since this document was prepared.
4. Do not assume the latest suggested code was applied or committed.
5. Verify the real source tree and package scripts before providing replacement code.
6. Continue with the next unfinished item in Phase 2, particularly the remaining accessibility/focus-management review, if it is still outstanding.
7. After Phase 2 is verified complete and committed, proceed to Phase 3 — Authentication using the actual backend API contract.
8. Preserve the user's explicit decision to follow the project flow rather than adding temporary routes or jumping ahead.

### Current handoff summary

- Phase 0 and Phase 1 were reported complete.
- Phase 2 is the active milestone.
- The user reported all checks green after fixing an ambiguous accessible-name test failure.
- Full focus management and final shell acceptance should be confirmed before declaring Phase 2 production-ready.
- The user chose not to add a temporary dashboard route merely to preview the shell and wants to continue in the planned order.
