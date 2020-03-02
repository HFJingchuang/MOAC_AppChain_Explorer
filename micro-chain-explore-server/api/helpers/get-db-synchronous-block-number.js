module.exports = {

  friendlyName: 'Get db synchronous block number',

  inputs: {
  },

  exits: {

    success: {
      outputFriendlyName: 'Db synchronous block number',
    },

  },

  fn: async function () {
    let block = await Blocks.find()
      .sort([{ number: 'DESC' }])
      .limit(1);
    if (block.length == 0) {
      return 1
    }
    return block[0].number;
  }

};

