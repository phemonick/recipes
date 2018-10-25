let { should } = require('chai');

const Recipe = require('../../app/models/recipe');
const { recipeContent } = require('../content.spec');
require('../../server');

should = should();

describe('Recipe', () => {
  after(done => {
    Recipe.collection.remove();
    done();
  });
  describe('Create recipe', () => {
    it('should save new recipe', done => {
      const content = Object.assign({}, recipeContent[0]);
      const recipe = new Recipe(content);
      recipe.save((err, result) => {
        should.equal(err, null);
        result.should.have.property('_id');
        done();
      });
    });

    it('should return error when name, categoryId or userId is null', done => {
      const recipe = new Recipe();
      recipe.validate(err => {
        err.errors.should.have.property('name');
        err.errors.should.have.property('categoryId');
        err.errors.should.have.property('userId');
        done();
      });
    });

    it('should return an error when name is less that 3', done => {
      const content = Object.assign({}, recipeContent[0]);
      content.name = 'te';
      const recipe = new Recipe(content);
      recipe.validate(err => {
        err.errors.should.have.property('name');
        err.errors.name.message.should
          .eql('Recipe name should be greater than two characters');
        done();
      });
    });

    it('should return no error for valid params', done => {
      const recipe = new Recipe(recipeContent[0]);
      recipe.validate(err => {
        should.equal(err, null);
        done();
      });
    });
  });
});
