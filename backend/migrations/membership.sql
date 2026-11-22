-- Apply in the existing getBoth Supabase project as a database administrator.
begin;
create table if not exists public.membership_requests (
  user_id uuid primary key references auth.users(id) on delete cascade default auth.uid(),
  status text not null default 'pending' check (status in ('pending','approved','declined')),
  created_at timestamptz not null default now()
);
alter table public.membership_requests enable row level security;
revoke all on public.membership_requests from anon, authenticated;
grant select on public.membership_requests to authenticated;
grant insert (user_id) on public.membership_requests to authenticated;
grant select, insert, update, delete on public.membership_requests to service_role;
drop policy if exists membership_read_own on public.membership_requests;
create policy membership_read_own on public.membership_requests for select to authenticated
using ((select auth.uid()) = user_id);
drop policy if exists membership_request_own on public.membership_requests;
create policy membership_request_own on public.membership_requests for insert to authenticated
with check ((select auth.uid()) = user_id and status = 'pending' and exists
(select 1 from public.profiles p where p.id = (select auth.uid()) and p.role = 'employer'));
commit;
-- Approval is an administrative workflow, not a payment or entitlement.
