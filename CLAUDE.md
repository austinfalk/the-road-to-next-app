CLAUDE.md - Project Documentation for AI-Assisted Development

## Project Overview

**The Road to Next** is a learning/demonstration application showcasing modern Next.js development patterns with a ticket management system. This project demonstrates Next.js 16 App Router architecture, server vs client component patterns, and modern React practices.

### Technology Stack
- **Framework**: Next.js 16.0.1 with App Router
- **Runtime**: Bun (JavaScript/TypeScript runtime and package manager)
- **Frontend**: React 19.2.0 with TypeScript
- **Styling**: Tailwind CSS v4.1.16 with CSS-first configuration
- **Toolchain**: Biome 2.3.2 (formatting, linting, and import organization)
- **UI Components**: Radix UI primitives (shadcn/ui style)
- **Theme**: next-themes v0.4.6 for dark mode support
- **Icons**: lucide-react v0.548.0
- **Fonts**: Geist Sans & Geist Mono (optimized via next/font)

## Development Environment

### Shell Configuration
**Important**: This project requires using zsh interactive shell for all command execution to ensure proper PATH configuration.

- **Node.js**: v22.x (via NVM at `~/.nvm/versions/node/`)
- **Package Manager**: Bun (via Homebrew)
- **npm**: Available via NVM

When running commands, always use:
```bash
/bin/zsh -i -c "command"
```

This ensures NVM and Homebrew paths are loaded correctly from your shell profile.

## Project Structure

```
the-road-to-next-app/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx               # Root layout with theme provider
│   │   ├── page.tsx                 # Home page
│   │   ├── globals.css              # Global styles and Tailwind imports
│   │   └── tickets/
│   │       ├── page.tsx             # Tickets list page (client component)
│   │       └── [ticketID]/
│   │           └── page.tsx         # Individual ticket detail page (server component)
│   ├── components/
│   │   ├── header.tsx               # Main navigation header
│   │   ├── heading.tsx              # Page heading with separator
│   │   ├── placeholder.tsx          # Empty state placeholder component
│   │   ├── theme/
│   │   │   ├── theme-provider.tsx   # ThemeProvider wrapper for next-themes
│   │   │   └── theme-switcher.tsx   # Dark/light mode toggle button
│   │   └── ui/                      # Base UI components (shadcn/ui style)
│   │       ├── button.tsx           # Button with variants
│   │       ├── card.tsx             # Card container with header/content
│   │       └── separator.tsx        # Visual separator line
│   ├── features/                    # Feature-based architecture
│   │   └── ticket/
│   │       ├── types.ts             # Ticket & TicketStatus types
│   │       ├── constants.tsx        # TICKET_ICONS mapping
│   │       ├── components/
│   │       │   └── ticket-item.tsx  # Ticket card display component
│   │       └── queries/
│   │           └── get-tickets.ts   # Async ticket fetching (with mock delay)
│   ├── lib/
│   │   └── utils.ts                 # cn() utility for className merging
│   ├── data.ts                      # Mock ticket data (initialTickets)
│   └── paths.ts                     # Centralized route path helpers
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
├── tailwind.config.ts               # Tailwind CSS configuration (v4)
├── next.config.ts                   # Next.js configuration
└── CLAUDE.md                        # This file
```

## Key Features

### Ticket Management System
- **Ticket List View**: Displays all tickets with status icons and preview (`/tickets`)
- **Ticket Detail View**: Full ticket details with expanded content (`/tickets/[ticketID]`)
- **Ticket Statuses**: OPEN, IN_PROGRESS, DONE (with corresponding icons)
- **Mock Data**: 3 sample tickets in `src/data.ts`
- **Simulated Loading**: 2-second delay in `getTickets()` to simulate async operations

### UI/UX Features
- **Dark Mode**: System preference detection with manual toggle
- **Responsive Design**: Mobile-first Tailwind CSS styling
- **Animations**: Fade-from-top animations via `tw-animate-css`
- **Typography**: Geist font family optimized via next/font
- **Navigation**: Fixed header with branding and quick access to tickets

### Component Architecture
- **Server Components**: Default pattern for pages and static components
- **Client Components**: Used only when necessary (theme switcher, tickets list with useEffect)
- **Feature-Based Organization**: Tickets feature isolated in `src/features/ticket/`
- **Reusable UI Components**: shadcn/ui-style components in `src/components/ui/`

## Available Scripts

