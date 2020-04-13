const Utils = require('./Utils.js')

// 获取数据库同步区块
exports.getSyncTimeToRedis = function () {
    return new Promise(function (resolve, reject) {
        try {
            Utils.redisClient.get('SyncTime', function (err, data) {
                if (!err) {
                    if (data) {
                        resolve(data)
                    } else {
                        resolve(0)
                    }
                } else {
                    reject(err)
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}

// 保存区块号
exports.saveSyncTime = function (blockNum) {
    return new Promise(function (resolve, reject) {
        try {
            Utils.redisClient.set('SyncTime', blockNum, function (err, data) {
                if (!err) {
                    if (data == 'OK') {
                        resolve({ code: '0', msg: '保存同步时间成功' })
                    } else {
                        resolve({ code: '1', msg: '保存同步时间失败' })
                    }
                } else {
                    reject(err)
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}