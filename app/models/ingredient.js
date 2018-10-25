const mongoose = require('mongoose');

const Model = require('./');

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const IngredientSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Ingredient name is required'],
      lowercase: true,
      validate: {
        validator(v) {
          return new Promise(resolve => {
            resolve(v && v.length > 2);
          });
        },
        message: 'Ingredient name should be greater than two characters'
      }
    },
    quantity: {
      type: Number,
      lowercase: true,
      default: 0
    },
    unit: {
      type: String,
      validate: {
        validator(unit) {
          return new Promise(resolve => {
            if (this.quantity && (unit && unit.length > 0)) {
              return resolve(true);
            }
            resolve(false);
          });
        },
        message: 'Quantity is required if unit is supplied'
      }
    },
    recipeId: {
      type: String,
      required: [true, 'Recipe id is required']
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
class Ingredient extends Model {
  /**
   * @param {string} search
   * @return {object} returns a user
   */
  static buildQuery(search) {
    this.query = search ? { name: new RegExp(search) } : {};
    return this;
  }
}

IngredientSchema.loadClass(Ingredient);

module.exports = mongoose.model('Ingredient', IngredientSchema);
