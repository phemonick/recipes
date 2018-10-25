module.exports = class Handler {
  /**
   * @param  {Object} errors - request object
   * @return {Objects} returns a response
   */
  static error(errors) {
    const error = {};
    Object.keys(errors).forEach(key => {
      error[key] = errors[key].message;
    });
    return error;
  }
};
