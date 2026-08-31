-- ZonaGTA6TV — Supabase database
-- Run this entire script in Supabase > SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null check (char_length(username) between 3 and 30),
  display_name text not null default 'Jugador',
  bio text not null default '',
  avatar_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  content text not null check (char_length(content) between 1 and 2000),
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  content text not null check (char_length(content) between 1 and 1000),
  created_at timestamptz not null default now()
);

create table if not exists public.post_likes (
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id,user_id)
);

create table if not exists public.follows (
  follower_id uuid not null references public.profiles(id) on delete cascade,
  following_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id,following_id),
  check (follower_id <> following_id)
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  actor_id uuid references public.profiles(id) on delete cascade,
  type text not null check (type in ('like','comment','follow')),
  post_id uuid references public.posts(id) on delete cascade,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.map_votes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  region text not null,
  created_at timestamptz not null default now(),
  unique(user_id, region)
);

create index if not exists posts_created_idx on public.posts(created_at desc);
create index if not exists comments_post_idx on public.comments(post_id,created_at);
create index if not exists notifications_user_idx on public.notifications(user_id,read,created_at desc);

-- Profile automatically created after registration.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  base_name text;
  final_name text;
begin
  base_name := lower(regexp_replace(coalesce(new.raw_user_meta_data->>'username', split_part(new.email,'@',1)), '[^a-zA-Z0-9_]+', '', 'g'));
  if char_length(base_name) < 3 then base_name := 'jugador'; end if;
  final_name := left(base_name,30);
  if exists(select 1 from public.profiles where username=final_name) then
    final_name := left(base_name,24) || '_' || substr(new.id::text,1,5);
  end if;
  insert into public.profiles(id,username,display_name)
  values(new.id,final_name,coalesce(new.raw_user_meta_data->>'display_name',final_name));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- Notification helpers.
create or replace function public.notify_like()
returns trigger language plpgsql security definer set search_path=public as $$
declare owner_id uuid;
begin
  select user_id into owner_id from public.posts where id=new.post_id;
  if owner_id is not null and owner_id <> new.user_id then
    insert into public.notifications(user_id,actor_id,type,post_id)
    values(owner_id,new.user_id,'like',new.post_id);
  end if;
  return new;
end $$;
drop trigger if exists trg_notify_like on public.post_likes;
create trigger trg_notify_like after insert on public.post_likes for each row execute procedure public.notify_like();

create or replace function public.notify_comment()
returns trigger language plpgsql security definer set search_path=public as $$
declare owner_id uuid;
begin
  select user_id into owner_id from public.posts where id=new.post_id;
  if owner_id is not null and owner_id <> new.user_id then
    insert into public.notifications(user_id,actor_id,type,post_id)
    values(owner_id,new.user_id,'comment',new.post_id);
  end if;
  return new;
end $$;
drop trigger if exists trg_notify_comment on public.comments;
create trigger trg_notify_comment after insert on public.comments for each row execute procedure public.notify_comment();

create or replace function public.notify_follow()
returns trigger language plpgsql security definer set search_path=public as $$
begin
  insert into public.notifications(user_id,actor_id,type)
  values(new.following_id,new.follower_id,'follow');
  return new;
end $$;
drop trigger if exists trg_notify_follow on public.follows;
create trigger trg_notify_follow after insert on public.follows for each row execute procedure public.notify_follow();

-- RLS
alter table public.profiles enable row level security;
alter table public.posts enable row level security;
alter table public.comments enable row level security;
alter table public.post_likes enable row level security;
alter table public.follows enable row level security;
alter table public.notifications enable row level security;
alter table public.map_votes enable row level security;

drop policy if exists profiles_public_read on public.profiles;
create policy profiles_public_read on public.profiles for select using (true);
drop policy if exists profiles_self_insert on public.profiles;
create policy profiles_self_insert on public.profiles for insert with check (auth.uid()=id);
drop policy if exists profiles_self_update on public.profiles;
create policy profiles_self_update on public.profiles for update using (auth.uid()=id) with check (auth.uid()=id);

