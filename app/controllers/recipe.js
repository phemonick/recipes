const Controller = require('./');
const Schema = require('../models/recipe');


/**
 * @class
 */
class Recipe extends Controller {
  /**
   * @constructor
   */
  constructor() {
    super(Schema, 'recipe', 'categoryId');
  }

  /**
   * @param {Array} array
   * @return {Object} returns this
   */
  setUpdatable() {
    this.updatable = ['name', 'description', 'instruction', 'photos'];
    return this;
  }
}

module.exports = new Recipe();
