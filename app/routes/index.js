const category = require('./category');
const recipe = require('./recipe');
const ingredient = require('./ingredient');

module.exports = express => {
  const router = express.Router();
  category(router);
  recipe(router);
  ingredient(router);
  return router;
};
