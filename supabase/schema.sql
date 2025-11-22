-- Create profiles table
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  owner_name text,
  avatar_url text,
  updated_at timestamp with time zone
);

-- Create dogs table
create table dogs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  name text not null,
  breed text not null,
  age integer not null,
  bio text,
  photos text[] default '{}', -- Array of photo URLs
  location text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create swipes table
create table swipes (
  id uuid default gen_random_uuid() primary key,
  matcher_id uuid references dogs(id) on delete cascade not null, -- The dog doing the swiping (active user's dog)
  target_dog_id uuid references dogs(id) on delete cascade not null, -- The dog being swiped on
  direction text check (direction in ('paw', 'naw')) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(matcher_id, target_dog_id)
);

-- Create matches table
create table matches (
  id uuid default gen_random_uuid() primary key,
  dog_a_id uuid references dogs(id) on delete cascade not null,
  dog_b_id uuid references dogs(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(dog_a_id, dog_b_id)
);

-- Create messages table
create table messages (
  id uuid default gen_random_uuid() primary key,
  match_id uuid references matches(id) on delete cascade not null,
  sender_id uuid references profiles(id) on delete cascade not null, -- User sending the message
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table profiles enable row level security;
alter table dogs enable row level security;
alter table swipes enable row level security;
alter table matches enable row level security;
alter table messages enable row level security;

-- RLS Policies
-- Profiles: Users can view all profiles, can only edit their own
create policy "Public profiles are viewable by everyone" on profiles for select using (true);
create policy "Users can insert their own profile" on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Dogs: Viewable by everyone, editable by owner
create policy "Dogs are viewable by everyone" on dogs for select using (true);
create policy "Users can insert their own dog" on dogs for insert with check (auth.uid() = user_id);
create policy "Users can update own dog" on dogs for update using (auth.uid() = user_id);

-- Swipes: Users can insert swipes for their own dog
create policy "Users can insert swipes" on swipes for insert with check (
  exists (select 1 from dogs where id = matcher_id and user_id = auth.uid())
);

-- Matches: Viewable if your dog is involved
create policy "Users can see matches for their dogs" on matches for select using (
  exists (select 1 from dogs where (id = dog_a_id or id = dog_b_id) and user_id = auth.uid())
);

-- Messages: Viewable if in the match, insertable if in the match
create policy "Users can see messages in their matches" on messages for select using (
  exists (
    select 1 from matches m
    join dogs da on m.dog_a_id = da.id
    join dogs db on m.dog_b_id = db.id
    where m.id = match_id
    and (da.user_id = auth.uid() or db.user_id = auth.uid())
  )
);

create policy "Users can insert messages in their matches" on messages for insert with check (
  auth.uid() = sender_id
  and exists (
    select 1 from matches m
    join dogs da on m.dog_a_id = da.id
    join dogs db on m.dog_b_id = db.id
    where m.id = match_id
    and (da.user_id = auth.uid() or db.user_id = auth.uid())
  )
);

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, owner_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Storage setup (bucket for dog photos)
insert into storage.buckets (id, name, public) values ('dog-photos', 'dog-photos', true);

create policy "Anyone can view dog photos"
  on storage.objects for select
  using ( bucket_id = 'dog-photos' );

create policy "Users can upload dog photos"
  on storage.objects for insert
  with check ( bucket_id = 'dog-photos' and auth.uid() = owner );

