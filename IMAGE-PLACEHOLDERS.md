# Portfolio image checklist

This list is based on the image paths referenced by the current source code. Existing files are included in `public/images/`.

## Required images

| File path | Used in | Current status | Recommended image |
|---|---|---|---|
| `public/images/headshot.png` | Hero portrait and About portrait | Present (600 × 750) | A clear, well-lit portrait. The same file is used in both places. |
| `public/images/decode-sih.jpg` | Achievements — DECODE SIH 2026 | Present (800 × 600) | Photo of the presentation, team, certificate, or award. |
| `public/images/adu.jpg` | Achievements — Abu Dhabi University | Present (800 × 600) | Competition/award ceremony or Python competition photo. |
| `public/images/gallery-1.jpg` | Moments gallery — DECODE SIH | Present (800 × 1000) | DECODE SIH presentation/award photo. |
| `public/images/gallery-2.jpg` | Moments gallery — Abu Dhabi University | Present (800 × 1000) | Python competition award/ceremony photo. |
| `public/images/gallery-3.jpg` | Moments gallery — AUV Society | Present (800 × 1000) | AUV/ROS 2 work, lab, or team photo. |
| `public/images/gallery-4.jpg` | Moments gallery — Developers Club | Present (800 × 1000) | Club event, workshop, or coordination photo. |
| `public/images/gallery-5.jpg` | Moments gallery — OptiFarm | Present (800 × 1000) | OptiFarm project/hackathon photo. |
| `public/images/gallery-6.jpg` | Moments gallery — robotics | Present (800 × 1000) | Robotics lab or hardware prototyping photo. |

## Optional / currently unused

| File path | Status | Notes |
|---|---|---|
| `public/images/school.jpg` | Present (800 × 600), currently not referenced by the source | Keep only if you want to add a school/outreach photo to a role or timeline item. |

## Removed from Work

- `public/images/bot.png` is no longer included/referenced in the updated Work card graphics. The Dashing Raptor project text remains, but its robot photo/animated graphic has been removed from the Work card.

## Image guidance

- Use JPG for photos and PNG for transparent graphics.
- Portraits: 4:5 or 3:4 crop, ideally at least 900 px on the longer edge.
- Gallery images: portrait 4:5 works well; keep the subject near the center because cards crop images.
- Achievement photos: landscape 4:3 works well.
- Preserve these filenames or update the matching paths in `src/content/site.ts` and the relevant component.
