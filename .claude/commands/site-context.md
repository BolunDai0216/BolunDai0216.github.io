# Site Context

This is Bolun Dai's personal website, hosted on GitHub Pages at BolunDai0216.github.io.

## Project Structure

```
BolunDai0216.github.io/
├── bolun-site/          # Astro project root (all dev work happens here)
│   ├── src/
│   │   ├── pages/       # One .astro file per route (index.astro → /, etc.)
│   │   ├── layouts/     # Layout.astro is the shared HTML shell (head, body wrapper)
│   │   └── components/  # Reusable Astro components
│   ├── public/          # Static assets served as-is (favicon, images)
│   ├── dist/            # Build output (gitignored) — what gets deployed
│   ├── astro.config.mjs
│   └── package.json
├── .claude/             # Claude Code settings and skills
├── .gitignore
├── .mise.toml           # Pins Node 22 locally via mise
└── README.md
```

## Local Development

All commands run from `bolun-site/`:

```bash
cd bolun-site
mise exec -- npm run dev      # Start dev server at http://localhost:4321
mise exec -- npm run build    # Build to dist/
mise exec -- npm run preview  # Preview the build locally
```

Node version is managed by mise (pinned to Node 22 in `.mise.toml`). Run `mise install` from the repo root if switching machines.

## Deployment

The site deploys to GitHub Pages from the `main` branch. A GitHub Actions workflow is needed to build the Astro project and push the `dist/` output to the `gh-pages` branch (or configure Pages to use Actions output directly).

**This is not yet set up** — deployment via Actions still needs to be configured.

## Pages

| File | Route | Status |
|------|-------|--------|
| `src/pages/index.astro` | `/` | Done — interactive dot grid background |

Planned pages: `/research`, `/cv`, `/blog`

## Features

### Interactive Dot Grid (index.astro)
- Full-viewport grid of circular dots (`#fffce1` on `#0e100f` background)
- Dot size: 24px, gap: 12px, boundary padding: 24px on all sides
- Grid is built dynamically in JS to fill the viewport at any screen size
- On **pointer hover**: dots within 70px are pulled toward the cursor (elastic snap back)
- On **click**: dots scatter upward with physics, then reverse back into place
- Powered by GSAP + `Physics2DPlugin` (installed via npm)
- Grid rebuilds on window resize (only when no click animation is in progress)

### Key constants to tweak (index.astro `<script>`)
| Constant | Default | Effect |
|----------|---------|--------|
| `SIZE` | `24` | Dot diameter in px |
| `GAP` | `12` | Space between dots in px |
| `PADDING` | `24` | Boundary gap from viewport edges |
| `PULL_DISTANCE` | `70` | Radius of mouse influence in px |

### Colors (index.astro `<style>`)
| Variable | Value | Use |
|----------|-------|-----|
| `background-color` (body) | `#0e100f` | Page background |
| `background-color` (.cell) | `#fffce1` | Dot color |

## Design Decisions

- **No SSG-generated dot grid** — dot count depends on viewport size, so the grid is built client-side in JS
- **`is:global` on body styles** — Astro scopes styles to components by default; `is:global` is needed for `body` overrides
- **`.row` and `.cell` use `:global()`** — because they are injected dynamically by JS, not rendered by Astro's template, so scoped styles wouldn't reach them
- **Fixed theme** — no `prefers-color-scheme` media queries; all visitors see the same dark theme
- **No framework** — plain Astro (no React/Vue/Svelte) since the interactivity is handled entirely by GSAP

## Adding a New Page

1. Create `bolun-site/src/pages/my-page.astro`
2. Use the shared layout:
   ```astro
   ---
   import Layout from '../layouts/Layout.astro';
   ---
   <Layout>
     <!-- page content -->
   </Layout>
   ```
3. It's automatically available at `/my-page`

## Adding a New Dependency

```bash
cd bolun-site
mise exec -- npm install <package>
```
