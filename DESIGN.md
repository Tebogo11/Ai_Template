---
name: Outfit AI
description: AI outfit visualization — preview confidence before checkout
colors:
  burnt-amber-gold: "#AA6709"
  deep-teal: "#006366"
  marine-blue: "#00658A"
  warm-paper-white: "#FBF9FB"
  blush-fog: "#EDE8EC"
  dust-mauve: "#DFD8DE"
  ink-navy-black: "#06090F"
typography:
  display:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.5rem, 8vw, 8rem)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 900
    lineHeight: 1.05
  title:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    letterSpacing: "0.16em"
rounded:
  none: "0px"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.burnt-amber-gold}"
    textColor: "{colors.warm-paper-white}"
    rounded: "{rounded.none}"
    padding: "12px 32px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink-navy-black}"
    rounded: "{rounded.none}"
    padding: "12px 32px"
  button-secondary:
    backgroundColor: "{colors.deep-teal}"
    textColor: "{colors.warm-paper-white}"
    rounded: "{rounded.none}"
    padding: "8px 24px"
  card:
    backgroundColor: "{colors.blush-fog}"
    textColor: "{colors.ink-navy-black}"
    rounded: "{rounded.none}"
    padding: "32px"
---

# Design System: Outfit AI

## 1. Overview

**Creative North Star: "The Editorial Fitting Room"**

Outfit AI sells one promise: see the outfit on yourself before you pay for it. The visual system borrows from fashion-magazine layout — big confident type, square-cut edges, restrained color — rather than from SaaS-startup convention. Corners are square across every daisyUI primitive (buttons, cards, inputs); the only circles in the system are the three numbered step-markers in "How It Works," making roundness a deliberate, rare signal rather than a default. Color is used the way a magazine uses a spot color: one warm amber-gold does the persuading (CTAs, active states, key headline words) while everything else sits in near-monochrome paper and ink.

This explicitly rejects the generic AI-SaaS template: no gradient-clipped hero text, no purple/indigo default palette, no identical icon-card grid repeated past the point of meaning, no tiny uppercase eyebrow stamped above every section. Motion is quiet and physical — soft blurred color blobs drift in the background for atmosphere, cards lift a few pixels on hover, sections stagger in on scroll — never a flashy choreographed intro.

**Key Characteristics:**
- Square corners everywhere except the three numbered step-circles — roundness is earned, not default.
- One accent color (burnt amber-gold) carries persuasion; teal and marine blue are supporting, low-frequency.
- Single typeface (Outfit) for every role; hierarchy comes from weight and scale, never a font switch.
- Ambient blurred color blobs for atmosphere, not gradients on text or buttons.

## 2. Colors

A near-monochrome paper-and-ink base with one warm accent doing almost all of the persuading.

### Primary
- **Burnt Amber Gold** (`#AA6709` / `hsl(35, 90%, 35%)`): every primary CTA (`btn-primary`), the active nav-link state, and the single accented word in hero copy. This is the only color allowed to dominate a viewport.

### Secondary
- **Deep Teal** (`#006366` / `hsl(182, 100%, 20%)`): the header's Login button and the second numbered step-marker. Low-frequency; never a full section background.

### Tertiary
- **Marine Blue** (`#00658A` / `hsl(196, 100%, 27%)`): icon accents (Zap, Shield) and the third step-marker. Reads as "trust/security" alongside the amber's "action."

### Neutral
- **Warm Paper White** (`#FBF9FB` / `hsl(308, 26%, 98%)`): page background (`base-100`).
- **Blush Fog** (`#EDE8EC` / `hsl(308, 12%, 92%)`): section and card backgrounds (`base-200`) — never pure gray, always the same whisper-magenta tint as the page.
- **Dust Mauve** (`#DFD8DE` / `hsl(308, 9%, 86%)`): borders, dividers, input backgrounds (`base-300`).
- **Ink Navy-Black** (`#06090F` / `hsl(219, 44%, 4%)`): body text (`base-content`) — cool-toned near-black, not pure black.

### Named Rules
**The One Accent Rule.** Burnt Amber Gold is the only color permitted to fill a large surface or a headline word. Teal and Marine Blue are reserved for small, specific touches (one button, one icon, one step-marker) — never a section background or a competing CTA.

## 3. Typography

**Display/Body/Label Font:** Outfit (variable, weights 100–900, loaded via Google Fonts in `index.html`)

**Character:** One typeface across the entire product — fitting, since the brand and the font share a name. Hierarchy is built entirely from weight (400 → 900) and size, never from switching families.

