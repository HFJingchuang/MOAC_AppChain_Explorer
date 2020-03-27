module.exports = {

  friendlyName: 'Start synchronous data',

  inputs: {
  },

  exits: {
  },


  fn: async function () {
    try {
      let transactions = await Transactions.find({ select: ['transaction_hash'] });
      for (var i = 0, length = transactions.length; i < length; i++) {
        // 交易是否成功
        let hash = transactions[i].transaction_hash;
        let receipt = await Utils.getTransaction(hash);
        let status;
        if (receipt) {
          status = !receipt.failed;
        }
        await Transactions.update({ transaction_hash: hash }).set({
          status: status
        });
      }
    } catch (error) {
      return error;
    }
  },
};
