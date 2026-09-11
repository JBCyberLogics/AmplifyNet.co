# AmplifyNet.co Marketplace Prototype

A modern, mobile-friendly web platform prototype for a Kenyan WhatsApp Status Advertising Marketplace.

## What is included

- Public pages: Home, About, How It Works, Pricing, Contact, Terms, Privacy
- Earner and business registration flows
- Login entry point
- Earner, merchant, and admin dashboards
- Available advertisements marketplace
- Screenshot evidence submission flow with active-ad validation
- Referral, withdrawal, subscription, notification, assistant, and settings surfaces
- Editable company settings in the admin dashboard
- API, database, and deployment documentation in `docs/`

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Implementation note

This is a production-style frontend prototype. Real authentication, password hashing, M-Pesa Daraja credentials, cloud file storage, email/SMS providers, and background expiry jobs must be implemented server-side before launch.
