# Rosario Paulty Farm — Website

React + TypeScript + Vite + Tailwind CSS (v3) + GSAP + Lenis + lucide-react. Designed mobile-first.

## Run it

Requires Node.js 18 or newer.

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).
Build for production with `npm run build` (output in `dist/`), preview it with `npm run preview`.

## What's in the design

- **Lenis** smooth scrolling, synced with **GSAP ScrollTrigger** (`src/lib/smooth.ts`). Touch devices keep native scrolling.
- Hero with the poultry-house photo, word-by-word headline reveal, slow zoom and scroll parallax.
- Scroll-reveal content, image wipe reveals, animated price counter, cursor-follow spotlight cards,
  magnetic hero button and a scrolling marquee (`src/components/`).
- Mobile: full-screen menu, snap-scroll product cards, large touch targets, and a bottom action bar
  (Order / SMS) that appears after the hero.
- "Add a tray" on a product card adds it to the Order Builder and scrolls there.
- Respects `prefers-reduced-motion` (no smooth scroll or animations), keyboard focus rings, skip link.

## Photos

Photos are looked up by file name (without the extension) and can be jpg, jpeg, png or webp.
If a photo is missing, the site shows initials or an egg illustration instead.

- `src/assets/farm/`: `farm-3` (hero background), `farm-1` and `farm-2` (About Us section)
- `src/assets/eggs/`: `egg-tray` (used for all three sizes; see `src/data/products.ts`)
- `src/assets/owners/`: `gloria-semira`, `rene-semira`, `jerry-semira`, `archie-macaraig`
  (Archie has no photo yet, so his card shows initials)

## Edit content

- Business name, landmark, delivery coverage: `src/data/business.ts`
- Egg sizes, prices and short descriptions: `src/data/products.ts`
- Phone numbers, Facebook profiles: `src/data/contacts.ts`
