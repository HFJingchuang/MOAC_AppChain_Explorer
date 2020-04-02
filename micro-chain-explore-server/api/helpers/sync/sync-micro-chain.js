module.exports = {

  friendlyName: 'Start synchronous data',

  inputs: {
  },

  exits: {
  },


  fn: async function () {
    try {
      let blockNumToDB = await sails.helpers.getDbSynchronousBlockNumber();
      let blockNum = await Utils.getBlockNumer();
      sails.log.info("blockNumToDB", blockNumToDB)
      sails.log.info("blockNum", blockNum)
      await Blocks.destroy({ number: blockNumToDB })
      if (blockNumToDB > blockNum) {
        await Blocks.destroy({ number: { '>': blockNum } })
        await Transactions.destroy({ number: blockNumToDB })
        return
      }
      if (blockNumToDB < blockNum) {
        for (blockNumToDB; blockNumToDB <= blockNum; blockNumToDB++) {
          let info = await Utils.getBlocks(blockNumToDB);
          let transactions = info.transactions;
          let txlength = transactions.length;
          let block = {
            extra_data: info.extraData,
            hash: info.hash,
            miner: info.miner,
            number: info.number,
            parent_hash: info.parentHash,
            receipts_root: info.receiptsRoot,
            state_root: info.stateRoot,
            timestamp: info.timestamp,
            transactions: transactions,
            transactions_length: txlength,
            transactions_root: info.transactionsRoot
          }
          if (txlength > 0) {
            let txInfos = [];
            let addrSet = new Set();
            let tokenSet = new Set();
            let txs = info.transactions;
            let timestamp = info.timestamp;
            for (var i = 0, length = txs.length; i < length; i++) {
              let isSync = await Transactions.count({ transaction_hash: txs[i] })
              if (isSync == 0) {
                let receipt = await Utils.getReceiptByHash(txs[i]);
                let tx = await Utils.getTransaction(txs[i]);
                let contractAddress;// 部署合约地址
                let status;// 交易是否成功
                let logs = [];// 交易日志
                if (receipt) {
                  // ERC20判定
                  contractAddress = receipt.contractAddress;
                  if (contractAddress && contractAddress !== '0x0000000000000000000000000000000000000000') {
                    let res = await Utils.isERC20(contractAddress)
                    if (res) {
                      let erc20 = {
                        erc20: contractAddress,
                        name: res.name,
                        symbol: res.symbol,
                        decimals: res.decimals,
                        totalSupply: res.totalSupply,
                        deployer: tx.from
                      }
                      await ERC20.create(erc20);
                    }
                  }
                  status = !receipt.failed;
                  _logs = receipt.logs;
                  for (let i = 0, length = _logs.length; i < length; i++) {
                    let topics = _logs[i].topics;
                    let token = _logs[i].address;
                    if (topics[0] === sails.config.custom.TRANSFER_SHA) {
                      addrSet.add('0x' + topics[1].slice(26));
                      addrSet.add('0x' + topics[2].slice(26));
                      tokenSet.add(token)
                    }
                    let log = {
                      address: token,
                      topics: topics,
                      data: Buffer.from(_logs[i].data, 'base64').toString('hex'),
                    }
                    logs.push(log)
                  }
                }
                let txInfo = {
                  block_hash: tx.blockHash,
                  block_number: tx.blockNumber,
                  from: tx.from,
                  to: tx.shardingFlag === 1 || tx.shardingFlag === 2 ? tx.input.slice(0, 42) : tx.to,
                  value: Utils.chain3.fromSha(tx.value.toString()),
                  input: tx.input,
                  nonce: tx.nonce,
                  r: tx.r.toString(),
                  s: tx.s.toString(),
                  v: tx.v,
                  sharding_flag: tx.shardingFlag,
                  transaction_hash: tx.transactionHash,
                  transaction_index: tx.transactionIndex,
                  time: timestamp,
                  contractAddress: contractAddress,
                  status: status,
                  logs: logs,
                  logs_length: logs.length
                }
                txInfos.push(txInfo);
                // 统计新地址
                await Utils.addWalletFromInput(txInfo);
              }
            }
            for (let token of tokenSet) {
              for (let address of addrSet) {
                let decimals = await ERC20.findOne({ where: { erc20: token }, select: ['decimals'] });
                await Utils.getBalance(address, token, decimals.decimals);
              }
            }
            if (txInfos.length > 0) {
              await Transactions.createEach(txInfos);
            }

            let counts = await BlocksCruve.find({ trades: txlength }).limit(1);
            if (counts.length == 0) {
              await BlocksCruve.create({
                blocks: 1,
                trades: txlength
              })
            } else {
              await BlocksCruve.update({ trades: txlength }).set({ blocks: counts[0].blocks + 1 })
            }
          }
          await Blocks.create(block);
        }
      }
    } catch (error) {
      sails.log.error(error)
    }
  },
};