```bash
bun run dev              # Start development server with Turbopack and Bun runtime
bun run build            # Build for production
bun run start            # Start production server
bun run type             # TypeScript type checking (no emit)
bun run lint             # Run Biome linter
bun run lint-fix         # Run Biome check with auto-fix (safe fixes only)
bun run lint-fix-unsafe  # Run Biome with unsafe fixes (includes Tailwind class sorting)
bun run format           # Run Biome formatter only
bun run check            # Run all Biome checks without writing
bun run check:all        # Run type checking + Biome checks
bun run clean            # Remove build artifacts and dependencies
```

### Development Workflow
```bash
# Install dependencies
bun install

# Start development server
bun run dev
# Opens on http://localhost:3000 (or next available port)

# Type check while developing
bun run type

# Format, lint, and organize imports
bun run lint-fix

# Or run checks individually
bun run format      # Format code
bun run lint        # Lint only
```

## Application Routes

### Pages
- `GET /` - Home page with link to tickets
- `GET /tickets` - List all tickets
- `GET /tickets/[ticketID]` - Individual ticket detail

### Route Helpers (src/paths.ts)
```typescript
homePath()                    // Returns '/'
ticketsPath()                 // Returns '/tickets'
ticketPath(ticketId: string)  // Returns '/tickets/{ticketId}'
```

## Data Models

### Ticket Type
```typescript
type TicketStatus = 'OPEN' | 'DONE' | 'IN_PROGRESS';

type Ticket = {
  id: string;
  title: string;
  content: string;
  status: TicketStatus;
};
```

### Mock Data (src/data.ts)
```typescript
export const initialTickets = [
  { id: '1', title: 'Ticket 1', content: '...', status: 'DONE' },
  { id: '2', title: 'Ticket 2', content: '...', status: 'OPEN' },
  { id: '3', title: 'Ticket 3', content: '...', status: 'IN_PROGRESS' },
];
```

## Component Reference

### Layout Components

#### Header
Fixed navigation bar with:
- Brand logo (LucideKanban) linking to home
- "TicketBounty" title
- Theme switcher button (dark/light mode)
- "Tickets" navigation button

#### Heading
Page title component with optional description and separator.

**Props:**
- `title: string` - Page heading text
- `description?: string` - Optional subtitle

#### Placeholder
Empty state component for "not found" scenarios.

### Ticket Components

#### TicketItem
Displays ticket as a card with icon, title, and content.

**Props:**
- `ticket: Ticket` - Ticket data object
- `isDetail?: boolean` - If true, shows full content without detail button

**Features:**
- Status icon based on ticket status
- Truncated content preview in list view (3 lines max)
- Link to detail page in list view
- Full content in detail view

### UI Components (src/components/ui/)

All components follow shadcn/ui patterns with Radix UI primitives:

#### Button
**Variants:** default, secondary, outline, destructive, ghost, link
**Sizes:** default, sm, lg, icon

#### Card
Composed components: Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter

#### Separator
Horizontal or vertical divider line.

### Theme Components

#### ThemeProvider
Wraps app with next-themes provider. Configured in root layout.

#### ThemeSwitcher
Button to toggle between light/dark/system themes. Uses lucide-react icons.

## Styling Guidelines

### Tailwind CSS v4
- CSS-first configuration (no JS config needed for most cases)
- Imports in `src/app/globals.css`: `@import "tailwindcss"`
- Custom animations via `tw-animate-css` package
- Utility classes applied directly to components

### Class Name Patterns
Use the `cn()` utility from `src/lib/utils.ts` for conditional classes:

```typescript
import { cn } from '@/lib/utils';

<div className={cn(
  'base-classes',
  {
    'conditional-class': condition,
  }
)}>
```

### Color Scheme
Tailwind CSS uses CSS variables defined in globals.css for theme colors:
- `background`, `foreground` - Base colors
- `primary`, `secondary` - Accent colors
- `muted`, `accent`, `destructive` - Semantic colors
- All support dark mode via `.dark` class

## TypeScript Configuration

### Key Settings (Optimized for Next.js 16 + Bun)
- **Strict Mode**: Enabled with additional safety checks
- **Path Alias**: `@/*` maps to `./src/*`
- **Module System**: Preserve (for Next.js compatibility)
- **Module Resolution**: bundler mode (for Bun compatibility)
- **JSX**: react-jsx (automatic JSX runtime - required by Next.js)
- **Target**: ESNext (modern JavaScript features)
- **No Emit**: TypeScript only type checks; Bun handles transpilation

