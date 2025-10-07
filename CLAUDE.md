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
- `npm run build` - Build the entire site (CSS + HTML + assets + WebP generation)
- `npm run serve` - Serve the build directory with BrowserSync
- `npm run watch:css` - Watch CSS files only
- `npm run watch:html` - Watch HTML files only
- `npm run watch:assets` - Watch asset files only
- `npm run build:css` - Build and minify CSS only
- `npm run build:html` - Copy HTML to build directory and replace version
- `npm run build:assets` - Copy assets to build directory and generate WebP images
- `npm run build:webp` - Generate WebP versions from JPG images

### Development workflow:
1. Run `npm run dev` to start the development server
2. Browser opens automatically at http://localhost:3000
3. Edit any files in `source/` - all changes (CSS, HTML, assets) auto-rebuild and reload the browser

### Build process:
The build script:
- Processes TailwindCSS via the Tailwind CLI
- Compiles and minifies `source/css/main.css` to `build/css/main.css`
- Copies `source/index.html` to `build/index.html` and replaces `__VERSION__` with the current version from `package.json`
- Copies all files from `source/assets/` to `build/assets/`
- Automatically generates WebP versions from all JPG images in `source/assets/` (quality: 85%)

**Important**:
- The `build/` directory is git-ignored. GitHub Actions runs `npm run build` on every push to generate fresh build artifacts for deployment.
- The source HTML uses `__VERSION__` placeholder for cache busting (e.g., `css/main.css?v=__VERSION__`), which gets replaced with the actual version during build.
- Only store JPG source images in `source/assets/` - WebP versions are auto-generated during build.

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
- CI installs Node.js 20 and dependencies with `npm ci`
- CI runs `npm run build` to generate the `build/` directory (including CSS compilation, version replacement, and WebP generation)
- CI uploads and deploys the `build/` directory to GitHub Pages

**Workflow**: Edit `source/` → Commit to `main` branch → Push → GitHub Actions automatically builds and deploys

**Note**: The `build/` directory is git-ignored locally but generated fresh on every CI run, ensuring consistent deployments.

## Image Assets

Profile images use responsive formats:
- Source images: JPG files in `source/assets/` (e.g., `profile-2025.jpg`, `profile-2025@0.5x.jpg`)
- Build process automatically generates WebP versions using `sharp-cli` at 85% quality
- HTML uses `<picture>` tags with WebP as primary format and JPG as fallback
- 1x and 2x resolution variants for retina displays
