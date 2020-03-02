/**
 * Blocks.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  primaryKey: 'id',

  attributes: {
    extra_data: { type: 'string' },
    hash: {
      type: 'string',
      unique: true
    },
    miner: { type: 'string' },
    number: {
      type: 'number'
    },
    parent_hash: { type: 'string' },
    receipts_root: { type: 'string' },
    state_root: { type: 'string' },
    timestamp: { type: 'number' },
    transactions: { type: 'json' },
    transactions_length: { type: 'number' },
    transactions_root: { type: 'string' }
  },

};

