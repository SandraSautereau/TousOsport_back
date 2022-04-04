-- Verify tousosport:age_verification on pg

BEGIN;

SELECT birth_date FROM "user" WHERE false;

ROLLBACK;
