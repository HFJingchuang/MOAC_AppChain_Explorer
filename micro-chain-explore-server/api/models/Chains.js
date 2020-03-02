/**
 * Chains.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  primaryKey: 'id',

  attributes: {
    sender: { type: 'string' },
    block_number: {type: 'number'},
    block_number_db: { type: 'number' },
    scs_list: { type: 'json' },
    balance: { type: 'number' },
    bond_limit: { type: 'number' },
    block_reward: { type: 'number' },
    tx_reward: { type: 'number' },
    via_reward: { type: 'number' }
  },

};

