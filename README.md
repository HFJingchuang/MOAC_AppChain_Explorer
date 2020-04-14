# micro-chain-explore
MOAC应用链浏览器
1. 安装
> npm install
2. 启动
> npm run start
3. 配置
> 开发环境: micro-chain-explore\micro-chain-explore\config\dev.env.js

> 生产环境: micro-chain-explore\micro-chain-explore\config\prod.env.js

数据请求配置: BASE_URL:'"http://explorer.zcold.top"'

### [测试浏览器链接](http://explorer.zcold.top)

# micro-chain-explore-server
服务提供MOAC应用链数据同步，区块、交易、钱包相关数据查询

### 准备工作
安装Node、npm<br>

> npm install

安装sails
> npm install sails -g

安装MongoDB 3.6及以上版本

### custom配置说明

>在micro-chain-explore\micro-chain-explore-server\config\datastores.js中配置DB连接

>在micro-chain-explore\micro-chain-explore-server\config\custom.js中配置相关参数(开发环境)

>需在micro-chain-explore\micro-chain-explore-server\config\env\production.js中配置相关参数（生产环境）

```json
./config/custom.js

microChain：应用链地址
dappBase：dappBase地址
vnodeUri：Vnode URI
scsUri：SCS URI
vnodeVia：vnode收益地址
ERC20ABI：ERC20通用ABI(固定值，无需变更)
DAPP_BASE_ABI：dappBase合约ABI
ASM_MICRO_CHAIN_ABI：应用链合约ABI
TRANSFER_SHA：Transfer事件sha3值(固定值，无需变更)
```

### 启动

#### docker-compose方式启动（推荐）

> docker-compose up -d

#### 启动

1.开始同步数据

同步命令
> sails run sync-micro-chain
或者
> ./start.sh

2.添加索引

>同步数据时，查看数据库Blocks、ERC20、Transactions、Wallet表是否创建，
存在则执行 node createMongoIndex 添加索引

3.启动服务
> npm run start //开发环境
> 
> npm run startpro //生产环境



### router说明

### 返回code为0即请求成功

 #### 获取区块列表:(Get  /api/v1/blocks/get-blocks-list)
```
    参数：
        isLatest: boolean true:返回最新6条数据
        page: number isLatest为false时生效,当前页数
        seq: number  isLatest为false时生效,每页显示多少条
        blockStart: number(timestamp) 区块开始时间(可选)
        blockEnd: number(timestamp) 区块结束时间(可选)

    返回：
		return {
			code: '0',
            msg:'获取区块数据成功',
			data: {
                data:[{
                    createdAt: 1581394361879    数据创建时间，下同，不赘述
                    updatedAt: 1581394361879    数据更新时间，下同，不赘述
                    id: "5e4229b91180511868cb2e6b"  id，下同，不赘述
                    extra_data: "0x"
                    hash: "0xe932b5c1dcd5989edd90827e27229d521ff0913e2770ee404e1310712a2af993"  区块hash
                    miner: "0x8f1a63cc9f119b6b880512c39939807a4a6d9899" 出块scs节点
                    number: 20137   区块号
                    parent_hash: "0xbb584551ab81bf01e4069d8cf12373146380564d9378bcfa3786a7101d85d4e4"   上一区块哈希值
                    receipts_root: "0x0d3ebc79ccffd2e8299bedf6ff7a9b538c5b33d9d5cb25073d8464dfa9599644"
                    state_root: "0xa8f51696d392f49d0032dfc1da366faed5297a0c1fa64f4a061ee58c3a1a8bd5"
                    timestamp: 1577972091   区块时间
                    transactions: ["0x1f8ac278ae7c7865fb1e0762b182abd8140fd039b4730b0856df718f98cb03d6"]    区块含有交易hash
                    transactions_length: 1  区块交易数
                    transactions_root: "0x9fc55d0d5b4f47445dc99d9346b63d74d8a9a46602937fbde73afcf63949097c"
                }]
                count: 6    区块数据总数
			}
		}
```

 #### 获取hash类型:(Get  /api/v1/get-hash-type)
