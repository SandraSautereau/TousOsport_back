-- Revert tousosport:init from pg

BEGIN;

DROP TABLE user_by_session, "session", sport,"user", coach, category;

DROP DOMAIN posint;

COMMIT;
