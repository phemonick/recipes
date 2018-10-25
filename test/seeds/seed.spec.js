const { spy } = require('sinon');

require('chai').should();

const Seed = require('../../seed');
const Recipe = require('../../seed/recipe');
require('../../server');


describe('Seed Implementation ', () => {
  describe('', () => {
    let recipe;
    let data;
    before(() => {
      recipe = new Recipe();
      data = recipe.generate();
    });

    it('should be an instance of Seed class', () => {
      (recipe instanceof Seed).should.eql(true);
    });

    it('should be an instance of Recipe class', () => {
      (recipe instanceof Recipe).should.eql(true);
    });

    it('should implement the generate method', () => {
      recipe.should.have.property('generate');
    });

    it('should return an object generate method is called ', () => {
      (typeof data === 'object').should.eql(true);
    });

    it('should return valid object when generate is called', () => {
      data.should.have.property('name');
      data.should.have.property('description');
      data.should.have.property('instruction');
      data.should.have.property('photos').to.be.an('array');
      data.should.have.property('userId');
      data.should.have.property('categoryId');
    });

    it('should call the generate 5 method when build is called', () => {
      const sinonSpy = spy(recipe, 'generate');
      recipe.build(5);
      sinonSpy.callCount.should.eql(5);
    });

    it('should call wipe method when build is called', () => {
      const sinonSpy = spy(recipe, 'wipe');
      recipe.build(5);
      sinonSpy.callCount.should.eql(1);
    });


    it(`should populate data property with 5 objects when 
      5 is passed into build`,
      () => {
        recipe.build(5);
        recipe.data.should.be.an('array');
        recipe.data.length.should.eql(5);
        recipe.data.map(object => object.should.be.an('object'));
      });
  });

  describe('Run method', () => {
    let newRecipe;
    let sinonSpy;
    beforeEach(() => {
      const Schema = {
        insertMany() { return Promise.resolve(); },
        collection: { remove() {} }
      };
      newRecipe = new Recipe();
      newRecipe.schema = Schema;
      sinonSpy = spy(Schema, 'insertMany');
    });

    it('should call insertMany when NODE_ENV is set to development', () => {
      process.env.NODE_ENV = 'development';
      newRecipe.build(5).run();
      sinonSpy.called.should.eql(true);
    });

    it('should call insertMany when NODE_ENV is set to test', done => {
      process.env.NODE_ENV = 'test';
      newRecipe.build(5).run();
      sinonSpy.called.should.eql(true);
      done();
    });

    it('should not call insertMany of NODE_ENV is not development or test',
      () => {
        process.env.NODE_ENV = 'production';
        newRecipe.build(5).run();
        sinonSpy.called.should.eql(false);
      });
  });
});
