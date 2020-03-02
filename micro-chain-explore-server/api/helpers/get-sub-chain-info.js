module.exports = {

  friendlyName: 'Get sub chain info',

  description: '',

  inputs: {
  },

  exits: {
  },

  fn: async function () {
    return new Promise(function (resolve, reject) {
      try {
        let info = Utils.chain3.scs.getMicroChainInfo(sails.config.custom.microChain)
        resolve(info)
      } catch (e) {
        reject(e)
      }
    })
  }
};

