# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-04-20

### Breaking Changes
- **`maxWidth` prop** now accepts CSS values (`'1024px'`, `'64rem'`, `'80vw'`) instead of Tailwind classes (`'max-w-5xl'`). Default changed from `'max-w-5xl'` to `'1024px'`.

### Fixed
- **CRITICAL: Removed Tailwind CSS dependency** — All 28 `className` attributes with Tailwind utility classes converted to inline styles. The component is now fully self-contained and works in any React project without requiring a CSS framework.
- **Double `'use client'` directive** — Removed duplicate from source file; tsup banner handles it.
- **`tsup` moved from `dependencies` to `devDependencies`** — Consumers no longer install the build tool as a runtime dependency.
- **`React.ReactNode` → `ReactNode`** — Added explicit `import type { ReactNode } from 'react'` in types.ts for better compatibility with strict TypeScript configurations.
- **`styleInjected` singleton removed** — Now uses DOM-based idempotency check (`document.getElementById('cc-keyframes')`) for better SSR/HMR reliability.
- **`package-lock.json` removed from repo** — Added to `.gitignore`; not needed for a library package.
- **Build config simplified** — Removed separate `types` entry point from tsup config, eliminating unnecessary `types.js`/`types.mjs` output files.
- Responsive `md:` prefixes (handled via existing `isMobile` state instead of Tailwind breakpoints)

### Removed
- Hover/active scale effects on trigger button (incompatible with inline styles, non-essential)

## [1.0.1] - 2025-04-18

### Fixed
- **S1**: `document.body.style.overflow` leak on unmount — saved and restored previous value
- **S2**: SSR-safe `localStorage` — all calls wrapped in `typeof window` checks
- **S4**: `maxWidth` prop sanitized with Tailwind class whitelist (prevents injection)
- **R1-R2**: Keyboard handler no longer re-registers on every `focusedIndex`/`searchQuery` change (useRef pattern)
- **R3**: `<style>` keyframes injected once per mount instead of every render
- **R4**: Active item lookup O(1) via `Map` instead of O(n) `Array.find()`
- **R5**: Filtered items index O(1) via `Map` instead of O(n) `findIndex()` per item
- **R6**: Recent items lookup O(1) via `Set` instead of O(n) `Array.includes()`
- **A1**: Focus trap added (Tab key cycles within dialog)
- **A2**: ARIA roles added: `role="listbox"` on sidebar, `role="group"` on sections, `role="option"` on items
- **A3**: `aria-selected` on sidebar items for screen reader support
- Search clear button: replaced non-ASCII `×` with ASCII `x`
- Added `aria-label` on search input and clear button

## [1.0.0] - 2025-04-18

### Added
- CommandCenter component with sidebar navigation and content area
- SectionConfig + ItemConfig type system for declarative content
- 4 animation variants: slide-up, slide-right, fade-scale, none
- Theme customization via CommandCenterTheme (8 configurable properties)
- Search / filter across all items and sections
- Keyboard navigation: Arrow Up/Down, Enter, ESC, / (focus search)
- Controlled / uncontrolled open state (isOpen + onOpenChange)
- External trigger via triggerOpen prop + CustomEvent API
- Floating trigger button with configurable icon, position, size, accent
- Mobile responsive: collapsible sidebar, adaptive layout
- Badge counts on sidebar items
- Keyboard shortcut hints in sidebar
- Favorite (star) and recently-used (clock) indicators
- Persistent state via localStorage (persistState prop)
- Custom footer and sidebar header slots
- Tailwind CSS class support (maxWidth prop)
- Built-in CSS keyframes for animations (no external CSS needed)
- Full TypeScript support with exported types
- Dual package: ESM (.mjs) + CJS (.js) with type declarations
