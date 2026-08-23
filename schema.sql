CREATE TABLE IF NOT EXISTS player_progress (
  player_id TEXT PRIMARY KEY,
  player_name TEXT,
  level INTEGER NOT NULL DEFAULT 0,
  max_level_reached INTEGER NOT NULL DEFAULT 0,
  prestige INTEGER NOT NULL DEFAULT 0,
  prestige_awakened INTEGER NOT NULL DEFAULT 0,
  god_statue_sent INTEGER NOT NULL DEFAULT 0,
  god_statue_completed INTEGER NOT NULL DEFAULT 0,
  garden_restorations INTEGER NOT NULL DEFAULT 0,
  disciple_total_params INTEGER NOT NULL DEFAULT 0,
  disciple_class_upped INTEGER NOT NULL DEFAULT 0,
  maou_defeated INTEGER NOT NULL DEFAULT 0,
  rico_unlocked INTEGER NOT NULL DEFAULT 0,
  rico_fully_owned INTEGER NOT NULL DEFAULT 0,
  mechanical_egg_hatched INTEGER NOT NULL DEFAULT 0,
  castle_unlocked INTEGER NOT NULL DEFAULT 0,
  castle_progress INTEGER NOT NULL DEFAULT 0,
  endless_mode_unlocked INTEGER NOT NULL DEFAULT 0,
  total_correct INTEGER NOT NULL DEFAULT 0,
  total_play_time_min INTEGER NOT NULL DEFAULT 0,
  best_kpm INTEGER NOT NULL DEFAULT 0,
  best_rank TEXT,
  dungeon_starts INTEGER NOT NULL DEFAULT 0,
  pt INTEGER NOT NULL DEFAULT 0,
  total_pt_earned INTEGER NOT NULL DEFAULT 0,
  funnels_reached TEXT NOT NULL DEFAULT '[]',
  pt_tamper_flag INTEGER NOT NULL DEFAULT 0,
  updated_at INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_player_progress_updated_at ON player_progress (updated_at);

CREATE TABLE IF NOT EXISTS player_saves (
  player_id TEXT PRIMARY KEY,
  sync_token TEXT NOT NULL,
  save_json TEXT NOT NULL,
  last_modified_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
