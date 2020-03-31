module.exports = {

    friendlyName: 'Get asset list by address',

    description: '',

    inputs: {
        address: {
            type: 'string'
        },
        page: { // isLatest为false时生效,当前页数
            type: 'number'
        },
        seq: { // isLatest为false时生效,每页显示多少条
            type: 'number'
        }
    },

    exits: {
    },

    fn: async function ({ address, page, seq }) {
        try {
            if (seq > 500) {
                seq = 500
            }
            let count = await Wallet.count({ address: address, balance: { ">": 0 } })
            let assetList = await Wallet.find({ address: address, balance: { ">": 0 } })
                .sort([{ createdAt: 'DESC' }]).skip((page - 1) * seq).limit(seq)
            for (let i = 0, len = assetList.length; i < len; i++) {
                let token = await ERC20.findOne({ erc20: assetList[i].token })
                assetList[i].ERC20 = token;
            }
            return Utils._return(ResultCode.OK_GET_ASSET_LIST, { data: assetList, count: count })
        } catch (error) {
            return this.res.serverError(error);
        }
    }

};
