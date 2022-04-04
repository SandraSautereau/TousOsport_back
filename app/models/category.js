const client = require('../database');

/**
 * An entity representing a category
 * @typedef {Object} Category
 * @property {number} id
 * @property {string} category_name
 */

/**
 * Class contains methods to retrieve categories from database
 * @returns {Object}
 * @class Category
 */
class Category {

    /**
    * The Category constructor
    * @param {Object} obj a litteral object with properties copied into the instance
    */
    constructor(obj = {}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }


    /**
     * Method that returns all categories from database 
     * @returns {array} contains all categories
     * @static
     * @async
     */
    static async findAll() {
        const { rows } = await client.query('SELECT * FROM category');
        return rows;
    }

    /**
     * Fetches a single category from the database
     * @param {number} id 
     * @returns {Category|null} null if no category matches the id in database
     * @static
     * @async
     */
    static async findOne(id) {
        const { rows } = await client.query('SELECT * FROM category WHERE id=$1', [id]);

        if (rows[0]) {
            return new Category(rows[0]);

        } else {
            console.log(`No category found for id ${id}`);
            return null;
        }
    }
}

module.exports = Category;