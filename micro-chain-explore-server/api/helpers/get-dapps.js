module.exports = {

    friendlyName: 'Get tokens',

    description: '',

    inputs: {
    },

    exits: {
    },


    fn: async function () {
        return new Promise(function (resolve, reject) {
            try {
                let dapps = Utils.chain3.scs.getDappAddrList(sails.config.custom.microChain)
                resolve(dapps)
            } catch (e) {
                reject(e)
            }
        })
    }
};

