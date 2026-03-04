# Yamazing Corp Design System

## Overview

The English Mastery Hub Design System is a warm, professional visual language that supports both light and dark themes. It draws inspiration from modern fintech and productivity applications, prioritizing readability, hierarchy, and subtle delight.

## Design Principles

1. **Warmth over Coldness** — Amber/gold tones instead of typical blue tech palettes
2. **Clarity over Decoration** — Every element serves a purpose
3. **Depth through Subtlety** — Gentle shadows, gradient overlays, and glassmorphism rather than hard borders
4. **Consistency across Themes** — Both modes feel intentional, not inverted

## Color System

### Light Theme

| Token | Value | Usage |
|-------|-------|-------|
| `bg` | `#FAFAF7` | Page background |
| `bgAlt` | `#F2F0EB` | Secondary surfaces, inputs |
| `bgCard` | `#FFFFFF` | Card surfaces |
| `accent` | `#D4A017` | Primary actions, gold highlights |
| `accentDim` | `rgba(212,160,23,0.10)` | Accent backgrounds |
| `secondary` | `#1B6B4A` | Success, secondary actions (forest green) |
| `tertiary` | `#E85D3A` | Warnings, emphasis (terracotta) |
| `text` | `#1A1A18` | Primary text |
| `textSec` | `#6B6960` | Secondary text |
| `textMut` | `#9E9A8F` | Muted text, placeholders |
| `border` | `rgba(0,0,0,0.07)` | Subtle borders |
| `success` | `#2D9F6F` | Success states |
| `error` | `#D94F4F` | Error states |
| `warning` | `#E5A100` | Warning states |
| `info` | `#4A8FD4` | Informational states |

### Dark Theme

| Token | Value | Usage |
|-------|-------|-------|
| `bg` | `#0E1117` | Page background |
| `bgAlt` | `#161A22` | Secondary surfaces |
| `bgCard` | `#1A1F2B` | Card surfaces |
| `accent` | `#F0C246` | Primary actions, bright gold |
| `secondary` | `#3DD9A0` | Success, secondary (mint) |
| `tertiary` | `#FF7A5C` | Warnings, emphasis (coral) |
| `text` | `#ECE9E1` | Primary text |

## Typography

### Font Stack

| Role | Font Family | Fallback |
|------|-------------|----------|
| Display | **Outfit** | system-ui |
| Body | **Plus Jakarta Sans** | -apple-system, sans-serif |
| Code | **monospace** | Courier New |

### Type Scale

| Element | Size | Weight | Font |
|---------|------|--------|------|
| Hero Title | 42px | 800 | Outfit |
| Section Title | 28px | 800 | Outfit |
| Card Title | 18-19px | 750 | Outfit |
| Body | 14-15px | 400-500 | Plus Jakarta Sans |
| Caption | 12-13px | 500-600 | Plus Jakarta Sans |
| Overline | 10-11px | 600 | Plus Jakarta Sans |
| Badge | 11-13px | 650 | Plus Jakarta Sans |

### Letter Spacing

- Headings: `-0.02em` to `-0.03em` (tight)
- Body: `0` (default)
- Overlines/Labels: `0.08em` to `0.12em` (wide)

## Components

### Card

The primary container component. Features rounded corners, subtle shadow, and optional hover elevation.

```
Border Radius: 22px
Padding: 28px (default), 24px (compact)
Shadow: 0 1px 3px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.03)
Shadow (hover): 0 4px 12px rgba(0,0,0,0.06), 0 12px 40px rgba(0,0,0,0.06)
Gradient Overlay: subtle bottom-to-top accent tint
Transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1)
Hover: translateY(-3px) + enhanced shadow
```

### Button (Btn)

Six variants with three sizes.

| Variant | Background | Text Color |
|---------|-----------|------------|
| `primary` | Gradient accent | Dark text |
| `secondary` | Secondary dim | Secondary color |
| `ghost` | Transparent | Secondary text |
| `success` | Success solid | White |
| `warning` | Warning solid | Dark text |
| `danger` | Error dim | Error color |

| Size | Padding | Font Size |
|------|---------|-----------|
| `sm` | 7px 14px | 12px |
| `md` | 11px 22px | 13px |
| `lg` | 14px 28px | 15px |

```
Border Radius: 14px
Font Weight: 650
Transition: all 0.25s
```

### Badge

Color-coded status indicators.

```
Border Radius: 20px
Padding: 4px 12px (sm), 6px 16px (md)
Font Weight: 650
```

### Pill

Toggle selector buttons for category navigation.

```
Border Radius: 14px
Padding: 9px 18px
Border: 1.5px solid
Active: filled background, light text
Inactive: alt background, secondary text
```

### Progress Bar

Animated horizontal indicator.

```
Height: 5px
Border Radius: 3px
Background: bgAlt
Fill Transition: width 0.5s ease
Width: 80px (inline usage)
```

### Chat Bubble

Conversation message container.

```
User: accent color, right-aligned, radius 20/20/6/20
Assistant: card background, left-aligned, radius 20/20/20/6
Padding: 14px 20px
Font Size: 14px
Line Height: 1.65
```

## Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `xs` | 4px | Badge padding, tight gaps |
| `sm` | 8px | Inline gaps, small margins |
| `md` | 14-16px | Component gaps, section margins |
| `lg` | 22-28px | Module margins, card padding |
| `xl` | 32-44px | Page padding, hero sections |

## Animations

### Page Transition

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
/* Duration: 0.4s ease */
```

### Loading Dots

```css
@keyframes pulse {
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1); }
}
/* Duration: 1.2s, staggered 0.2s per dot */
```

### Hover Elevation

```css
transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
/* translateY(-3px) + enhanced shadow */
```

## Navigation

Sticky top navbar with frosted glass effect.

```
Background: bgNav (semi-transparent)
Backdrop Filter: blur(20px) saturate(180%)
Border Bottom: 1px solid border
Active Indicator: 2.5px solid accent (bottom border)
```

## Theme Toggle

Animated slider control in the navbar.

```
Track: 54px × 30px, 15px radius
Thumb: 24px circle with emoji indicator
Animation: left 0.35s cubic-bezier(0.22, 1, 0.36, 1)
Light Icon: ☀️
Dark Icon: 🌙
```

## Patterns & Textures

### Hero Dot Pattern

```css
background-image: radial-gradient(circle, rgba(0,0,0,0.03) 1px, transparent 1px);
background-size: 20px 20px;
```

### Decorative Orbs

Radial gradient circles positioned absolutely for depth:
- Primary orb: accent color, top-right, 280px diameter
- Secondary orb: secondary color, bottom-right, 200px diameter
- Both use low opacity (0.7-0.9) with transparent fade

## Accessibility

- All interactive elements have focus-visible outlines (2px accent)
- Color contrast meets WCAG AA for both themes
- Semantic heading hierarchy (h1 → h3)
- Button disabled states are visually distinct
- Input focus states with border color change
