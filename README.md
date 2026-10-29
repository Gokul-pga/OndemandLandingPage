<<<<<<< HEAD
# Northstar Home Services — Frontend Starter

Premium, responsive React + TypeScript + Vite frontend for a configurable home-service business. Built from the supplied specification.

## Run locally

1. Install Node.js 20 or newer.
2. In this folder, run `npm install`.
3. Run `npm run dev` and open the local URL Vite prints.
4. Run `npm run build` to type-check and create a production build.

## Central configuration

Edit `src/config/siteConfig.ts` to change the business name and contact details, theme colors, hero, services, process, standards, FAQs, booking windows and time slots, feature toggles, SEO defaults, and legal copy. Services and most homepage content render from this file. Change the example phone number and WhatsApp number before publishing.

## Included

- Responsive premium homepage and mobile navigation
- Services rendered from central configuration; service-specific booking preselection
- Booking request modal with validation, date range, automatic weekday, time slots, address, description, and privacy consent
- WhatsApp click-to-chat URL with encoded booking details
- Dedicated `/terms-and-conditions` and `/privacy-policy` routes
- FAQ accordion, reduced-motion support, sticky mobile booking actions, responsive imagery
- Disabled-by-default testimonials so no fake reviews are shown

## Important integrations before launch

- The contact details and business content are demo placeholders. Replace them in `src/config/siteConfig.ts`.
- The conventional booking form is intentionally a frontend-only demo: it clearly reports that no request was sent or saved. Connect a real API/backend to persist requests and report the actual response.
- WhatsApp opens a pre-filled message; the customer still needs to review and send it. Configure a real WhatsApp number in international digits-only format.
- Legal pages are starter templates, not legal advice. Adapt them to actual business practices and obtain appropriate review before publishing.
- Replace sample image URLs with licensed business photography and set a real canonical URL/OG image for production SEO.
=======
# OndemandLandingPage
>>>>>>> 68fedcd2669a4e76c86ab1e319bb7eaa097d32fa
