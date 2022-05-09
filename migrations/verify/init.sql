-- Verify tousosport:init on pg

BEGIN;

SELECT id FROM category WHERE false;
SELECT id FROM "user" WHERE false;
SELECT id FROM coach WHERE false;
SELECT id FROM sport WHERE false;
SELECT id FROM "session" WHERE false;
SELECT "user_id" FROM user_by_session WHERE false;
SELECT "session_id" FROM user_by_session WHERE false;

ROLLBACK;
