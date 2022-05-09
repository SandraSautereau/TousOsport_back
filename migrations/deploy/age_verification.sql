-- Deploy tousosport:age_verification to pg

BEGIN;
ALTER TABLE "user"
    ADD CONSTRAINT age_check CHECK((birth_date < (CURRENT_DATE - INTERVAL '18' YEAR)) AND (birth_date > (CURRENT_DATE - INTERVAL '120' YEAR)));

COMMIT;



