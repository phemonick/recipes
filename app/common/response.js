const Handler = require('./handler');

/**
 * @class
 */
module.exports = class Response {
  /**
   * @constructor
   */
  constructor() {
    this.status = 200;
  }
  /**
   * Sets status code response
   * @param  {Number} status
   * @return {Object} object
   */
  static setStatus(status) {
    this.status = status;
    return this;
  }

  /**
   * gets status code response
   * @return {Number} object
   */
  static getStatus() {
    return this.status;
  }


  /**
   * Sends a response to client
   * @param   {Integer} code status or error code
   * @param   {String} type type of error that occurred
   * @param   {String} message User friendly message for error
   * @param   {Object} errors list of errors that occurred
   * @returns {Object}  response to be sent to client
   */
  static createMessage(code, type, message, errors = {}) {
    return {
      code,
      type,
      message,
      errors
    };
  }

  /**
   * Sends a response to client
   * @param   {Object} res - response object
   * @param   {Object} data - response data
   * @returns {Object}  response to be sent to client
   */
  static respond(res, data) {
    return res.status(this.getStatus())
      .json(data);
  }

  /**
   * Method for 200 response.
   * @param  {Object} res - response object
   * @param  {String} data - response object
   * @return {Object} returns a response object
   */
  static success(res, data) {
    return this.setStatus(200)
      .respond(res, data);
  }

  /**
   * Sends a 404 response to client
   * @param  {Object} res - response object
   * @param  {String} type - response object
   * @param  {String} message - message about response
   * @param  {Object} errors - message about response
   * @return {Object} returns a response object
   */
  static notFound(res, type, message) {
    return this.setStatus(404)
      .respond(res, this
        .respond(res, this.createMessage(404, type, message)));
  }


  /**
   * Sends a 500 response to client
   * @param  {Object} res - response object
   * @param  {String} type - response object
   * @param  {String} message - message about response
   * @param  {Object} errors - message about response
   * @return {Object} returns a response object
   */
  static serverError(res, type, message, errors) {
    return this.setStatus(500)
      .respond(res, this.createMessage(500, type, message, errors));
  }

  /**
   * Sends a 400 response to client
   * @param  {Object} res - response object
   * @param  {String} type - response object
   * @param  {Object} errors - message about response
   * @return {Object} returns a response object
   */
  static badRequest(res, type, errors) {
    return this.setStatus(400)
      .respond(res,
        this.createMessage(400, type,
          errors.message,
          Handler.error(errors.errors)));
  }

  /**
   * Sends a 401 response to client
   * @param  {Object} res - response object
   * @param  {String} type - response object
   * @param  {String} message - message about response
   * @param  {Object} errors - message about response
   * @return {Object} returns a response object
   */
  static unAuthorize(res, type, message, errors) {
    return this.setStatus(401)
      .respond(res, this
        .respond(res, this.createMessage(500, type, message, errors)));
  }

  /**
   * Sends a 403 response to client
   * @param   {Object} res - response object
   * @param   {String} type - response object
   * @param   {String} message - message about response
   * @param   {Object} errors - message about response
   * @returns {Object}  response to be sent to client
   */
  static forbidden(res, type, message, errors) {
    return this.setStatus(403)
      .respond(res, this.createMessage(403, type, message, errors));
  }


  /**
   * Sends a 201 response to client
   * @param   {Object} res - response object
   * @param   {Object} data - data sent back to user
   * @param   {String} message - message about response
   * @returns {Object}  response to be sent to client
   */
  static created(res, data) {
    return this.setStatus(201)
      .respond(res, data);
  }
};
