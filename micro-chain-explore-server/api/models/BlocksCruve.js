/**
 * 区块交易数统计图表
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  primaryKey: 'id',

  attributes: {
    blocks: { type: 'number' },
    trades: {
      type: 'number',
      unique: true
    }
  },
};

