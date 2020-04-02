/**
 * 交易数量曲线图表
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  primaryKey: 'id',

  attributes: {
    count: { type: 'number' },
    time: {
      type: 'string',
      unique: true
    }
  },
};