### Type Safety
- `strict: true` - All strict checks enabled
- `noUncheckedIndexedAccess: true` - Safe array/object access
- `noFallthroughCasesInSwitch: true` - Prevent switch fallthrough bugs
- `noUnusedLocals: true` - Catch unused variables (Biome doesn't check this at type level)
- `noUnusedParameters: true` - Catch unused function parameters
- `forceConsistentCasingInFileNames: true` - Prevents macOS→Linux deployment bugs
- `skipLibCheck: true` - Faster builds

**Important**: Next.js may auto-format `tsconfig.json` when running `next dev`. This is normal behavior and doesn't change functionality.

## Next.js 16 Patterns

### Server vs Client Components

**Server Components (Default)**
- Used for static content, data fetching, SEO
- No `'use client'` directive needed
- Examples: home page, ticket detail page

**Client Components**
- Required for interactivity, hooks, browser APIs
- Must have `'use client'` at top of file
- Examples: tickets list page (uses useEffect), theme components (use useTheme)

### Async Route Parameters
Next.js 16 requires awaiting route params:

```typescript
// ✅ Correct
const TicketPage = async ({ params }: TicketPageProps) => {
  const { ticketID } = await params;
  // ...
};

// ❌ Incorrect (will cause errors)
const TicketPage = ({ params }: TicketPageProps) => {
  const { ticketID } = params; // params is a Promise!
};
```

### Metadata API
Static metadata defined in layout or page:

```typescript
export const metadata: Metadata = {
  title: 'The Road to Next',
  description: 'My Road to Next application',
};
```

## Best Practices for AI-Assisted Development

### When Adding Features
1. **New Routes**: Add pages in `src/app/` following App Router conventions
2. **New Features**: Create in `src/features/{feature-name}/` with:
   - `types.ts` - TypeScript types
   - `constants.tsx` - Constants and configurations
   - `components/` - Feature-specific components
   - `queries/` - Data fetching functions
3. **Reusable Components**: Add to `src/components/` or `src/components/ui/`
4. **Route Helpers**: Add to `src/paths.ts` for type-safe navigation
5. **Mock Data**: Add to `src/data.ts` (until real backend integration)

### When Modifying Code
- **Preserve Server/Client Boundaries**: Don't unnecessarily convert server components to client
- **Use Path Helpers**: Import from `src/paths.ts` instead of hardcoding routes
- **Maintain Type Safety**: Always use proper TypeScript types, avoid `any`
- **Remove Debug Logs**: Delete `console.log` statements before committing
- **Follow Naming**: Use kebab-case for files, PascalCase for components

### Common Patterns

**Importing from src/**
```typescript
import { Ticket } from '@/features/ticket/types';
import { cn } from '@/lib/utils';
import { ticketPath } from '@/paths';
```

**Creating Client Components**
```typescript
'use client';

import { useState } from 'react';
// Component code...
```

**Async Server Components**
```typescript
const Page = async ({ params }: Props) => {
  const { id } = await params;
  const data = await fetchData(id);
  return <div>{/* ... */}</div>;
};
```

**Conditional Styling**
```typescript
import { cn } from '@/lib/utils';

<div className={cn(
  'base-class',
  isActive && 'active-class',
  { 'conditional': someCondition }
)} />
```

### Code Style
- **Component Syntax**: Arrow functions with named exports
  ```typescript
  const MyComponent = () => { /* ... */ };
  export { MyComponent };
  ```
- **Props Types**: Define inline or as separate type
  ```typescript
  type ComponentProps = { title: string };
  const Component = ({ title }: ComponentProps) => { /* ... */ };
  ```
- **Async Functions**: Use `async/await` over `.then()`
- **Import Order**: Automatically organized by Biome (external, internal, types)

## Extending This Project

### Adding Real Backend
1. Choose backend: tRPC, REST API, GraphQL
2. Replace `getTickets()` query in `src/features/ticket/queries/`
3. Add environment variables in `.env.local`
4. Update types if API response differs
5. Add error handling and loading states

### Adding Database
1. Install ORM: Prisma, Drizzle, or direct client
2. Create schema/models matching Ticket type
3. Add database queries in `src/features/ticket/queries/`
4. Update `getTickets()` to fetch from database
5. Add mutations for create/update/delete operations

### Adding Authentication
1. Choose auth library: NextAuth.js (Auth.js), Clerk, Lucia
2. Add auth routes and components
3. Protect ticket routes with middleware
4. Add user relation to tickets
5. Update UI to show user-specific tickets

### Adding More Features
**Example: Comments on Tickets**
```
src/features/comment/
├── types.ts              # Comment type
├── constants.tsx         # Comment-related constants
├── components/
│   ├── comment-list.tsx
│   └── comment-form.tsx
└── queries/
    ├── get-comments.ts
    └── add-comment.ts
