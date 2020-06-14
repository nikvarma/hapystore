const controllers = require('../controllers/api/v1/uploadController');
const authorization = require('../handlers/auth-handler');
const comTypes = require('../utils/comtype');

module.exports = (router) => {
    router.route('/upload/profile-image')
        .post(authorization([comTypes.roles.visitor, comTypes.roles.admin, comTypes.roles.user, comTypes.roles.client]), controllers.userImage);
    router.route('/upload/product-image')
        .post(authorization([comTypes.roles.visitor, comTypes.roles.admin, comTypes.roles.user, comTypes.roles.client]), controllers.productImage);
}