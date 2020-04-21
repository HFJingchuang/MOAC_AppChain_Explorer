const Chain3 = require('chain3');
const BigNumber = require('bignumber.js');
const abiDecoder = require('abi-decoder');
const Web3EthAbi = require('web3-eth-abi');
const axios = require("axios");
var fetch = axios.create({ headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } });

abiDecoder.addABI(JSON.parse(sails.config.custom.ASM_MICRO_CHAIN_ABI));
abiDecoder.addABI(JSON.parse(sails.config.custom.DAPP_BASE_ABI));
abiDecoder.addABI(JSON.parse(sails.config.custom.ERC20ABI));

var chain3 = new Chain3()
exports.chain3 = chain3

exports._return = function (msg, result) {
    return { code: msg.code, data: result, msg: msg.msg }
}

// 判断是否是ERC20
exports.isERC20 = async function (dappAddr) {
    try {
        let name = await getName(dappAddr);
        let symbol = await getSymbol(dappAddr);
        let decimals = await getDecimals(dappAddr);
        let _totalSupply = await getTotalSupply(dappAddr);
        let totalSupply = new BigNumber(_totalSupply).div(10 ** decimals).toString();
        if (name && symbol && decimals) {
            return { name: name, symbol: symbol, decimals: decimals, totalSupply: totalSupply }
        }
        return
    } catch (error) {
        console.log(error)
    }
}

// 获取零点时间戳
exports.getZeroTime = async function (t) {
    try {
        let unixtime = t * 1000;
        let unixTimestamp = new Date(unixtime);
        let Y = unixTimestamp.getFullYear();
        let M =
            unixTimestamp.getMonth() + 1 >= 10
                ? unixTimestamp.getMonth() + 1
                : '0' + (unixTimestamp.getMonth() + 1);
        let D =
            unixTimestamp.getDate() >= 10
                ? unixTimestamp.getDate()
                : '0' + unixTimestamp.getDate();
        let toDay = Y + '-' + M + '-' + D;
        return new BigNumber(new Date(toDay).getTime() - 28800000).div(1000).toNumber();
    } catch (error) {
        console.log(error)
    }
}

exports.addWalletFromInput = async (tx) => {
    try {
        var wallets = new Set();
        var input = tx.input;
        var to = tx.to;
        var abi;
        wallets.add(tx.from);
        wallets.add(to);
        if (tx.sharding_flag === 1) {
            let encode;
            if (to.toLowerCase() === sails.config.custom.microChain.toLowerCase()) {
                encode = input;
            } else if (to.toLowerCase() === sails.config.custom.dappBase.toLowerCase()) {
                encode = '0x' + input.slice(42);
            } else {
                encode = '0x' + input.slice(42);
                abi = await getDappABI(to);
                if (abi) {
                    abiDecoder.addABI(JSON.parse(abi));
                } else {
                    let count = await ERC20.count({ erc20: to });
                    if (count != 1) {
                        return
                    }
                }
            }
            let decodedData = abiDecoder.decodeMethod(encode);
            if (decodedData) {
                let params = decodedData['params'];
                let address = _.filter(params, (param) => {
                    return param.type === 'address' || param.type === 'address[]'
                });
                for (let i = 0, length = address.length; i < length; i++) {
                    let wallet = address[i]['value'];
                    if (Array.isArray(wallet)) {
                        for (let i = 0, length = wallet.length; i < length; i++) {
                            wallets.add(wallet[i])
                        }
                    } else {
                        wallets.add(wallet)
                    }
                }
            }
        }
        for (let address of wallets) {
            let isHas = await Wallet.count({ address: address })
            if (isHas == 0) {
                await Wallet.create({ address: address })
            }
        }
        if (abi) {
            abiDecoder.removeABI(JSON.parse(abi));
        }
    } catch (error) {
        sails.log.error(error)
    }
};

exports.getBalance = async (address, token, decimals) => {
    var data = chain3.sha3('balanceOf(address)').substr(0, 10)
        + chain3.encodeParams(['address'], [address]);
    let params = JSON.stringify({ "jsonrpc": "2.0", "method": "scs_directCall", "params": [{ "to": sails.config.custom.microChain, "dappAddr": token, "data": data }], "id": Math.floor((Math.random() * 100) + 1) })
    let response = await fetch.post(sails.config.custom.scsUri, params);
    let res = Web3EthAbi.decodeParameter('uint256', response.data.result);
    let balance = new BigNumber(res).div(10 ** decimals).toNumber();
    let count = await Wallet.count({ address: address, token: token });
    if (count == 0) {
        await Wallet.create({ address: address, token: token, balance: balance });
    } else {
        await Wallet.update({ address: address, token: token }).set({ token: token, balance: balance });
    }
}

