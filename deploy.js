// 部署智能合约到rinkeby网络

var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = " "; // 12 word mnemonic
var provider = new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/5ef7294dd7814d2c8d1388d607ac25ee");
// 获得 web3 的sdk
const Web3 = require("web3");
const web3 = new Web3(provider);
// 获得编译后的 interface(ABI) 和 bytecode(二进制数据)
const {interface, bytecode} = require("./compile");

deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log("管理员的地址: " + accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: bytecode,
        }).send({
            from: accounts[0],
            gas: 1000000
        });
    console.log("部署到的地址: " + result.options.address);
    console.log("ABI: ");
    console.log(interface);
};

deploy();