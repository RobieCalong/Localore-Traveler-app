--create tables in order levels, users, badges, quests, users_quests
DROP TABLE IF EXISTS users_quests;
DROP TABLE IF EXISTS quests;
DROP TABLE IF EXISTS badges;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS levels;

CREATE TABLE levels (
  id serial PRIMARY KEY,
  name text UNIQUE NOT NULL,
  min_xp int NOT NULL,
  max_xp int NOT NULL
)

CREATE TABLE users (
  id serial PRIMARY KEY,
  username text NOT NULL UNIQUE,
  password text NOT NULL
);

CREATE TABLE badges (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    badge_image text NOT NULL
);

CREATE TABLE quests (
    id SERIAL PRIMARY KEY,
    title text NOT NULL, 
    messages VARCHAR[] NOT NULL,
    complete Boolean DEFAULT false,
    quest_image_url text DEFAULT NULL,
    points int NOT NULL, 
    location text NOT NULL, 
    badge_id int NOT NULL REFERENCES badges(id) ON DELETE CASCADE
);

CREATE TABLE users_quests (
    id SERIAL PRIMARY KEY, 
    user_id int NOT NULL REFERENCES users(id) ON DELETE CASCADE, 
    quest_id int NOT NULL REFERENCES quests(id) ON DELETE CASCADE,
    UNIQUE (user_id, quest_id)
);
