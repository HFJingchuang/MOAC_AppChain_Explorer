var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27027";
var dbName = "JingChuang";
var indexData = [
    {
        tableName: 'blocks', // 表名
        index: [{
            _id: 1,
            hash: 1
        }, {
            hash: -1,
            createdAt: -1
        }, {
            timestamp: -1
        }, {
            number: -1
        }, {
            transactions_length: 1
        }]
        // 1:asc,-1:desc
    },
    {
        tableName: 'erc20',
        index: [{
            erc20: -1,
            createdAt: -1
        }, {
            name: -1,
            createdAt: -1
        }, {
            symbol: -1,
            createdAt: -1
        }, {
            token: -1,
            balance: -1
        }
        ]
    },
    {
        tableName: 'transactions',
        index: [{
            _id: 1,
            transaction_hash: 1
        }, {
            block_hash: -1
        }, {
            transaction_hash: -1
        }, {
            time: -1,
            createdAt: -1
        }, {
            from: -1,
            createdAt: -1
        }, {
            to: -1,
            createdAt: -1
        }, {
            createdAt: -1
        }, {
            from: -1,
            to: -1,
            time: -1,
            createdAt: -1
        }, {
            from: -1,
            to: -1,
            createdAt: -1
        }]
    },
    {
        tableName: 'deposit',
        index: [{
            createdAt: -1
        }]

    },
    {
        tableName: 'wallet',
        index: [{
            _id: 1,
            address: 1
        }, {
            address: -1,
            balance: -1,
            createdAt: -1
        }]

    }, {
        tableName: 'tradescruve',
        index: [{
            time: -1
        }]
    },
    {
        tableName: 'blockscruve',
        index: [{
            trades: -1
        }]
    }
]

for (let i = 0, len = indexData.length; i < len; i++) {
    let index = indexData[i].index;
    for (let j = 0, len = index.length; j < len; j++) {
        createMongoIndex(indexData[i].tableName, index[j])
    }

}

// importData()
return

function createMongoIndex(tableName, index) {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        dbo.collection(tableName).createIndex(index,
            null,
            function (err, results) {
                if (err)
                    console.log("indexStr Error:\n\t" + err.message);
                else
                    console.log("indexStr Result:\n\t" + results);
                db.close();
            }
        );
    });
}