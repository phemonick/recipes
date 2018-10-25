const mongoose = require('mongoose');

const Model = require('./');

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Category title is required'],
      lowercase: true,
      validate: {
        validator(v) {
          return new Promise(resolve => {
            resolve(v && v.length > 2);
          });
        },
        message: 'Category title should be greater than two characters'
      },
      unique: true
    },
    description: {
      type: String
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

/**
 * @Class
 */
class Category extends Model {
  /**
   * @param {string} search
   * @return {object} returns a user
   */
  static buildQuery(search) {
    this.query = search
      ? {
        $or: [
          { title: new RegExp(search) },
          { description: new RegExp(search) }
        ]
      }
      : {};
    return this;
  }
}

CategorySchema.loadClass(Category);

module.exports = mongoose.model('Category', CategorySchema);
