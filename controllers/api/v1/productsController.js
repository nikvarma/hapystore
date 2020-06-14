const utils = require('../../../utils/utils');
const productsService = require('../../../services/productsService');
const exceptionHandler = require('../../../handlers/exception-handler');
const messages = require('../../../commons/responseMessage');
const filterOptions = require('../../../commons/requestFilterOption');

module.exports = {
    getProducts: async (req, res) => {
        await exceptionHandler.exceptionController(async () => {
            await filterOptions(req, res).then(async (options) => {
                await res.status(200).json({ status: 200, message: messages.fetchSuccess("Product"), results: await productsService.get(options) });
            });
        }, req, res);
    },
    getByCategory: async (req, res) => {
        await exceptionHandler.exceptionController(async () => {
            await filterOptions(req, res).then(async () => {
                await res.status(200).json({ status: 200, message: messages.fetchSuccess("Product"), results: await productsService.getByCategory() });
            });
        }, req, res);
    },
    getBySubCategory: async (req, res) => {
        await exceptionHandler.exceptionController(async () => {
            await res.status(200).json({ status: 200, message: messages.fetchSuccess("Product"), results: await productsService.getBySubCategory() });
        }, req, res);
    },
    getBySubCategoryId: async (req, res) => {
        await exceptionHandler.exceptionController(async () => {
            await filterOptions(req, res).then(async (options) => {
                await res.status(200).json({ status: 200, message: messages.fetchSuccess("Product"), results: await productsService.getBySubCategoryId() });
            });
        }, req, res);
    }
}

//beginnertutor.com
//beginnerstartup.com
