const BigNumber = require('bignumber.js')
module.exports = {


  friendlyName: 'Get transactions count',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function () {
    let transactionsList;
    var db = Transactions.getDatastore().manager;
    var collection = db.collection(Transactions.tableName);
    let latestTime = await Transactions.find({ select: ['time'] }).sort([{ time: 'DESC' }]).limit(1);
    let latestZeroTime;
    if (latestTime.length > 0) {
      latestZeroTime = await Utils.getZeroTime(latestTime[0].time);
    } else {
      return
    }
    let _latestTime = await TradesCruve.find({ select: ['time'] }).sort([{ time: 'DESC' }]).limit(1);
    let _latestZeroTime;
    if (_latestTime.length > 0) {
      _latestZeroTime = new BigNumber(new Date(_latestTime[0].time).getTime() + 86400000 - 28800000).div(1000).toNumber();
    } else {
      _latestZeroTime = 0;
    }
    if (_latestZeroTime === latestZeroTime) {
      return
    }
    transactionsList = await collection.aggregate([
      { $match: { time: { $gt: _latestZeroTime, $lt: latestZeroTime } } },
      { $project: { "_id": 0, "yearMonthDay": { $dateToString: { format: "%Y-%m-%d", date: { $add: [new Date(0), 28800000, { $multiply: ["$time", 1000] }] } } } } },
      { $group: { "_id": "$yearMonthDay", count: { $sum: 1 } } },
      { $project: { "_id": 0, "time": "$_id", "count": 1 } },
      { $sort: { "time": -1 } }]).toArray();

    if (transactionsList.length > 0) {
      await TradesCruve.createEach(transactionsList);
    }
  }
};
