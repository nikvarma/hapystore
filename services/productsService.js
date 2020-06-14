const utils = require('../utils/utils');
const reposProducts = require('../repository/productsRepository');

module.exports = {
    get: async (filter) => {
        return await reposProducts.get(filter);
    }
}