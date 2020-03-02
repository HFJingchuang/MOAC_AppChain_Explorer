module.exports = {

  friendlyName: 'Get blocks detail by block num',

  description: '',

  inputs: {
    blockNum: {
      type: 'number'
    },
    page: {
      type: 'number',
      required: true
    },
    seq: {
      type: 'number',
      required: true
    }
  },

  exits: {
  },

  fn: async function ({ blockNum, page, seq }) {
    try {
      let detail = await Blocks.findOne({ number: blockNum })
      let count = await Transactions.count({ block_hash: detail.hash })
      let tradeList = await Transactions.find({
        where: { block_hash: detail.hash },
        select: ['transaction_hash', 'from', 'to', 'status', 'sharding_flag']
      }).sort([{ createdAt: 'DESC' }]).skip((page - 1) * seq).limit(seq)
      return Utils._return(ResultCode.OK_GET_BLOCKS_DETAIL, { detail: detail, tradeList: tradeList, count: count });
    } catch (error) {
      return this.res.serverError(error);
    }
  }

};
