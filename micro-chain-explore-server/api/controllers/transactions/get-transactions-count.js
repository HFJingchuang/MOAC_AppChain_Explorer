module.exports = {


  friendlyName: 'Get transactions count',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function () {
    let transactionsList;
    let count;
    var db = Transactions.getDatastore().manager;
    var collection = db.collection(Transactions.tableName);
    var now = parseInt(new Date().getTime() / 1000);
    var ninetyDay = now - 90 * 24 * 3600;
    transactionsList = await collection.aggregate([
      { $match: { time: { $gt: ninetyDay } } },
      { $project: { "_id": 0, "yearMonthDay": { $dateToString: { format: "%Y-%m-%d", date: { $add: [new Date(0), 28800000, { $multiply: ["$time", 1000] }] } } } } },
      { $group: { "_id": "$yearMonthDay", count: { $sum: 1 } } },
      { $project: { "_id": 0,"time": "$_id", "count": 1 } },
      { $sort: { "time": -1 } }]).toArray();
    count = transactionsList.length;
    return Utils._return(ResultCode.OK_GET_TRADE_LIST, {
      data: transactionsList,
      count: count
    });
  }

};