### Hierarchy
- **Display** (900, `clamp(3.5rem, 8vw, 8rem)`, line-height 1): the single-word hero marks ("OUTFIT", "Try", "AI"). Reserved for the hero only.
- **Headline** (900, `clamp(2.25rem, 5vw, 3.75rem)`, line-height 1.05): section titles ("Why Outfit AI?", "How It Works", CTA headline).
- **Title** (700, 1.5rem): card and step titles ("AI-Powered", "Upload Your Style").
- **Body** (400, 1rem, line-height 1.6): supporting paragraph copy under headlines and inside cards. Cap prose at ~65–75ch.
- **Label** (600, 0.875rem, letter-spacing 0.16em, uppercase): the hero subhead ("PREVIEW CONFIDENCE BEFORE CHECKOUT...") and nav-adjacent micro-copy.

### Named Rules
**The One Face Rule.** Never introduce a second font family for "contrast" — Outfit already spans 100–900; reach for a heavier or lighter weight instead of a new typeface.

## 4. Elevation

Flat by default — daisyUI's depth and noise tokens are both zeroed, so buttons and inputs carry no built-in bevel. Depth is conveyed two other ways: `shadow-lg` on cards at rest, deepening to `shadow-xl` on hover paired with a 6px lift; and large, very soft blurred color blobs (`blur-3xl`, 10–22% opacity, in amber/teal/marine) placed at screen corners for atmosphere. The blobs are ambient lighting, not surface elevation — they never sit behind text that needs to stay legible.

### Shadow Vocabulary
- **card-rest** (`box-shadow: 0 1px 3px oklch(0 0 0/0.1), 0 4px 6px -1px oklch(0 0 0/0.1)`): default card shadow.
- **card-hover** (`shadow-xl`, combined with `translateY(-6px)`): feedback on hover/interaction.
- **ambient-blob** (`blur-3xl` radial color fields at 10–22% opacity): background atmosphere only, never on interactive surfaces.

### Named Rules
**The Flat-at-Rest Rule.** No component ships a shadow at rest beyond the card's minimal `shadow-lg`. Shadows deepen only in response to hover/interaction — they are never decorative.

## 5. Components

### Buttons
- **Shape:** perfectly square corners (`border-radius: 0`) — confirmed at runtime, not just in theme config. This is load-bearing for the brand's editorial feel.
- **Primary:** Burnt Amber Gold fill, Warm Paper White text, `12px 32px` padding (`btn btn-primary`, scales to `btn-lg` for hero/CTA-section buttons).
- **Secondary:** Deep Teal fill, used once (header Login).
- **Outline/Ghost:** transparent fill, ink-colored border and text (`btn-outline`) — the secondary-CTA pattern ("Sign up", "Learn More").
- **Hover / Focus:** hero CTA lifts on hover (`y: -4`, `scale: 1.03`) and compresses on tap (`scale: 0.98`) via a spring transition — physical, not eased-linear.

### Cards
- **Corner Style:** square (`border-radius: 0`), matching buttons — no daisyUI primitive in this system ever rounds a corner.
- **Background:** Blush Fog on a Warm Paper White page — one step darker than the page, never pure white-on-white.
- **Shadow Strategy:** `shadow-lg` at rest → `shadow-xl` + 6px lift on hover (see Elevation).
- **Internal Padding:** generous, centered (`card-body items-center text-center`), icon (Lucide, 48px) in primary/tertiary color above a title and one line of body copy.

### Numbered Step Markers (signature component)
The only circular elements in the system (`rounded-full`, 80px), filled solid in primary/secondary/tertiary color with a bold number. Their circularity is what makes them read as a sequence — the deliberate exception that proves the square-corner rule elsewhere.

### Navigation
- **Style:** fixed header, `backdrop-blur-md` over a translucent Dust-Mauve-tinted bg — glass effect used exactly once, functionally (legibility over scrolling content), not decoratively.
- **Active state:** current nav link fills solid Burnt Amber Gold with Warm-Paper-White text; inactive links are ink at 80% opacity.
- **Mobile:** hamburger opens a dropdown menu sharing the same active/inactive treatment.

## 6. Do's and Don'ts

### Do:
- **Do** keep every daisyUI primitive (button, card, input) at 0 border-radius — square corners are the system's signature.
- **Do** let Burnt Amber Gold carry the persuasion (CTAs, active nav, one hero word) and keep Teal/Marine Blue to single, small touches.
- **Do** use Outfit at heavier weights (700–900) for hierarchy instead of introducing a second typeface.
- **Do** use soft blurred color blobs for background atmosphere, kept well clear of body text.

### Don't:
- **Don't** ship a generic AI-SaaS look: no gradient-clipped headline text, no purple/indigo default palette, no identical icon-card grid repeated without variation, no tiny uppercase eyebrow line stamped above every section.
- **Don't** round a button or card corner "for softness" — that breaks the one signature the system has.
- **Don't** add a second background color role beyond Warm Paper White / Blush Fog / Dust Mauve — new neutrals should be tints of the same 308° hue, not generic gray.
- **Don't** use glassmorphism decoratively — the header's blur is the one functional exception, not a pattern to repeat.
