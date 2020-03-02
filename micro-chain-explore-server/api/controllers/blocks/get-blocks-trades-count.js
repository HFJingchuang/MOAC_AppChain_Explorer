module.exports = {


  friendlyName: 'Get blocks trades count',

  description: '',

  inputs: {

  },

  exits: {

  },

  fn: async function () {
    // All done.
    let blocksList;
    let count;
    var db = Blocks.getDatastore().manager;
    var collection = db.collection(Blocks.tableName);
    var now = parseInt(new Date().getTime() / 1000);
    var ninetyDay = now - 90 * 24 * 3600;
    blocksList = await collection.aggregate([
      { $project: { "_id": 0,"number": 1, "trades": {"$size":"$transactions" } }},
      { $group: { "_id": "$trades", blocks: { $sum: 1 } } },
      { $project: { "_id": 0,"trades": "$_id", "blocks": 1 }},
      { $sort: { "trades": 1 } }
    ]).toArray();
    count = blocksList.length;
    return Utils._return(ResultCode.OK_GET_TRADE_LIST, {
      data: blocksList,
      count: count
    });
  }

};
