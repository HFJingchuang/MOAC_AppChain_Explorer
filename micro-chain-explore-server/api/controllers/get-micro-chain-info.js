module.exports = {

  friendlyName: 'Get micro chain info',

  description: '',

  inputs: {
  },

  exits: {
  },

  fn: async function () {
    try {
      let info = await sails.helpers.getSubChainInfo();
      if (info) {
        info.Balance = Utils.chain3.fromSha(Utils.chain3.toDecimal(info.balance))
        info.BondLimit = Utils.chain3.fromSha(Utils.chain3.toDecimal(info.bondLimit))
        info.BlockReward = Utils.chain3.fromSha(Utils.chain3.toDecimal(info.blockReward))
        info.TxReward = Utils.chain3.fromSha(Utils.chain3.toDecimal(info.txReward))
        info.ViaReward = Utils.chain3.fromSha(Utils.chain3.toDecimal(info.viaReward))
      }
      return Utils._return(ResultCode.OK_GET_MICRO_CHAIN_INFO, info)
    } catch (error) {
      return this.res.serverError(error);
    }

  }

};
