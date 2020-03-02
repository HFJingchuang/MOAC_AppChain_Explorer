module.exports = {

  friendlyName: 'update wallets from subChain',

  fn: async function () {
    sails.log.info(new Date().toLocaleTimeString(), 'Update wallets')
    await sails.helpers.sync.updateWallets();
    sails.log.info(new Date().toLocaleTimeString(), 'Update SUCCESS!')
  },
};
