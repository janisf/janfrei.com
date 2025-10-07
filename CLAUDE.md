# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for janfrei.com - a personal profile/landing page built with TailwindCSS and Vue.js. The site is deployed to GitHub Pages.

## Build System

This project uses **npm scripts** with TailwindCSS CLI for building and watching files.

### Node.js Version:
- Node.js 20 (specified in [.nvmrc](.nvmrc))
- Use `nvm use` to switch to the correct version locally

### Key directories:
- `source/` - Source files (HTML, CSS, assets)
- `build/` - Compiled output (deployed to GitHub Pages, git-ignored)

### Commands:
- `npm run dev` - **Start development server** (builds, watches all files, serves on http://localhost:3000 with auto-reload)
- `npm run build` - Build the entire site (CSS + HTML + assets)
- `npm run serve` - Serve the build directory with BrowserSync
- `npm run watch:css` - Watch CSS files only
- `npm run watch:html` - Watch HTML files only
- `npm run watch:assets` - Watch asset files only
- `npm run build:css` - Build and minify CSS only
- `npm run build:html` - Copy HTML to build directory
- `npm run build:assets` - Copy assets to build directory

### Development workflow:
1. Run `npm run dev` to start the development server
2. Browser opens automatically at http://localhost:3000
3. Edit any files in `source/` - all changes (CSS, HTML, assets) auto-rebuild and reload the browser

### Build process:
The build script:
- Processes TailwindCSS via the Tailwind CLI
- Compiles and minifies `source/css/main.css` to `build/css/main.css`
- Copies `source/index.html` to `build/index.html`
- Copies all files from `source/assets/` to `build/assets/`

**Important**: The `build/` directory is git-ignored. GitHub Actions runs `npm run build` on every push to generate fresh build artifacts for deployment.

## Styling Architecture

The project uses **TailwindCSS 3.x** with custom color extensions for social media branding.

### Custom colors (in [tailwind.config.js](tailwind.config.js)):
- `facebook`, `linkedin`, `github`, `instagram`, `telegram`, `twitter`, `nomadlist`, `threads`

### CSS structure:
- [source/css/main.css](source/css/main.css) - Contains Tailwind directives and custom styles for social media icon hover states
- Tailwind's `@layer base` is used for component-specific styles (social media SVG fills)

## Frontend Architecture

The page uses a minimal Vue.js 3 setup (CDN-loaded, not compiled):
- Vue app mounts to `#social-media-links`
- Social media data is defined inline in the HTML (`socialMedia` array)
- Each social item includes: `url`, `icon` (SVG string), and `color` (Tailwind hover classes)

When editing social media links or icons, modify the `socialMedia` array in [source/index.html](source/index.html).

## Deployment

The site deploys automatically to GitHub Pages via GitHub Actions ([.github/workflows/static.yml](.github/workflows/static.yml)):
- Trigger: Push to `main` branch
- CI installs dependencies with `npm ci`
- CI runs `npm run build` to generate the `build/` directory
- Deploys the generated `build/` directory to GitHub Pages

**Workflow**: Edit `source/` → Commit changes → Push → GitHub Actions builds and deploys automatically

## Image Assets

Profile images use responsive formats:
- WebP format with JPG fallbacks
- 1x and 2x resolution variants
- Located in `source/assets/` (e.g., `profile-2025.jpg`, `profile-2025@0.5x.jpg`)
