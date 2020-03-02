module.exports = {

  friendlyName: 'Get wallet blance',

  description: '',

  inputs: {
    address: {
      type: 'string'
    }
  },

  exits: {
  },

  fn: async function ({ address }) {
    return new Promise(function (resolve, reject) {
      try {
        let balance = Utils.chain3.scs.getBalance(sails.config.custom.microChain, address)
        resolve(Utils.chain3.fromSha(balance))
      } catch (e) {
        reject(e)
      }
    })
  }


};

