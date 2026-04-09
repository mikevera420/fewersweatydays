# FewerSweatyDays.com — V2 Upgrade Prompt

## Read These First (Non-Negotiable)
1. `.claude/plans/serialized-tinkering-dawn.md` — The original brainstorm with full site architecture, content strategy, brand identity, and specs
2. `.claude/plans/kind-soaring-dove.md` — The v1 implementation plan with page architecture and project structure
3. `sops/seo-reports/seo-research---hyperhidrosis-1.md` — SEO kit with avatar, compliant copy, keywords, competitor analysis, voice-of-customer hooks

## What Exists (at /tmp/fewersweatydays/)
A working Vite + React + Tailwind site with:
- 4 pages: Home, About, Blog, Work With Me
- Markdown blog engine (import.meta.glob + marked)
- 4 seed blog posts in `/content/posts/`
- Condensation glass hero animation (approved — DO NOT change `HeroCanvas.tsx`)
- Frosted glass nav, custom cursor, scroll progress bar
- GSAP + Lenis smooth scroll
- Brand colors confirmed good: orange #f19447, teal #2dd4b3, surface #faf8f5, ink #1a1612
- Typography: Space Grotesk (headings/body) + IBM Plex Mono (labels/meta)

## The Problem
The site looks like a prototype — an empty shell of text on a warm background. No visuals, no images, no personality beyond the hero animation. It feels dry and boring. Every page is just paragraphs with ScrollReveal fade-ins. The About section has no photo of Mike. The blog has no featured images. The Work With Me pillar tiles all use the same generic ripple animation. There's no Privacy Policy or Terms page. The Book a Session CTAs are broken (href="#").

## V2 Upgrade Checklist

### 1. VISUALS — The Biggest Gap
The site has ZERO images. This is the #1 problem.

**What needs images/visuals:**
- **About teaser on homepage** — Needs a photo of Mike or a warm visual. "I'm Mike" with no face is hollow.
- **About page** — Needs Mike's photo near the hero or story section. This is a personal brand site — the person needs to be visible.
- **Blog post cards** — Each post needs a featured image/thumbnail. Add an `image` field to the markdown frontmatter and render it in PostCard. Even placeholder images are better than nothing.
- **Work With Me pillar tiles** — Each of the 6 pillars (Stress, Nutrition, Physical Activity, Social Support, Circadian Health, Toxic Exposure) should have a unique icon or illustration, NOT the same generic MiniDropletCanvas ripple. Consider SVG icons, Lucide icons, or small canvas animations that are visually distinct per pillar.
- **General visual interest** — The space between sections is all dead white. Consider subtle dividers, section-specific background treatments, or decorative elements that add depth without being distracting.

**Mike's photo already exists:** Copy from `landing-pages/MikeVera/src/assets/mike-vera-profile.png` into this project's `public/images/` directory. Use it on the About page hero, homepage about teaser, and AuthorCard at the bottom of blog posts.

**For blog images:** Generate image prompt suggestions for each blog post using the image prompt guidelines in `content/Linkedin-Analysis/unified-voice-guide.md` (surreal/world-building, never mundane). Add `image` field to frontmatter, update PostCard to render it.

### 2. TEXT FIXES

**Homepage about teaser (Home.tsx ~line 77):**
Current: "I'm Mike. I've had hyperhidrosis since I was a teenager. I changed shirts three times a day. I avoided handshakes. Now I help other people change the pattern underneath."
Problem: Missing Mike's photo. Text is fine but needs visual companion.

**About page hero (About.tsx):**
Current: "I spent a decade engineering my life around a condition nobody could see."
Fix: Mike is 35 and has dealt with this his ENTIRE LIFE, not just a decade. Change to something like: "I spent my whole life engineering around a condition nobody could see." Ask Mike for exact wording he prefers.

**Work With Me page (WorkWithMe.tsx):**
Current language is too clinical — sounds like a doctor adjusting someone's nervous system. The language needs to match the site's tone: human, empathetic, NOT clinical. "I coach people through lifestyle changes" not "I adjust autonomic regulation." Review all copy on this page and rewrite anything that sounds like a medical textbook.

Specific problem areas:
- "A structured, evidence-informed approach to the nervous system patterns that drive your symptoms" — too clinical for a hero
- Pillar descriptions lean heavily into medical terminology (vagal tone, HRV biofeedback, autonomic flexibility) — needs to be more accessible
- The strategy session section is good tone-wise ("You talk. I listen.")
- The FAQ tone is good

### 3. BOOK A SESSION — BROKEN CTAs
Two CTAs on Work With Me page have `href="#"` — completely non-functional:
- The FAQ section CTA
- The final "Book a $1 Strategy Session" button

**Healthie booking URL (from MikeVera.com):**
```
https://secure.gethealthie.com/appointments/embed_appt?dietitian_id=3464974&require_offering=true&offering_id=229095&hide_package_images=false&primary_color=000000
```
Use this URL for all "Book a Session" / "Book a $1 Strategy Session" CTAs. Consider embedding it in an iframe on the Work With Me page, or linking directly with `target="_blank"`.

The nav "Book a Session" button currently links to `/work-with-me` which is correct behavior (sends them to the page with full context before booking).

