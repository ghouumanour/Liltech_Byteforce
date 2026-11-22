create schema if not exists private;
create or replace function private.transition_application(p_id uuid,p_action text) returns void language plpgsql security definer set search_path='' as $$
declare a public.applications%rowtype; m public.missions%rowtype; actor uuid:=auth.uid(); actor_role public.user_role;
begin
 if actor is null then raise exception 'Sign in required'; end if;
 select role into actor_role from public.profiles where id=actor;
 select * into a from public.applications where id=p_id for update;
 if not found then raise exception 'Application not found'; end if;
 select * into m from public.missions where id=a.mission_id for update;
 if p_action in ('accepted','rejected','completed') and (actor<>m.employer_id or actor_role is distinct from 'employer'::public.user_role) then raise exception 'Employer permission required'; end if;
 if p_action='accepted' then
  if a.status<>'pending' or m.status<>'open' or m.spots_open<1 then raise exception 'Application cannot be accepted'; end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(a.student_id::text,0));
  if exists(select 1 from public.applications b join public.missions n on n.id=b.mission_id where b.student_id=a.student_id and b.status in ('accepted','completed') and n.mission_date=m.mission_date and n.start_time<m.end_time and n.end_time>m.start_time) then raise exception 'Student already has an overlapping mission'; end if;
  update public.applications set status='accepted',updated_at=now() where id=p_id;
  update public.missions set spots_open=spots_open-1,updated_at=now() where id=m.id;
 elsif p_action='rejected' then
  if a.status<>'pending' then raise exception 'Only pending applications can be rejected'; end if;
  update public.applications set status='rejected',updated_at=now() where id=p_id;
 elsif p_action='check_in' then
  if actor<>a.student_id or actor_role is distinct from 'student'::public.user_role or a.status<>'accepted' then raise exception 'Accepted student required'; end if;
  if (now() at time zone 'Africa/Tunis')::date<>m.mission_date then raise exception 'Check-in is only available on the mission date'; end if;
  update public.applications set checked_in_at=coalesce(checked_in_at,now()),updated_at=now() where id=p_id;
 elsif p_action='completed' then
  if a.status='completed' then return; end if;
  if a.status<>'accepted' or a.checked_in_at is null then raise exception 'Check-in required before completion'; end if;
  update public.applications set status='completed',checked_out_at=now(),updated_at=now() where id=p_id;
  insert into public.transactions(user_id,mission_id,type,status,amount,description) values(a.student_id,m.id,'escrow_release','settled',m.total_payout,'SIMULATED GETBOTH mission earnings');
  update public.profiles set available_balance=coalesce(available_balance,0)+m.total_payout where id=a.student_id;
 else raise exception 'Unsupported application action'; end if;
end; $$;
revoke all on function private.transition_application(uuid,text) from public,anon,authenticated;
grant usage on schema private to authenticated;
grant execute on function private.transition_application(uuid,text) to authenticated;
create or replace function public.transition_application(p_id uuid,p_action text) returns void language sql security invoker set search_path='' as $$select private.transition_application(p_id,p_action);$$;
revoke all on function public.transition_application(uuid,text) from public,anon;
grant execute on function public.transition_application(uuid,text) to authenticated;
