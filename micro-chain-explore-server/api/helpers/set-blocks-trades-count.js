module.exports = {


  friendlyName: 'Get blocks trades count',

  description: '',

  inputs: {

  },

  exits: {

  },

  fn: async function () {
    var db = Blocks.getDatastore().manager;
    var collection = db.collection(Blocks.tableName);
    let blocksList = await collection.aggregate([
      { $match: { transactions_length: { $gt: 0 } } },
      { $group: { "_id": "$transactions_length", blocks: { $sum: 1 } } },
      { $project: { "_id": 0, "trades": "$_id", "blocks": 1 } },
      { $sort: { "trades": 1 } }
    ], { allowDiskUse: true }).toArray();
    if (blocksList.length > 0) {
      await BlocksCruve.createEach(blocksList);
    }
  }

};
