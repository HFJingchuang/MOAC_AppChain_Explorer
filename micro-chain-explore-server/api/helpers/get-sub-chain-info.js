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
        let info = Utils.getMicroChainInfo()
        resolve(info)
      } catch (e) {
        reject(e)
      }
    })
  }
};

