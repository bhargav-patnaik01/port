# Design System Specification: The High-End Editorial Portfolio

## 1. Overview & Creative North Star
**Creative North Star: "The Silent Curator"**
This design system is built on the philosophy of "Precision through Absence." It rejects the cluttered "template" look of modern web builders in favor of an editorial, high-fashion layout. By utilizing intentional asymmetry, oversized typography, and deep tonal layering, the system treats the portfolio not as a website, but as a digital gallery.

We break the grid to create rhythm. We use whitespace as a functional element, not just a gap. The result is a high-contrast, sophisticated experience that feels bespoke, premium, and authoritative.

## 2. Colors
The palette is rooted in a spectrum of sophisticated neutrals, accented by clinical teals and deep charcoal tones derived from a professional studio environment.

*   **Primary Hierarchy:** Use `primary` (#5F5E5E) for structural elements and `on_surface` (#2B3437) for maximum readability.
*   **The Accents:** Use `tertiary` (#006976) and `secondary` (#4D626C) sparingly. These represent the "glow" of a high-end workstation, perfect for subtle hover states or interactive cues.

### The "No-Line" Rule
To maintain a premium feel, **1px solid borders are strictly prohibited for defining sections.** Structural boundaries must be created through:
1.  **Background Shifts:** Transitioning from `surface` (#F8F9FA) to `surface_container_low` (#F1F4F6).
2.  **Ample Spacing:** Using whitespace to separate conceptual blocks.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of fine paper. 
*   **Base:** `surface`
*   **Nested Elements:** Place a `surface_container_highest` (#DBE4E7) element inside a `surface_container_low` section to create natural, soft depth.

### The "Glass & Gradient" Rule
Floating elements (like navigation bars or hovering modals) should use a glassmorphism effect:
*   **Background:** Semi-transparent `surface` (e.g., 80% opacity).
*   **Effect:** `backdrop-filter: blur(20px)`.
*   **Signature Textures:** For high-impact CTAs, use a subtle linear gradient from `primary` (#5F5E5E) to `primary_dim` (#535252) to give the element "weight" and soul.

## 3. Typography
The system uses a pairing of **Manrope** for high-impact editorial moments and **Inter** for functional clarity.

*   **Display Scale:** Use `display-lg` (3.5rem, Manrope) for hero statements. The tracking should be slightly tightened (-0.02em) to feel "sharp" and modern.
*   **Headline Scale:** `headline-lg` (2rem, Manrope) should be used for section titles, often placed asymmetrically to lead the eye.
*   **Body Scale:** `body-lg` (1rem, Inter) is for long-form narrative. Use a generous line-height (1.6) to ensure the premium, breathable feel.
*   **Label Scale:** `label-sm` (0.6875rem, Inter) should be used in ALL CAPS with increased letter spacing (+0.1em) for metadata and small tags, mimicking technical architectural drawings.

## 4. Elevation & Depth
Traditional drop shadows are replaced by **Tonal Layering** and **Ambient Light.**

*   **The Layering Principle:** Depth is achieved by "stacking." A `surface_container_lowest` (#FFFFFF) card placed on a `surface_container` (#EAEFF1) background provides a clean, tactile lift without artificial shadows.
*   **Ambient Shadows:** If a floating effect is required (e.g., a modal), use a multi-layered shadow: `box-shadow: 0 10px 30px -5px rgba(43, 52, 55, 0.04), 0 20px 60px -10px rgba(43, 52, 55, 0.08)`.
*   **The "Ghost Border" Fallback:** For accessibility in forms, use `outline_variant` (#ABB3B7) at **15% opacity**. This creates a hint of a container without breaking the "No-Line" rule.
*   **Glassmorphism:** Use `surface_variant` (#DBE4E7) with 70% opacity and a heavy backdrop blur for floating navigation. This integrates the UI with the imagery behind it.

## 5. Components

### Buttons
*   **Primary:** Background `primary` (#5F5E5E), text `on_primary` (#FAF7F6). Radius: `sm` (0.125rem) for a sharp, architectural look.
*   **Secondary:** Background `surface_container_highest`, text `on_surface`. No border.
*   **Tertiary:** Text-only with a `tertiary` (#006976) underline (2px) that expands on hover.

### Chips
*   **Style:** `surface_container_high` background, `label-md` typography. Use `full` rounding (9999px) to contrast with the sharp-edged buttons.

### Cards & Portfolio Items
*   **Rule:** No dividers. Use `surface_container_low` for the card background and increase padding to 2rem. 
*   **Image Treatment:** Images should have a 0.25rem (default) border radius. On hover, the image should subtly scale (1.02x) within its container.

### Input Fields
*   **Visuals:** Underline-only style using `outline_variant` at 30% opacity. Upon focus, the underline transitions to `tertiary` (#006976) with a 2px weight.

### Navigation (Floating Curator)
*   A fixed, glassmorphic bar at the bottom or top of the viewport. Use `surface_container_lowest` at 80% opacity with a `sm` (0.125rem) ghost border at 10% opacity.

## 6. Do's and Don'ts

### Do:
*   **Do** use asymmetrical margins (e.g., a 2-column wide gap on the left of a description).
*   **Do** use `primary_fixed_dim` (#D7D4D3) for background elements that need to feel "solid" and grounded.
*   **Do** leverage high-quality photography as a structural element. Let the image define the height of the section.
*   **Do** use micro-interactions (e.g., a 200ms ease-out on hover states).

### Don't:
*   **Don't** use 100% black (#000000). Use `inverse_surface` (#0C0F10) for a "richer" depth.
*   **Don't** use standard shadows. If it looks like a default shadow, it’s too heavy.
*   **Don't** use dividers or horizontal lines to separate content. Use a background color shift to `surface_container_low`.
*   **Don't** center-align everything. Modern editorial design thrives on a strong left-aligned axis or intentional offset.