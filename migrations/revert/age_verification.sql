-- Revert tousosport:age_verification from pg

BEGIN;

ALTER TABLE "user"
  DROP CONSTRAINT age_check;

COMMIT;
