let { should } = require('chai');

const Ingredient = require('../../app/models/ingredient');
const { ingredientContent } = require('../content.spec');
require('../../server');

should = should();

describe('ingredient', () => {
  after(done => {
    Ingredient.collection.remove();
    done();
  });
  describe('Create ingredient', () => {
    it('should save new ingredient', done => {
      const content = Object.assign({}, ingredientContent[0]);
      const ingredient = new Ingredient(content);
      ingredient.save((err, result) => {
        should.equal(err, null);
        result.should.have.property('_id');
        result.should.have.property('name').eql('tomatoes');
        done();
      });
    });

    it('should return error when name, recipeId null', done => {
      const ingredient = new Ingredient();
      ingredient.validate(err => {
        err.errors.should.have.property('recipeId');
        err.errors.recipeId.message.should.eql('Recipe id is required');
        done();
      });
    });

    it('should return an error when name is less that 3', done => {
      const content = Object.assign({}, ingredientContent[0]);
      content.name = 'te';
      const ingredient = new Ingredient(content);
      ingredient.validate(err => {
        err.errors.should.have.property('name');
        err.errors.name.message.should
          .eql('Ingredient name should be greater than two characters');
        done();
      });
    });

    it('should return error when no unit is available if quantity is present',
      done => {
        const content = Object.assign({}, ingredientContent[0]);
        content.quantity = null;
        const ingredient = new Ingredient(content);

        ingredient.validate(err => {
          err.errors.should.have.property('unit');
          err.errors.unit.message.should
            .eql('Quantity is required if unit is supplied');
          done();
        });
      });

    it('should return no error for valid params', done => {
      const ingredient = new Ingredient(ingredientContent[0]);
      ingredient.validate(err => {
        should.equal(err, null);
        done();
      });
    });
  });
});
