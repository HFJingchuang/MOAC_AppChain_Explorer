module.exports = {

    friendlyName: 'Get transaction',

    description: '',

    inputs: {
        txhash: { type: 'string' }
    },

    exits: {

        success: {
            outputFriendlyName: 'Transactions',
        },

    },


    fn: async function ({ txhash }) {
        return new Promise(function (resolve, reject) {
            try {
                let tx = Utils.chain3.scs.getTransactionByHash(sails.config.custom.microChain, txhash)
                resolve(tx)
            } catch (e) {
                reject(e)
            }
        })
    }
};

