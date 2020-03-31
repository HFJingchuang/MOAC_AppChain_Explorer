module.exports = {

    friendlyName: 'Get erc 20 holder list',

    description: '',

    inputs: {
        page: {
            type: 'number'
        },
        seq: {
            type: 'number'
        },
        tokenAddress: {
            type: 'string'
        }
    },

    exits: {
    },

    fn: async function ({ page, seq, tokenAddress }) {
        try {
            if (seq > 500) {
                seq = 500
            }
            let holderList = await Wallet.find({ token: tokenAddress, balance: { ">": 0 } })
                .sort([{ balance: 'DESC' }])
                .skip((page - 1) * seq).limit(seq);
            let holderCount = await Wallet.count({ token: tokenAddress, balance: { ">": 0 } })
            return Utils._return(ResultCode.OK_GET_ERC20_HOLDER_LIST, { data: holderList, count: holderCount });
        } catch (error) {
            return this.res.serverError(error);
        }
    }

};
