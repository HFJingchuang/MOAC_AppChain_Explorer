/**
 * ERC20.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  primaryKey: 'id',

  attributes: {
    erc20: { type: 'string', unique: true },
    name: { type: 'string' },
    symbol: {
      type: 'string',
    },
    decimals: { type: 'number' },
    totalSupply: {
      type: 'string'
    },
    deployer: {
      type: 'string'
    }
  }
};

