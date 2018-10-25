const faker = require('faker');

const Category = require('../app/models/category');
const Seed = require('./');

/**
 * @class
 */
class CategorySeed extends Seed {
  /**
   * @constructor
   * @param {Object} schema object
   */
  constructor() {
    super(Category);
  }

  /**
   * generates demo data for collection
   * @return {void}
   */
  generate() {
    return {
      title: faker.name.findName(),
      description: faker.lorem.paragraph()
    };
  }
}

module.exports = new CategorySeed();