```
    参数：
        hash: hash

    返回：
		return {
			code: '0',
			data: {
                type: 1,    // 0: 区块hash   1: 交易hash    2: 未统计hash/不存在
			}
		}
```

 #### 根据区块hash获取区块详细信息:(Get  /api/v1/blocks/get-blocks-detail-by-hash)
```
    参数：
        hash: 区块hash
        page: number 当前页数
        seq: number  每页显示多少条

    返回：
		return {
			code: '0',
			data: {
                detail:{    // 区块数据
                    createdAt: 1581394358555
                    updatedAt: 1581394358555
                    id: "5e4229b61180511868cb2e69"
                    extra_data: "0x"
                    hash: "0xbb584551ab81bf01e4069d8cf12373146380564d9378bcfa3786a7101d85d4e4"  区块hash
                    miner: "0xe1e49c30b77ad525905f1ad727bf8cbf66b8e4fd" 出块scs节点
                    number: 20136   区块号
                    parent_hash: "0xfd27b1399e69317909316fba48fa0b07489ee7e0062f71821d86e731f575a89e"   上一区块哈希值
                    receipts_root: "0x3bcb062f73748493a180ee686b0d861394885a6c07a1eb8e31fdafabf12c9673"
                    state_root: "0xfc503b063e49b3d5644ad5878519ec3240e706acaf072c374d5055ac139288f7"
                    timestamp: 1577972081   区块时间
                    transactions: ["0x0f2bf89cfedc86bbddaec1151a5e727337c02472626f0c41c9fb3d34cf4e8b3c"]    区块含有交易hash
                    transactions_length: 1  区块交易数
                    transactions_root: "0x8f6d2d39de5005ff9d1ca78e616731119f77334592020a7f50a882922ee5cc47"
                }，
                tradeList: [
                    id: "5e4229b91180511868cb2e6a"
                    from: "0xdd26590684a2f8da816a750511e1296e9014fb95"  交易发起方
                    to: "0x226181662dcf24cc7eee0c6d194dc3ee882ce7b0"    交易接收方
                    sharding_flag: 1    交易类型,   0:执行母链交易, 1:执行智能合约, 2:转账原始Token, 3:部署智能合约
                    transaction_hash: "0x0f2bf89cfedc86bbddaec1151a5e727337c02472626f0c41c9fb3d34cf4e8b3c"  交易hash
                    status: true    交易状态, false:失败, true:成功
                ],
                count: 1    区块包含交易数量
			}
		}
```

 #### 根据区块号获取区块详情:(/api/v1/blocks/get-blocks-detail-by-block-num)
```
    参数：
        blockNum: 区块号
        page: number 当前页数
        seq: number  每页显示多少条

    返回：
		return {
			code: '0',
			data: {
                detail:{    // 区块数据
                    createdAt: 1581394358555
                    updatedAt: 1581394358555
                    id: "5e4229b61180511868cb2e69"
                    extra_data: "0x"
                    hash: "0xbb584551ab81bf01e4069d8cf12373146380564d9378bcfa3786a7101d85d4e4"  区块hash
                    miner: "0xe1e49c30b77ad525905f1ad727bf8cbf66b8e4fd" 出块scs节点
                    number: 20136   区块号
                    parent_hash: "0xfd27b1399e69317909316fba48fa0b07489ee7e0062f71821d86e731f575a89e"   上一区块哈希值
                    receipts_root: "0x3bcb062f73748493a180ee686b0d861394885a6c07a1eb8e31fdafabf12c9673"
                    state_root: "0xfc503b063e49b3d5644ad5878519ec3240e706acaf072c374d5055ac139288f7"
                    timestamp: 1577972081   区块时间
                    transactions: ["0x0f2bf89cfedc86bbddaec1151a5e727337c02472626f0c41c9fb3d34cf4e8b3c"]    区块含有交易hash
                    transactions_length: 1  区块交易数
                    transactions_root: "0x8f6d2d39de5005ff9d1ca78e616731119f77334592020a7f50a882922ee5cc47"
                }，
                tradeList: [
                    id: "5e4229b91180511868cb2e6a"
                    from: "0xdd26590684a2f8da816a750511e1296e9014fb95"  交易发起方
                    to: "0x226181662dcf24cc7eee0c6d194dc3ee882ce7b0"    交易接收方
                    sharding_flag: 1    交易类型,   0:执行母链交易, 1:执行智能合约, 2:转账原始Token, 3:部署智能合约
                    transaction_hash: "0x0f2bf89cfedc86bbddaec1151a5e727337c02472626f0c41c9fb3d34cf4e8b3c"  交易hash
                    status: true    交易状态, false:失败, true:成功
                ],
                count: 1    区块包含交易数量
			}
		}
```

 #### 获取区块交易数:(GET /api/v1/blocks/get-blocks-trades-count)
