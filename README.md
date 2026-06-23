# Danny Wallet — Landing Page

Marketing landing page for **Danny Wallet**, a self-custody, multi-chain crypto wallet built for real-world security on Danny Chain.

🌐 **Live:** [dannywallet.com](https://dannywallet.com) · **App:** [app.dannywallet.com](https://app.dannywallet.com) · **Desktop wallet:** [app.dannywallet.com/desktop](https://app.dannywallet.com/desktop)

## Features

- Responsive marketing site (hero, features, security, FAQ, download CTA)
- **Live phone mockups** that pull real on-chain data from the wallet API (`app.dannywallet.com/api/danny/*`) — balances, token prices, charts, swap rates
- `/webwallet` embeds the desktop wallet via iframe
- Built for **static export** — no Node runtime needed in production

## Tech Stack

- [Next.js 15](https://nextjs.org) (App Router) · React 19 · TypeScript
- Tailwind CSS v4
- `lucide-react` icons

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export -> ./out
npm run lint
```

## Deployment

This site ships as a **static export** (`output: "export"` in `next.config.ts`).

| Target | How |
|---|---|
| **Production** (dannywallet.com) | `npm run build` → upload `./out` to Nginx at `/var/www/dannywallet` (served from root) |
| **GitHub Pages** | Automated via `.github/workflows/deploy.yml` — builds with `GITHUB_PAGES=true` (applies `basePath: /DAN-wallet-web`) and deploys on every push to `main` |

The `GITHUB_PAGES` env flag toggles the sub-path config so the same codebase deploys cleanly to both the root-domain VPS and the Pages sub-path.

## License

Private project. All rights reserved.
