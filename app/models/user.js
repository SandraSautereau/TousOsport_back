const client = require('../database');
const bcrypt = require('bcrypt');

/**
 * An entity representing a user
 * @typedef {Object} User
 * @property {number} id
 * @property {string} username
 * @property {string} password
 * @property {string} email
 * @property {string} birth_date   
 * @property {string} gender
 * @property {boolean} role true=coach
 * @property {number} coach_id
 *
 * An entity representing a new coach user (same as user plus the following)
 * @property {string} photo
 * @property {string} description
 * @property {string} city
 */

/**
 * Class contains methods to retrieve users from database
 * @returns {Object}
 * @class users
 */
class User {

    /**
    * The user constructor
    * @param {Object} obj a litteral object with properties copied into the instance
    */
    constructor(obj = {}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }


    /**
     * Add a user to the database
     * @returns {User} the newly created user
     * @throws {Error} a potential SQL error
     */
    async save() {
        // if user
        if (this.role === 'false') {
            try {
                const password = await bcrypt.hash(this.password, 10);
                const { rows } = await client.query('INSERT INTO "user"(username, password, email, birth_date, gender, "role") VALUES($1, $2, $3, $4, $5, $6) RETURNING id', [
                    this.username,
                    password,
                    this.email,
                    this.birth_date,
                    this.gender,
                    'user'
                ]);
                this.id = rows[0].id;
            }
            catch (error) {
                console.log(error);

                if (error.detail) {
                    throw new Error('Something went wrong when registrering the user profile' + error.detail);
                }
                throw error;
            }
        };

        // if coach
        if (this.role === 'true') {
            try {
                const password = await bcrypt.hash(this.password, 10);
                const { rows } = await client.query(
                    `WITH coach_infos AS (
                    INSERT INTO coach(photo, description, city)
                    VALUES($1, $2, $3) RETURNING id)
                    INSERT INTO "user"(username, "password", email, birth_date, gender, "role", coach_id)
                    SELECT $4, $5, $6, $7, $8, $9, id FROM coach_infos RETURNING id`, [
                    this.photo,
                    this.description,
                    this.city,
                    this.username,
                    password,
                    this.email,
                    this.birth_date,
                    this.gender,
                    'coach'
                ]);

                this.id = rows[0].id;
            }
            catch (error) {
                console.log(error);

                if (error.detail) {
                    throw new Error('Something went wrong when registrering the coach profile' + error.detail);
                }
                throw error;
            }
        }
    }


    /**
     * Fetches a single user from the database
     * @route /v1/profile/:id
     * @param {number} id 
     * @returns {user|null} null if no user matches the id in database
     * @static
     * @async
     */
    static async findOne(id) {
        console.log("***model user find one");
        const { rows } = await client.query('SELECT * FROM "user" WHERE id=$1', [id]);

        if (rows[0]) {
            const user = new User(rows[0]);
            console.log('user:', user)
            Reflect.deleteProperty(user, 'password');
            console.log('user:', user)
            return user;

        } else {
            console.log(`No user found for id ${id}`);
            return null;
        }
    }

    async doLogin() {
        try {
            const { rows } = await client.query('SELECT * FROM "user" WHERE email=$1', [this.email]);

            if (!rows[0]) {
                throw new Error('Identification failed');
            }

            const isPwdValid = await bcrypt.compare(this.password, rows[0].password);

            if (!isPwdValid) {
                throw new Error('Invalid password');
            }

            const user = new User(rows[0]);
            Reflect.deleteProperty(user, 'password');
            return user;


        } catch (error) {
            console.log(error);
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }


    /**
   * updates an instance of user in database
   * @async
   * @returns {User | undefined} the inserted instance user
   * @throws {Error} An error
   */
    async update() {
        if (this.id && (this.role === 'user')) {

            try {

                const password = await bcrypt.hash(this.password, 10);
                const { rows } = await client.query(`UPDATE "user" SET username=$1, password=$2, email=$3, birth_date=$4, gender=$5, role=$6 WHERE id=$7 RETURNING *`, [
                    this.username,
                    password,
                    this.email,
                    this.birth_date,
                    this.gender,
                    'user',
                    this.id
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

        if (this.id && this.role === 'coach') {

            try {
                const password = await bcrypt.hash(this.password, 10);
                const { rows } = await client.query(`UPDATE "user" SET username=$1, password=$2, email=$3, birth_date=$4, gender=$5, role=$6, coach_id=$7 WHERE id=$8 RETURNING *`, [
                    this.username,
                    password,
                    this.email,
                    this.birth_date,
                    this.gender,
                    'coach',
                    this.coach_id,
                    this.id]);
                this.coach_id = rows[0].coach_id;

                if (this.coach_id) {
                    const { rows } = await client.query(`UPDATE coach SET photo=$1, description=$2, city=$3 WHERE id=$4 RETURNING *`, [
                        this.photo,
                        this.description,
                        this.city,
                        this.coach_id]);
                }

            }
            catch (error) {
                console.log(error);

                if (error.detail) {
                    throw new Error('Something went wrong when registrering the coach profile' + error.detail);
                }
                throw error;
            }
        }
    }

    /**
   * removes an instance of user in database
   * @async   
   * @throws {Error} An error
   */
    async deleteUser() {

        try {
            await client.query(`SELECT * FROM "user" WHERE id=$1`, [this.id]);
            await client.query(`DELETE FROM "user" WHERE id=$1`, [this.id]);

        } catch (error) {
            console.log(error);

            if (error.detail) {
                throw new Error('Something went wrong when deleting the profile' + error.detail);
            }
            throw error;
        }
    }


    /**
   * removes an instance of coach in database
   * @async   
   * @throws {Error} An error
   */
    async deleteCoach() {

        try {

            await client.query(`DELETE FROM "coach" WHERE id=$1`, [this.coachId]);

        } catch (error) {
            console.log(error);

            if (error.detail) {
                throw new Error('Something went wrong when deleting the profile' + error.detail);
            }
            throw error;
        }
    }

    async findByEmail(email) {
        const { rows } = await client.query('SELECT * FROM "user" WHERE email=$1', [email]);

        if (rows[0]) {
            return new User(rows[0]);
        }
        else {
            return null;
        }
    }
}

module.exports = User;

