# Bootstrap Prompt — Tahfiz Events Platform

Paste the block below as the **first message** into Claude Code opened in a fresh empty directory (e.g. `tahfiz-events/`). It scaffolds the entire platform from scratch.

---

You are bootstrapping a production-grade multi-event registration platform called **Tahfiz Events** for a Quran memorization ceremony organization based in Vienna, Austria. The platform will be hosted on Coolify (self-hosted Docker).

## Hard stack requirements

- Next.js 15+ (App Router, React 19, TypeScript, strict mode, `output: "standalone"`)
- Tailwind CSS + shadcn/ui — initialize with `npx shadcn@latest init`; install Sheet, Dialog, Button, Input, Form, Label, Card, Badge, Sonner, DropdownMenu, Tabs, Table, Select, Checkbox, Switch, Separator
- Drizzle ORM + PostgreSQL 16 (use `drizzle-kit` migrations, NOT `push`)
- pnpm package manager
- `next-intl` for i18n (locales: `tr` default, `de`, `en`)
- `react-hook-form` + `zod` for forms
- `resend` + `react-email` for transactional mail (TR/DE/EN templates)
- `web-push` for notifications (VAPID)
- `passkit-generator` for Apple Wallet `.pkpass`
- `qrcode` (server) and `html5-qrcode` (admin scanner)
- `iron-session` + `bcrypt` + `otplib` for admin auth (email + password + optional TOTP)
- Merriweather via `next/font/google`
- Primary brand color `#4c9f97`, dark footer `#1e272e`, background `#eaeced`

## Feature scope (all in v1)

1. **Multi-event model**: each event has `slug`, `title` (i18n jsonb), `description` (i18n), `starts_at`, `ends_at`, `venue_name`, `venue_address`, `maps_url`, `capacity`, `brand_color`, `hero_image_url`, program items (with per-item "notify on start" toggle), `status` (draft/published/archived), `active` flag. Admin can create an event or clone an existing one.
2. **Public landing at `/e/[slug]`**: full-bleed hero with background image, live countdown that calls `navigator.vibrate(10)` each second when the tab is visible and the user has interacted (feature-detect, respect `prefers-reduced-motion`), program section, venue with maps link and optional seating-plan modal, contact footer, sticky WhatsApp + YouTube buttons. Root `/` redirects to the single event where `active = true`.
3. **Registration**: a prominent "Register" CTA opens a shadcn `Sheet` on mobile (<768px) and a `Dialog` on desktop. Fields: email (unique per event), name, phone, adults count (+/– stepper, min 1), kids count (+/– stepper, min 0). `POST /api/register` → insert `pending` registration (or `waitlist` if event at capacity) → create `magic_links` row with hashed token → send email via Resend with link `${PUBLIC_BASE_URL}/e/[slug]/confirm?token=…`. Rate-limit the endpoint by IP + email.
4. **Confirm page `/e/[slug]/confirm`**: validates token, marks registration `confirmed` (or keeps on waitlist), sets signed cookie `tf_registered_<slug>` (HMAC of registrationId, 180 days, `HttpOnly=false` so client can read it, `Secure`, `SameSite=Lax`) to suppress the registration modal on repeat visits. Shows buttons: "Add to Apple Wallet" (downloads `/api/wallet/[regId].pkpass`), "Enable notifications" (requests Web Push permission, subscribes via service worker, POSTs to `/api/push/subscribe`), "View my ticket" → `/e/[slug]/t/[regId]`.
5. **Ticket page `/e/[slug]/t/[regId]`**: registration details, a large QR code (payload = HMAC of regId, signed with `SESSION_SECRET`), toggles for push notifications + email reminders.
6. **Email reminders**: when a registration is confirmed, seed two rows in `reminder_jobs` (`email_t24` at `event.starts_at - 24h`, `email_t1` at `event.starts_at - 1h`). When a program item with `notify_on_start = true` is created/updated, seed one `push_program_start` row per registration that has a push subscription. A single endpoint `POST /api/cron/dispatch` (guarded by bearer `CRON_SECRET`) runs every minute: selects due jobs with `FOR UPDATE SKIP LOCKED`, sends email/push, stamps `sent_at`. All sends must be idempotent.
7. **Apple Wallet pass**: `GET /api/wallet/[regId].pkpass` generates a signed event ticket pass with the event title, attendee name, date/time, venue, and a QR (same HMAC payload as the ticket page). Cert material comes from env vars as base64: `APPLE_PASS_CERT_P12_BASE64`, `APPLE_PASS_CERT_PASSWORD`, `APPLE_WWDR_CERT_BASE64`, `APPLE_PASS_TYPE_ID`, `APPLE_TEAM_ID`. Decode in a small helper, keep cert material out of the repo. Stub cleanly if env vars are missing (return 503 "wallet not configured").
8. **Web Push**: generate VAPID keys, put in env. Service worker at `/public/sw.js` handles `push` events and shows notifications. Subscriptions stored in `push_subscriptions` (dedupe by endpoint). Use `web-push` server-side to send.
9. **Admin area at `/admin`**, session-protected via `iron-session`:
   - `/admin/login` — email + password, then TOTP if configured
   - `/admin` — list events
   - `/admin/events/new` — create event (or clone from existing dropdown)
   - `/admin/events/[slug]` — edit event metadata + program items + registrations list (search, filter by status) + CSV export + waitlist view with manual-promote action
   - `/admin/events/[slug]/checkin` — camera scanner (`html5-qrcode`), validates HMAC, flips status to `attended`, shows green ✓ or red ✗ overlay, has a "manual lookup by email" fallback
   - `/admin/events/[slug]/broadcast` — compose ad-hoc email or push to all confirmed attendees (seeds broadcast jobs; same cron dispatcher processes them)
   - Seed initial admin via a `pnpm db:seed` script from env `ADMIN_EMAIL` + `ADMIN_PASSWORD`.
