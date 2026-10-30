# Tanvi Impex — SEO, GEO, AEO & Performance Implementation Report

**Project URL:** [https://tanviimpex.com/](https://tanviimpex.com/)  
**Implementation Date:** October 30, 2026  
**Implementation Status:** Completed Across All 4 Phases & Verified  
**Auditor / Engine:** Antigravity AI  

---

## 1. Executive Summary

This report documents the end-to-end technical, semantic, schema, accessibility, performance, and AI-readiness optimizations implemented across the Tanvi Impex codebase (`d:\Projects\Tanvi`).

All changes were applied with zero disruption to the existing brand identity, luxury visual design, animations, or operational logic. Furthermore, all corporate facts (CEO Bhushan Gajra, APMC Market-1 Vashi location, GSTIN, FSSAI Lic #11522998001006, LEI, and **15kg Minimum Order Quantity**) were strictly verified and kept 100% authentic.

---

## 2. Phase-by-Phase Implementation Details

### Phase 1: Semantic HTML & Answer Engine Optimization (AEO)
- **Persistent Semantic H1:** In `src/pages/HomePage.tsx`, added a persistent, authoritative semantic `<h1>` tag:
  `Tanvi Impex | Wholesale California Almonds, Irani Pistachios & Dry Fruits Importer Mumbai`.
- **Carousel H1 Decoupling:** In `src/components/Hero.tsx`, decoupled the rotating animated carousel text from the HTML document's primary H1. Converted carousel titles to `role="heading" aria-level={2}`, ensuring search engines index a stable, keyword-rich primary title without cycling through single words like "Almonds".
- **Semantic FAQ Accordion:** In `src/components/FAQSection.tsx`:
  - Upgraded question labels from plain `<span>` tags to semantic `<h3 id="faq-heading-...">` tags.
  - Added complete ARIA accessibility attributes (`aria-expanded`, `aria-controls`, `role="region"`, `aria-labelledby`).
  - Added all 6 verified FAQ items with high-citability direct answers (first sentence answers the question directly in 25-35 words for Google Featured Snippets and AI Overviews).
  - Explicitly aligned the minimum wholesale order quantity to **start from 15kg**.
- **Verified B2B Wholesale Specification Table:** In `src/pages/ProductsPage.tsx`:
  - Added an accessible, responsive HTML table (`<table>`, `<caption>`, `<thead>`, `<tbody>`, `<th scope="col">`, `<th scope="row">`) detailing verified specifications across all 12 key wholesale product lines (15kg/20kg/25kg/30kg master packaging, inner packs, origin, and minimum supply condition).
  - Cleaned up the heading hierarchy to ensure `<h2>` follows `<h1>` properly.

### Phase 2: Schema.org, GEO & AI Readiness
- **Entity Linkage Fix:** In `index.html`, corrected the broken WebSite publisher reference from `#store` to `#organization`, unifying the Knowledge Graph entity resolution for Google and LLM crawlers.
- **Voice Search & SpeakableSpecification:** Added `WebPage` structured data with `@type: "SpeakableSpecification"` targeting `#faq-section-title`, `#faq h3`, and `#specs-heading` for Google Assistant and voice synthesis engines.
- **Synchronized FAQPage Schema:** Aligned the FAQPage JSON-LD schema with the 6 verified FAQs in `FAQSection.tsx`, including the updated 15kg MOQ policy.
- **Standardized AI Knowledge Files:**
  - Created `/public/llms.txt` following the standard LLM summary format.
  - Created `/public/llms-full.txt` providing an exhaustive entity reference for LLM reasoning models (SearchGPT, Perplexity, Gemini, Claude).
  - Added discovery directives in `public/robots.txt`.

### Phase 3: Accessibility & Trust (WCAG 2.2 AA)
- **Skip to Content:** Implemented a keyboard-accessible `<a href="#main-content">Skip to main content</a>` in `src/components/Navigation.tsx`.
- **Form Accessibility:**
  - In `src/components/QuoteModal.tsx`, added form `name="wholesale_quote_form"`, `id="wholesale-quote-form"`, explicit `<label htmlFor="...">` bindings, input `id`, `name`, and standard `autoComplete` attributes (`name`, `tel`, `address-level2`).
  - In `src/components/Footer.tsx`, added form `name="newsletter_form"`, `id="footer-newsletter-form"`, `<label htmlFor="footer-newsletter-email">`, and `autoComplete="email"`.
- **Verifiable Privacy Policy & Terms of Service:**
  - Replaced dead `href="#"` footer links with accessible dialog modals presenting authentic corporate data (APMC Market-1 Vashi location, GSTIN, FSSAI, 15kg MOQ, dispute resolution jurisdiction) without any fabricated information.

### Phase 4: Performance, Image Handling & Core Web Vitals
- **JavaScript Bundle Code-Splitting:**
  - Configured manual chunking in `vite.config.ts` to separate heavy 3D packages (`three`, `@react-three/fiber`, `@react-three/drei`), animation packages (`framer-motion`, `gsap`), and UI packages into independent vendor chunks.
  - **Results:** Reduced initial app entry bundle from **1,474.52 kB** down to **311.71 kB** (a 79% reduction in main thread parsing weight).
- **Category Images Consistency:** Preserved the user's curated category images across `HomeCategoryBar.tsx` and `FeaturedProducts.tsx`, while adding explicit layout dimensions (`width="192"` and `height="192"`) and non-blocking attributes (`loading="lazy"`, `decoding="async"`).
- **Metadata Optimization:**
  - Refined Title tag in `index.html` and `SEO.tsx` to 60 characters:
    *`Tanvi Impex | Wholesale Almonds & Pistachios Importer Mumbai`*
  - Refined Meta Description to 157 characters:
    *`Wholesale importer & distributor of California Almonds, Irani Pistachios & seeds at APMC Market, Navi Mumbai. Direct port sourcing & pan-India bulk supply.`*
- **Image Sitemap:** Enhanced `public/sitemap.xml` with Google image schema extensions (`xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"`).
