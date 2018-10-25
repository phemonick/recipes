const Controller = require('./');
const Schema = require('../models/ingredient');


/**
 * @class
 */
class Recipe extends Controller {
  /**
   * @constructor
   */
  constructor() {
    super(Schema, 'ingredient', 'recipeId');
  }

  /**
   * @param {Array} array
   * @return {Object} returns this
   */
  setUpdatable() {
    this.updatable = ['name', 'quantity', 'unit', 'recipeId'];
    return this;
  }
}

module.exports = new Recipe();
