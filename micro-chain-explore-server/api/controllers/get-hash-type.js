module.exports = {

  friendlyName: 'Get hash type',

  description: '',

  inputs: {
    hash: {
      type: 'string'
    }
  },

  exits: {
  },

  fn: async function ({ hash }) {
    try {
      let type;
      let block = await Blocks.find({ hash: hash })
      if (block.length > 0) {
        type = 0
      } else {
        let trade = await Transactions.find({ transaction_hash: hash })
        if (trade.length > 0) {
          type = 1
        } else {
          type = 2
        }
      }
      return Utils._return(ResultCode.OK_GET_HASH_TYPE, { type: type })
    } catch (error) {
      return this.res.serverError(error);
    }
  }

};