```
    参数：

    返回：
		return {
			code: '0',
			data: {
                data:[
                    {
                        blocks: 16132   区块号
                        trades: 0   交易数
                    }
                ]
			}
		}
```

 #### 获取交易列表类型:(GET /api/v1/transactions/get-transactions-list)
```
    参数：
        isLatest: boolean true:返回最新6条数据
        page: number isLatest为false时生效,当前页数
        seq: number  isLatest为false时生效,每页显示多少条
        tradeStart: number(timestamp) 交易开始时间(可选)
        tradeEnd: number(timestamp) 交易结束时间(可选)

    返回：
		return {
			code: '0',
			data: {
                data:[
                    {
                        id: "5e4229b91180511868cb2e6a"
                        block_number: 20136 区块号
                        sharding_flag: 1    交易类型,   0:执行母链交易, 1:执行智能合约, 2:转账原始Token, 3:部署智能合约
                        transaction_hash: "0x0f2bf89cfedc86bbddaec1151a5e727337c02472626f0c41c9fb3d34cf4e8b3c"  交易hash
                        time: 1577972081    交易时间
                        status: true    交易状态, false:失败, true:成功
                    }
                ]
			}
		}
```

 #### 根据交易hash获取交易详情:(GET /api/v1/transactions/get-transaction-detail-by-hash)
```
    参数：
        hash: 交易hash

    返回：
		return {
			code: '0',
			data: {
                id: "5e4229b91180511868cb2e6a"
                block_hash: "0xbb584551ab81bf01e4069d8cf12373146380564d9378bcfa3786a7101d85d4e4"    区块hash
                block_number: 20136 区块号
                from: "0xdd26590684a2f8da816a750511e1296e9014fb95"  交易发起方
                to: "0x226181662dcf24cc7eee0c6d194dc3ee882ce7b0"    交易接收方
                value: 0    成交金额
                input: "0x226181662dcf24…………000000000000d"  数据输入
                nonce: 4052     nonce
                sharding_flag: 1    交易类型,   0:执行母链交易, 1:执行智能合约, 2:转账原始Token, 3:部署智能合约
                transaction_hash: "0x0f2bf89cfedc86bbddaec1151a5e727337c02472626f0c41c9fb3d34cf4e8b3c"  交易hash
                time: 1577972081    交易时间
                contractAddress: "0x0000000000000000000000000000000000000000"   合约地址
                status: true    交易状态, false:失败, true:成功
                logs: [{    日志
                    address: "0x226181662dcf24cc7eee0c6d194dc3ee882ce7b0"   合约地址
                    topics: [{  事件的index参数
                        "0x4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f"
                    }]
                    data: "000000000000000000000000000000000000000000000003e733628714200000"    事件的非index参数
                }]
                logs_length: 2  日志条数
			}
		}
```

 #### 获取交易数:(GET /api/v1/transactions/get-transactions-count)
