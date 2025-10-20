# Project Configuration for Claude Code

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

## Tech Stack

- **Framework**: Next.js 15.5.6 with App Router
- **React**: v19.2.0
- **TypeScript**: v5.9.3
- **Styling**: Tailwind CSS v4.1.15
- **UI Components**: Radix UI primitives
- **Theme**: next-themes for dark mode support
- **Icons**: lucide-react

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # Reusable React components
│   ├── ui/          # Base UI components (shadcn-style)
│   └── theme/       # Theme-related components
├── features/        # Feature-based modules
│   └── ticket/      # Ticket management feature
├── lib/             # Utility functions
├── data.ts          # Mock data
└── paths.ts         # Route path helpers
```

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint (deprecated, use ESLint CLI)
- `npm run lint-fix` - Auto-fix linting issues
- `npm run type` - TypeScript type checking

## Coding Standards

- **Component Pattern**: Use Server Components by default, add `'use client'` only when needed
- **Async Params**: In Next.js 15, route params are async (e.g., `const { id } = await params`)
- **TypeScript**: Strict mode enabled
- **Imports**: Use `@/` path alias for src directory
- **Styling**: Tailwind utility classes with cn() helper for conditional classes

## Notes

- Remove console.log statements before production
- Always add `'use client'` directive for components using client-side hooks (useState, useEffect, useTheme, etc.)
- Follow Next.js 15 conventions for Server/Client component separation
