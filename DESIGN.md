# OmniNStack Design System

Reference doc for the visual language used across omninstack.github.io. Source of truth is `style.css` — this file is a human-readable summary of it; if the two disagree, trust the CSS and update this doc.

## Brand Colors (60:30:10 rule)

| Role | Variable | Hex | Usage |
|---|---|---|---|
| Primary (60%) | `--navy` | `#001F3F` | Sovereign Navy — backgrounds, hero gradient base, primary button text color |
| Secondary (30%) | `--silver` | `#8E9294` | Titanium Silver — secondary text, gradient-text endpoint |
| Accent (10%) | `--cyan` | `#00E5FF` | Core Cyan — links, glow effects, `.accent-text`, borders on hover/focus |

Cyan is the "signal" color — used sparingly and deliberately (icons, eyebrows, hover states, glow). Don't let it creep past ~10% of any view or it stops reading as an accent.

## Base Palette

| Variable | Hex | Usage |
|---|---|---|
| `--bg-deep` | `#020408` | Page background (near-black) |
| `--text-primary` | `#FFFFFF` | Headings, primary body text |
| `--text-secondary` | `#B0B3B8` | Paragraph copy, card descriptions |
| `--text-muted` | `#6D727A` | Footnotes, copyright lines |

## Gradients

| Variable | Definition | Usage |
|---|---|---|
| `--grad-hero` | `linear-gradient(135deg, var(--navy) 0%, #000 100%)` | Hero/section backgrounds |
| `--grad-cyan` | `linear-gradient(135deg, var(--cyan) 0%, #00B2CC 100%)` | Primary button fill |
| `--grad-text` | `linear-gradient(135deg, #FFF 0%, var(--silver) 100%)` | `.gradient-text` utility — white-to-silver text fill |

## Effects

| Variable | Value | Notes |
|---|---|---|
| `--glass-border` | `rgba(0, 229, 255, 0.2)` | Border color for all glass panels |
| `--glass-bg` | `rgba(0, 25, 50, 0.4)` | Fill for `.glass-card` / `.glass-box`, paired with `backdrop-filter: blur(25px)` |
| `--ease` | `all 0.6s cubic-bezier(0.16, 1, 0.3, 1)` | The one motion curve used sitewide — hover states, reveals |

## Typography

**Fonts** (loaded via Google Fonts, `index.html` `<head>`):
- **Inter** — weights 400/500/600/700/800/900 — headings + body (`font-family: 'Inter', sans-serif`)
- **Roboto Mono** — weights 400/500/700 — eyebrows, labels, badges (`.mono`)

**Heading scale:**
| Element | Size | Weight | Notes |
|---|---|---|---|
| `h1` | `clamp(3.5rem, 10vw, 6.5rem)` | 900 | `letter-spacing: -0.05em`, `line-height: 1.05` |
| `h2` | `clamp(2.5rem, 6vw, 4rem)` | 900 | same tracking/leading as h1 |
| `h3` / `h4` | no global size — set per-instance inline, typically `1.25rem`–`2.2rem` | 900 (inherits from `h1,h2,h3,h4` rule) | still gets the `-0.05em` tracking + `text-wrap: balance` |

**Utility classes:**
- `.gradient-text` — applies `--grad-text` as a background-clipped text fill (white → silver)
- `.accent-text` — cyan color + `text-shadow: 0 0 20px rgba(0,229,255,0.4)` glow; use for single words/phrases needing emphasis, not full sentences
- `.mono` — Roboto Mono, 500 weight, `0.05em` letter-spacing, cyan — used for eyebrow labels (e.g. "THE PLATFORM") and small metadata text
- `h4.mono` — the specific "eyebrow" pattern seen above every section H2: `1.1rem`, weight 700, `0.3em` letter-spacing, uppercase

**Brand name convention:** product names (Outward, Contexa) get wrapped in `<strong class="accent-text">` wherever they appear in body copy, sitewide — keep this consistent when adding new copy that names a product.

## Components

**`.glass-card`** — the core card component (feature grids, industry cards, etc.)
- `background: var(--glass-bg)`, `backdrop-filter: blur(25px)`, `border: 1px solid var(--glass-border)`, `border-radius: 28px`, `padding: 3.5rem`
- Top edge gets a 1px cyan gradient line via `::before`
- Hover: border turns solid cyan, lifts `translateY(-10px) scale(1.02)`, gains a soft cyan glow shadow
- `.card-featured` variant: cyan border by default (no hover needed) + darker navy-to-black gradient fill — used to highlight a card as primary/flagship

**`.glass-box`** — lighter-weight variant of glass-card (`padding: 3rem`, no hover lift) used for static content panels on secondary pages (Company, Developers)

**Buttons (`.btn`)** — uppercase, `0.2em` letter-spacing, bold, `16px` radius, pill-ish padding (`1.25rem 3.5rem`)
- `.btn-primary` — cyan gradient fill, navy text, cyan glow shadow, lifts on hover
- `.btn-outline` — translucent white fill + cyan glass border, text turns cyan on hover

**Badges/pills** — `.soon-badge`, `.stat-pill`, `.lang-pill` all use fully-rounded (`100px`) radius for pill shapes; distinct from card radius.

## Border Radius Scale

| Radius | Used by |
|---|---|
| `16px` | Buttons |
| `20px` | `.layer-box`, `.table-responsive` |
| `28px` | `.glass-card`, `.glass-box` (the default "card" radius) |
| `32px` | `.executive-summary` (large feature panel) |
| `100px` | Pills/badges (fully rounded) |

## Layout

- `--container-width: 1200px` — max content width, centered via `.container { margin: 0 auto; padding: 0 2rem; }`
- Section vertical rhythm: `padding: clamp(6rem, 12vh, 12rem) 0` on every `<section>`
- Feature/card grids use `.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(...)); }` — auto-wrapping, not fixed column counts

## Motion

- `.reveal` — scroll-triggered fade/slide-in, respects `prefers-reduced-motion: reduce` (animation disabled entirely for that group)
- All hover/transition motion uses the single `--ease` curve — don't introduce a second easing function without a reason
- Background hexagon pattern + floating "blob" gradients are decorative, low-opacity (`fill-opacity: 0.02`, blurred radial gradients) — meant to be felt, not noticed

## Background Texture

- `body::before` — a repeating inline-SVG hexagon pattern at 2% opacity, cyan fill, tiled 60x60px — the subtle texture visible across every page
- `.blob-1` / `.blob-2` — large (800px), heavily blurred (100px), slowly-animating radial gradients in navy/cyan — the soft glow drifting behind content
