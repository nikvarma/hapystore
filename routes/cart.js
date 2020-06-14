const controllers = require('../controllers/api/v1/cartController');
const authorization = require('../handlers/auth-handler');
const comTypes = require('../utils/comtype');


module.exports = (router) => {
    router.route('/cart')
        .get(authorization([comTypes.roles.visitor, comTypes.roles.admin, comTypes.roles.user, comTypes.roles.client]),controllers.get);
    router.route('/cart/:productid')
        .post(authorization([comTypes.roles.visitor, comTypes.roles.admin, comTypes.roles.user, comTypes.roles.client]),controllers.add);
    router.route('/cart/:cid/delete')
        .get(authorization([comTypes.roles.visitor, comTypes.roles.admin, comTypes.roles.user, comTypes.roles.client]),controllers.deleteSoft);
    router.route('/cart/:cid/saveforlater')
        .get(authorization([comTypes.roles.visitor, comTypes.roles.admin, comTypes.roles.user, comTypes.roles.client]),controllers.saveForLater);
    router.route('/cart/checkout')
        .post(authorization([comTypes.roles.visitor, comTypes.roles.admin, comTypes.roles.user, comTypes.roles.client]),controllers.checkout);
}