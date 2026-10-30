# Tanvi Impex — Comprehensive Initial SEO, GEO, AEO & Performance Audit (BEFORE)

**Project URL:** [https://tanviimpex.com/](https://tanviimpex.com/)  
**Audit Date:** October 30, 2026  
**Auditor / Engine:** Antigravity AI & SAGE Comprehensive Diagnostics  
**Status:** Baseline Audit Generated — Awaiting User Approval Before Implementation  

---

## 1. Executive Summary & SAGE Scorecard

An exhaustive diagnostic audit was conducted across the codebase of **Tanvi Impex** (`d:\Projects\Tanvi`), cross-verifying each finding from the supplied SAGE Audit CSV against the active React/Vite implementation.

| Category | SAGE Score | Status | Primary Findings Summary |
| :--- | :---: | :---: | :--- |
| **Answer Targeting (AEO)** | **0 / 100** | 🔴 **FAIL** | 0 question-based headings, no direct answers for Featured Snippets/AI Overviews, no comparison tables, no "How to" structures. |
| **Agent Interoperability** | **19 / 100** | 🔴 **FAIL** | Forms lack `name` attributes, missing `/llms.txt`, no structured agent tool endpoints or machine-readable API manifest. |
| **Entity & Authority (GEO / E-E-A-T)** | **20 / 100** | 🔴 **FAIL** | Schema publisher `@id` mismatch (`#store` vs `#organization`), dummy `#` links for Privacy Policy/Terms, partial visible credentials. |
| **Voice & Conversational Search** | **35 / 100** | 🔴 **FAIL** | Missing schema `speakable` specification, 46% of sentences too long for speech synthesis, high reading difficulty for voice assistants. |
| **Citability & Evidence** | **43 / 100** | 🟡 **WARN** | FAQ questions lack `<h3>` tags and ID anchors, no definition lists (`<dl>`), no HTML data tables, no lead paragraphs. |
| **Performance & Core Web Vitals** | **68 / 100** | 🟡 **WARN** | 16 images missing width/height attributes (causing CLS), external stock images used, 1.47 MB initial bundle without code-splitting. |
| **Accessibility (WCAG 2.2 AA)** | **71 / 100** | 🟡 **WARN** | No skip-to-content link, form controls lack proper `<label for="...">` associations, generic link anchor texts. |
| **Semantic HTML Structure** | **73 / 100** | 🟡 **WARN** | Single H1 dynamically flips to carousel slide words ("Almonds"), heading levels jump (H1 to H3/H4), very low text-to-HTML ratio. |
| **Structured Data (Schema.org)** | **76 / 100** | 🟡 **WARN** | 6 JSON-LD blocks present but Catalog lacks rich `Product` entities with offers/specifications; broken `#store` cross-reference. |
| **Meta & Technical Directives** | **77 / 100** | 🟡 **WARN** | Meta Title too long (87-99 chars vs 60 limit), Meta Description 271 chars (vs 160 limit), sitemap lacks image extensions. |
| **Internal Linking & Architecture** | **81 / 100** | 🟢 **PASS** | Strong internal anchor linking, responsive navigation, clear catalog paths. |
| **Machine Readability** | **85 / 100** | 🟢 **PASS** | Robots.txt allows all major AI bots (GPTBot, PerplexityBot, ClaudeBot), valid noscript crawl fallback. |
| **Keyword Distribution & Density** | **88 / 100** | 🟢 **PASS** | Natural keyword distribution; minor over-frequency on "almonds" keyword in certain sections. |
| **Redirect & Canonical Health** | **100 / 100** | 🟢 **PASS** | Direct HTTPS canonicalization, 0 redirect loops, 0 status code overhead. |

---

## 2. Deep-Dive Codebase Findings & SAGE CSV Verification

### 2.1. Answer Engine Optimization (AEO) — Score: 0/100 (Critical)
* **SAGE CSV Issue:** `Only 0 question headings`, `No question headings`, `No direct answers`, `No "how to" headings`, `No comparison tables`, `No PAA-style groupings`.
* **Actual Codebase Verification:**
  * In `src/components/FAQSection.tsx`, questions are rendered inside `<button>` elements with `<span>{faq.question}</span>`. None use semantic `<h3>` or `<h4>` tags, meaning answer engine crawlers (Google Gemini, Perplexity, SearchGPT) do not recognize them as question-and-answer pairs.
  * In `src/components/AboutUs.tsx`, `QualityMetrics.tsx`, and `GlobalReach.tsx`, there are zero direct answers to natural-language user queries such as *"What is the minimum wholesale order at Tanvi Impex?"* or *"How are California Almonds imported to APMC Vashi?"*.
  * No product comparison table exists. Products like 15kg California Almonds, Irani Pistachios, and bulk seeds are presented in cards without a 3+ column specification table (Grade, Packaging, Origin, Mandi Price Guide, Shelf Life).

### 2.2. Voice Search & Conversational Readiness — Score: 35/100 (High Priority)
* **SAGE CSV Issue:** `No speakable specification`, `Reading ease: Avg sentence length too high`, `Avg word count/sentence too high`.
* **Actual Codebase Verification:**
  * In `index.html`, none of the 6 JSON-LD blocks include a `SpeakableSpecification` (`"@type": "SpeakableSpecification"` with `cssSelector` or `xpath`).
  * In `src/components/AboutUs.tsx` and `FeaturedProducts.tsx`, paragraphs average 38–46 words per sentence. Voice engines (Google Assistant, Apple Siri, Alexa) require concise answers between 20 and 30 words with high Flesch reading ease scores.

### 2.3. Entity Authority & GEO (Generative Engine Optimization) — Score: 20/100 (High Priority)
* **SAGE CSV Issue:** `Partial author info`, `No publisher`, `No privacy/terms links detected`.
* **Actual Codebase Verification:**
  * In `index.html` lines 165–167:
    ```json
    "publisher": {
      "@id": "https://www.tanviimpex.com/#store"
    }
    ```
    However, the Organization `@id` defined in line 76 is `"@id": "https://www.tanviimpex.com/#organization"`. This broken cross-reference breaks knowledge graph entity resolution.
  * In `src/components/Footer.tsx` lines 325–326:
    ```jsx
    <a href="#" className="...">Privacy Policy</a>
    <a href="#" className="...">Terms of Service</a>
    ```
    The Privacy Policy and Terms of Service are dead anchor links (`href="#"`). Search crawlers penalize sites that lack verifiable policy and compliance pages.
  * The site lacks a dedicated `/llms.txt` and `/llms-full.txt` at the root for LLM ingestion and entity grounding.

### 2.4. Semantic HTML & Heading Hierarchy — Score: 73/100 (High Priority)
* **SAGE CSV Issue:** `Single H1 tag: "Almonds"`, `Heading hierarchy: Don't jump`, `Text-to-HTML: Very low`.
* **Actual Codebase Verification:**
  * In `src/components/Hero.tsx` line 200:
    ```jsx
    <h1 className="...">
      <AnimatedTitle text={slides[current].title} />
    </h1>
    ```
    When the carousel loads, the only H1 on the homepage is the word `"Almonds"`. As the carousel cycles, the H1 dynamically changes to `"Premium"`, `"Trusted"`, etc. This confuses search bots and wastes the most important on-page SEO ranking signal.
  * `src/components/QualityMetrics.tsx` and `src/components/GlobalReach.tsx` consist almost entirely of raster/webp graphic posters (`/The Tanvi Impex Promise.webp`, `/Pan-India Premium Nut Supply Network.webp`) with zero semantic headings or accessible body copy, causing an extremely low text-to-HTML ratio.

### 2.5. Accessibility & WCAG 2.2 AA — Score: 71/100 (Medium Priority)
* **SAGE CSV Issue:** `No skip-to`, `Link text is... Use descriptive`, `Form accessible controls`.
* **Actual Codebase Verification:**
  * No skip link (`<a href="#main-content">Skip to main content</a>`) exists in `src/App.tsx` or `src/components/Navigation.tsx`. Keyboard-only users are trapped into tabbing through navigation items.
  * In `src/components/Hero.tsx`, button labels are generic ("Explore", "Shop Now").
  * In `src/components/QuoteModal.tsx` and `src/components/Footer.tsx`, form inputs lack `<label htmlFor="...">` attributes or explicit `aria-label` bindings, failing WCAG 2.2 AA form accessibility criteria.

### 2.6. Performance & Core Web Vitals — Score: 68/100 (Medium Priority)
* **SAGE CSV Issue:** `16 image(s): Add explicit width/height`, `6 image(s): Add loading="lazy"`.
* **Actual Codebase Verification:**
  * In `src/components/HomeCategoryBar.tsx` and `FeaturedProducts.tsx`, category cards use third-party remote images from `media.istockphoto.com` and `health.com` instead of local optimized assets.
  * Images throughout `HomeCategoryBar.tsx` and `FeaturedProducts.tsx` lack explicit `width` and `height` attributes, leading to layout shifts (CLS) when images load.
  * Production build test reveals a single monolithic JavaScript bundle: `dist/assets/index-CZJRmvfU.js` (1.47 MB uncompressed / 426.7 kB gzipped). Heavy 3D libraries (`three`, `@react-three/fiber`, `@react-three/drei`) and animation libraries (`gsap`) are bundled directly into the main entry point rather than dynamically loaded.

### 2.7. Structured Data & Schema Markup — Score: 76/100 (Medium Priority)
* **SAGE CSV Issue:** `Several related schema types not linked cleanly`, `Nested entities improve rich snippet eligibility`.
* **Actual Codebase Verification:**
  * Product catalog schema in `index.html` (lines 246–361) uses a generic `ItemList` with `ListItem` entries containing only a title and image URL. It lacks rich schema properties: `Product`, `offers`, `priceCurrency: INR`, `availability: InStock`, `itemCondition`, `hasMerchantReturnPolicy`, `shippingDetails`, `seller`, and `brand`.
  * Missing schema entities: `WebPage` with speakable selectors, `AboutPage` microdata, `ContactPage` microdata, and `TermsOfService` microdata.

### 2.8. Technical SEO & Meta Directives — Score: 77/100 (Medium Priority)
* **SAGE CSV Issue:** `Title tag: 87 chars`, `Meta description: Aim for 50-160 chars`.
* **Actual Codebase Verification:**
  * `index.html` Title tag:
    `Tanvi Impex | Wholesale California Almonds, Irani Pistachios & Premium Seeds Importer Mumbai` (93 characters — truncated on mobile and desktop SERPs).
  * `index.html` Meta description:
    `Leading importer, trader and bulk distributor of California Almonds, Nútböld Almonds, Irani & California Pistachios, Pumpkin Seeds, Sunflower Seeds & Chia Seeds based in APMC Market, Navi Mumbai. Direct farm sourcing, wholesale prices & pan-India supply across 23 states.` (271 characters — heavily truncated).
  * `sitemap.xml`: Contains only basic `<loc>` and `<priority>` tags without `<image:image>` extension metadata.

---

## 3. Prioritized Action Matrix

| Priority | Issue Description | Affected File(s) | Expected Impact |
| :--- | :--- | :--- | :--- |
| 🔴 **Critical** | Fix H1 & Semantic Headings: replace transient carousel H1 with persistent, high-authority H1 and correct H2/H3 nesting | `Hero.tsx`, `HomePage.tsx`, `ProductsPage.tsx` | Fixes Answer Engine indexation; resolves SAGE H1 failure |
| 🔴 **Critical** | Implement Answer Engine direct answers & question-based headings (`<h3>` with IDs) in FAQ | `FAQSection.tsx`, `index.html` | Boosts AEO score from 0 to 80+; captures Google Featured Snippets |
| 🔴 **Critical** | Add HTML comparison/spec table for Almonds, Pistachios, and Seeds | `FeaturedProducts.tsx`, `ProductsPage.tsx` | Unlocks tabular citability for ChatGPT, Perplexity & Google AI Overviews |
| 🟠 **High** | Fix Schema cross-linking (`#organization` vs `#store`), add SpeakableSpecification, and enrich Product schema | `index.html`, `SEO.tsx` | Resolves entity graph errors; enables Google Assistant voice reading |
| 🟠 **High** | Implement accessible Privacy Policy & Terms of Service modals/pages | `Footer.tsx`, `App.tsx`, new components/pages | Establishes full E-E-A-T legitimacy and resolves SAGE Entity warning |
| 🟠 **High** | Create `/llms.txt` and `/llms-full.txt` markdown files for AI engines | `public/llms.txt`, `public/llms-full.txt` | Enables instant grounding for Perplexity, SearchGPT & Claude |
| 🟡 **Medium** | Optimize Meta Title (under 60 chars) & Description (150-160 chars) | `index.html`, `SEO.tsx`, `ProductsPage.tsx` | Eliminates SERP truncation; boosts click-through rate (CTR) |
| 🟡 **Medium** | Replace remote category stock photos with local WebP assets; add explicit `width` & `height` attributes | `HomeCategoryBar.tsx`, `FeaturedProducts.tsx` | Eliminates CLS; resolves SAGE performance failure |
| 🟡 **Medium** | Implement Skip-to-Content navigation link & form label associations | `Navigation.tsx`, `App.tsx`, `QuoteModal.tsx`, `Footer.tsx` | WCAG 2.2 AA compliance; keyboard navigation accessibility |
| 🟢 **Low** | Code-split 3D/animation bundles via dynamic import in Vite | `vite.config.ts`, `App.tsx` | Drops initial JS bundle from 1.47 MB to <300 KB |
| 🟢 **Low** | Expand `sitemap.xml` with Google image sitemap schema | `public/sitemap.xml` | Improves image indexing for product photography |

---

## 4. Proposed Implementation Plan (Phased)

### Phase 1: Semantic HTML, Headings & AEO / Citability (Zero Visual Disruption)
1. **Fix H1 Architecture:**
   * Ensure a permanent semantic `<h1>` representing *Tanvi Impex | Wholesale California Almonds, Irani Pistachios & Dry Fruits Importer* exists on the homepage (with visually styled prominence, preserving existing slide animations without breaking design).
   * Refactor Hero subheadings to follow clean `H1 -> H2 -> H3` hierarchy.
2. **Answer Engine Optimizations:**
   * Convert FAQ questions to semantic `<h3 id="faq-...">` tags with direct, punchy 30-word answers at the top of each accordion.
   * Add a responsive, clean wholesale bulk specification table in `ProductsPage.tsx` comparing Master Packaging (15kg/20kg/25kg), Grade, Origin, Minimum Order Quantity (MOQ), and FSSAI standards.
   * Add a "How to Order Wholesale from Tanvi Impex" structured step-by-step section.

### Phase 2: Schema.org, Voice Search & GEO Entity Integration
1. **Unify Structured Data:**
   * Fix the `#organization` vs `#store` reference mismatch.
   * Add `SpeakableSpecification` targeting the primary headline and direct FAQ answers.
   * Upgrade Product Catalog `ItemList` to rich `Product` entities with complete B2B wholesale metadata (`WholesalePrice`, `hasMerchantReturnPolicy`, `shippingDetails`, `areaServed: IN`, `brand: Tanvi Impex`).
2. **AI & GEO Files:**
   * Generate `/public/llms.txt` and `/public/llms-full.txt` with verified company details: CEO Bhushan Gajra, APMC Vashi location, FSSAI Lic #11522998001006, GSTIN 27AAPFT0162R1ZG, LEI 335800VW64XCC6IOKK11, products, and contact channels.

### Phase 3: Accessibility & E-E-A-T Compliance
1. **WCAG 2.2 AA Fixes:**
   * Add accessible skip link (`#main-content`) at top of page.
   * Ensure all form fields in `QuoteModal.tsx` and `Footer.tsx` have `name`, `id`, `autoComplete`, and associated `<label>` or `aria-label`.
   * Ensure all icon-only links and buttons have descriptive `aria-label` tags.
2. **Compliance & Trust:**
   * Provide complete, verified Privacy Policy and Terms of Service (modal or dedicated route) preserving the exact existing layout and design.

### Phase 4: Performance, Responsive Images & Core Web Vitals
1. **Image Optimization:**
   * Replace external URLs in `HomeCategoryBar.tsx` and `FeaturedProducts.tsx` with high-quality local WebP assets.
   * Add explicit `width`, `height`, and `decoding="async"` attributes to all image elements to prevent CLS.
2. **Bundle & Meta Optimization:**
   * Optimize Title and Meta Description tags to standard lengths.
   * Enhance `sitemap.xml` with image schema.
   * Configure manual chunking in `vite.config.ts` to separate Three.js, Lucide, and Framer Motion for faster First Contentful Paint (FCP).

---

## 5. Affected Files List
* `index.html` (Schema, Meta tags, Speakable, Preloads)
* `public/robots.txt` (Validation check)
* `public/sitemap.xml` (Image sitemap extension)
* `public/llms.txt` (New — AI search engine discovery)
* `public/llms-full.txt` (New — Deep entity knowledge base)
* `src/App.tsx` (Skip-to-content anchor, route enhancements)
* `src/components/SEO.tsx` (Title, description, schema sync)
* `src/components/Navigation.tsx` (Skip link destination, aria labels)
* `src/components/Hero.tsx` (Semantic H1 hierarchy, aria labels)
* `src/components/HomeCategoryBar.tsx` (Local WebP images, width/height)
* `src/components/FAQSection.tsx` (H3 heading tags, IDs, direct answers)
* `src/components/FeaturedProducts.tsx` (Local WebP, image dimensions, B2B spec table)
* `src/components/Footer.tsx` (Form labels, Privacy Policy/Terms modals)
* `src/components/QuoteModal.tsx` (Form accessibility, input names/labels)
* `src/pages/HomePage.tsx` (Main landmark ID, semantic structure)
* `src/pages/ProductsPage.tsx` (Heading hierarchy, B2B wholesale spec table)
* `vite.config.ts` (Vendor code-splitting for performance)

---

## 6. Next Steps & Approval Gate
In strict compliance with instructions:
> **"Wait for approval before changing code. Implement fixes in phases."**

Antigravity will wait for explicit user approval before modifying any application files. Once approved, Phase 1 through Phase 4 will be implemented methodically, followed by build testing, schema validation, and generation of all final post-implementation reports.
