// 使用 web3 1.0 的版本
import Web3 from "web3";
// 插入 0.0.2 版本 web3 里的 provider
const web3 = new Web3(window.web3.currentProvider);
export default web3;