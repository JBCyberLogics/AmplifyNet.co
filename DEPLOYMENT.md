# Deployment Instructions

## Frontend

1. Install dependencies with `npm install`.
2. Run `npm run build`.
3. Deploy the Next.js app to Vercel, Render, Railway, or another Node-compatible host.
4. Configure SSL and custom domain records.

## Backend Requirements Before Launch

- Node.js API with Express or NestJS
- PostgreSQL database with migrations
- Secure session or JWT authentication
- Role-based access control
- Password hashing with Argon2 or bcrypt
- Cloud object storage for ads and screenshots
- File validation for image uploads
- M-Pesa Daraja or approved provider integration
- Email, SMS, or WhatsApp notification providers
- Audit logs and automated backups

## Environment Variables

Use server-side environment variables only.

```bash
DATABASE_URL=
SESSION_SECRET=
MPESA_CONSUMER_KEY=
MPESA_CONSUMER_SECRET=
MPESA_SHORTCODE=
MPESA_PASSKEY=
STORAGE_BUCKET=
EMAIL_PROVIDER_KEY=
SMS_PROVIDER_KEY=
```

Never expose payment credentials in client code.

## Production Checks

- Confirm merchant phone numbers are hidden from earner APIs.
- Confirm upload limits are enforced server-side.
- Confirm advertisement expiry jobs run reliably.
- Confirm duplicate evidence submissions are blocked by database constraints.
- Confirm withdrawals require admin approval.
- Confirm all payment callbacks are signed or otherwise verified.
