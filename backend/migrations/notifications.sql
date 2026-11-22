-- GetBoth notifications, private-by-default; execute in the existing project's SQL Editor.
begin;
create schema if not exists private;
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (length(title) between 1 and 180),
  message text not null check (length(message) between 1 and 1000),
  type text not null default 'system' check (type in ('application','hire','payout','message','system','reminder')),
  link_target text,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists notifications_user_time_idx on public.notifications(user_id,created_at desc);
alter table public.notifications enable row level security;
revoke all on public.notifications from public, anon, authenticated;
grant select on public.notifications to authenticated;
grant update (is_read) on public.notifications to authenticated;
grant all on public.notifications to service_role;
drop policy if exists notifications_select_own on public.notifications;
create policy notifications_select_own on public.notifications for select to authenticated
  using (user_id=(select auth.uid()));
drop policy if exists notifications_mark_read_own on public.notifications;
create policy notifications_mark_read_own on public.notifications for update to authenticated
  using (user_id=(select auth.uid()))
  with check (user_id=(select auth.uid()));

create or replace function private.notify_on_application()
returns trigger language plpgsql security definer set search_path='' as $$
declare owner_id uuid; job_title text;
begin
  select m.employer_id, m.title into owner_id, job_title
  from public.missions m where m.id=NEW.mission_id;
  if TG_OP='INSERT' then
    if owner_id is not null then
      insert into public.notifications(user_id,title,message,type,link_target)
      values(owner_id,'New application', 'You received an application for ' || coalesce(job_title,'a mission') || '.', 'application','applicants');
    end if;
  elsif TG_OP='UPDATE' and NEW.status is distinct from OLD.status and NEW.status in ('accepted','rejected','completed') then
    insert into public.notifications(user_id,title,message,type,link_target)
    values(NEW.student_id, 'Application updated',
      'Your application for ' || coalesce(job_title,'a mission') || ' is now ' || NEW.status || '.', 'hire','applications');
  end if;
  return NEW;
end; $$;
revoke all on function private.notify_on_application() from public, anon, authenticated;
drop trigger if exists getboth_application_notify_insert on public.applications;
create trigger getboth_application_notify_insert
after insert on public.applications
for each row execute function private.notify_on_application();
drop trigger if exists getboth_application_notify_status on public.applications;
create trigger getboth_application_notify_status
after update of status on public.applications
for each row when (OLD.status is distinct from NEW.status)
execute function private.notify_on_application();
notify pgrst,'reload schema';
commit;
