var axios = window.axios.create();
axios.defaults.baseURL = process.env.BASE_URL;

const api = {
    // 获取区块信息
    get_blocks_list(isLatest, page, seq, blockStart, blockEnd) {
        return new Promise(function (resolve, reject) {
            var url = "/api/v1/blocks/get-blocks-list?isLatest=" + isLatest;
            if (blockStart) {
                url = url + '&blockStart=' + blockStart
            }
            if (blockEnd) {
                url = url + '&blockEnd=' + blockEnd
            }
            url = url + '&page=' + page + '&seq=' + seq
            axios.get(url).then((res) => {
                resolve(res.data)
            }).catch((error) => {
                reject(error)
            })
        })
    },

    // 获取交易信息
    get_transactions_list(isLatest, page, seq, tradeStart, tradeEnd) {
        return new Promise(function (resolve, reject) {
            var url = "/api/v1/transactions/get-transactions-list?isLatest=" + isLatest;
            if (tradeStart) {
                url = url + '&tradeStart=' + tradeStart
            }
            if (tradeEnd) {
                url = url + '&tradeEnd=' + tradeEnd
            }
            url = url + '&page=' + page + '&seq=' + seq
            axios.get(url).then((res) => {
                resolve(res.data)
            }).catch((error) => {
                reject(error)
            })
        })
    },

    // 获取区块详细信息
    get_block_detail_by_hash(hash, page, seq) {
        return new Promise(function (resolve, reject) {
            axios.get("/api/v1/blocks/get-blocks-detail-by-hash?hash=" + hash + '&page=' + page + '&seq=' + seq).then((res) => {
                resolve(res.data)
            }).catch((error) => {
                reject(error)
            })
        })
    },

    get_block_detail_by_block_num(blockNum, page, seq) {
        return new Promise(function (resolve, reject) {
            axios.get("/api/v1/blocks/get-blocks-detail-by-block-num?blockNum=" + blockNum + '&page=' + page + '&seq=' + seq).then((res) => {
                resolve(res.data)
            }).catch((error) => {
                reject(error)
            })
        })
    },

    // 获取交易详情
    get_trade_detail_by_hash(hash) {
        return new Promise(function (resolve, reject) {
            axios.get("/api/v1/transactions/get-transaction-detail-by-hash?hash=" + hash).then((res) => {
                resolve(res.data)
            }).catch((error) => {
                reject(error)
            })
        })
    },

    // 获取hash类型
    get_hash_type(hash) {
        return new Promise(function (resolve, reject) {
            axios.get("/api/v1/get-hash-type?hash=" + hash).then((res) => {
                resolve(res.data)
            }).catch((error) => {
                reject(error)
            })
        })
    },

    // 获取钱包交易详情
    get_trade_list_by_address(address, tradePartner, tradeStart, tradeEnd, page, seq) {
        return new Promise(function (resolve, reject) {
            var url = "/api/v1/get-trade-list-by-address?address=" + address;
            if (tradePartner) {
                url = url + '&tradePartner=' + tradePartner
            }
            if (tradeStart) {
                url = url + '&tradeStart=' + tradeStart
            }
            if (tradeEnd) {
                url = url + '&tradeEnd=' + tradeEnd
            }
            url = url + '&page=' + page + '&seq=' + seq
            axios.get(url).then((res) => {
                resolve(res.data)
            }).catch((error) => {
                reject(error)
            })
        })
    },

    // 获取钱包资产
    get_asset_list_by_address(address, page, seq) {
        return new Promise(function (resolve, reject) {
            axios.get("/api/v1/get-asset-list-by-address?address=" + address + '&page=' + page + '&seq=' + seq).then((res) => {
                resolve(res.data)
            }).catch((error) => {
                reject(error)
            })
        })
    },

    // 获取子链信息
    get_micro_chain_info() {
        return new Promise(function (resolve, reject) {
            axios.get("/api/v1/get-micro-chain-info").then((res) => {
                resolve(res.data)
            }).catch((error) => {
                reject(error)
            })
        })
    },

    // 获取交易数信息
    get_transactions_count() {
        return new Promise(function (resolve, reject) {
            axios.get("/api/v1/transactions/get-transactions-count").then((res) => {
                resolve(res.data)
            }).catch((error) => {
                reject(error)
            })
        })
    },

    // 获取区块交易数信息
    get_blocks_trades_count() {
        return new Promise(function (resolve, reject) {
            axios.get("/api/v1/blocks/get-blocks-trades-count").then((res) => {
                resolve(res.data)
            }).catch((error) => {
                reject(error)
            })
        })
    },

    // 获取是否是ERC20
    get_is_erc20(address) {
        return new Promise(function (resolve, reject) {
            axios.post("/api/v1/get-is-erc20", {
                address: address
            }).then((res) => {
                resolve(res.data)
            }).catch((error) => {
                reject(error)
            })
        })
    },

    // 获取erc20列表数据
    get_erc20_list(page, seq, condition) {
        return new Promise(function (resolve, reject) {
            let url = "/api/v1/erc20/get-erc20-list?page=" + page + "&seq=" + seq
            if (condition) {
                url = url + "&condition=" + condition
            }
            axios.get(url).then((res) => {
                resolve(res.data)
            }).catch((error) => {
                reject(error)
            })
        })
    },

    // 获取ERC20 Token详细数据
    get_erc20_detail(ERC20Address) {
        return new Promise(function (resolve, reject) {
            axios.get("/api/v1/erc20/get-erc20-detail?tokenAddress=" + ERC20Address).then((res) => {
                resolve(res.data)
            }).catch((error) => {
                reject(error)
            })
        })
    },

    // 获取ERC20交易记录
    get_erc20_trade_list(page, seq, ERC20Address) {
        return new Promise(function (resolve, reject) {
            axios.get("/api/v1/erc20/get-erc20-trade-list?page=" + page + "&seq=" + seq + "&tokenAddress=" + ERC20Address).then((res) => {
                resolve(res.data)
            }).catch((error) => {
                reject(error)
            })
        })
    },

    // 获取ERC20 Token持有列表
    get_erc20_holder_list(page, seq, ERC20Address) {
        return new Promise(function (resolve, reject) {
            axios.get("/api/v1/erc20/get-erc20-holder-list?page=" + page + "&seq=" + seq + "&tokenAddress=" + ERC20Address).then((res) => {
                resolve(res.data)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    // 获取ERC20信息
    get_erc20_info(address) {
        return new Promise(function (resolve, reject) {
            axios.get("/api/v1/get-erc20-info?address=" + address).then((res) => {
                resolve(res.data)
            }).catch((error) => {
                reject(error)
            })
        })
    }

}
export default api;