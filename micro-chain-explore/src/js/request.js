import api from './api'

/**
 *
 * @param {*} isLatest 获取区块数据，true:首页数据，返回6条；false:获取指定区块数据
 * @param {*} page     当前页数，从0开始
 * @param {*} seq   每页显示条数
 * @param blockStart
 * @param blockEnd
 */
export const getBlocksList = async (isLatest, page, seq, blockStart, blockEnd) => {
    try {
        let res = await api.get_blocks_list(isLatest, page, seq, blockStart, blockEnd);
        if (res.code === '0') {
            return res.data
        }
    } catch (error) {
        return error
    }
}

/**
 *
 * @param {*} isLatest 获取区块数据，true:首页数据，返回6条；false:获取指定区块数据
 * @param {*} page     当前页数，从0开始
 * @param {*} seq   每页显示条数
 * @param tradeStart
 * @param tradeEnd
 */
export const getTransactionsList = async (isLatest, page, seq, tradeStart, tradeEnd) => {
    try {
        let res = await api.get_transactions_list(isLatest, page, seq, tradeStart, tradeEnd);
        if (res.code === '0') {
            return res.data
        }
    } catch (error) {
        return error
    }
}

/**
 * 根据区块hash查询区块详细信息
 * @param  hash 区块hash
 * @param {*} page     当前页数，从0开始
 * @param {*} seq   每页显示条数
 */
export const getBlockDetailByHash = async (hash, page, seq) => {
    try {
        let res = await api.get_block_detail_by_hash(hash, page, seq);
        if (res.code === '0') {
            return res.data
        }
    } catch (error) {
        return error
    }
}

/**
 * 根据区块高度获取区块详情
 * @param  blockNum
 * @param {*} page     当前页数，从0开始
 * @param {*} seq   每页显示条数
 */
export const getBlockDetailByBlockNum = async (blockNum, page, seq) => {
    try {
        let res = await api.get_block_detail_by_block_num(blockNum, page, seq);
        if (res.code === '0') {
            return res.data
        }
    } catch (error) {
        return error
    }
}

/**
 * 根据交易hash查询交易详情
 * @param  hash 交易hash
 */
export const getTradeDetailByHash = async (hash) => {
    try {
        let res = await api.get_trade_detail_by_hash(hash);
        if (res.code === '0') {
            return res.data
        }
    } catch (error) {
        return error
    }
}

/**
 * 获取查询hash类型
 * @param  hash
 */
export const getHashType = async (hash) => {
    try {
        let res = await api.get_hash_type(hash);
        if (res.code === '0') {
            return res.data.type
        }
    } catch (error) {
        return error
    }
}

/**
 * 获取钱包交易列表
 *
 * @param {string} address
 * @param {string} tradePartner
 * @param {number} tradeStart
 * @param {number} tradeEnd
 * @param {number} currentPage
 * @param {number} defaultPageSize
 */
export const getTradeListByAddress = async (address, tradePartner, tradeStart, tradeEnd, currentPage, defaultPageSize) => {
    try {
        let res = await api.get_trade_list_by_address(address, tradePartner, tradeStart, tradeEnd, currentPage, defaultPageSize);
        if (res.code === '0') {
            return res.data
        }
    } catch (error) {
        return error
    }
}

/**
 * 获取钱包资产
 * @param {string} address
 * @param {number} currentPage
 * @param {number} defaultPageSize
 */
export const getAssetListByAddress = async (address, currentPage, defaultPageSize) => {
    try {
        let res = await api.get_asset_list_by_address(address, currentPage, defaultPageSize);
        if (res.code === '0') {
            return res.data
        }
    } catch (error) {
        return error
    }
}

/**
 * 获取子链信息
 */
export const getMicroChainInfo = async () => {
    try {
        let res = await api.get_micro_chain_info();
        if (res.code === '0') {
            return res.data
        }
    } catch (error) {
        return error
    }
}

/**
 * 获取交易数信息
 */
export const getTransactionsCount = async () => {
    try {
        let res = await api.get_transactions_count();
        if (res.code === '0') {
            return res.data
        }
    } catch (error) {
        return error
    }
}

/**
 * 获取区块交易数信息
 */
export const getBlocksTradesCount = async () => {
    try {
        let res = await api.get_blocks_trades_count();
        if (res.code === '0') {
            return res.data
        }
    } catch (error) {
        return error
    }
}

/**
 * 获取是否是ERC20
 */
export const getIsERC20 = async (address) => {
    try {
        let res = await api.get_is_erc20(address);
        if (res.code === '0') {
            return res.data
        }
    } catch (error) {
        return error
    }
}

/**
 * 获取ERC20l列表数据
 * @param {number} page 页数
 * @param {number} seq 每页显示条数
 */
export const getERC20List = async (page, seq, condition) => {
    try {
        let res = await api.get_erc20_list(page, seq, condition);
        if (res.code === '0') {
            return res.data
        }
    } catch (error) {
        return error
    }
}

/**
 * 获取ERC20 Token详细数据
 * @param {string} ERC20Address
 */
export const getERC20DetailByAddress = async (ERC20Address) => {
    try {
        let res = await api.get_erc20_detail(ERC20Address)
        if (res.code === '0') {
            return res.data
        }
    } catch (error) {
        return error
    }
}

/**
 * 获取ERC20 Token交易数据
 * @param {number} page
 * @param {number} seq
 * @param {string} ERC20Address
 */
export const getERC20TradeList = async (page, seq, ERC20Address) => {
    try {
        let res = await api.get_erc20_trade_list(page, seq, ERC20Address)
        if (res.code === '0') {
            return res.data
        }
    } catch (error) {
        return error
    }
}

/**
 * 获取ERC20 Token持有人数据
 * @param {number} page 页数
 * @param {number} seq 每页显示条数
 * @param {string} ERC20Address
 */
export const getERC20HolderList = async (page, seq, ERC20Address) => {
    try {
        let res = await api.get_erc20_holder_list(page, seq, ERC20Address)
        if (res.code === '0') {
            return res.data
        }
    } catch (error) {
        return error
    }
}

/**
 * 获取ERC20信息
 * @param {*} address
 */
export const getERC20Info = async (address) => {
    try {
        let res = await api.get_erc20_info(address);
        if (res.code === '0') {
            return res.data
        }
    } catch (error) {
        return error
    }
}