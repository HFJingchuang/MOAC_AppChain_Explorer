module.exports = {

  friendlyName: 'is erc20 or not',

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
      let count = await ERC20.count({ erc20: address })
      let isERC20
      if (count === 1) {
        isERC20 = true;
      } else {
        isERC20 = false;
      }
      return Utils._return(ResultCode.OK_RESULT, isERC20)
    } catch (error) {
      return this.res.serverError(error);
    }
  }

};
