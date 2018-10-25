const faker = require('faker');

const Ingredient = require('../app/models/ingredient');
const Seed = require('./');

/**
 * @class
 */
class IngredientSeed extends Seed {
  /**
   * @constructor
   * @param {Object} schema object
   */
  constructor() {
    super(Ingredient);
  }

  /**
   * generates demo data for collection
   * @return {void}
   */
  generate() {
    return {
      name: faker.name.findName(),
      quantity: faker.lorem.paragraph(),
      unit: faker.lorem.paragraphs(),
      recipeId: faker.random.uuid(),
    };
  }
}

module.exports = new IngredientSeed();
