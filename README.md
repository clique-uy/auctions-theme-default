# Clique Auctions — default

This repository contains only the default presentation overlay.
Clique composes it with the canonical customer frontend for development and
deployment.

## Develop

```bash
cd ../my-saas
npm run theme:dev -- /home/pipe/repos/auctions-theme-default
```

## Verify

```bash
cd ../my-saas
npm run theme:check -- /home/pipe/repos/auctions-theme-default
```

Customize the five typed presentation entries under `theme/pages/`.
The canonical platform supplies their functional `market` and `account`
slots. Reusable theme-owned `.ts` and `.tsx` files belong anywhere under
`theme/components/`. Optional views under `theme/views/` override market
presentation (hero, grids, cards, lot detail, auction detail, live auction, wishlist),
account presentation (dashboard, cards, gate, profile), auth controls, and the
notification bell while the platform supplies auth widgets and behavioral slots.
Arbitrary Next.js routes are not supported.

Theme code may import approved browser dependencies installed by the canonical
frontend, including `lucide-react`, `lenis`, `lenis/react`, and
`@/lib/utils` (`cn`). Theme presentation may use Tailwind utility classes;
the platform loads Tailwind without Preflight so `theme/styles.css` keeps
working. Theme repositories intentionally do not contain their own package
manifest.

Theme source is presentation-only. It cannot import arbitrary platform modules,
open network connections, define server actions, read runtime environment
variables, or execute dynamic code. Keep CSS rooted at `.clique-storefront`
so storefront rules stay out of the canonical administration console.

Register the theme only after its source repository is ready:

```bash
cd ../my-saas
npm run theme:register -- --path /home/pipe/repos/auctions-theme-default --name "default"
```
# auctions-theme-default
