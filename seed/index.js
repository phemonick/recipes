const winston = require('winston');

require('../server');

/**
 * @class
 */
module.exports = class Seed {
  /**
   * @constructor
   * @param {Object} schema object
   */
  constructor(schema) {
    this.data = [];
    this.schema = schema;
    if (this.generate === undefined) {
      throw new TypeError('Abstract class implements generate method');
    }
  }

  /**
   * wipes collection
   * @return {Object} returns object instance
   */
  wipe() {
    this.data = [];
    this.schema.collection.remove();
    return this;
  }

  /**
   * generates array of data to be
   * inserted into a collection
   * @param {Integer} number
   * @return {Object} Object
   */
  build(number = 1) {
    this.wipe();
    for (let i = 0; i < number; i += 1) {
      this.data.push(i);
    }
    this.data = this.data.map(() => this.generate());
    return this;
  }

  /**
   * Inserts the data into the collections
   * @return {void}
   */
  run() {
    if (['development', 'test'].includes(process.env.NODE_ENV)) {
      this.schema.insertMany(this.data)
        .then(() => {
          winston.log('info', 'seeding was successful');
          return true;
        })
        .catch(err => {
          throw new Error(err.message);
        });
    } else {
      process.exit(0);
    }
  }
};