```

### Adding State Management
Current app uses React's built-in state (useState, useEffect). For complex state:
- **Lightweight**: Use React Context or Zustand
- **Advanced**: Use Redux Toolkit or Jotai
- Keep state close to where it's used

## Dependencies Overview

### Core Dependencies
- `next` (16.0.1): React framework
- `react` & `react-dom` (19.2.0): UI library
- `next-themes` (0.4.6): Theme management

### UI Dependencies
- `@radix-ui/react-*`: Headless accessible components
- `lucide-react` (0.548.0): Icon library
- `class-variance-authority` (0.7.1): Variant management
- `clsx` (2.1.1): Conditional classes
- `tailwind-merge` (3.3.1): Smart class merging

### Development Dependencies
- `@biomejs/biome` (2.3.2): Fast formatter and linter (replaces ESLint + Prettier)
- `@tailwindcss/postcss` (4.1.16): PostCSS plugin for Tailwind CSS v4
- `typescript` (5.9.3): Type checking
- `tailwindcss` (4.1.16): CSS framework
- `tw-animate-css` (1.4.0): Animation utilities for Tailwind
- `@types/*`: TypeScript definitions

**Note**: This project does NOT use `bun-plugin-tailwind` as it's only needed for standalone Bun server apps, not Next.js projects. Next.js handles Tailwind CSS processing via `@tailwindcss/postcss`.

## Biome Configuration

This project uses **Biome 2.3.2** instead of ESLint + Prettier for faster, unified tooling.

### Configuration Highlights (`biome.json`)

**VCS Integration**
```json
"vcs": {
  "enabled": true,
  "clientKind": "git",
  "useIgnoreFile": true
}
```
- Biome respects `.gitignore` patterns
- Lock files (like `bun.lock`) are automatically excluded from linting

**Code Style**
- Single quotes for JavaScript/TypeScript
- Double quotes for JSX attributes
- Semicolons always
- Trailing commas everywhere
- 80-character line width

**Linting Rules**
- `useImportType: "error"` - Enforces TypeScript type-only imports
- `useExhaustiveDependencies: "warn"` - React hooks dependency checks
- `useSortedClasses` (nursery/experimental) - Tailwind CSS class sorting

### Tailwind Class Sorting (Experimental)

The `useSortedClasses` rule is in Biome's "nursery" (experimental):

```json
"nursery": {
  "useSortedClasses": {
    "level": "warn",
    "fix": "unsafe",
    "options": {
      "attributes": ["classList"],
      "functions": ["clsx", "cva", "cn", "tw"]
    }
  }
}
```

**Limitations:**
- Doesn't support screen variants (`md:`, `lg:`, etc.)
- Doesn't read `tailwind.config.ts`
- No custom plugin support
- Marked as "unsafe" fix (won't auto-apply on save)

**Usage:**
- `bun run lint-fix` - Applies safe fixes only
- `bun run lint-fix-unsafe` - Applies safe + unsafe fixes (includes class sorting)

### IDE Integration

**VS Code**: Install the Biome extension
**Zed Editor**: Biome support built-in via LSP
- If Zed shows errors on `bun.lock`, restart the editor (VCS integration should exclude it)

## Railway Deployment (Railpack)

This project is optimized for Railway deployment using Railpack v0.9.2+.

### Key Configuration Decisions

**No `packageManager` Field**
- Railway's Railpack detects package managers automatically
- Having `"packageManager": "bun@1.3.1"` causes Node.js to be installed alongside Bun
- Solution: Remove `packageManager` field, use `engines.bun` instead

**Current Setup:**
```json
{
  "engines": {
    "bun": ">=1.3.1"
  }
}
```

**Result:** Railway installs Bun runtime only (no Node.js)

### Railpack Auto-Detection

Railpack detects Bun via:
1. `bun.lock` file presence
2. `engines.bun` field in `package.json`
3. Bun-specific scripts

### Deployment Checklist
- ✅ No `packageManager` field in `package.json`
- ✅ `engines.bun` specifies version
- ✅ `bun.lock` committed to git
- ✅ No `bun-plugin-tailwind` dependency (not needed for Next.js)
- ✅ Build script uses Bun: `bun run --bun next build`
- ✅ Start script uses Bun: `bun run --bun next start`

## Performance Considerations

### Build Performance
- Bun runtime is significantly faster than Node.js
- Next.js 16 uses Turbopack for faster dev builds
- TypeScript compilation with `--noEmit` for type checking only

### Runtime Performance
- Server Components reduce client JavaScript bundle
- next/font optimizes font loading (Geist fonts)
- Tailwind CSS generates minimal CSS in production
- React 19 includes automatic batching and transitions

### Optimization Opportunities
- Add `loading.tsx` files for Suspense boundaries
- Use `generateStaticParams` for static ticket pages
- Add image optimization with `next/image`
- Implement proper error boundaries

## Troubleshooting

### Common Issues

**Issue: Commands not found (node, bun, npm)**
- Solution: Ensure using `/bin/zsh -i -c "command"` for proper PATH loading

**Issue: TypeScript errors about params being Promise**
- Solution: Always `await params` in Next.js 16: `const { id } = await params;`

**Issue: Dark mode not working**
- Solution: Check `suppressHydrationWarning` on `<html>` tag in layout
- Ensure ThemeProvider wraps app in root layout

**Issue: Module not found with @/ imports**
- Solution: Check `tsconfig.json` has `"@/*": ["./src/*"]` in paths

**Issue: Tailwind classes not applying**
- Solution: Ensure globals.css imported in root layout
- Check `tailwind.config.ts` content paths include your files

### Development Tips
1. **Hot Reload**: Dev server auto-reloads on file changes
2. **Type Errors**: Run `bun run type` for full TypeScript check
3. **Biome**: Configure in `biome.json` or use `bun run lint-fix` for auto-fixes
4. **Port Conflicts**: Next.js will use next available port if 3000 taken

## Notes for AI Assistants

### Project Context
- This is a learning/demonstration project for Next.js 16 patterns
- Focus on clean, readable code with modern best practices
- Template nature means changes should be generalizable
- Documentation is as important as functionality

### Code Style Preferences
- Prefer Server Components unless client features needed
- Keep components small and focused (single responsibility)
- Extract reusable logic into utilities or custom hooks
- Use TypeScript strictly - no `any` types
- Follow existing file/folder structure patterns

### When Suggesting Changes
- Maintain Bun compatibility (it's faster than Node.js)
- Preserve Next.js 16 App Router patterns
- Keep dependencies minimal (avoid adding unnecessary packages)
- Document new patterns or architectural changes
- Ensure TypeScript types are complete and accurate
- Follow the feature-based organization pattern

### Testing Recommendations
While no tests exist currently, consider adding:
- Unit tests with Vitest or Jest
- Component tests with React Testing Library
- E2E tests with Playwright or Cypress
- Place tests alongside source files or in `__tests__` directories

---

## Changelog

### 2025-10-30 - Configuration Optimization
- **Removed** `packageManager` field from `package.json` (fixes Railway Node.js detection)
- **Removed** `bun-plugin-tailwind` dependency (not needed for Next.js)
- **Updated** `tsconfig.json` with optimized Next.js 16 + Bun settings:
  - Added `noUnusedLocals: true` and `noUnusedParameters: true`
  - Added `forceConsistentCasingInFileNames: true` for cross-platform safety
  - Kept `jsx: "react-jsx"` as required by Next.js
- **Added** `biome.json` configuration with Tailwind class sorting (experimental)
- **Added** `lint-fix-unsafe` script for applying unsafe Biome fixes
- **Added** comprehensive Biome and Railway deployment documentation
- **Verified** Railway deployment uses Bun runtime only (no Node.js)

### 2025-10-29 - Initial Setup
- Project created with Next.js 16 App Router
- Configured with Bun runtime and Biome tooling
- Implemented ticket management demo application

---

**Last Updated**: 2025-10-30
**Next.js Version**: 16.0.1
**Bun Version**: 1.3.1+
**Biome Version**: 2.3.2
**Project Version**: 0.1.0
**Learning Resource**: "The Road to Next" Tutorial Series
