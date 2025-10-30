# The Road to Next

A learning/demonstration application showcasing modern Next.js 16 development patterns with a ticket management system. This project demonstrates Next.js App Router architecture, server vs client component patterns, and modern React practices.

## Technology Stack

- **Framework**: Next.js 16.0.1 with App Router
- **Runtime**: Bun (JavaScript/TypeScript runtime and package manager)
- **Frontend**: React 19.2.0 with TypeScript
- **Styling**: Tailwind CSS v4.1.16 with CSS-first configuration
- **Toolchain**: Biome 2.3.2 (formatting, linting, and import organization)
- **UI Components**: Radix UI primitives (shadcn/ui style)
- **Theme**: next-themes v0.4.6 for dark mode support
- **Icons**: lucide-react v0.548.0
- **Fonts**: Geist Sans & Geist Mono (optimized via next/font)

## Features

### Ticket Management System
- **Ticket List View**: Displays all tickets with status icons and preview
- **Ticket Detail View**: Full ticket details with expanded content
- **Status Tracking**: OPEN, IN_PROGRESS, DONE with corresponding icons
- **Mock Data**: Sample tickets with simulated async loading

### UI/UX Features
- **Dark Mode**: System preference detection with manual toggle
- **Responsive Design**: Mobile-first Tailwind CSS styling
- **Animations**: Smooth fade-from-top animations
- **Typography**: Geist font family optimized via next/font
- **Navigation**: Fixed header with branding and quick access

### Architecture
- **Server Components**: Default pattern for pages and static components
- **Client Components**: Used strategically when needed (interactivity, hooks)
- **Feature-Based Organization**: Modular structure in `src/features/`
- **Type Safety**: Strict TypeScript with comprehensive type checking

## Getting Started

### Prerequisites