drop policy if exists posts_public_read on public.posts;
create policy posts_public_read on public.posts for select using (true);
drop policy if exists posts_auth_insert on public.posts;
create policy posts_auth_insert on public.posts for insert to authenticated with check (auth.uid()=user_id);
drop policy if exists posts_owner_update on public.posts;
create policy posts_owner_update on public.posts for update to authenticated using (auth.uid()=user_id) with check (auth.uid()=user_id);
drop policy if exists posts_owner_delete on public.posts;
create policy posts_owner_delete on public.posts for delete to authenticated using (auth.uid()=user_id);

drop policy if exists comments_public_read on public.comments;
create policy comments_public_read on public.comments for select using (true);
drop policy if exists comments_auth_insert on public.comments;
create policy comments_auth_insert on public.comments for insert to authenticated with check (auth.uid()=user_id);
drop policy if exists comments_owner_delete on public.comments;
create policy comments_owner_delete on public.comments for delete to authenticated using (auth.uid()=user_id);

drop policy if exists likes_public_read on public.post_likes;
create policy likes_public_read on public.post_likes for select using (true);
drop policy if exists likes_auth_insert on public.post_likes;
create policy likes_auth_insert on public.post_likes for insert to authenticated with check (auth.uid()=user_id);
drop policy if exists likes_owner_delete on public.post_likes;
create policy likes_owner_delete on public.post_likes for delete to authenticated using (auth.uid()=user_id);

drop policy if exists follows_public_read on public.follows;
create policy follows_public_read on public.follows for select using (true);
drop policy if exists follows_auth_insert on public.follows;
create policy follows_auth_insert on public.follows for insert to authenticated with check (auth.uid()=follower_id);
drop policy if exists follows_owner_delete on public.follows;
create policy follows_owner_delete on public.follows for delete to authenticated using (auth.uid()=follower_id);

drop policy if exists notifications_self_read on public.notifications;
create policy notifications_self_read on public.notifications for select to authenticated using (auth.uid()=user_id);
drop policy if exists notifications_self_update on public.notifications;
create policy notifications_self_update on public.notifications for update to authenticated using (auth.uid()=user_id) with check (auth.uid()=user_id);

drop policy if exists votes_public_read on public.map_votes;
create policy votes_public_read on public.map_votes for select using (true);
drop policy if exists votes_auth_insert on public.map_votes;
create policy votes_auth_insert on public.map_votes for insert to authenticated with check (auth.uid()=user_id);
drop policy if exists votes_owner_delete on public.map_votes;
create policy votes_owner_delete on public.map_votes for delete to authenticated using (auth.uid()=user_id);

-- Storage for avatars. Create bucket if your project permits this SQL:
insert into storage.buckets (id,name,public)
values ('avatars','avatars',true)
on conflict (id) do update set public=true;

drop policy if exists avatars_public_read on storage.objects;
create policy avatars_public_read on storage.objects for select using (bucket_id='avatars');
drop policy if exists avatars_auth_insert on storage.objects;
create policy avatars_auth_insert on storage.objects for insert to authenticated
with check (bucket_id='avatars' and (storage.foldername(name))[1]=auth.uid()::text);
drop policy if exists avatars_owner_update on storage.objects;
create policy avatars_owner_update on storage.objects for update to authenticated
using (bucket_id='avatars' and owner_id=auth.uid()::text)
with check (bucket_id='avatars' and owner_id=auth.uid()::text);
drop policy if exists avatars_owner_delete on storage.objects;
create policy avatars_owner_delete on storage.objects for delete to authenticated
using (bucket_id='avatars' and owner_id=auth.uid()::text);

-- Realtime
alter publication supabase_realtime add table public.posts;
alter publication supabase_realtime add table public.comments;
alter publication supabase_realtime add table public.post_likes;
alter publication supabase_realtime add table public.notifications;