### 4. PILLAR GRID UPGRADE (WorkWithMe.tsx + PillarGrid.tsx)
Current: All 6 pillar tiles use `MiniDropletCanvas` with different "patterns" (erratic, steady, sine, pulse, breathing, jagged) — but they all look like the same small ripple animation. Mike said "it should have something specific to the pillar" and "there's a great opportunity for visuals."

**Upgrade options (pick one approach):**
- **Option A: Unique SVG/Lucide icons per pillar** — Simple, clean, scales well. Stress = brain/wave icon, Nutrition = leaf/apple, Physical Activity = running figure, Social Support = people/heart, Circadian Health = moon/sun, Toxic Exposure = shield/droplet.
- **Option B: Unique mini canvas animations per pillar** — More premium but more work. Each pillar gets a visually distinct animation: stress = jittery particles that calm on hover, nutrition = growing organic shapes, activity = sine wave that responds to interaction, etc.
- **Option C: Illustrations/images** — Small illustrations for each pillar. Most visual impact but requires image assets.

Ask Mike which approach he prefers.

### 5. MISSING PAGES
**Privacy Policy** — Required for any site collecting data or using cookies. Create at `/privacy` route.
**Terms of Service** — Standard legal page. Create at `/terms` route.
Add links to both in the footer.

For content: Generate standard privacy policy and terms for a health coaching website. Include disclaimers about not being medical advice, scope of practice limitations. Reference the compliance framework at `sops/content/compliance-framework.md`.

### 6. FOOTER ENHANCEMENTS
Current footer is minimal. Add:
- Privacy Policy link
- Terms of Service link
- Social media links (ask Mike which platforms — likely Facebook group, LinkedIn)

### 7. ANIMATION DISTRIBUTION
Mike noted: "It looks like you put all the animations on the home page." The other pages need interactive/animated elements too, not just ScrollReveal fade-ins.

**About page ideas:**
- Timeline visualization for Mike's journey
- Credential badges with subtle animation
- Pull quote with decorative treatment

**Blog page ideas:**
- Category filter with animated transitions
- Post cards with hover effects (some exist but could be more dynamic)

**Work With Me page ideas:**
- Pillar grid upgrade (see #4 above)
- Comparison table with animated row reveals
- FAQ accordion already has chevron animation — could add content slide animation
- Final CTA with breathing/pulse animation (the `.alive` class exists in CSS but may not be applied)

### 8. RESPONSIVE/MOBILE CHECK
Verify all changes work on mobile. The nav has a mobile drawer — make sure new visual elements don't break the mobile experience.

## Files to Modify
| File | What Changes |
|------|-------------|
| `src/pages/Home.tsx` | Add Mike's photo to about teaser, visual enhancements |
| `src/pages/About.tsx` | Fix "decade" → lifetime text, add Mike's photo, add visual elements |
| `src/pages/WorkWithMe.tsx` | Fix clinical language, fix broken CTAs, upgrade pillar visuals |
| `src/pages/Blog.tsx` | Add featured images to post cards |
| `src/pages/BlogPost.tsx` | Add featured image rendering |
| `src/components/coaching/PillarGrid.tsx` | Upgrade from generic MiniDropletCanvas to pillar-specific visuals |
| `src/components/blog/PostCard.tsx` | Add featured image support |
| `src/components/blog/AuthorCard.tsx` | Add Mike's photo |
| `src/components/layout/Layout.tsx` | Add Privacy/Terms links to footer |
| `content/posts/*.md` | Add `image` frontmatter field |
| `src/lib/posts.ts` | Parse `image` from frontmatter |

## Files to CREATE
| File | Purpose |
|------|---------|
| `src/pages/Privacy.tsx` | Privacy Policy page |
| `src/pages/Terms.tsx` | Terms of Service page |
| `public/images/mike-vera-profile.png` | Copy from `landing-pages/MikeVera/src/assets/mike-vera-profile.png` |

## Files NOT to Touch
| File | Why |
|------|-----|
| `src/components/canvas/HeroCanvas.tsx` | Condensation glass animation — APPROVED, do not change |
| `src/index.css` | Theme/colors confirmed good |
| `src/App.tsx` | Routing + Lenis setup works |
| `src/components/ui/CustomCursor.tsx` | Works fine |
| `src/components/ui/ScrollProgress.tsx` | Works fine |

## Brand/Design Reference
- Portfolio sites for quality bar: `landing-pages/elevenlabs-application/`, `landing-pages/wynter-application/`, `landing-pages/anagram-blueprint/`
- These sites have layered animations, hover states everywhere, mini canvas effects on cards, technical aesthetic — the target quality bar
- SEO kit avatar: 28-year-old woman, marketing career, middle school onset, tried everything medical, looking for someone who gets it
- Tone: human, empathetic, NOT clinical. "The person who finally talks to you like a human being."
- Compliance framework: `sops/content/compliance-framework.md` — no weight loss promises, no medical claims, no fear-mongering

## Execution Priority
1. **Visuals first** — This is the #1 gap. Add photos, featured images, pillar icons/illustrations
2. **Text fixes** — About page "decade" fix, Work With Me clinical language cleanup
3. **Broken CTAs** — Fix the href="#" on Work With Me
4. **Pillar grid upgrade** — Make each pillar visually distinct
5. **Privacy/Terms pages** — Create and link
6. **Animation distribution** — Add interactive elements to About and Work With Me pages
7. **Polish** — Responsive check, footer enhancements
