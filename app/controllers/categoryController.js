const Category = require('../models/category');

module.exports = {
    /**
     * Express middleware sending the categories from database to the navigator
     * @route /v1/categories
     * @param {Request} _ 
     * @param {Response} response 
     * @returns all categories in json format 
     */
    findAll : async (_, response) => {
        const categories = await Category.findAll();
        response.json(categories);
    },



    //TODO comments
    findOne: async (request, response) => {
        const id = parseInt(request.params.catId, 10);
        const category = await Category.findOne(id);
        response.json(category);
    },
}