This project requires:
- **Bun** v1.3.1 or higher (installed via Homebrew or from [bun.sh](https://bun.sh))
- **Node.js** v22.x (via NVM) - for compatibility with some tooling

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd the-road-to-next-app

# Install dependencies
bun install
```

### Development

```bash
# Start development server (with Turbopack and Bun runtime)
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

The development server uses:
- **Turbopack** for blazing-fast hot module replacement
- **Bun runtime** for optimal performance
- **TypeScript** with strict type checking

### Available Scripts

```bash
bun run dev              # Start development server
bun run build            # Build for production
bun run start            # Start production server
bun run type             # TypeScript type checking
bun run lint             # Run Biome linter
bun run lint-fix         # Auto-fix with Biome (safe fixes only)
bun run lint-fix-unsafe  # Auto-fix with Biome (safe + unsafe fixes, includes Tailwind sorting)
bun run format           # Format code with Biome
bun run check            # Run all Biome checks without writing
bun run check:all        # Run type checking + Biome checks
```

**Note:** Biome handles linting and formatting but does NOT perform full TypeScript type checking. Use `bun run type` for type validation, or `bun run check:all` to run both.

### Code Quality Workflow

```bash
# Before committing, run:
bun run check:all   # Type check + lint
bun run lint-fix    # Auto-fix formatting and import order
```

## Project Structure

```
the-road-to-next-app/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx               # Root layout with theme provider
│   │   ├── page.tsx                 # Home page
│   │   ├── globals.css              # Global styles and Tailwind config
│   │   └── tickets/                 # Tickets feature routes
│   ├── components/                   # Shared components
│   │   ├── header.tsx               # Navigation header
│   │   ├── heading.tsx              # Page heading component
│   │   ├── placeholder.tsx          # Empty state component
│   │   ├── theme/                   # Theme management
│   │   └── ui/                      # Base UI components (shadcn/ui style)
│   ├── features/                    # Feature-based modules
│   │   └── ticket/                  # Ticket feature
│   │       ├── types.ts             # TypeScript types
│   │       ├── constants.tsx        # Feature constants
│   │       ├── components/          # Feature components
│   │       └── queries/             # Data fetching
│   ├── lib/                         # Utility functions
│   ├── data.ts                      # Mock data
│   └── paths.ts                     # Centralized route helpers
├── CLAUDE.md                         # Comprehensive project documentation
└── README.md                         # This file
```

## Routes

- `/` - Home page with introduction
- `/tickets` - List all tickets
- `/tickets/[ticketID]` - Individual ticket detail

## TypeScript Configuration

This project uses strict TypeScript settings optimized for Next.js 16 + Bun:

- **Strict Mode**: Full type safety with additional safety checks
- **Bundler Module Resolution**: Modern resolution for Bun compatibility
- **JSX**: `react-jsx` mode (automatic JSX runtime)
- **Unused Detection**: `noUnusedLocals` and `noUnusedParameters` enabled
- **Cross-Platform Safety**: `forceConsistentCasingInFileNames` prevents macOS→Linux deployment issues
- **No Emit**: TypeScript does type checking only; Bun handles transpilation

Run `bun run type` to perform type checking.

## Code Style

This project uses **Biome** instead of ESLint + Prettier for:
- Fast, consistent code formatting
- Comprehensive linting
- Automatic import sorting
- TypeScript-aware checks

Configuration is in `biome.json` with settings for:
- Single quotes, semicolons, trailing commas
- 80-character line width
- Tailwind class sorting (experimental `useSortedClasses` rule)
- Import type enforcement
- VCS integration (respects `.gitignore`)

**Note**: Tailwind class sorting uses the experimental `useSortedClasses` rule from Biome's nursery. Use `bun run lint-fix-unsafe` to apply these sorting fixes.

## Development Notes

### Server vs Client Components

- **Server Components** (default): Used for static content, data fetching, SEO
- **Client Components** (`'use client'`): Required for interactivity, hooks, browser APIs

### Async Route Parameters

Next.js 16 requires awaiting route params:

```typescript
// ✅ Correct
const Page = async ({ params }: Props) => {
  const { id } = await params;
  // ...
};
```

### Path Helpers

Always use centralized path helpers from `src/paths.ts`:

```typescript
import { ticketPath, ticketsPath } from '@/paths';
```

## Deployment

This project is optimized for deployment on Railway with Railpack (v0.9.2+):

- **Bun runtime only** - No Node.js installed via mise
- **Minimal configuration** - Simple `railway.json` with only builder specification
- **Auto-detection** - Railpack detects Bun via `bun.lock` file
- **No `engines` field** - Not required; Railpack uses latest Bun by default
- **No `packageManager` field** - Removed to prevent Node.js installation
- **Clean scripts** - No references to `node_modules` or Node.js directories (triggers Node.js detection)
- **Environment variables supported**
- **Tailwind CSS v4** - Processed via `@tailwindcss/postcss` (no separate Bun plugin needed)

### Important Deployment Notes

⚠️ **Configuration decisions that maintain Bun-only runtime:**

This project avoids several fields that were present during dual runtime installation:
- No `packageManager` field
- No `engines` field
- No `type: "module"` field
- No utility scripts referencing `node_modules` directory
- No `"bun"` in `trustedDependencies` array

**Key finding:** Removing the `clean` script that referenced `node_modules` resolved the dual runtime issue. The exact mechanism is unclear, but the current minimal configuration works reliably.

See `CLAUDE.md` for detailed deployment instructions, troubleshooting steps, and the complete history of what was tested.

## Learn More

### Next.js Resources
- [Next.js Documentation](https://nextjs.org/docs) - comprehensive Next.js guide
- [Next.js 16 Release Notes](https://nextjs.org/blog/next-16) - what's new in v16
- [App Router Guide](https://nextjs.org/docs/app) - modern routing patterns

### Bun Resources
- [Bun Documentation](https://bun.sh/docs) - Bun runtime and toolkit
- [Bun with Next.js](https://bun.sh/guides/ecosystem/nextjs) - integration guide

### Project Resources
- [CLAUDE.md](./CLAUDE.md) - Comprehensive project documentation for AI-assisted development
- [Tailwind CSS v4](https://tailwindcss.com/docs) - utility-first CSS framework
- [Biome](https://biomejs.dev) - fast formatter and linter

## Contributing

This is a learning/demonstration project. When extending:

1. Follow the feature-based organization pattern
2. Maintain server/client component boundaries
3. Use TypeScript strictly (no `any` types)
4. Run `bun run check:all` before committing
5. Update `CLAUDE.md` for architectural changes

## License

This project is part of "The Road to Next" tutorial series.
