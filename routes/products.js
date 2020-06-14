const controllers = require('../controllers/api/v1/productsController');
const authorization = require('../handlers/auth-handler');
const comTypes = require('../utils/comtype');

module.exports = (router) => {
    router.route('/products')
        .get(authorization([comTypes.roles.visitor, comTypes.roles.admin, comTypes.roles.user, comTypes.roles.client]), controllers.getProducts);
    router.route('/products/:category')
        .get(authorization([comTypes.roles.visitor, comTypes.roles.admin, comTypes.roles.user, comTypes.roles.client]), controllers.getByCategory);
    router.route('/products/:category/:subcategory')
        .get(authorization([comTypes.roles.visitor, comTypes.roles.admin, comTypes.roles.user, comTypes.roles.client]), controllers.getBySubCategory);
    router.route('/products/:category/:subcategory/:id')
        .get(authorization([comTypes.roles.visitor, comTypes.roles.admin, comTypes.roles.user, comTypes.roles.client]), controllers.getBySubCategoryId);
}