# Mobile Brochure Pill — Design

Date: 2026-10-15

## Goal
Viewing or downloading the brochure is the primary user goal. On mobile, make it one tap away from every page with a persistent floating pill, matching `Asset/dESIGN aPPROCH/Mobile Responsive.png`.

## In scope
1. New `src/components/MobileBrochureButton.tsx`:
   - Fixed bottom-left (`bottom-6 left-6`, `sm:bottom-8 sm:left-8`) so it lines up with `FloatingControls` on the bottom-right.
   - Visible below `md` only (`md:hidden`), which is where the header's Brochure link is hidden.
   - Shows on every route except `/brochure`. Hidden on `/` while the intro animation runs (`useIntro().introDone === false`).
   - Pill: `h-12`, rounded-full, styled like the floating music button: `bg-white/50` glass, `backdrop-blur-xl`, `border-white/60`, `text-dark-green`, stroke document icon before the label "Brochure", DM Sans 16px.
   - Links to `/brochure` via `TransitionLink` (forward direction).
   - Framer Motion fade/slide-up on appear (ease `[0.16, 1, 0.3, 1]`, 0.8s).
   - z-index 50 (same layer as the floating controls, below the header's 100).
2. Render it in `src/app/layout.tsx` next to `<FloatingControls />`.
3. Remove the `Brochure` entry from `SECONDARY_NAV` in `src/components/Header.tsx`. This removes it from both the desktop and mobile menu overlays. The desktop header's inline Brochure link stays.

## Out of scope
- Desktop header Brochure link (unchanged).
- The `/brochure` viewer page.
- A direct PDF download in the pill (the viewer page already has Download).
- Changes to `FloatingControls`, `MusicToggle`, `FloatingSocial`.

## Assumptions
- Label spelled "Brochure" (the mockup's "Brocure" is a typo).
- The white glass style (same as the music button) stays legible on both the dark hero and light inner pages.
- Footer bottom padding is `pb-28` below md so the pill never covers the copyright line.

## Verification
- Mobile viewport (390px): pill visible bottom-left on `/` after the intro and on an inner page; absent on `/brochure`; tap opens `/brochure`.
- Desktop (≥768px): pill not rendered visibly; header Brochure link still present.
- Menu overlay no longer lists Brochure.
- `npx tsc --noEmit` and `npm run lint` pass.
