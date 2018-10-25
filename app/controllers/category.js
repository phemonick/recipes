const Controller = require('./');
const Schema = require('../models/category');


/**
 * @class
 */
class Category extends Controller {
  /**
   * @constructor
   */
  constructor() {
    super(Schema, 'category');
  }

  /**
   * @param {Array} array
   * @return {Object} returns this
   */
  setUpdatable() {
    this.updatable = ['title', 'description'];
    return this;
  }
}

module.exports = new Category();