```
    参数：
        
    返回：
		return {
			code: '0',
			data: {
                data:[{
                    count: 4566 时间成交数
                    time: "2020-01-02"  时间
                }]，
                count: 2
			}
		}
```

 #### 根据地址获取交易列表:(GET /api/v1/get-trade-list-by-address)
```
    参数：
        address: string 钱包地址
        page: number 当前页数
        seq: number  每页显示多少条
        tradeStart: number(timestamp) 交易开始时间(可选)
        tradeEnd: number(timestamp) 交易结束时间(可选)
        tradePartner: string    交易对家(可选)

    返回：
		return {
			code: '0',
			data: {
                trade: [
                    {
                        createdAt: 1581425122318
                        updatedAt: 1581425122318
                        id: "5e42a1e277503c217f075f39"
                        block_hash: "0xd9bf168ae49c35c82c1b3b80335163f02a35d4bb9eb86345f105999856fc06ca"    区块hash
                        block_number: 20633 区块号
                        from: "0xdd26590684a2f8da816a750511e1296e9014fb95"  交易发起方
                        to: "0x226181662dcf24cc7eee0c6d194dc3ee882ce7b0"    交易接收方
                        value: 0    成交金额
                        input: "0x226181662dcf24cc7eee0c6d194…………00000000000000000000000000000000d" 数据输入
                        nonce: 4559 nonce
                        r: "8.229468654577797e+76"
                        s: "4.870041459732801e+76"
                        v: 238
                        sharding_flag: 1    交易类型,   0:执行母链交易, 1:执行智能合约, 2:转账原始Token, 3:部署智能合约
                        transaction_hash: "0x7e57e22bd94cb95025c4dc7f2fed277ff7ce45484da4328e44edc916bff0e7d3"  交易hash
                        transaction_index: 0    
                        logs: [],   日志
                        logs_length: 2, 日志数
                        time: 1577977152    交易时间
                        contractAddress: "0x0000000000000000000000000000000000000000"   合约地址
                        status: true    交易状态
                    }
                ],
                count: 4560 //交易总数 
			}
		}
```

 #### 根据地址获取资产列表:(GET /api/v1/get-asset-list-by-address)
```
    参数：
        address: string    钱包地址
        page: number 当前页数
        seq: number  每页显示多少条

    返回：
		return {
			code: '0',
			data: {
                data: [{
                    createdAt: 1581306548432
                    updatedAt: 1581425122316
                    id: "5e40d2b40e8ab55fd739e843"
                    address: "0xdd26590684a2f8da816a750511e1296e9014fb95"      钱包地址
                    token: "0x226181662dcf24cc7eee0c6d194dc3ee882ce7b0" ERC20合约地址
                    balance: "430488",  余额
                    ERC20: {} ERC20相关数据   
                }]
                count: 1
			}
		}
```

 #### 获取当前应用链数据:(GET /api/v1/get-micro-chain-info)
```
    参数：

    返回：
		return {
			code: '0',
			data: {
                balance: "0xdcc80cd2e4000000"   余额
                blockReward: "0x193a544f14772"  区块奖励
                bondLimit: "0xde0b6b3a7640000"     应用链节点押金
                owner: "0x44c10F4Cd26DBB33B0CC3bD8d9fb4E313498Cfa0" 子链部署者地址
                scsList: ["0x8F1A63cc9f119B6b880512C39939807A4a6D9899", "0x72eCF61030EA379Ca5316977Cf413f8f12F329A5"]   SCS节点地址
                txReward: "0x14aaa9d686"    交易奖励
                viaReward: "0x1f88e962d961be"   接入奖励
                Balance: "15.908979783594148"   余额
                BondLimit: "1"  应用链节点押金
                BlockReward: "0.000443813012260722" 区块奖励
                TxReward: "0.000000088762603142"    交易奖励
                ViaReward: "0.008876260245201342"   接入奖励
			}
		}
```

 #### 判断是否是ERC20:(POST /api/v1/get-is-erc20)
