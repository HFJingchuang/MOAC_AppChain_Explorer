var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
var dbName = "JingChuang";
var indexData = [
    {
        tableName: 'blocks', // 表名
        index: [{
            block_hash: -1,
            createdAt: -1
        }, {
            number: -1,
            timestamp: -1
        }]
        // 1:asc,-1:desc
    },
    {
        tableName: 'erc20',
        index: [{
            erc20: -1
        }, {
            token: -1,
            balance: -1
        }
        ]
    },
    {
        tableName: 'transactions',
        index: [{
            transaction_hash: -1
        }]
    },
    {
        tableName: 'deposit',
        index: [{
            createdAt: -1
        }]

    },
    {
        tableName: 'token',
        index: [{
            address: -1,
            symbol: -1
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