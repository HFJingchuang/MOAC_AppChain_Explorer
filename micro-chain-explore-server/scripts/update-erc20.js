module.exports = {

  friendlyName: 'Update transaction status',

  fn: async function () {
    sails.log.info(new Date().toLocaleTimeString(), 'Update ERC20')
    await sails.helpers.sync.updateErc20();
    sails.log.info(new Date().toLocaleTimeString(), 'Update SUCCESS!')
  },
};
