const Response = require('../common/response');
const Transformer = require('../common/transformer');
const _ = require('underscore');
/**
 * @class
 */
module.exports = class Controller {
  /**
   * @constructor
   * @param {Object} schema
   * @param {String} type type of schema
   * @param {String} relation query relationship
   */
  constructor(schema, type, relation) {
    this.schema = schema;
    this.updatable = [];
    this.type = type;
    this.relation = relation;
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.getRelation = this.getRelation.bind(this);
    this.remove = this.remove.bind(this);
  }

  /**
   * Set resource field that's updatable
   * @param {Array} array
   * @return {Object} returns this
   */
  setUpdatable(array) {
    this.updatable = array;
    return this;
  }

  /**
   * Gets resource by id
   * @param  {Object} req - request object
   * @param  {Object} res - response object
   * @return {Objects} returns a response
   */
  get(req, res) {
    const { id } = req.params;
    this.schema.get(id)
      .then(data => {
        if (data) {
          return Response.success(res, data);
        }
        const message = `${this.type} with id ${id} not found`;
        return Response.notFound(res, 'NotFound', message);
      })
      .catch(err => Response.serverError(res, 'ServerError', err.message));
  }


  /**
   * Gets all resource
   * @param  {Object} req - request object
   * @param  {Object} res - response object
   * @return {Objects} returns a response
   */
  getAll(req, res) {
    const { limit, page, q } = req.query;
    this.schema.getAll(limit, page, q)
      .then(data => Response.success(res, Transformer.transform(data)))
      .catch(err => Response.serverError(res, 'ServerError', err.message));
  }

  /**
   * Creates a new  resource
   * @param  {Object} req - request object
   * @param  {Object} res - response object
   * @return {Objects} returns a response
   */
  create(req, res) {
    const instance = new this.schema(req.body);
    instance.validate(err => {
      if (err) {
        return Response
          .badRequest(res, 'ValidationError', err);
      }
      instance.save()
        .then(data => {
          Response.success(res, data);
        })
        .catch(err => Response.serverError(res, 'ServerError', err.message));
    });
  }

  /**
   * updates a resource  by id
   * @param  {Object} req - request object
   * @param  {Object} res - response object
   * @return {Objects} returns a response
   */
  update(req, res) {
    const id = req.params.id;
    const { updatable } = this.setUpdatable();
    const body = _.pick(req.body, updatable);
    this.schema.updateData(id, body)
      .then(data => {
        Response.success(res, data);
      })
      .catch(err => Response.serverError(res, 'ServerError', err.message));
  }

  /**
   * gets data by relationship
   * @param  {Object} req - request object
   * @param  {Object} res - response object
   * @return {Objects} returns a response
   */
  getRelation(req, res) {
    const { limit, page, q } = req.query;
    const relation = { [this.relation]: req.params[this.relation] };
    this.schema.getAll(limit, page, q, relation)
      .then(category => Response.success(res, Transformer.transform(category)))
      .catch(err => Response.serverError(res, 'ServerError', err.message));
  }

  /**
   * deletes a resource
   * @param  {Object} req - request object
   * @param  {Object} res - response object
   * @return {Objects} returns a response
   */
  remove(req, res) {
    const { id } = req.params;
    this.schema.delete(id)
      .then(data => {
        if (data) {
          return Response.success(res,
            { message: `${this.type} with id ${id} has been deleted` });
        }
        const message = `${this.type} with id ${id} not found`;
        return Response.notFound(res, 'NotFound', message);
      })
      .catch(err => Response.serverError(res, 'ServerError', err.message));
  }
};