10. **i18n**: all user-visible strings in `messages/{tr,de,en}.json`. Locale switcher in header + footer. Email templates have one React Email component per locale (or one component that accepts locale). Store event text as jsonb `{tr, de, en}`.

## Project layout

```
app/
  [locale]/
    page.tsx                         # redirects to active event
    e/[slug]/page.tsx                # public landing
    e/[slug]/confirm/page.tsx
    e/[slug]/t/[regId]/page.tsx
    layout.tsx                       # html[lang] from locale, next-intl provider
  admin/
    layout.tsx                       # requires session
    login/page.tsx
    page.tsx
    events/new/page.tsx
    events/[slug]/page.tsx
    events/[slug]/checkin/page.tsx
    events/[slug]/broadcast/page.tsx
  api/
    register/route.ts
    confirm/route.ts
    push/subscribe/route.ts
    wallet/[regId]/route.ts
    cron/dispatch/route.ts
    admin/[...]/route.ts             # session-guarded mutations
components/
  landing/                           # hero, countdown, program, location, seating-modal, sticky-bar
  register-sheet/                    # form, stepper
  admin/                             # event-form, registrations-table, scanner
  ui/                                # shadcn-generated
db/
  schema.ts                          # drizzle tables
  migrations/                        # drizzle-kit output
  seed.ts                            # creates first admin + example event
lib/
  mail/                              # resend client + react-email templates
  push/                              # web-push helpers
  wallet/                            # passkit-generator helpers (guards on missing certs)
  auth/                              # iron-session helpers, bcrypt, totp
  qr/                                # HMAC helpers, QR render
  i18n/                              # next-intl config, loaders
messages/
  tr.json  de.json  en.json
public/
  branding/  images/  background.webp  pattern.webp  sw.js
content/
  events/hafizlik-2026.json          # seed data copied from old repo
Dockerfile  docker-compose.yml  .env.example
```

## Database schema (Drizzle)

