<h1 align="center">@zai/token-command-center</h1>

<p align="center">
  Reusable Command Center panel with sidebar navigation for React / Next.js applications.<br/>
  <strong>Pure UI shell. Zero business logic. Zero hardcoded data. Zero CSS dependencies.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/github/v/tag/Sts8987/Token-command-center?style=flat-square&label=version" alt="version" />
  <img src="https://img.shields.io/github/license/Sts8987/Token-command-center?style=flat-square" alt="license" />
  <img src="https://img.shields.io/badge/react-18%2B-61dafb?style=flat-square" alt="react" />
  <img src="https://img.shields.io/badge/typescript-5-3178c6?style=flat-square" alt="typescript" />
  <img src="https://img.shields.io/badge/zero_CSS-✓-22c55e?style=flat-square" alt="zero css" />
</p>

---

You define sections and items — the component renders them in a professional panel with search, keyboard navigation, and theme customization.

## Install

```bash
npm install github:Sts8987/Token-command-center
```

> The `prepare` script will automatically build `dist/` after install.

**После публикации на npm** команда станет проще:
```bash
npm install @zai/token-command-center
```

### Peer Dependencies

```json
{
  "react": ">=18.0.0",
  "react-dom": ">=18.0.0",
  "lucide-react": ">=0.300.0"
}
```

## Quick Start

```tsx
'use client'

import CommandCenter, { type SectionConfig } from '@zai/token-command-center'
import { Palette, Keyboard, Info, Paintbrush } from 'lucide-react'

const sections: SectionConfig[] = [
  {
    id: 'design',
    label: 'DESIGN',
    icon: Palette,
    accent: '#8b5cf6',
    items: [
      {
        id: 'colors',
        label: 'Color Palette',
        icon: Paintbrush,
        shortcut: 'C',
        content: <div>Your color palette content here</div>,
      },
    ],
  },
  {
    id: 'help',
    label: 'HELP',
    icon: Info,
    accent: '#f59e0b',
    items: [
      {
        id: 'shortcuts',
        label: 'Shortcuts',
        icon: Keyboard,
        content: <div>Your shortcuts content here</div>,
      },
    ],
  },
]

export default function App() {
  return <CommandCenter sections={sections} />
}
```

## API Reference

### `<CommandCenter />` Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `sections` | `SectionConfig[]` | **required** | Sections with items to display |
| `defaultItemId` | `string` | first item | Default active item id |
| `triggerOpen` | `number` | - | Increment to externally trigger open |
| `openTab` | `string` | - | Item id to activate when triggerOpen fires |
| `isOpen` | `boolean` | - | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | - | Callback when open state changes |
| `theme` | `CommandCenterTheme` | (see below) | Theme overrides |
| `animation` | `AnimationVariant` | `'slide-up'` | Panel entrance animation |
| `trigger` | `TriggerConfig` | (see below) | Floating trigger button config |
| `hideTrigger` | `boolean` | `false` | Hide the default trigger button |
| `searchable` | `boolean` | `true` | Show search bar |
| `showShortcuts` | `boolean` | `true` | Show keyboard shortcut hints |
| `persistState` | `string` | - | localStorage key for persisting state |
| `maxWidth` | `string` | `'1024px'` | Max width of the panel (CSS value) |
| `showFooter` | `boolean` | `true` | Show footer with ESC hint |
| `footerSlot` | `ReactNode` | - | Custom footer content |
| `sidebarHeaderSlot` | `ReactNode` | - | Custom sidebar header content |

### `SectionConfig`

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique section id |
| `label` | `string` | Section header label |
| `icon` | `LucideIcon` | Section header icon |
| `accent` | `string` | Accent color (hex) |
| `items` | `ItemConfig[]` | Items in this section |

### `ItemConfig`

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique item id |
| `label` | `string` | Display label |
| `icon` | `LucideIcon` | Sidebar icon |
| `content` | `ReactNode` | Content when active |
| `badge?` | `number` | Badge count |
| `shortcut?` | `string` | Keyboard shortcut hint |
| `disabled?` | `boolean` | Disable this item |
| `isFavorite?` | `boolean` | Show star indicator |
| `lastUsed?` | `number` | Timestamp for recently-used |

### `CommandCenterTheme`

| Field | Default | Description |
|---|---|---|
| `bg` | `'#0c0c14'` | Panel background |
| `sidebarBg` | `'rgba(255,255,255,0.015)'` | Sidebar background |
| `text` | `'#c3cee3'` | Text color |
| `muted` | `'#565575'` | Muted text color |
| `accent` | `'#c792ea'` | Default accent |
| `border` | `'rgba(199,146,234,0.15)'` | Border color |
| `font` | `"'Geist Mono', ui-monospace, ..."` | Font family |
| `overlayBg` | `'rgba(0,0,0,0.65)'` | Overlay background |

### `AnimationVariant`

```ts
type AnimationVariant = 'slide-up' | 'slide-right' | 'fade-scale' | 'none'
```

### `TriggerConfig`

| Field | Default | Description |
|---|---|---|
| `icon` | `Terminal` | Lucide icon component |
| `position` | `'right'` | `'left'` / `'center'` / `'right'` |
| `size` | `48` | Button size in px |
| `accent` | theme.accent | Button accent color |
| `ariaLabel` | `'Open Command Center'` | Accessible label |

## Features

### Sidebar Navigation
- Grouped sections with color-coded accents
- Active item indicator (left border + highlight)
- Favorite (star) and recently-used (clock) indicators
- Badge counts on items

### Search
- Filter across item labels, section labels, and shortcuts
- Press `/` to focus search
- Clear button

### Keyboard Navigation
- `Arrow Up/Down` — navigate sidebar items
- `Enter` — select focused item
- `Escape` — close panel
- `/` — focus search

### Mobile Responsive
- Collapsible sidebar on screens < 768px
- Toggle button in header
- Auto-hide sidebar on item select

### State Management
- **Uncontrolled**: component manages its own open state
- **Controlled**: pass `isOpen` + `onOpenChange` for full control
- **External trigger**: increment `triggerOpen` to open from parent
- **CustomEvent**: dispatch `zai-open-command-center` with `{ detail: { tab: 'itemId' } }`
- **Persistence**: pass `persistState="my-key"` to save active item to localStorage

### Theming
All visual properties are customizable via the `theme` prop. Defaults use a dark Code Art aesthetic.

## Controlled Usage

```tsx
const [isOpen, setIsOpen] = useState(false)

<CommandCenter
  sections={sections}
  isOpen={isOpen}
  onOpenChange={setIsOpen}
  hideTrigger
/>
```

## Custom Trigger Button

```tsx
<CommandCenter
  sections={sections}
  trigger={{
    icon: Settings,
    position: 'left',
    size: 40,
    accent: '#22c55e',
    ariaLabel: 'Settings',
  }}
/>
```

## Building from Source

```bash
git clone https://github.com/Sts8987/Token-command-center.git
cd Token-command-center
npm install
npm run build
```

## Tech Stack

- React 18+
- TypeScript 5
- Lucide React (icons)
- tsup (build)

## Zero CSS Dependencies

This component uses **only inline styles** and injected CSS keyframes. It does NOT require Tailwind CSS, CSS Modules, styled-components, or any other CSS framework. It works out of the box in any React project.

## License

MIT
