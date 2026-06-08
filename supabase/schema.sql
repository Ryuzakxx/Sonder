-- ============================================================
-- Sonder — Database Schema v1
-- Run this in the Supabase SQL Editor
-- ============================================================

-- Profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  display_name text,
  avatar_url text,
  banner_url text,
  bio text,
  website text,
  followers_count int not null default 0,
  following_count int not null default 0,
  reviews_count int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Reviews
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  media_type text not null check (media_type in ('film','serie','libro','musica','gioco')),
  media_id text not null,
  media_title text not null,
  media_cover text,
  rating int not null check (rating between 1 and 5),
  body text,
  likes_count int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, media_id, media_type)
);

-- Activities
create table if not exists public.activities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  action text not null,
  media_type text,
  media_id text,
  media_title text,
  media_cover text,
  metadata jsonb,
  created_at timestamptz not null default now()
);

-- Follows
create table if not exists public.follows (
  follower_id uuid not null references public.profiles(id) on delete cascade,
  following_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, following_id)
);

-- Likes
create table if not exists public.likes (
  user_id uuid not null references public.profiles(id) on delete cascade,
  review_id uuid not null references public.reviews(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, review_id)
);

-- Favorites
create table if not exists public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  media_type text not null,
  media_id text not null,
  media_title text not null,
  media_cover text,
  created_at timestamptz not null default now(),
  unique(user_id, media_id)
);

-- Lists
create table if not exists public.lists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text,
  is_public boolean not null default true,
  cover_url text,
  items_count int not null default 0,
  likes_count int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- List items
create table if not exists public.list_items (
  id uuid primary key default gen_random_uuid(),
  list_id uuid not null references public.lists(id) on delete cascade,
  media_type text not null,
  media_id text not null,
  media_title text not null,
  media_cover text,
  note text,
  position int not null default 0,
  created_at timestamptz not null default now()
);

-- Ratings
create table if not exists public.ratings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  media_type text not null,
  media_id text not null,
  value int not null check (value between 1 and 5),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, media_id, media_type)
);

-- ============================================================
-- Row Level Security
-- ============================================================
alter table public.profiles enable row level security;
alter table public.reviews enable row level security;
alter table public.activities enable row level security;
alter table public.follows enable row level security;
alter table public.likes enable row level security;
alter table public.favorites enable row level security;
alter table public.lists enable row level security;
alter table public.list_items enable row level security;
alter table public.ratings enable row level security;

-- Profiles: public read, own write
create policy "profiles_public_read" on public.profiles for select using (true);
create policy "profiles_own_update" on public.profiles for update using (auth.uid() = id);
create policy "profiles_own_insert" on public.profiles for insert with check (auth.uid() = id);

-- Reviews: public read, own write
create policy "reviews_public_read" on public.reviews for select using (true);
create policy "reviews_own_insert" on public.reviews for insert with check (auth.uid() = user_id);
create policy "reviews_own_update" on public.reviews for update using (auth.uid() = user_id);
create policy "reviews_own_delete" on public.reviews for delete using (auth.uid() = user_id);

-- Activities: public read, own write
create policy "activities_public_read" on public.activities for select using (true);
create policy "activities_own_insert" on public.activities for insert with check (auth.uid() = user_id);

-- Follows: public read, own write
create policy "follows_public_read" on public.follows for select using (true);
create policy "follows_own_insert" on public.follows for insert with check (auth.uid() = follower_id);
create policy "follows_own_delete" on public.follows for delete using (auth.uid() = follower_id);

-- Likes: public read, own write
create policy "likes_public_read" on public.likes for select using (true);
create policy "likes_own_insert" on public.likes for insert with check (auth.uid() = user_id);
create policy "likes_own_delete" on public.likes for delete using (auth.uid() = user_id);

-- Favorites: own only
create policy "favorites_own_read" on public.favorites for select using (auth.uid() = user_id);
create policy "favorites_own_insert" on public.favorites for insert with check (auth.uid() = user_id);
create policy "favorites_own_delete" on public.favorites for delete using (auth.uid() = user_id);

-- Lists: public lists readable by all, own write
create policy "lists_public_read" on public.lists for select using (is_public or auth.uid() = user_id);
create policy "lists_own_insert" on public.lists for insert with check (auth.uid() = user_id);
create policy "lists_own_update" on public.lists for update using (auth.uid() = user_id);
create policy "lists_own_delete" on public.lists for delete using (auth.uid() = user_id);

-- List items: inherit from list visibility
create policy "list_items_public_read" on public.list_items for select using (
  exists (select 1 from public.lists l where l.id = list_id and (l.is_public or auth.uid() = l.user_id))
);
create policy "list_items_own_write" on public.list_items for insert with check (
  exists (select 1 from public.lists l where l.id = list_id and auth.uid() = l.user_id)
);

-- Ratings: own only
create policy "ratings_own" on public.ratings for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ============================================================
-- Triggers
-- ============================================================

-- Auto-increment reviews_count
create or replace function public.increment_reviews_count()
returns trigger language plpgsql as $$
begin
  update public.profiles set reviews_count = reviews_count + 1 where id = new.user_id;
  return new;
end;
$$;

create trigger on_review_created
  after insert on public.reviews
  for each row execute function public.increment_reviews_count();

-- Auto-increment follower/following counts
create or replace function public.update_follow_counts()
returns trigger language plpgsql as $$
begin
  if tg_op = 'INSERT' then
    update public.profiles set following_count = following_count + 1 where id = new.follower_id;
    update public.profiles set followers_count = followers_count + 1 where id = new.following_id;
  elsif tg_op = 'DELETE' then
    update public.profiles set following_count = following_count - 1 where id = old.follower_id;
    update public.profiles set followers_count = followers_count - 1 where id = old.following_id;
  end if;
  return coalesce(new, old);
end;
$$;

create trigger on_follow_change
  after insert or delete on public.follows
  for each row execute function public.update_follow_counts();

-- Auto-increment likes_count on reviews
create or replace function public.update_likes_count()
returns trigger language plpgsql as $$
begin
  if tg_op = 'INSERT' then
    update public.reviews set likes_count = likes_count + 1 where id = new.review_id;
  elsif tg_op = 'DELETE' then
    update public.reviews set likes_count = likes_count - 1 where id = old.review_id;
  end if;
  return coalesce(new, old);
end;
$$;

create trigger on_like_change
  after insert or delete on public.likes
  for each row execute function public.update_likes_count();
