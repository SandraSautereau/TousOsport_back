-- Deploy tousosport:init to pg

BEGIN;
DROP TABLE IF EXISTS category, coach, "user", sport, "session", user_by_session;

CREATE DOMAIN posint AS INT CHECK(value > 0);

CREATE TABLE category (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    category_name TEXT NOT NULL    
);

CREATE TABLE coach (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    photo TEXT,
    "description" TEXT NOT NULL,
    city TEXT NOT NULL
);

CREATE TABLE "user" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    birth_date DATE NOT NULL,
    gender TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    coach_id INT REFERENCES coach(id) ON DELETE CASCADE  
);

CREATE TABLE sport (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    sport_name TEXT NOT NULL,
    category_id INT REFERENCES category(id)    
);

CREATE TABLE "session" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "date" TIMESTAMPTZ NOT NULL,
    duration INTERVAL NOT NULL,
    city TEXT NOT NULL,
    "address" TEXT NOT NULL,
    max_adherent posint NOT NULL DEFAULT 1,
    sport_id INT REFERENCES sport(id),
    CHECK(max_adherent <= 10),
    CHECK("date" >= now())
);

CREATE TABLE user_by_session (
    "user_id" INT NOT NULL REFERENCES "user"("id") ON UPDATE CASCADE ON DELETE CASCADE,
    "session_id" INT NOT NULL REFERENCES "session"("id") ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY("user_id", "session_id")
);

COMMIT;
