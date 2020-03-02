module.exports = {

  friendlyName: 'Get erc 20 detail',

  description: '',

  inputs: {
    tokenAddress: {
      type: 'string'
    }
  },

  exits: {
  },

  fn: async function ({ tokenAddress }) {
    try {
      let erc20Data = await ERC20.findOne({ erc20: tokenAddress })
      return Utils._return(ResultCode.OK_GET_ERC20_DETAIL, { data: erc20Data });
    } catch (error) {
      return this.res.serverError(error);
    }
  }

};
