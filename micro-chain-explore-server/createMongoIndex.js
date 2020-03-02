var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
var dbName = "JingChuang";
var indexData = [
    {
        tableName: 'blocks', // 表名
        indexName: 'number', // 创建索引字段名称
        indexType: 1 // 1:asc,-1:desc
    },
    {
        tableName: 'blocks', // 表名
        indexName: 'block_hash', // 创建索引字段名称
        indexType: 1 // 1:asc,-1:desc
    },
    {
        tableName: 'wallet',
        indexName: 'address',
        indexType: 1
    },
    {
        tableName: 'wallet',
        indexName: 'token',
        indexType: 1
    },
    {
        tableName: 'transactions',
        indexName: 'createdAt',
        indexType: 1
    },
    {
        tableName: 'transactions',
        indexName: 'transaction_hash',
        indexType: 1
    },
    {
        tableName: 'erc20',
        indexName: 'erc20',
        indexType: 1
    }
]

for (let i = 0, len = indexData.length; i < len; i++) {
    createMongoIndex(indexData[i].tableName, indexData[i].indexName, indexData[i].indexType)
}

// importData()
return

function createMongoIndex(tableName, indexName, indexType) {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        var indexStr = {};
        indexStr[indexName] = indexType;
        if (err) throw err;
        var dbo = db.db(dbName);
        dbo.collection(tableName).createIndex(indexStr,
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