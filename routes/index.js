const cart = require('./cart');
const user = require('./users');
const token = require('./token');
const products = require('./products');

module.exports = (router) => {
  user(router);
  cart(router);
  token(router);
  products(router);
  return router;
}