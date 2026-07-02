// Outfit AI — image generation prompts
// is_new_outfit === true  → OUTFIT_GENERATION_PROMPT  (full outfit replacement)
// is_new_outfit === false → OUTFIT_IMPROVEMENT_PROMPT (preserve + enhance current outfit)
//
// Human detection should be handled as a pre-check in code, NOT inside these
// prompts — image models return inconsistent text/image contracts otherwise.

export const OUTFIT_GENERATION_PROMPT = `
Generate a photorealistic full-body image of the person in the provided model
photo wearing a new outfit.

INPUTS:
- Model Image: [MODEL]
- Clothing Items: [ACCESSORIES]
- User Instructions: [USER_PROMPT]

IDENTITY — NON-NEGOTIABLE:
- This must be the SAME person as the model image: identical face, hair,
  skin tone, body shape, size, and proportions.
- Do not slim, elongate, retouch, or idealize the person's body in any way.
- Keep the same pose unless the user instructions request otherwise.

GARMENT FIDELITY — NON-NEGOTIABLE:
- Completely replace the person's current clothing with the provided items.
- Reproduce each provided clothing item EXACTLY as shown: same pattern, print
  placement, color, fabric texture, neckline, sleeve style, length, and any
  logos or graphics. Only adapt drape and fit to the person's body.
- Never redesign, recolor, simplify, or "improve" a provided garment.

STYLING:
- If the provided items form only a partial outfit, complete the look with
  stylistically matching pieces (coherent color, silhouette, and layering)
  that suit the occasion implied by the user instructions.
- If no items are provided, design a complete outfit from the user
  instructions alone.
- Fit choices (tailored, relaxed, oversized) should look natural and wearable
  on this person's body.

SCENE:
- Keep the original background and lighting from the model image, unless the
  user instructions explicitly request a different background or setting.
- Show the full body, head to shoes, even if the input photo is cropped.

OUTPUT:
- Photorealistic, vertical orientation, 9:16 aspect ratio (optimized for
  mobile screens). Frame the full body within the vertical composition.
- No text, watermarks, or overlays.
- Return only the generated image.
`;

export const OUTFIT_IMPROVEMENT_PROMPT = `
Generate a photorealistic full-body image of the person in the provided model
photo with their CURRENT outfit preserved and subtly improved.

INPUTS:
- Model Image: [MODEL]
- Additional Items: [ACCESSORIES]
- User Instructions: [USER_PROMPT]

IDENTITY — NON-NEGOTIABLE:
- This must be the SAME person: identical face, hair, skin tone, body shape,
  size, proportions, and pose.
- Do not slim, elongate, retouch, or idealize the person's body in any way.

OUTFIT PRESERVATION:
- The current outfit must remain clearly recognizable. Do not replace it.
- Allowed improvements only:
  - Fit and tailoring adjustments (better proportions, cleaner silhouette)
  - Styling tweaks (tucking, cuffing, rolling sleeves, layering)
  - Color balancing across the existing pieces
  - Adding accessories or complementary layers

ADDITIONAL ITEMS:
- If items are provided, integrate them naturally INTO the current outfit.
- Reproduce each provided item EXACTLY as shown: same pattern, print
  placement, color, fabric texture, and details. Only adapt drape and fit.
- If no items are provided, make subtle, high-impact improvements only
  (e.g. an accessory, a layer, a fit correction).

SCENE:
- Keep the original background and lighting, unless the user instructions
  explicitly request a change.
- Show the full body, head to shoes, even if the input photo is cropped.

OUTPUT:
- Photorealistic, wearable, and polished — enhanced, not transformed.
- Vertical orientation, 9:16 aspect ratio (optimized for mobile screens).
  Frame the full body within the vertical composition.
- No text, watermarks, or overlays.
- Return only the generated image.
`;

export const DESCRIPTION_SYSTEM_PROMPT = `
You are a fashion direction assistant.
Describe the OUTFIT shown (garments, colors, style, occasion) — not the
person's appearance, body, or identity.

Return exactly one line in this format:
TITLE | SHORT_SUMMARY

Constraints:
- TITLE: 3-8 words.
- SHORT_SUMMARY: 18-35 words.
- Never use the "|" character inside TITLE or SHORT_SUMMARY.
- No markdown, no extra lines, no prefix/suffix text.
`;
