module.exports = {

  friendlyName: 'Start synchronous data',

  fn: async function () {
    while (true) {
      sails.log.info(new Date().toLocaleTimeString(), 'Sync')
      await sails.helpers.sync.syncMicroChain();
      await sails.helpers.setTransactionsCount();
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  },
};
