module.exports = {

  friendlyName: 'Get erc20 list',

  description: '',

  inputs: {
    page: {
      type: 'number'
    },
    seq: {
      type: 'number'
    },
    condition: {
      type: 'string'
    }
  },

  exits: {
  },

  fn: async function ({ page, seq, condition }) {
    try {
      let erc20List = await ERC20.find()
        .where({ or: [{ erc20: condition }, { name: condition }, { symbol: condition }] })
        .sort([{ createdAt: 'DESC' }])
        .skip((page - 1) * seq).limit(seq);
      let count = await ERC20.count({ or: [{ erc20: condition }, { name: condition }, { symbol: condition }] })
      return Utils._return(ResultCode.OK_GET_ERC20_LIST, { data: erc20List, count: count });
    } catch (error) {
      return this.res.serverError(error);
    }
  }

};
