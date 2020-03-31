module.exports = {

  friendlyName: 'Get blocks list',

  description: '',

  inputs: {
    isLatest: {// 查询首页区块数据，true:返回最新6条数据
      type: 'boolean'
    },
    page: { // isLatest为false时生效,当前页数
      type: 'number'
    },
    seq: { // isLatest为false时生效,每页显示多少条
      type: 'number'
    },
    blockStart: {
      type: 'number'
    },
    blockEnd: {
      type: 'number'
    }
  },

  exits: {
  },

  fn: async function ({ isLatest, page, seq, blockStart, blockEnd }) {
    try {
      if (seq > 500) {
        seq = 500
      }
      let blocksList;
      let count;
      if (isLatest) {
        blocksList = await Blocks.find()
          .sort([{ number: 'DESC' }])
          .skip(0).limit(6);
        count = 6;
      } else {
        let sql = { timestamp: {} }
        if (blockStart) {
          sql["timestamp"][">="] = blockStart
        }
        if (blockEnd) {
          sql["timestamp"]["<"] = blockEnd
        }
        if (!blockStart && !blockEnd) {
          sql = {}
        }
        blocksList = await Blocks.find()
          .where(sql)
          .sort([{ timestamp: 'DESC' }])
          .skip((page - 1) * seq).limit(seq)
        count = await Blocks.count(sql)
      }
      return Utils._return(ResultCode.OK_GET_BLOCKS_LIST, { data: blocksList, count: count });
    } catch (error) {
      return this.res.serverError(error);
    }
  }

};
