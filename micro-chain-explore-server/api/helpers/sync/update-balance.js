module.exports = {

  friendlyName: 'Update erc20 from subChain ',

  inputs: {
  },

  exits: {
  },


  fn: async function () {
    try {
      let erc20 = await ERC20.find({ select: ['erc20', 'decimals'] });
      let wallets = await Wallet.find({ select: ['address'] });
      for (let i = 0, length = erc20.length; i < length; i++) {
        let token = erc20[i].erc20;
        let decimals = erc20[i].decimals
        for (let j = 0, length = wallets.length; j < length; j++) {
          await Utils.getBalance(wallets[j].address, token, decimals);
        }
      }
    } catch (error) {
      sails.log.error(error);
    }
  },
};
