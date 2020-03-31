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
      if (seq > 500) {
        seq = 500
      }
      let detail = await Blocks.findOne({ number: blockNum })
      if (detail) {
        let count = await Transactions.count({ block_hash: detail.hash })
        let tradeList = await Transactions.find({
          where: { block_hash: detail.hash },
          select: ['transaction_hash', 'from', 'to', 'status', 'sharding_flag']
        }).sort([{ createdAt: 'DESC' }]).skip((page - 1) * seq).limit(seq)
        return Utils._return(ResultCode.OK_GET_BLOCKS_DETAIL, { detail: detail, tradeList: tradeList, count: count });
      }
      return Utils._return(ResultCode.OK_GET_BLOCKS_DETAIL, { detail: {}, tradeList: [], count: 0 });
    } catch (error) {
      return this.res.serverError(error);
    }
  }

};