const getName = async (token) => {
    var data = chain3.sha3('name()').substr(0, 10);
    let params = JSON.stringify({ "jsonrpc": "2.0", "method": "scs_directCall", "params": [{ "to": sails.config.custom.microChain, "dappAddr": token, "data": data }], "id": Math.floor((Math.random() * 100) + 1) })
    let response = await fetch.post(sails.config.custom.scsUri, params);
    if (!response.data.result) {
        return
    }
    let name = Web3EthAbi.decodeParameter('string', response.data.result);
    return name;
}

const getSymbol = async (token) => {
    var data = chain3.sha3('symbol()').substr(0, 10);
    let params = JSON.stringify({ "jsonrpc": "2.0", "method": "scs_directCall", "params": [{ "to": sails.config.custom.microChain, "dappAddr": token, "data": data }], "id": Math.floor((Math.random() * 100) + 1) })
    let response = await fetch.post(sails.config.custom.scsUri, params);
    if (!response.data.result) {
        return
    }
    let symbol = Web3EthAbi.decodeParameter('string', response.data.result);
    return symbol;
}

const getDecimals = async (token) => {
    var data = chain3.sha3('decimals()').substr(0, 10);
    let params = JSON.stringify({ "jsonrpc": "2.0", "method": "scs_directCall", "params": [{ "to": sails.config.custom.microChain, "dappAddr": token, "data": data }], "id": Math.floor((Math.random() * 100) + 1) })
    let response = await fetch.post(sails.config.custom.scsUri, params);
    if (!response.data.result) {
        return
    }
    let decimals = Web3EthAbi.decodeParameter('uint8', response.data.result);
    return decimals;
}

const getTotalSupply = async (token) => {
    var data = chain3.sha3('totalSupply()').substr(0, 10);
    let params = JSON.stringify({ "jsonrpc": "2.0", "method": "scs_directCall", "params": [{ "to": sails.config.custom.microChain, "dappAddr": token, "data": data }], "id": Math.floor((Math.random() * 100) + 1) })
    let response = await fetch.post(sails.config.custom.scsUri, params);
    if (!response.data.result) {
        return
    }
    let totalSupply = Web3EthAbi.decodeParameter('uint256', response.data.result);
    return totalSupply;
}

exports.getReceiptByHash = async function (txHash) {
    let params = JSON.stringify({ "jsonrpc": "2.0", "method": "scs_getReceiptByHash", "params": [sails.config.custom.microChain, txHash], "id": Math.floor((Math.random() * 100) + 1) })
    let response = await fetch.post(sails.config.custom.scsUri, params);
    return response.data.result;
}

exports.getTransaction = async function (txHash) {
    let params = JSON.stringify({ "jsonrpc": "2.0", "method": "scs_getTransactionByHash", "params": [sails.config.custom.microChain, txHash], "id": Math.floor((Math.random() * 100) + 1) })
    let response = await fetch.post(sails.config.custom.scsUri, params);
    return response.data.result;
}

exports.getBlocks = async function (blockNum) {
    let params = JSON.stringify({ "jsonrpc": "2.0", "method": "scs_getBlock", "params": [sails.config.custom.microChain, chain3.toHex(blockNum)], "id": Math.floor((Math.random() * 100) + 1) })
    let response = await fetch.post(sails.config.custom.scsUri, params);
    return response.data.result;
}

exports.getBlockNumer = async function () {
    let params = JSON.stringify({ "jsonrpc": "2.0", "method": "scs_getBlockNumber", "params": [sails.config.custom.microChain], "id": Math.floor((Math.random() * 100) + 1) })
    let response = await fetch.post(sails.config.custom.scsUri, params);
    return chain3.toDecimal(response.data.result);
}

exports.getDappAddrList = async function () {
    let params = JSON.stringify({ "jsonrpc": "2.0", "method": "scs_getDappAddrList", "params": [sails.config.custom.microChain], "id": Math.floor((Math.random() * 100) + 1) })
    let response = await fetch.post(sails.config.custom.scsUri, params);
    return response.data.result;
}

exports.getMicroChainInfo = async function () {
    let params = JSON.stringify({ "jsonrpc": "2.0", "method": "scs_getMicroChainInfo", "params": [sails.config.custom.microChain], "id": Math.floor((Math.random() * 100) + 1) })
    let response = await fetch.post(sails.config.custom.scsUri, params);
    return response.data.result;
}

const getDappABI = async (dapp) => {
    return new Promise((resolve, reject) => {
        let data = "0x21e0d2d4000000000000000000000000" + dapp.substr(2);
        let params = JSON.stringify({ "jsonrpc": "2.0", "method": "scs_directCall", "params": [{ "to": sails.config.custom.microChain, "dappAddr": sails.config.custom.dappBase, "data": data }], "id": Math.floor((Math.random() * 100) + 1) })
        fetch.post(sails.config.custom.scsUri, params).then(function (response) {
            let abi = Web3EthAbi.decodeParameter('string', response.data.result);
            resolve(abi);
        }).catch(function (error) {
            reject(error);
        });
    })
}