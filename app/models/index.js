module.exports = class Model {
  /**
   * @constructor
   */
  constructor() {
    this.query = {};
    if (this.buildQuery) {
      throw new Error('BuildQuery method must be implemented');
    }
  }

  /**
   * Handles single object query
   * @param {String} id
   * @return {Promise} returns a single model
   */
  static get(id) {
    return this.findById(id);
  }

  /**
   * Gets all set, handles pagination and
   * query params
   * @param {int} limit
   * @param {int} page
   * @param {string} search string to match
   * @param {Object} where specific data to get
   * @return {Promise} returns an array object
   */
  static getAll(limit, page, search, where = {}) {
    limit = parseInt(limit, 10);
    limit = limit || 10;
    page = page || 1;
    const skip = limit * (page - 1);
    const result = { limit, currentPage: page };
    return new Promise((resolve, reject) => {
      this.buildQuery(search)
        .where(where)
        .find(this.query)
        .limit(limit)
        .skip(skip)
        .then(data => {
          result.data = data;
          this.buildQuery(search)
            .where(where)
            .find(this.query)
            .count()
            .then(count => {
              result.count = count;
              resolve(result);
            })
            .catch(error => reject(error));
        })
        .catch(error => reject(error));
    });
  }

  /**
   * deletes an object
   * @param {int} id
   * @return {Promise} returns an object
   */
  static delete(id) {
    return this.findByIdAndRemove(id);
  }

  /**
   * Handles model update
   * @param {int} id
   * @param {object} details
   * @return {Promise} returns an object
   */
  static updateData(id, details) {
    const options = {
      new: true
    };
    return this.findByIdAndUpdate(id, details, options);
  }
};
