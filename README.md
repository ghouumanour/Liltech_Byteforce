# GetBoth

**Never choose. Have both.**

GetBoth connects university students with flexible job opportunities that fit their academic schedules, skills and ambitions. Built for Tunisia, starting in Sousse.

## Project structure
- `src/`: React + TypeScript + Vite web app, with student, employer and admin views.
- `backend/`: Supabase database SQL and web API services.
- `mobile/`: Expo + React Native + TypeScript mobile app.

## Public Supabase connection
- API URL: https://fmtdookfbmrilpomqiep.supabase.co
- [Supabase project dashboard](https://supabase.com/dashboard/project/fmtdookfbmrilpomqiep) (team access required)
- [SQL Editor](https://supabase.com/dashboard/project/fmtdookfbmrilpomqiep/sql/new) (database administrator only)

The following publishable key is intended for client-side use. Access remains controlled by PostgreSQL grants, RLS and user authentication; never publish service-role keys, private credentials or database passwords.

### Web environment (.env)
```dotenv
VITE_SUPABASE_URL=https://fmtdookfbmrilpomqiep.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_qMdlI6reWx4lOZ8FrZBvTw_CpvWolDK
```

### Mobile environment (mobile/.env.local)
```dotenv
EXPO_PUBLIC_SUPABASE_URL=https://fmtdookfbmrilpomqiep.supabase.co
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_qMdlI6reWx4lOZ8FrZBvTw_CpvWolDK
```

## Local setup
Requirements: Node.js, npm, an existing GetBoth Supabase project, and Expo Go for mobile testing.

### Web
```powershell
npm.cmd ci
Copy-Item .env.example .env
# The example already contains the public connection configuration.
npm.cmd run dev
```

### Mobile
```powershell
cd mobile
npm.cmd ci
Copy-Item .env.example .env
# The example already contains the public connection configuration.
npx.cmd expo start --clear
```
Scan the QR code with Expo Go. Use the same Wi-Fi or `--tunnel` if needed.

## Membership
- Free: student job discovery, scheduling and applications.
- Employer Pro: early-access interest requests, with proposed recruitment filters, promotions and analytics. No actual billing or premium entitlements yet.
- Apply `backend/migrations/membership.sql` in the existing Supabase project (requires the existing profiles table).
- Web: open Membership in the employer navigation and sign in to an employer account.
- Mobile: open Membership from welcome or profile and sign in using the same web account. This membership screen uses the real backend; other mobile screens remain local demo functionality.
- Requests are shared across clients through the getboth_membership RPC, with a client-side 1850 ms deadline per membership request. A timeout is not a guarantee that a write did not happen; refresh status before retrying. Only the requesting user can read their row; only employers can insert their own pending request. Approval is a trusted administrative operation. Do not expose service-role keys.
- Validate by submitting a request as a test employer, refreshing both clients, and checking that another account cannot read it or approve it.

## Notifications
- Apply `backend/migrations/notifications.sql` in the same Supabase project using an authorized database administrator.
- RLS restricts notification reads and read-status updates to the signed-in user. Public clients cannot insert notifications.
- Database triggers create notifications when a student applies or an application status changes.
- The Web UI fetches notifications every 30 seconds and stores read state in Supabase. Before this migration is applied, it displays an empty notification list instead of pretending to deliver messages.

## Checks
```powershell
node scripts/smoke-test.mjs
npm.cmd run build
cd mobile
npx.cmd tsc --noEmit
```
The smoke test checks public API availability and verifies anonymous access is denied for Membership. It does not replace authenticated end-to-end tests or guarantee latency under two seconds.

## Status
Web: live Supabase integration for core mission flows; authenticated end-to-end tests are still required. Mobile: interactive demo with a connected membership screen. The membership RPC is present, but the employer request flow has not been validated with an authenticated test account. Notifications require applying `backend/migrations/notifications.sql`. Reviews, direct messaging, and some admin controls are not yet connected to the live backend. No real payments or subscription activation are included.

## Security
Never commit local .env files, private credentials or service-role keys. The public client configuration in this README and the example files is intentional. Only public/publishable client keys belong in frontend configuration. Keep Row Level Security enabled.

## Team
LilTech Byteforce — GetBoth.
