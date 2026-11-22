# GetBoth

**Never choose. Have both.**

GetBoth connects university students with flexible job opportunities that fit their academic schedules, skills and ambitions. Built for Tunisia, starting in Sousse.

## Project structure
- `src/`: React + TypeScript + Vite web app, with student, employer and admin views.
- `backend/`: Supabase database SQL and web API services.
- `mobile/`: Expo + React Native + TypeScript mobile app.

## Local setup
Requirements: Node.js, npm, an existing GetBoth Supabase project, and Expo Go for mobile testing.

### Web
```powershell
npm.cmd ci
Copy-Item .env.example .env
# Fill in the existing project's URL and public/publishable key.
npm.cmd run dev
```

### Mobile
```powershell
cd mobile
npm.cmd ci
Copy-Item .env.example .env
# Use the same Supabase project URL and publishable key as the web app.
npx.cmd expo start --clear
```
Scan the QR code with Expo Go. Use the same Wi-Fi or `--tunnel` if needed.

## Membership
- Free: student job discovery, scheduling and applications.
- Employer Pro: early-access interest requests, with proposed recruitment filters, promotions and analytics. No actual billing or premium entitlements yet.
- Apply `backend/migrations/membership.sql` in the existing Supabase project (requires the existing profiles table).
- Web: open Membership in the header and sign in to an employer account.
- Mobile: open Membership from welcome or profile and sign in using the same web account. This membership screen uses the real backend; other mobile screens remain local demo functionality.
- Requests are shared across clients. Only the requesting user can read their row; only employers can insert their own pending request. Approval is a trusted administrative operation. Do not expose service-role keys.
- Validate by submitting a request as a test employer, refreshing both clients, and checking that another account cannot read it or approve it.

## Checks
```powershell
npm.cmd run build
cd mobile
npx.cmd tsc --noEmit
```

## Status
Web: integration preview; payments simulated. Mobile: interactive demo with connected membership screen. Membership migration must be applied and tested before deploying. No actual payment or subscription activation is included.

## Security
Never commit .env files, private credentials or service-role keys. Only public/publishable client keys belong in frontend configuration. Keep Row Level Security enabled.

## Team
LilTech Byteforce — GetBoth.
