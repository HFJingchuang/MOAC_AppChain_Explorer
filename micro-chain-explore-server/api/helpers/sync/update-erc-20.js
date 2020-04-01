module.exports = {

  friendlyName: 'Update erc20 from subChain ',

  inputs: {
  },

  exits: {
  },


  fn: async function () {
    try {
      let transactions = await Transactions.find({ where: { sharding_flag: 3 }, select: ['transaction_hash'] });
      for (var i = 0, length = transactions.length; i < length; i++) {
        // 交易是否成功
        let hash = transactions[i].transaction_hash;
        let receipt = await Utils.getTransaction(hash);
        let tx = await sails.helpers.getTransaction(hash)
        let contractAddress = receipt.contractAddress;
        if (contractAddress && contractAddress !== '0x0000000000000000000000000000000000000000') {
          let res = await Utils.isERC20(contractAddress)
          if (res) {
            let erc20 = {
              erc20: contractAddress,
              name: res.name,
              symbol: res.symbol,
              decimals: res.decimals,
              totalSupply: res.totalSupply,
              deployer: tx.from
            }
            await ERC20.create(erc20);
          }
        }
      }
    } catch (error) {
      sails.log.error(error);
    }
  },
};
