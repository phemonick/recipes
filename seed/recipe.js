const faker = require('faker');

const Recipe = require('../app/models/recipe');
const Seed = require('./');

/**
 * @class
 */
class RecipeSeed extends Seed {
  /**
   * @constructor
   * @param {Object} schema object
   */
  constructor() {
    super(Recipe);
  }

  /**
   * generates demo data for collection
   * @return {void}
   */
  generate() {
    return {
      name: faker.name.findName(),
      description: faker.lorem.paragraph(),
      instruction: faker.lorem.paragraphs(),
      photos: [
        faker.image.food(),
        faker.image.food(),
      ],
      userId: faker.random.uuid(),
      categoryId: faker.random.uuid()
    };
  }
}

module.exports = RecipeSeed;
