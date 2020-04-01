import { getERC20Info } from './request'
const abiDecoder = require('abi-decoder');
const chain3 = require('../../node_modules/chain3/lib//utils/utils');
const _sha3 = require('../../node_modules/chain3/lib/utils/sha3');
const BigNumber = require('bignumber.js');
const Web3EthAbi = require('web3-eth-abi');
const axios = window.axios.create({ headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } });
abiDecoder.addABI(process.env.ERC20_ABI);

const sha3 = function (string, options) {
    return '0x' + _sha3(string, options);
};

export const formatTime = (t) => {
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
    let H = unixTimestamp.getHours();
    let mm = unixTimestamp.getMinutes();
    let ss = unixTimestamp.getSeconds();
    if (mm < 10) {
        mm = '0' + mm;
    }
    if (ss < 10) {
        ss = '0' + ss;
    }
    let toDay = Y + '-' + M + '-' + D + '  ' + H + ':' + mm + ":" + ss;
    return toDay;
};

export const formatDate = (t) => {
    let unixTimestamp = new Date(t);
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
    return toDay;
};

export const decodeInput = async (input, to, flag) => {
    try {
        let encode;
        if (to.toLowerCase() === process.env.MICRO_CHAIN.toLowerCase()) {
            if (flag === 2) {
                encode = input.slice(42);
                return { memo: Buffer.from(encode, 'hex').toString() };
            } else {
                abiDecoder.addABI(process.env.ASM_MICRO_CHAIN_ABI);
                encode = input;
            }
        } else if (to.toLowerCase() === process.env.DAPP_BASE_ADDR.toLowerCase()) {
            abiDecoder.addABI(process.env.DAPP_BASE_ABI);
            encode = '0x' + input.slice(42);
        } else {
            encode = '0x' + input.slice(42);
            let abi = await getDappABI(to);
            if (abi) {
                abiDecoder.addABI(JSON.parse(abi));
            }
        }
        let decodedData = abiDecoder.decodeMethod(encode);
        if (decodedData) {
            let functionName = decodedData['name'];
            let decode = 'Function:' + functionName + '\n';

            let functionCall = { type: 'function' };
            functionCall['name'] = functionName;
            let inputs = [];
            let values = [];
            let params = decodedData['params'];
            for (var i = 0, length = params.length; i < length; i++) {
                let name = params[i]['name'];
                let type = params[i]['type'];
                let value = params[i]['value'];
                inputs.push({
                    name: name,
                    type: type
                })
                values.push(value)
                decode = decode + name + ":" + value + '\n'
            }
            functionCall['inputs'] = inputs;
            let callCode = Web3EthAbi.encodeFunctionCall(functionCall, values);
            let functionLength = callCode.length;
            if (encode.length > functionLength) {
                let memo = Buffer.from(encode.slice(functionLength), 'hex').toString();
                return { decode: decode, memo: memo };
            }
            return { decode: decode };
        }
    } catch (error) {
        console.log(error)
    }
};

export const calculatePercentage = (quantity, total) => {
    if (quantity === 0) {
        return "0%"
    }
    let percentage = (parseFloat(quantity) / parseFloat(total) * 100).toFixed(6)
    if (parseFloat(percentage) === 0) {
        return "0%"
    }
    return percentage + "%"
}

export const decodeLogs = async (logs) => {
    try {
        let transfer = [];
        for (let i = 0, length = logs.length; i < length; i++) {
            let topics = logs[i].topics;
            let token = logs[i].address;
            if (topics[0] === process.env.TRANSFER_SHA) {
                let res = await getERC20Info(token);
                transfer.push({
                    from: '0x' + topics[1].slice(26),
                    to: '0x' + topics[2].slice(26),
                    value: new BigNumber(chain3.toDecimal('0x' + logs[i].data)).div(10 ** res.info.decimals).toString(),
                    token: token,
                    symbol: res.info.symbol
                })
            }
        }
        return transfer
    } catch (error) {
        console.log(error)
    }
};

export const browser = {
    versions: (function () {
        let u = navigator.userAgent;
        return {
            trident: u.indexOf('Trident') > -1, // IE内核
            presto: u.indexOf('Presto') > -1, // opera内核
            webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // android终端
            iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, // 是否iPad
            webApp: u.indexOf('Safari') === -1, // 是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, // 是否微信 （2015-01-22新增）
            qq: u.match(/\sQQ/i) === " qq" // 是否QQ
        };
    })(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};

export const getTotalSupply = async (token, decimals) => {
    return new Promise((resolve, reject) => {
        let data = sha3('totalSupply()').substr(0, 10);
        let params = JSON.stringify({ "jsonrpc": "2.0", "method": "scs_directCall", "params": [{ "to": process.env.MICRO_CHAIN, "dappAddr": token, "data": data }], "id": Math.floor((Math.random() * 100) + 1) })
        axios.post(process.env.SCS_URI, params).then(function (response) {
            let res = Web3EthAbi.decodeParameter('uint256', response.data.result);
            let totalSupply = new BigNumber(res).div(10 ** decimals).toNumber();
            resolve(totalSupply);
        }).catch(function (error) {
            reject(error);
        });
    })
}

export const getDappABI = async (dapp) => {
    return new Promise((resolve, reject) => {
        let data = "0x21e0d2d4000000000000000000000000" + dapp.substr(2);
        let params = JSON.stringify({ "jsonrpc": "2.0", "method": "scs_directCall", "params": [{ "to": process.env.MICRO_CHAIN, "dappAddr": process.env.DAPP_BASE_ADDR, "data": data }], "id": Math.floor((Math.random() * 100) + 1) })
        axios.post(process.env.SCS_URI, params).then(function (response) {
            let abi = Web3EthAbi.decodeParameter('string', response.data.result);
            resolve(abi);
        }).catch(function (error) {
            reject(error);
        });
    })
}

export const getTotalOperation = async () => {
    return new Promise((resolve, reject) => {
        let params = JSON.stringify({ "jsonrpc": "2.0", "method": "mc_call", "params": [{ "to": process.env.MICRO_CHAIN, "data": "0xfae67d40" }, "latest"], "id": Math.floor((Math.random() * 100) + 1) })
        axios.post(process.env.VNODE_URI, params).then(function (response) {
            let totalOperation = Web3EthAbi.decodeParameter('uint256', response.data.result);
            resolve(chain3.fromSha(totalOperation.toString()));
        }).catch(function (error) {
            reject(error);
        });
    })
}

export const getFlushStatus = async () => {
    return new Promise((resolve, reject) => {
        let params = JSON.stringify({ "jsonrpc": "2.0", "method": "mc_call", "params": [{ "to": process.env.MICRO_CHAIN, "data": "0xab3c7d87" }, "latest"], "id": Math.floor((Math.random() * 100) + 1) })
        axios.post(process.env.VNODE_URI, params).then(function (response) {
            let status = Web3EthAbi.decodeParameter('bool', response.data.result);
            resolve(status);
        }).catch(function (error) {
            reject(error);
        });
    })
}

export const formatShadingFlag = (flag) => {
    if (flag === 0) {
        return "message.sharding_flg0"
    } else if (flag === 1) {
        return "message.sharding_flg1"
    } else if (flag === 2) {
        return "message.sharding_flg2"
    } else if (flag === 3) {
        return "message.sharding_flg3"
    }
}

export const formatStatus = (status) => {
    if (status) {
        return "message.success"
    } else {
        return "message.fail"
    }
}

export { chain3 }