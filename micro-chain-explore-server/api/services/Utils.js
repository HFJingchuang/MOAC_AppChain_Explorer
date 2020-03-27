const Chain3 = require('chain3')
const BigNumber = require('bignumber.js')
const abiDecoder = require('abi-decoder');
const request = require('request');
const Web3EthAbi = require('web3-eth-abi');
const axios = require("axios");
var fetch = axios.create({ headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } });

abiDecoder.addABI(JSON.parse(sails.config.custom.ASM_MICRO_CHAIN_ABI));
abiDecoder.addABI(JSON.parse(sails.config.custom.DAPP_BASE_ABI));
abiDecoder.addABI(JSON.parse(sails.config.custom.ERC20ABI));

var chain3 = new Chain3()
chain3.setProvider(new chain3.providers.HttpProvider(sails.config.custom.vnodeUri))
chain3.setScsProvider(new chain3.providers.HttpProvider(sails.config.custom.scsUri))
var mcObject = chain3.microchain();
var dappBase = mcObject.getDapp(sails.config.custom.microChain, JSON.parse(sails.config.custom.DAPP_BASE_ABI), sails.config.custom.dappBase);

exports.chain3 = chain3

exports._return = function (msg, result) {
    return { code: msg.code, data: result, msg: msg.msg }
}

// 判断是否是ERC20
exports.isERC20 = function (dappAddr) {
    try {
        let tokenContract = mcObject.getDapp(sails.config.custom.microChain, JSON.parse(sails.config.custom.ERC20ABI), dappAddr);
        let name = tokenContract.name();
        let symbol = tokenContract.symbol();
        let decimals = tokenContract.decimals().toNumber();
        let totalSupply = new BigNumber(tokenContract.totalSupply()).div(10 ** decimals).toString();
        return { name: name, symbol: symbol, decimals: decimals, totalSupply: totalSupply }
    } catch (error) {
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
                abi = dappBase.getDappABI(to);
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
    var options = {
        'method': 'POST',
        'url': sails.config.custom.scsUri,
        'headers': {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ "jsonrpc": "2.0", "method": "scs_directCall", "params": [{ "to": sails.config.custom.microChain, "dappAddr": token, "data": data }], "id": 101 })

    };
    return new Promise((resolve, reject) => {
        request(options, async function (error, response) {
            if (error) reject(error);
            let result = JSON.parse(response.body).result;
            let res = Web3EthAbi.decodeParameter('uint256', result);
            let balance = new BigNumber(res).div(10 ** decimals).toNumber();
            let count = await Wallet.count({ address: address, token: token });
            if (count == 0) {
                await Wallet.create({ address: address, token: token, balance: balance });
            } else {
                await Wallet.update({ address: address, token: token }).set({ token: token, balance: balance });
            }
            resolve();
        });
    })
}

exports.getReceiptByHash = async function (txHash) {
    let params = JSON.stringify({ "jsonrpc": "2.0", "method": "scs_getReceiptByHash", "params": [sails.config.custom.microChain, txHash], "id": 101 })
    let response = await fetch.post(sails.config.custom.scsUri, params);
    return response.data.result;
}

exports.getTransaction = async function (txHash) {
    let params = JSON.stringify({ "jsonrpc": "2.0", "method": "scs_getTransactionByHash", "params": [sails.config.custom.microChain, txHash], "id": 101 })
    let response = await fetch.post(sails.config.custom.scsUri, params);
    return response.data.result;
}

exports.getBlocks = async function (blockNum) {
    let params = JSON.stringify({ "jsonrpc": "2.0", "method": "scs_getBlock", "params": [sails.config.custom.microChain, chain3.toHex(blockNum)], "id": 101 })
    let response = await fetch.post(sails.config.custom.scsUri, params);
    return response.data.result;
}

exports.getBlockNumer = async function () {
    let params = JSON.stringify({ "jsonrpc": "2.0", "method": "scs_getBlockNumber", "params": [sails.config.custom.microChain], "id": 101 })
    let response = await fetch.post(sails.config.custom.scsUri, params);
    return chain3.toDecimal(response.data.result);
}