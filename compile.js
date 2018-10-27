// path模块
const path = require('path');
// fs模块
const fs = require('fs');
// solidity编译器
const solc = require('solc');

// 1.拿到智能合约的路径
const srcpath = path.resolve(__dirname, "contracts", "Lottery.sol");
// 2.读取路径相对应的文件
const source = fs.readFileSync(srcpath, "utf-8");
// 3.编译智能合约
const result = solc.compile(source, 1);

// 暴露出编译结果
module.exports = result.contracts[":Lottery"];