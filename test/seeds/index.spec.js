require('chai').should();

const Seed = require('../../seed');
require('../../server');


describe('Seed Class', () => {
  it('should throw an error when instantiated without a schema', () => {
    (() => new Seed()).should
      .throw(TypeError, 'Abstract class implements generate method');
  });
});
