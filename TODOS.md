# TODOS

Design debt tracked from `/plan-design-review` (2026-07-08), reviewing commit `e51f380` (homepage repositioning: mega-nav, Industries section, funding section, new pages).

## 1. No DESIGN.md exists for this project
**What:** There's no canonical design system doc — colors, type scale, spacing, component vocabulary all live implicitly in `style.css` and get inferred by reading existing markup.
**Why:** Every future design review (this one included) has to reverse-engineer conventions instead of checking against a source of truth, which is slower and more error-prone as the site grows.
**Pros:** Faster future reviews, easier onboarding for anyone else touching the site, catches drift (e.g. the icon-less Industries cards this review found) before it ships.
**Cons:** Upfront time to write it; needs updating as the system evolves or it goes stale and misleads.
**Context:** Run `/design-consultation` to generate one from the current site.
**Depends on:** Nothing — can run anytime.

## 2. Nav/dropdown text contrast not formally measured
**What:** The new dropdown menu text (`var(--text-secondary)` on near-black) and mobile menu were checked by eye, not with a contrast-ratio tool, against the WCAG 4.5:1 body-text minimum.
**Why:** Visual inspection is a good proxy for a light-gray-on-near-black pairing but isn't a substitute for a real measurement, especially with `backdrop-filter` blur potentially interacting with perceived contrast on some backgrounds.
**Pros:** Confirms accessibility compliance with evidence, not a guess.
**Cons:** Low risk given the obvious luminance gap; unlikely to actually fail.
**Context:** Surfaced during Pass 6 (Responsive & Accessibility) of the design review.
**Depends on:** Nothing — a 15-minute pass with a contrast checker across the nav/dropdown/mobile-menu combinations.

## 3. Canada-section icon reads as a starburst, not a leaf
**What:** The funding section's icon was changed from an off-brand red maple-leaf emoji to an on-brand cyan SVG, but the hand-authored path reads as an abstract 8-point star rather than a recognizable leaf silhouette.
**Why:** The "BUILT IN CANADA" label text next to it carries the meaning, so this is cosmetic polish, not a comprehension problem — but a cleaner leaf shape would look more intentional.
**Pros:** More polished, clearly-Canadian visual on a section that's meant to support Canadian-innovation-program conversations.
**Cons:** More iteration time on an SVG path; low visual-impact difference for site visitors who aren't scrutinizing the icon.
**Context:** Raised in Pass 7 (Unresolved Design Decisions); left as-is by default since the question went unanswered when the session moved to a different task.
**Depends on:** Nothing — swap the `<path>` in `index.html` and `company.html`'s `.origin-flag` SVG.

## 4. Footer Blog/Documentation links lack the "Soon" badge
**What:** The primary nav's Resources dropdown labels Blog and Documentation with a small "Soon" pill (added this review); the footer links to the same two pages do not.
**Why:** Minor inconsistency — a visitor scanning the footer instead of the nav hits the same "Coming Soon" dead end without the same heads-up.
**Pros:** Fully consistent expectation-setting sitewide.
**Cons:** Footer is a secondary/tertiary nav location where a badge may just add visual noise; genuinely a judgment call.
**Context:** Raised in Pass 3 (User Journey) alongside the primary-nav fix; deliberately scoped down to nav-only for this review.
**Depends on:** Nothing — reuse the `.soon-badge` class already added to `style.css`.

## 5. No shared nav/footer partial across 9+ HTML pages
**What:** Introduce a lightweight static-site build step (11ty, Jekyll, or a simple pre-commit/Node script that stamps shared nav/footer partials into static output) so nav and footer markup live in one place instead of being hand-duplicated across every page.
**Why:** This review's nav fix (hamburger menu + ARIA + dropdown consistency) required editing identical markup across 11 files for one logical change. That cost compounds on every future nav/footer edit and is a real risk of the pages silently drifting out of sync (e.g. one page's footer getting a fix the others don't).
**Pros:** Future nav/footer changes become a single-file edit; eliminates an entire class of "forgot to update page N" bugs; makes the site easier for anyone else to maintain.
**Cons:** Real scope — requires picking a static site generator or build script, wiring it into the GitHub Pages deploy (or switching off Pages' native Jekyll auto-build), and re-verifying all 9 pages render identically after the migration. (human: ~4-6h / CC: ~45-60min)
**Context:** Raised in Step 0 of `/plan-eng-review` (2026-07-08) as a complexity-check finding — this diff touched 11 files, past the 8-file smell threshold, for a change that would otherwise touch 1-2.
**Depends on:** Nothing technically, but best done in a dedicated PR, not bundled into a content/bugfix diff.

## 6. Verify touch-tablet dropdown behavior on real hardware
**What:** The 960-1024px viewport nav logic (first tap reveals a dropdown, second tap on the same trigger navigates) has only been exercised by emulated mouse clicks in a headless browser — never by real touch input on an actual device.
**Why:** The logic mirrors the mobile-menu accordion branch, which WAS verified live and works correctly, so confidence is high — but `pointer:coarse`/`hover:none` media query behavior can differ subtly on real hardware (especially hybrid touch+mouse devices like Surface or 2-in-1 laptops) in ways a headless browser can't surface.
**Pros:** Closes the one remaining test gap from `/plan-eng-review`'s coverage diagram (2026-07-08); cheap to verify whenever real touchscreen hardware is on hand.
**Cons:** No urgency — the code path is a straightforward conditional, not new architecture; low risk of being wrong.
**Context:** Surfaced in Test Review (Pass 3) of `/plan-eng-review`. If test infrastructure (Playwright) is ever introduced for this site, add a `hasTouch: true` context test for this branch instead of manual verification.
**Depends on:** Access to a real touchscreen laptop or tablet in the 960-1024px logical-pixel range, or Playwright touch emulation if test infra gets built (see item 5).
