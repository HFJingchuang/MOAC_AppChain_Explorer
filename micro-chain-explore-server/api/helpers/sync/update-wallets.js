module.exports = {

  friendlyName: 'update wallets from subChain',

  inputs: {
  },

  exits: {
  },


  fn: async function () {
    try {
      let txs = await Transactions.find({ where: { sharding_flag: 1 }, select: ['from', 'to', 'input', 'sharding_flag'] });
      for (var i = 0, length = txs.length; i < length; i++) {
        await Utils.addWalletFromInput(txs[i]);
      }
    } catch (error) {
      sails.log.error(error);
    }
  },
};
