module.exports = {

  friendlyName: 'Get blocks detail by hash',

  description: '',

  inputs: {
    hash: {
      type: 'string'
    },
    page: {
      type: 'number',
      required: true,
      description: ""
    },
    seq: {
      type: 'number',
      required: true
    }
  },

  exits: {

  },

  fn: async function ({ hash, page, seq }) {
    try {
      let detail = await Blocks.findOne({ hash: hash })
      let count = await Transactions.count({ block_hash: detail.hash })
      let tradeList = await Transactions.find({
        where: { block_hash: hash },
        select: ['transaction_hash', 'from', 'to', 'status', 'sharding_flag']
      }).sort([{ createdAt: 'DESC' }]).skip((page - 1) * seq).limit(seq)
      return Utils._return(ResultCode.OK_GET_BLOCKS_DETAIL, { detail: detail, tradeList: tradeList, count: count });
    } catch (error) {
      return this.res.serverError(error);
    }
  }

};
