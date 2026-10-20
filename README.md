# WasteMatch — Strategic concept website

A lightweight, responsive, buyer-facing website for **WasteMatch**, a proposed B2B industrial symbiosis service method available for potential acquisition, licensing, or co-development.

**Status:** concept/pre-validation. This is a professional information and business-development website, **not** a live waste marketplace or a statement of proven traction or exclusive intellectual property.

## Pages

- `index.html`: executive proposition, process framework, interactive economic model, commercial structures, industry examples and business inquiry composer.
- `brief.html`: public commercial buyer brief, proposed pilot framework and diligence requirements (print to PDF supported).
- `privacy.html`: website disclosures, email handling and privacy.
- `main.js`: interactive economic model, mobile navigation, client-side inquiry composer and print action.
- `styles.css`: responsive styles, accessibility and print styles.
- `favicon.svg` / `social-preview.svg`: custom brand assets.
- `vercel.json`: caching-independent security headers and clean URL setup.

## Deploy

This is a dependency-free static website. The repo also contains a production-ready Nginx Dockerfile for container hosting.

**Railway:** Connect the repository to a Railway project. Railway detects `Dockerfile`, runs Nginx on port `8080`, and serves the site at its generated domain. Note: Railway’s free plan has a monthly usage-credit limit; availability is not guaranteed when that credit is exhausted.

**Netlify (recommended for long-term free commercial static hosting):** New site → Import from Git → GitHub → select `premangshumal-cyber/WasteMatch-`. Publish directory: `.`. Leave build command empty. Netlify Free permits commercial sites subject to published usage credits and terms. Only the static page files are published.

**Vercel:** `vercel.json` is included for compatibility, but Vercel Hobby prohibits commercial advertising and sales. Do not publish this acquisition/marketing site on Vercel Hobby; use a compatible paid plan if choosing Vercel.

Run locally using `python -m http.server 8000` then open `http://localhost:8000`.

## How inquiries work (important)

The form intentionally does **not** pretend to submit leads to a backend. It validates fields in-browser, then prepares a `mailto:` message addressed to the creator, which the sender must explicitly send in their email application. “Copy inquiry text” provides a fallback. No data is stored, sent to a site server, or captured in analytics. A future form backend would require an email delivery service and appropriate privacy controls.

Contact recipient: `premangshu.mal@gmail.com` (derived from the linked GitHub owner's account profile and needs owner confirmation before general promotion).

## Economic model

For material volume `V` tonnes, avoided disposal cost `D`, conventional input cost `C`, agreed material price `P`, delivered logistics `L`, and conditioning / verification `Q` (all per tonne):

- Generator improvement: `V × (D + P − L − Q)`
- Receiving buyer improvement: `V × (C − P)`
- Combined value: `V × (D + C − L − Q)`

Transfer price is a value transfer between participants, so it is **not** counted twice. The model is purely illustrative and excludes capital costs, taxes, financing, material substitution ratios, quality losses, operating costs and compliance uncertainties.

## Claim governance

- Never describe this proposal as operating, patented, trademark-registered, validated, unique, or having current customers or income without evidence.
- Sample applications are hypothetical and require technical/regulatory review.
- Do not publish detailed trade secrets or potential partners' commercially sensitive information.
- For any transfer, assess brand availability, transferable copyright in materials, prior art, legal compliance and written contract terms.

## Free-hosting note

Vercel and GitHub may offer no-cost starter tiers subject to eligibility, fair-use limits and their current terms. A free tier is not a blanket promise of zero ongoing business cost.
