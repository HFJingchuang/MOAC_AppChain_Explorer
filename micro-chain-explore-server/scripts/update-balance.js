module.exports = {

  friendlyName: 'Update balance of all wallets',

  fn: async function () {
    sails.log.info(new Date().toLocaleTimeString(), 'Update balance')
    await sails.helpers.sync.updateBalance();
    sails.log.info(new Date().toLocaleTimeString(), 'Update SUCCESS!')
  },
};
