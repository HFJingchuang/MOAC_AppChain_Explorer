/**
 * Blocks.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  primaryKey: 'id',

  attributes: {
    address: { type: 'string' },
    token: { type: 'string' },
    balance: { type: 'number' }
  },
};

