-- Apply as database administrator in the existing GetBoth project.
begin;
create table if not exists public.membership_requests (
  user_id uuid primary key references auth.users(id) on delete cascade default auth.uid(),
  status text not null default 'pending' check (status in ('pending','approved','declined')),
  created_at timestamptz not null default now()
);
alter table public.membership_requests enable row level security;
revoke all on public.membership_requests from public, anon, authenticated;
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

-- One authenticated request returns both account role and membership status.
-- No privilege elevation: existing profile RLS and membership RLS remain in force.
create or replace function public.getboth_membership(p_request boolean default false)
returns jsonb
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_user uuid := auth.uid();
  v_role text;
  v_status text;
begin
  if v_user is null then
    raise exception 'Sign in required' using errcode = '42501';
  end if;
  select p.role::text into v_role from public.profiles p where p.id = v_user;
  if v_role is null then
    raise exception 'Account profile not found' using errcode = '42501';
  end if;
  if p_request then
    if v_role <> 'employer' then
      raise exception 'Employer account required' using errcode = '42501';
    end if;
    insert into public.membership_requests(user_id) values (v_user)
    on conflict (user_id) do nothing;
  end if;
  select m.status into v_status from public.membership_requests m where m.user_id = v_user;
  return jsonb_build_object('role',v_role,'status',coalesce(v_status,'none'));
end;
$$;
revoke all on function public.getboth_membership(boolean) from public, anon, authenticated;
grant execute on function public.getboth_membership(boolean) to authenticated, service_role;
notify pgrst, 'reload schema';
commit;
-- No payment or paid feature activation. Only trusted admins may approve requests.
