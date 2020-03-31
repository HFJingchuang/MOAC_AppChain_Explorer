module.exports = {

  friendlyName: 'Get transactions list',

  description: '',

  inputs: {
    isLatest: {// 查询首页区块数据，true:返回最新6条数据
      type: 'boolean'
    },
    page: { // isLatest为false时生效,当前页数,从0开始
      type: 'number'
    },
    seq: { // isLatest为false时生效,每页显示多少条
      type: 'number'
    },
    tradeStart: {
      type: 'number'
    },
    tradeEnd: {
      type: 'number'
    }
  },

  exits: {
  },

  fn: async function ({ isLatest, page, seq, tradeStart, tradeEnd }) {
    try {
      if (seq > 500) {
        seq = 500
      }
      let transactionsList;
      let count;
      if (isLatest) {
        transactionsList = await Transactions.find({
          select: ['block_number', 'transaction_hash', 'sharding_flag', 'status', 'time']
        })
          .sort([{ createdAt: 'DESC' }])
          .skip(0).limit(6);
        count = 6;
      } else {
        let sql = { time: {} }
        if (tradeStart) {
          sql["time"][">="] = tradeStart
        }
        if (tradeEnd) {
          sql["time"]["<"] = tradeEnd
        }
        if (!tradeStart && !tradeEnd) {
          sql = {}
        }
        transactionsList = await Transactions.find({
          select: ['block_number', 'transaction_hash', 'sharding_flag', 'status', 'time']
        })
          .where(sql)
          .sort([{ createdAt: 'DESC' }])
          .skip((page - 1) * seq).limit(seq)
        count = await Transactions.count(sql);
      }
      return Utils._return(ResultCode.OK_GET_TRADE_LIST, { data: transactionsList, count: count });
    } catch (error) {
      return this.res.serverError(error);
    }
  }
};
