pragma solidity ^0.4.17;

contract Lottery {

    // 管理员
    address public manager;

    // 彩民池--所有购买彩票的人
    address[] public players;

    // 中奖者
    address public winner;

    // 构造函数
    function Lottery() public {
        manager = msg.sender;
    }

    // 返回管理员
    function getManager() public view returns (address) {
        return manager;
    }

    // 返回彩民池
    function getAllPlayers() public view returns (address[]){
        return players;
    }

    // 投注彩票
    function enter() public payable {
        require(msg.value == 1 ether);
        players.push(msg.sender);
    }

    // 获取奖金池里面的余额
    function getBalance() public view returns (uint) {
        return this.balance;
    }

    // 利用block.difficult, now, players得到随机数
    function random() private view returns (uint){
        return uint(keccak256(block.difficulty, now, players));
    }

    // 要求调用者必须是管理员的函数修饰符
    modifier onlyManager(){
        require(msg.sender == manager);
        _;
    }

    // 开奖
    function pickWinner() public onlyManager{
        // 利用random得到随机的坐标
        uint index = random() % players.length;
        // 确定中奖的人
        winner = players[index];
        // 开奖后把彩民池清空
        players = new address[](0);
        // 把奖金池余额发送给中奖者
        winner.transfer(this.balance);
    }

    // 退款
    function refund() onlyManager public {
        for (uint i = 0; i < players.length; i++) {
            // 每人退还0.1ether
            players[i].transfer(1 ether);
        }
        // 退款后把彩民池清空
        players = new address[](0);
    }
}