module.exports = {


  friendlyName: 'Get blocks trades count',

  description: '',

  inputs: {

  },

  exits: {

  },

  fn: async function () {
    let blocksList = await BlocksCruve.find({ select: ['blocks', 'trades'] })
    return Utils._return(ResultCode.OK_GET_TRADE_LIST, {
      data: blocksList
    });
  }

};