```
    参数：
        address: string 钱包地址

    返回：
		return {
			code: '0',
			data: true  true:是ERC20地址, false:不是ERC20地址
		}
```

 #### 获取ERC20信息:(Get /api/v1/get-erc20-info)
```
    参数：
        address: string 钱包地址

    返回：
		return {
			code: '0',
			data: {
                info: {
                    erc20: 合约地址,
                    symbol: 代号,
                    decimals: 精度,
                }
			}
		}
```

 #### 获取ERC20列表数据:(GET /api/v1/erc20/get-erc20-list)
```
    参数：
        page: number isLatest为false时生效,当前页数
        seq: number  isLatest为false时生效,每页显示多少条
        condition: string ERC20 name/symbol/合约地址(可选)

    返回：
		return {
			code: '0',
			data: {
                data: [{
                    createdAt: 1581301614471
                    updatedAt: 1581301614471
                    id: "5e40bf6e74c97b1ff68366e3"
                    erc20: "0xc83c5a2a9a9f70c5702db89a969e46099d5707b4" erc20合约地址
                    name: "standard erc20 token"    erc20名称
                    symbol: "AAA"   erc20代号
                    decimals: 18    精度
                    totalSupply: "10000000" 发行总量
                    deployer: "0x7a2dc129b3d794e4e8a009c83ffd7a2412f5e326"  部署者地址
                }],
                count: 3
			}
		}
```

 #### 获取ERC20详情:(GET /api/v1/erc20/get-erc20-detail)
```
    参数：
        tokenAddress: string erc20合约地址

    返回：
		return {
			code: '0',
			data: {
                data: {
                    createdAt: 1581301614471
                    updatedAt: 1581301614471
                    id: "5e40bf6e74c97b1ff68366e3"
                    erc20: "0xc83c5a2a9a9f70c5702db89a969e46099d5707b4" erc20合约地址
                    name: "standard erc20 token"    erc20名称
                    symbol: "AAA"   erc20代号
                    decimals: 18    精度
                    totalSupply: "10000000" 发行总量
                    deployer: "0x7a2dc129b3d794e4e8a009c83ffd7a2412f5e326"  部署者地址
                }
			}
		}
```

 #### 获取ERC20持有人列表:(GET /api/v1/erc20/get-erc20-holder-list)
```
    参数：
        tokenAddress: string erc20合约地址

    返回：
		return {
			code: '0',
			data: {
                data: [{
                    createdAt: 1581301652102
                    updatedAt: 1581320867830
                    id: "5e40bf9474c97b1ff68367a2"
                    address: "0x7a2dc129b3d794e4e8a009c83ffd7a2412f5e326"   持有人地址
                    token: "0xc83c5a2a9a9f70c5702db89a969e46099d5707b4" erc20合约地址
                    balance: "9998808.05"   持有数量
                }],
                count: 4
			}
		}
```

 #### 获取ERC20交易列表:(GET /api/v1/erc20/get-erc20-trade-list)
```
    参数：
        tokenAddress: string erc20合约地址
        page: number 当前页数
        seq: number  每页显示多少条

    返回：
		return {
			code: '0',
			data: {
                data: [{
                    id: "5e40bfb974c97b1ff68367fd"
                    block_number: 2167  区块号
                    from: "0x67d97d7a1491e3e4d87821d4a86eb51b0ac0ffda"  交易发起方
                    to: "0xc83c5a2a9a9f70c5702db89a969e46099d5707b4"    交易接收方
                    sharding_flag: 1    交易类型,   0:执行母链交易, 1:执行智能合约, 2:转账原始Token, 3:部署智能合约
                    transaction_hash: "0x4e4e996791d943e4af6d4525645ed6ee124c988590486610d6860ce57591bc67"  交易hash
                    time: 1577788732    交易时间
                    status: true    交易状态
                }],
                count: 4
			}
		}
```


#### SWTC&MOAC开发者社区

项目讨论的QQ群：568285439

Telegram: https://t.me/moacblockchain

提案发起（Submit proposal）： https://github.com/JCCDex/ProjectFundingProposal/issues