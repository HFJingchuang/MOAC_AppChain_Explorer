module.exports = {

  friendlyName: 'get erc20 info',

  description: '',

  inputs: {
    address: {
      type: 'string'
    }
  },

  exits: {
  },

  fn: async function ({ address }) {
    try {
      let erc20Info = await ERC20.findOne({ where: { erc20: address }, select: ['erc20', 'symbol', 'decimals'] })
      return Utils._return(ResultCode.OK_RESULT, { info: erc20Info })
    } catch (error) {
      return this.res.serverError(error);
    }
  }

};
