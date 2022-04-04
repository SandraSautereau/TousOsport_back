CATEGORY (id_category INT, category_name TEXT NOT NULL)

SPORT (id_sport INT, sport_name TEXT NOT NULL, #category_id INT )

COACH ( photo TEXT, description TEXT NOT NULL, city TEXT NOT NULL)

USER (id_user INT, username TEXT NOT NULL, password TEXT NOT NULL, email TEXT NOT NULL, birth_date INT NOT NULL, gender TEXT NOT NULL, role TEXT NOT NULL, #coach_id )

SESSION ( id_session INT, date TIMESTAMPTZ NOT NULL, duration INTERVAL NOT NULL, city TEXT NOT NULL, address TEXT NOT NULL, max_adherent INT NOT NULL, #sport_id, )

USER_BY_SESSION ( (#user_id, #session_id) INT)