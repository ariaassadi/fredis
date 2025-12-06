# Café Fredis

> **Café Fredis** är ett modernt kafé med fokus på autentiska svenska bakverk och österländska delikatesser. Vi erbjuder allt från klassiska kladdkakor och kanelbullar till irakisk baklava, allt baket dagligen med de finaste ingredienserna.

## stack

1. 🧱 **core**: [nextjs 15.3](https://nextjs.org) + [react 19.1](https://react.dev) + [ts 5.8](https://typescriptlang.org)
2. 🎨 **ui**: [tailwind 4.1](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
3. 🔒 **auth**: [better-auth](https://better-auth.com)
4. 🎬 **anims**: [animejs](https://animejs.com)
5. 📦 **storage**: [uploadthing](https://uploadthing.com)
6. 📊 **analytics**: [vercel](https://vercel.com/docs/analytics)
7. 🧬 **db**: [drizzle-orm](https://orm.drizzle.team) ([pg](https://neon.tech/postgresql/tutorial)) + [neon](https://neon.tech)/(🤔🔜)[supabase](https://supabase.com)
8. 🏗️ **dx**: [eslint](https://eslint.org) + [biome](https://biomejs.dev) + [knip](https://knip.dev)
9. 📝 **forms**: [react-form](https://tanstack.com/form) _(🔜 w.i.p)_ + [arktype](https://arktype.io)
10. 📅 **tables**: [react-table](https://tanstack.com/table)
11. 🌐 **i18n**: [next-intl](https://next-intl.dev) _(🔜 w.i.p)_
12. 💌 **email**: [resend](https://resend.com) _(🔜 w.i.p)_
13. 💳 **payments**: [polar](https://polar.sh)
14. 🔑 **api**: [orpc](https://orpc.unnoq.com) _(🔜 w.i.p)_

> these features define the main reliverse stack. for an alternative setup—featuring clerk, stripe, trpc, and more—check out [versator](https://github.com/blefnk/versator).

## snabbstart

1. installera [git](https://git-scm.com), [node.js](https://nodejs.org), [bun](https://bun.sh).
2. kör:

   ```bash
   git clone https://github.com/ariaassadi/fredis.git
   cd fredis
   bun install
   copy .env.example .env
   ```

3. fyll i de nödvändiga miljövariablerna i `.env` filen.
4. valfritt, redigera `src/app.ts` filen för att göra appen din.
5. kör:

   ```bash
   bun db:push # populera db med schema
   bun dev # starta utvecklingsserver
   bun run build # bygg produktionsversion
   ```

6. redigera något i koden manuellt eller be ai om hjälp.
7. klart. seriöst. du bygger nu.

<!-- 
2. run:
   ```bash
   bun i -g @reliverse/cli
   reliverse cli
   ```
3. select **"create a new project"**.
4. follow prompts to configure your store.
-->

### commands

| command         | description                    |
|-----------------|--------------------------------|
| `bun dev`       | start local development        |
| `bun build`     | create a production build      |
| `bun latest`    | install latest deps            |
| `bun ui`        | add shadcn components          |
| `bun db:push`   | apply db schema changes        |
| `bun db:auth`   | update auth-related tables     |
| `bun db:studio` | open visual db editor          |

## polar integration

relivator now integrates with [polar](https://polar.sh) for payment processing and subscription management.

### features

- checkout flow for subscription purchases
- customer portal for managing subscriptions
- webhook handling for subscription events
- automatic customer creation on signup
- integration with better-auth for seamless authentication

### setup instructions

1. create an account on [polar](https://polar.sh)
2. create an organization and get an organization access token
3. configure your environment variables in `.env`:
   ```
   POLAR_ACCESS_TOKEN="your_access_token"
   POLAR_WEBHOOK_SECRET="your_webhook_secret"
   POLAR_ENVIRONMENT="production" # or "sandbox" for testing
   ```
4. create products in the polar dashboard
5. update the product IDs in `src/lib/auth.ts` to match your polar products:
   ```typescript
   checkout: {
     enabled: true,
     products: [
       {
         productId: "your-product-id", // Replace with actual product ID from Polar Dashboard
         slug: "pro" // Custom slug for easy reference in Checkout URL
       }
     ]
   }
   ```
6. run `bun db:push` to create the necessary database tables
7. start the application with `bun dev`

### verification

to verify that the integration is working:

1. sign up for an account
2. navigate to the dashboard billing page (`/dashboard/billing`)
3. try subscribing to a plan
4. check that your subscription appears in the billing dashboard
5. test the customer portal by clicking "manage subscription"

### api routes

the following api routes are available for payment processing:

- `/api/payments/customer-state` - get the current customer state
- `/api/payments/subscriptions` - get user subscriptions

## notes

- relivator 1.4.0+ is ai-ready — optimized for ai-powered ides like cursor, making onboarding effortless even for beginners.
- version 1.3.0 evolved into versator, featuring [clerk](https://clerk.com) authentication and [stripe](https://stripe.com) payments. explore [versator demo](https://versator.relivator.com/en), [repo](https://github.com/blefnk/versator), or [docs](https://docs.reliverse.org/versator).

## om café fredis

Café Fredis är ett modernt kafé som kombinerar svenska fikatraditioner med österländska smaker. Vi bakar dagligen på plats och erbjuder allt från klassiska svenska bakverk till autentisk irakisk baklava.

## produkter

- **Kakor**: Kladdkaka, Kärleksmums, Prinsesstårta
- **Bakverk**: Kanelbullar, Semla
- **Baklava**: Irakisk Baklava med valnötter och pistage
- **Drycker**: Kaffe, te, och mer

## licens

mit © 2025 Café Fredis
