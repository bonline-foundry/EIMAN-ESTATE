# Brochure grab cursor — design

Date: 2026-10-17
Status: approved by user 2026-10-17 (option A: hand only over pages)

## Problem

On `/brochure` (desktop, mouse), moving the pointer near a page corner makes the
page curl up by itself, before any click. The cursor stays the default arrow, so
nothing tells the user the page can be grabbed.

## Wanted behavior

1. Pointer over a page: cursor is an open hand (`grab`). The page does not move.
2. Mouse button pressed on a page: cursor is a closed hand (`grabbing`). It stays
   closed for the whole press, even if the pointer leaves the page while dragging.
3. Press and drag: the page follows the pointer and turns. This drag-to-turn
   already exists in page-flip (fold starts after 5px of movement).
4. The empty half of the book area beside the cover and the last page shows the
   normal cursor (decision A: hand only over pages).

## Design

- `src/components/brochure/FlipBook.tsx`: pass `showPageCorners: false` to the
  `PageFlip` constructor. In page-flip, this option alone drives the hover corner
  curl (`userMove` calls `showCorner` only when it is on and no press is active).
  Press-and-drag folding is unchanged.
- `src/app/globals.css`:
  - `.brochure-page { cursor: grab; }`
  - `.brochure-book:active, .brochure-book:active * { cursor: grabbing; }`

## Unchanged / out of scope

- Click-to-flip stays disabled (`disableFlipByClick: true`).
- Touch devices: no cursor; swipe behavior is unchanged.
- Zoomed mode: the book has `pointer-events: none` and the stage already shows
  `cursor-grab active:cursor-grabbing` for panning. No conflict.
- Arrow buttons, thumbnails, and keyboard turning are unchanged.

## Verification

Playwright on `http://localhost:3001/brochure` at desktop width:
- Computed cursor on a `.brochure-page` is `grab`.
- Hovering near a page corner does not start a fold (page-flip state stays `read`).
- Mouse down plus drag across the page turns it (page index changes).
