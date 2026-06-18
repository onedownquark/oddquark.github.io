# oddquark.github.io

Personal space-nerd contact page for **oddquark** — amateur space enthusiast posting NASA, SpaceX, and spaceflight updates.

Live site: [https://oddquark.github.io](https://oddquark.github.io)

## Features

- **Visually Striking:** Dark cosmic palette with nebula accents.
- **Animated Background:** Subtle CSS/Canvas starfield with optimized cosmic background image.
- **Optimized Assets:** High-resolution source images optimized to WebP for fast loading.
- **Responsive:** Mobile-first design using Tailwind CSS v4.
- **Accessibility:** Respects `prefers-reduced-motion`.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite**
- **Tailwind CSS v4** (@tailwindcss/vite)
- **Sharp** (Image optimization)
- **GitHub Pages** (via GitHub Actions)

## Development

### Install Dependencies

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Image Optimization

The site uses optimized versions of the assets found in `public/images/`. To re-run optimization:

```bash
npm run optimize-images
```

*Note: Raw assets (`onedownquark-chatgpt.png`, `flux_background.jpeg`) are kept in the repo for source but the site loads the optimized WebP versions.*

## Deployment

Pushes to the `main` branch automatically trigger the GitHub Actions workflow in `.github/workflows/deploy.yml` to deploy to GitHub Pages.
