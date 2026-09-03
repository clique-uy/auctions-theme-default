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

Register all public v4 overrides in `theme/theme.tsx` with `defineTheme`.
Page overrides receive the canonical page-builder `content` slot; omitted
pages, shell elements, components, views, and system views use platform
defaults. Private implementations live in the organized folders below
`theme/`. Arbitrary Next.js routes are not supported.

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
