module.exports = {

  friendlyName: 'Get trade list by address',

  description: '',

  inputs: {
    address: {
      type: 'string'
    },
    tradePartner: {
      type: 'string'
    },
    tradeStart: {
      type: 'number'
    },
    tradeEnd: {
      type: 'number'
    },
    page: { // isLatest为false时生效,当前页数
      type: 'number'
    },
    seq: { // isLatest为false时生效,每页显示多少条
      type: 'number'
    }
  },

  exits: {
  },

  fn: async function ({ address, tradePartner, tradeStart, tradeEnd, page, seq }) {
    try {
      if (seq > 500) {
        seq = 500
      }
      let trade = []
      let count;
      let sql = { or: [{ from: address }, { to: address }] }
      if (tradePartner) {
        sql.or = [{ from: address, to: tradePartner }, { from: tradePartner, to: address }]
      }
      if (tradeStart || tradeEnd) {
        sql.time = {}
      }
      if (tradeStart) {
        sql["time"][">="] = tradeStart
      }
      if (tradeEnd) {
        sql["time"]["<"] = tradeEnd
      }
      count = await Transactions.count(sql)
      trade = await Transactions.find().where(sql)
        .sort([{ createdAt: 'DESC' }]).skip((page - 1) * seq).limit(seq)
      return Utils._return(ResultCode.OK_GET_WALLET_DETAIL, { trade: trade, count: count })
    } catch (error) {
      return this.res.serverError(error);
    }
  }

};
