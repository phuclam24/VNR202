-- =============================================================
-- GDP BUILDER — Supabase Schema
-- Chạy trong Supabase Dashboard → SQL Editor
-- =============================================================

-- 1. Games table
create table if not exists games (
  id uuid primary key default gen_random_uuid(),
  game_code text unique not null default substr(encode(gen_random_bytes(4), 'hex'), 1, 8),
  phase text not null default 'LOBBY', -- LOBBY | PLAYING | FINISHED
  current_question int not null default -1,
  created_at timestamptz default now(),
  ended_at timestamptz
);

-- 2. Players table
create table if not exists players (
  id uuid primary key default gen_random_uuid(),
  game_id uuid references games(id) on delete cascade,
  player_name text not null,
  player_code text unique not null default substr(encode(gen_random_bytes(4), 'hex'), 1, 8),
  score int not null default 0,
  correct_count int not null default 0,
  total_count int not null default 0,
  is_online boolean not null default true,
  joined_at timestamptz default now(),
  last_seen timestamptz default now()
);

-- 3. Answers table (lịch sử trả lời)
create table if not exists answers (
  id uuid primary key default gen_random_uuid(),
  game_id uuid references games(id) on delete cascade,
  player_id uuid references players(id) on delete cascade,
  question_index int not null,
  chosen_key text not null,
  is_correct boolean not null,
  time_ms int not null default 0,
  answered_at timestamptz default now()
);

-- 4. Leaderboard table (top điểm cao)
create table if not exists leaderboard (
  id uuid primary key default gen_random_uuid(),
  player_name text unique not null,
  best_score int not null default 0,
  best_correct int not null default 0,
  best_total int not null default 0,
  games_played int not null default 1,
  updated_at timestamptz default now()
);

-- =============================================================
-- INDEXES
-- =============================================================
create index if not exists idx_players_game_id on players(game_id);
create index if not exists idx_answers_game_id on answers(game_id);
create index if not exists idx_answers_player_id on answers(player_id);
create index if not exists idx_games_game_code on games(game_code);
create index if not exists idx_leaderboard_best_score on leaderboard(best_score desc);

-- =============================================================
-- REALTIME — Bật realtime trên các bảng này
-- =============================================================
-- Chạy trong Supabase Dashboard → Database → Replication
-- Enable Realtime trên: games, players, answers, leaderboard

alter publication supabase_realtime add table games;
alter publication supabase_realtime add table players;
alter publication supabase_realtime add table answers;
alter publication supabase_realtime add table leaderboard;

-- =============================================================
-- ROW LEVEL SECURITY
-- =============================================================
alter table games enable row level security;
alter table players enable row level security;
alter table answers enable row level security;
alter table leaderboard enable row level security;

-- Ai cũng đọc/ghi được (game public cho tất cả)
create policy "public_games_all" on games for all using (true) with check (true);
create policy "public_players_all" on players for all using (true) with check (true);
create policy "public_answers_all" on answers for all using (true) with check (true);
create policy "public_leaderboard_all" on leaderboard for all using (true) with check (true);

-- =============================================================
-- FUNCTION: Upsert leaderboard sau khi game kết thúc
-- =============================================================
create or replace function update_leaderboard(
  p_name text,
  p_score int,
  p_correct int,
  p_total int
) returns void as $$
begin
  insert into leaderboard (player_name, best_score, best_correct, best_total, games_played)
  values (p_name, p_score, p_correct, p_total, 1)
  on conflict (player_name) do update set
    best_score = greatest(leaderboard.best_score, excluded.best_score),
    best_correct = excluded.best_correct,
    best_total = excluded.best_total,
    games_played = leaderboard.games_played + 1,
    updated_at = now();
end;
$$ language plpgsql security definer;

-- =============================================================
-- FUNCTION: Cleanup games cũ (> 24h)
-- =============================================================
create or replace function cleanup_old_games() returns void as $$
begin
  delete from games where created_at < now() - interval '24 hours';
end;
$$ language plpgsql security definer;

-- =============================================================
-- Done! Copy các thông tin bên dưới vào .env
-- =============================================================
-- VITE_SUPABASE_URL=https://xxxxx.supabase.co
-- VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
