module.exports = {

  friendlyName: 'Update transaction status',

  fn: async function () {
    sails.log.info(new Date().toLocaleTimeString(), 'Update')
    await sails.helpers.sync.syncMicroChainTransaction();
    sails.log.info(new Date().toLocaleTimeString(), 'SUCCESS!')
  },
};
