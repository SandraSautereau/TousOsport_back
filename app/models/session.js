const client = require('../database');

/**
 * An entity representing a session
 * @typedef {Object} Session
 * @property {number} id
 * @property {string} date
 * @property {string} duration
 * @property {string} city
 * @property {string} address   
 * @property {number} max_adherent
 * @property {number} sport_id
 */

/**
 * Class contains methods to retrieve sessions from database
 * @returns {Object}
 * @class Sessions
 */
class Session {

    /**
    * The Session constructor
    * @param {Object} obj a litteral object with properties copied into the instance
    */
    constructor(obj = {}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    /**
     * Method that returns all sessions from database 
     * @returns {array} can be null 
     * @static
     * @async
     */
    static async findByCategory(categoryId) {
        const { rows } = await client.query('SELECT * FROM "session" JOIN "sport" ON sport.id=session.sport_id WHERE category_id=$1', [categoryId]);

        if (rows) {
            return rows.map(row => new Session(row));

        } else {
            console.log(`No session found for category_id ${categoryId}`);
            return null;
        };
    };

    static async findBySession(categoryId, sessionId) {
        const { rows } = await client.query('SELECT * FROM "session" JOIN "sport" ON sport.id=session.sport_id WHERE category_id=$1 AND session.id=$2', [categoryId, sessionId]);

        if (rows) {
            return rows.map(row => new Session(row));

        } else {
            console.log(`No session found for session_id ${sessionId}`);
            return null;
        }
    };

    static async findByCoach(coachId) {
        const { rows } = await client.query('SELECT * FROM user_by_session JOIN "user" ON user_id="user".id JOIN "session" ON session_id="session".id WHERE coach_id = $1', [coachId]);

        if (rows) {
            return rows.map(row => new Session(row));


        } else {
            console.log(`No session found for session_id ${sessionId}`);
            return null;
        }
    };


    /**
     * Fetches a single session from the database
     * @route /v1/profile/coach/:coachId/session/:sessId
     * @param {number} sessId 
     * @returns {Session |null} null if no user matches the id in database
     * @static
     * @async
     */
    static async findOne(sessId, coachId) {

        const { rows } = await client.query(`SELECT * from user_by_session 
        JOIN "user" 
            ON user_id = "user".id
        JOIN "session" 
            ON session_id = "session".id WHERE session_id =$1`, [sessId]);

        if ((rows[0].coach_id) === coachId) {
            const session = new Session(rows[0]);
            return session;

        } else {
            console.log(`No session found for id ${sessId} for coach ${coachId}`);
            return null;
        }
    };

    /**
     * Add a user to the database
     * @returns {User} the newly created user
     * @throws {Error} a potential SQL error
     */
    async save(userId) {
        try {
            await client.query(`WITH create_session AS (
                INSERT INTO session (date, duration, city, address, max_adherent, sport_id)
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING id)
                INSERT INTO user_by_session (user_id, session_id)
                SELECT $7, id FROM create_session`, [
                this.date,
                this.duration,
                this.city,
                this.address,
                this.max_adherent,
                this.sport_id,
                userId
            ]);

        }
        catch (error) {
            console.log(error);

            if (error.detail) {
                throw new Error('Something went wrong when registrering the new session' + error.detail);
            }
            throw error;

        };
    };

    /**
   * updates an instance of session in database
   * @async
   * @returns {Session | undefined} the inserted instance session
   * @throws {Error} An error
   */
    async update(sessId) {

        if (sessId) {
            try {
                const { rows } = await client.query(`UPDATE "session" SET date=$1, duration=$2, city=$3, address=$4, max_adherent=$5, sport_id=$6 WHERE id=$7 RETURNING *`, [
                    this.date,
                    this.duration,
                    this.city,
                    this.address,
                    this.max_adherent,
                    this.sport_id,
                    sessId
                ]);

                return rows[0];
            }
            catch (error) {
                if (error.detail) {
                    throw new Error(error.detail);
                }
                throw error;
            }
        }
    };

    /**
   * removes an instance of user in database
   * @async   
   * @throws {Error} An error
   */
    async delete() {

        try {
            await client.query(`DELETE from "session" WHERE id=$1`, [
                this.sessId
            ]);

        } catch (error) {
            console.log(error);

            if (error.detail) {
                throw new Error('Something went wrong when deleting the session' + error.detail);
            }
            throw error;
        }
    }

}

module.exports = Session;
