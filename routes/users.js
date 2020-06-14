const controllers = require('../controllers/api/v1/userController');
const authorization = require('../handlers/auth-handler');
const comTypes = require('../utils/comtype');

module.exports = (router) => {
  router.route('/auth/login')
    .post(authorization([comTypes.roles.visitor, comTypes.roles.admin, comTypes.roles.user, comTypes.roles.client]),controllers.login);
  router.route('/auth/register')
    .post(authorization([comTypes.roles.visitor, comTypes.roles.admin, comTypes.roles.user, comTypes.roles.client]), controllers.create);
  router.route('/user/reset-password')
    .post(authorization([comTypes.roles.visitor, comTypes.roles.admin, comTypes.roles.user, comTypes.roles.client]), controllers.resetPassword);
  router.route('/user/update-password')
    .post(authorization([comTypes.roles.visitor, comTypes.roles.admin, comTypes.roles.user, comTypes.roles.client]), controllers.updatePassword);
  router.route('/user/send-activation-code')
    .post(authorization([comTypes.roles.visitor, comTypes.roles.admin, comTypes.roles.user, comTypes.roles.client]), controllers.sendActivationCode);
  router.route('/user/verify-activation-code')
    .post(authorization([comTypes.roles.visitor, comTypes.roles.admin, comTypes.roles.user, comTypes.roles.client]), controllers.verifyActivationCode);
}