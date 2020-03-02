/**
 * Transactions.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  primaryKey: 'id',

  attributes: {
    block_hash: {
      type: 'string'
    },
    block_number: {
      type: 'number'
    },
    from: {
      type: 'string'
    },
    to: {
      type: 'string'
    },
    value: {
      type: 'number',
      columnType: 'Decimail128'
    },
    input: {
      type: 'string'
    },
    nonce: {
      type: 'number'
    },
    r: {
      type: 'string'
    },
    s: {
      type: 'string'
    },
    v: {
      type: 'number'
    },
    sharding_flag: {
      type: 'number'
    },
    transaction_hash: {
      type: 'string',
      unique: true
    },
    transaction_index: {
      type: 'number'
    },
    time: {
      type: 'number'
    },
    contractAddress: { type: 'string' },
    status: {
      type: 'boolean',
      defaultsTo: false
    },
    logs: {
      type: 'json'
    },
    logs_length: {
      type: 'number'
    }
  },

};

