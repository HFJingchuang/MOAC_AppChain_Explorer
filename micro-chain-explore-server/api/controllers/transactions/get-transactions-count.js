const BigNumber = require('bignumber.js')

module.exports = {


  friendlyName: 'Get transactions count',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function () {
    let transactionsList = await TradesCruve.find({ select: ['time', 'count'] }).sort([{ time: 'DESC' }]).limit(90);
    let latestZeroTime
    if (transactionsList.length > 0) {
      latestZeroTime = new BigNumber(new Date(transactionsList[0].time).getTime() - 28800000 + 86400000).div(1000).toNumber();
    } else {
      latestZeroTime = 0;
    }
    var db = Transactions.getDatastore().manager;
    var collection = db.collection(Transactions.tableName);
    let _transactionsList = await collection.aggregate([
      { $match: { time: { $gt: latestZeroTime } } },
      { $project: { "_id": 0, "yearMonthDay": { $dateToString: { format: "%Y-%m-%d", date: { $add: [new Date(0), 28800000, { $multiply: ["$time", 1000] }] } } } } },
      { $group: { "_id": "$yearMonthDay", count: { $sum: 1 } } },
      { $project: { "_id": 0, "time": "$_id", "count": 1 } },
      { $sort: { "time": -1 } }]).toArray();
    transactionsList.unshift(_transactionsList[0]);

    return Utils._return(ResultCode.OK_GET_TRADE_LIST, {
      data: transactionsList,
    });
  }
};
