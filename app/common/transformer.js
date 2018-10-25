module.exports = class Transformer {
  /**
   * Creates all resource metadata
   * @param {Number} count
   * @param {Number} currentPage
   * @param {Number} perPage
   * @return {Object} returns meta data object
   */
  static metaData(count, currentPage, perPage) {
    return {
      totalCount: count,
      pageCount: Math.round(count / perPage) || 0,
      currentPage,
      perPage
    };
  }

  /**
   * A wrapper that formats get all resource response
   * @param {Object} data data to format
   * @return {Object} returns formated data
   */
  static transform({ count, currentPage, data }) {
    return {
      data,
      meta_data: this.metaData(count, parseInt(currentPage, 10), data.length)
    };
  }
};

