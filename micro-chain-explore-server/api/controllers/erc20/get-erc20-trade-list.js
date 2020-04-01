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
            let start = new Date().getTime()
            let tradeList = await Transactions.find({
                where: { to: tokenAddress },
                select: ['block_number', 'transaction_hash', 'from', 'to', 'sharding_flag', 'status', 'time']
            })
                .sort([{ createdAt: 'DESC' }])
                .skip((page - 1) * seq).limit(seq);
            let tradeCount = await Transactions.count({ to: tokenAddress })
            return Utils._return(ResultCode.OK_GET_ERC20_TRADE_LIST, { data: tradeList, count: tradeCount });
        } catch (error) {
            return this.res.serverError(error);
        }
    }
};
