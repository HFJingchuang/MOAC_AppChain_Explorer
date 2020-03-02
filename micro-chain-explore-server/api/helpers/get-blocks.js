module.exports = {

  friendlyName: 'Get blocks',

  description: '',

  inputs: {
    blocksNum: { type: 'number' }
  },

  exits: {

    success: {
      outputFriendlyName: 'Blocks',
    },

  },


  fn: async function ({ blocksNum }) {
    return new Promise(function (resolve, reject) {
      try {
        let block = Utils.chain3.scs.getBlock(sails.config.custom.microChain, blocksNum)
        resolve(block)
      } catch (e) {
        reject(e)
      }
    })
  }
};

