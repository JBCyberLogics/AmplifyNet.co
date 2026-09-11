# API Documentation

Base path: `/api/v1`

## Authentication

- `POST /auth/register/earner`
- `POST /auth/register/business`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/session`

Passwords must be hashed server-side. Tokens should be stored in secure, HTTP-only cookies or managed session storage.

## Accounts

- `GET /me`
- `PATCH /me`
- `GET /admin/users`
- `PATCH /admin/users/:id/status`
- `GET /admin/audit-logs`

Roles: `earner`, `merchant`, `admin`.

## Memberships and Subscriptions

- `GET /membership-tiers`
- `PATCH /admin/membership-tiers/:id`
- `POST /memberships/activate`
- `GET /merchant-plans`
- `PATCH /admin/merchant-plans/:id`
- `POST /subscriptions`
- `POST /subscriptions/:id/renew`

Commission rates and package prices are administrator-configurable.

## Advertisements

- `GET /advertisements`
- `POST /merchant/advertisements`
- `PATCH /admin/advertisements/:id/status`
- `GET /merchant/advertisements/history`

Rules:

- Only approved merchants can upload.
- Daily upload limits are enforced by active subscription.
- Each advertisement expires after 24 hours.
- Merchant phone numbers are never returned to earners.

## Evidence Submissions

- `POST /earner/submissions`
- `GET /earner/submissions`
- `GET /admin/submissions`
- `PATCH /admin/submissions/:id/review`

Server checks:

- Advertisement must still be active.
- Earner cannot submit duplicate claims for the same advertisement.
- Uploaded screenshot must pass file validation.
- Approved submissions calculate commission from the earner's current tier.

## Referrals

- `GET /referrals`
- `POST /referrals/qualify`
- `PATCH /admin/referrals/:id/status`

Self-referrals and duplicate referral claims must be blocked.

## Withdrawals

- `POST /withdrawals`
- `GET /withdrawals`
- `GET /admin/withdrawals`
- `PATCH /admin/withdrawals/:id/status`

Statuses: `pending`, `under_review`, `approved`, `processing`, `paid`, `rejected`, `failed`.

## Payments

- `POST /payments/mpesa/stk-push`
- `POST /payments/mpesa/callback`
- `GET /payments/history`
- `GET /admin/payments`

Do not expose Daraja credentials to the frontend. Till Number and official account labels should come from admin-managed settings.

## Settings and Notifications

- `GET /settings/public`
- `GET /admin/settings`
- `PATCH /admin/settings`
- `GET /notifications`
- `PATCH /notifications/:id/read`
