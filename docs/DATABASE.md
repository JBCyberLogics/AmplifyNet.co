# Database Structure

Recommended database: PostgreSQL.

## Core Tables

### users

- `id uuid primary key`
- `role text check in ('earner', 'merchant', 'admin')`
- `full_name text`
- `phone text unique`
- `email text unique`
- `password_hash text`
- `county text`
- `status text`
- `referral_code text unique`
- `referred_by uuid null`
- `created_at timestamptz`

### merchants

- `id uuid primary key`
- `user_id uuid references users(id)`
- `business_name text`
- `representative_name text`
- `business_category text`
- `location text`
- `verification_status text`

### membership_tiers

- `id uuid primary key`
- `name text`
- `registration_fee numeric`
- `commission_per_verified_view numeric`
- `benefits jsonb`
- `is_active boolean`

### merchant_plans

- `id uuid primary key`
- `name text`
- `monthly_price numeric`
- `daily_upload_limit int`
- `ad_lifetime_hours int default 24`
- `subscription_days int default 30`
- `features jsonb`
- `is_active boolean`

### subscriptions

- `id uuid primary key`
- `merchant_id uuid references merchants(id)`
- `plan_id uuid references merchant_plans(id)`
- `starts_at timestamptz`
- `expires_at timestamptz`
- `status text`
- `payment_id uuid`

### advertisements

- `id uuid primary key`
- `merchant_id uuid references merchants(id)`
- `product_name text`
- `description text`
- `price numeric null`
- `instructions text`
- `image_url text`
- `uploaded_at timestamptz`
- `expires_at timestamptz`
- `status text`

### submissions

- `id uuid primary key`
- `advertisement_id uuid references advertisements(id)`
- `earner_id uuid references users(id)`
- `screenshot_url text`
- `captured_at timestamptz`
- `view_count int`
- `status text`
- `commission_amount numeric`
- `review_note text`
- `reviewed_by uuid null`
- `created_at timestamptz`

Unique index: `(advertisement_id, earner_id)`.

### referrals

- `id uuid primary key`
- `referrer_id uuid references users(id)`
- `referred_user_id uuid references users(id)`
- `type text check in ('earner', 'business')`
- `qualifying_action text`
- `commission_amount numeric`
- `status text`
- `created_at timestamptz`

### withdrawals

- `id uuid primary key`
- `earner_id uuid references users(id)`
- `amount numeric`
- `fee numeric`
- `mpesa_account text`
- `status text`
- `requested_at timestamptz`
- `processed_at timestamptz null`
- `admin_note text`

### payments

- `id uuid primary key`
- `user_id uuid references users(id)`
- `purpose text`
- `amount numeric`
- `provider text`
- `provider_reference text`
- `status text`
- `receipt_url text`
- `created_at timestamptz`

### settings

- `key text primary key`
- `value jsonb`
- `updated_at timestamptz`

### notifications

- `id uuid primary key`
- `user_id uuid references users(id)`
- `channel text`
- `title text`
- `body text`
- `status text`
- `created_at timestamptz`

### audit_logs

- `id uuid primary key`
- `actor_id uuid references users(id)`
- `action text`
- `entity_type text`
- `entity_id uuid`
- `metadata jsonb`
- `created_at timestamptz`

## Background Jobs

- Expire advertisements after 24 hours.
- Expire merchant subscriptions after 30 days.
- Queue withdrawal processing on Tuesday and Saturday.
- Send notification events.
- Flag suspicious duplicate submissions.
