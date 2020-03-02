module.exports = {

  friendlyName: 'Get transaction detail by hash',

  description: '',

  inputs: {
    hash: {
      type: 'string'
    }
  },

  exits: {
  },

  fn: async function ({ hash }) {
    let detail = await Transactions.findOne({ where: { transaction_hash: hash }, select: ['block_hash', 'block_number', 'from', 'to', 'value', 'input', 'nonce', 'sharding_flag', 'transaction_hash', 'time', 'contractAddress', 'status', 'logs', 'logs_length'] });
    return Utils._return(ResultCode.OK_GET_TRADE_DETAIL, detail);
  }

};
