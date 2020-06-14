const controllers = require('../controllers/api/v1/tokenController');
const authorization = require('../handlers/auth-handler');
const comTypes = require('../utils/comtype');

module.exports = (router) => {
    router.route('/token/create')
        .get(controllers.create);    
    router.route('/token/delete')
        .get(authorization([comTypes.roles.admin]), controllers.delete);
    router.route('/token/validate')
        .post(authorization([comTypes.roles.visitor, comTypes.roles.admin, comTypes.roles.user, comTypes.roles.client]), controllers.validate);
}