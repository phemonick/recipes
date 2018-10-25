let { should } = require('chai');

const Category = require('../../app/models/category');
const { categoryContent } = require('../content.spec');
require('../../server');

should = should();

describe('category', () => {
  after(done => {
    Category.collection.remove();
    done();
  });

  describe('Create category', () => {
    it('should save new category', done => {
      const content = Object.assign({}, categoryContent[0]);
      const category = new Category(content);
      category.save((err, result) => {
        should.equal(err, null);
        result.should.have.property('_id');
        result.should.have.property('title');
        done();
      });
    });

    it('should return error when title is null', done => {
      const category = new Category();
      category.validate(err => {
        err.errors.should.have.property('title');
        err.errors.title.message.should.equal('Category title is required');
        done();
      });
    });

    it('should return an error when name is less that 3', done => {
      const content = Object.assign({}, categoryContent[0]);
      content.title = 'hs';
      const category = new Category(content);
      category.validate(err => {
        err.errors.should.have.property('title');
        err.errors.title.message.should
          .eql('Category title should be greater than two characters');
        done();
      });
    });

    it('should return no error for valid params', done => {
      const category = new Category(categoryContent[0]);
      category.validate(err => {
        should.equal(err, null);
        done();
      });
    });
  });
});