```
events(id, slug UNIQUE, title_i18n jsonb, description_i18n jsonb, starts_at, ends_at,
       venue_name, venue_address, maps_url, capacity int, brand_color, hero_image_url,
       status enum(draft|published|archived), active bool, created_at)

event_program_items(id, event_id FK, sort_order, starts_at, ends_at,
                    title_i18n jsonb, notify_on_start bool)

registrations(id, event_id FK, email, name, phone, adults int, kids int,
              status enum(pending|confirmed|waitlist|attended|cancelled),
              confirmed_at, attended_at, wallet_serial, created_at,
              UNIQUE(event_id, email))

magic_links(id, registration_id FK, token_hash, purpose enum(confirm|ticket),
            expires_at, used_at)

push_subscriptions(id, registration_id FK, endpoint UNIQUE, p256dh, auth, created_at)

reminder_jobs(id, event_id FK, registration_id FK nullable, program_item_id FK nullable,
              fire_at, kind enum(email_t24|email_t1|push_program_start|push_broadcast|email_broadcast),
              payload jsonb, sent_at, error text)
  INDEX (fire_at) WHERE sent_at IS NULL

admins(id, email UNIQUE, password_hash, totp_secret nullable, role, created_at)
admin_sessions(id, admin_id FK, token_hash, expires_at, created_at)
```

## Seed data (first event mirrors the previous landing page)

- Event title — TR: "Hafızlık Merasimi", DE: "Hafız-Zeremonie", EN: "Hafiz Ceremony"
- Hero headline TR: "Hafızlık Merasimine hoşgeldiniz."
- Venue: "Angerer Str. 14, 1210 Wien" — maps `https://maps.app.goo.gl/rcR5fbzp2JZbcWh48`
- Program items:
  - 19:00–19:45 — "Tilavet ve Ilahiler"
  - 19:45–20:15 — "Hafızlaridan kısa sureler"
  - 20:15–20:35 — "Sohbet"
  - 20:35–21:00 — "Hediye takdimi"
- Contact: phone `+43 677 618 415 90`, email `info@tahfiz.org`
- `starts_at` placeholder: `2026-02-07T19:00:00+01:00` (admin edits after seeding)
- `capacity`: 300 (admin edits)
- `brand_color`: `#4c9f97`

## Environment variables

Document all of these in `.env.example` with descriptions:

- `DATABASE_URL`
- `SESSION_SECRET` (iron-session)
- `PUBLIC_BASE_URL` (for email links, pass `webServiceURL`)
- `RESEND_API_KEY`, `MAIL_FROM`
- `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_SUBJECT`
- `APPLE_PASS_CERT_P12_BASE64`, `APPLE_PASS_CERT_PASSWORD`, `APPLE_WWDR_CERT_BASE64`, `APPLE_PASS_TYPE_ID`, `APPLE_TEAM_ID`
- `CRON_SECRET`
- `ADMIN_EMAIL`, `ADMIN_PASSWORD` (used only by `pnpm db:seed`)
- `DEFAULT_LOCALE=tr`, `SUPPORTED_LOCALES=tr,de,en`

## Delivery rules

- Deliver everything in one PR on `main`. Small sensible commits per concern (db, landing, register, wallet, push, admin, cron, i18n, docker, seed).
- NO commented-out code, NO `TODO` comments left behind. If something is intentionally deferred, guard with a clear runtime check.
- Write the code to be readable by a mid-level TS dev without explanations: good names beat comments. Only comment non-obvious WHYs (crypto, idempotency boundaries, cert parsing).
- Provide `pnpm dev`, `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm db:migrate`, `pnpm db:seed` scripts. Make sure `pnpm build` runs green.
- Add a README focused on: local dev (`docker compose up`, pnpm commands), env vars table with descriptions, Coolify deploy steps (including the 1-minute cron configuration), how to generate VAPID keys, how to export the Apple Pass certs into base64 env vars, how to create the first admin.
- Use Node 22 LTS. Add `.nvmrc` and `"engines"` in `package.json`.
- Add ESLint + Prettier (shadcn defaults + Tailwind plugin).
- Do NOT add Storybook, analytics, or test runners unless asked — keep the dependency surface tight.
- When you finish scaffolding, run `pnpm build` and iterate until green before reporting done. Then print:
  1. The list of env vars the user still needs to fill in
  2. The generated VAPID public key
  3. The bootstrap admin credentials

Begin. Confirm understanding in one sentence, then start scaffolding.
