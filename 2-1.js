var Bagel = artifacts.require("./Bagel.sol");
// const Web3 = require('web3')
// const web3 = new Web3('https://rinkeby.infura.io/v3/d480e44fa4824ab881c3c940ad00dc17')

module.exports = async function() {
  var contractAddress = Bagel.address;
  // var bagelAbi = [{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x18160ddd"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x8da5cb5b"},{"constant":true,"inputs":[],"name":"remainingSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xda0239a6"},{"inputs":[{"name":"_initialSupply","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor","signature":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"string"},{"indexed":false,"name":"to","type":"string"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"data","type":"bytes"}],"name":"Transfer","type":"event","signature":"0xe8cca054678291c72a36fdd68416aea936e6b2720caa266fa5070fbae858d191"},{"constant":false,"inputs":[{"name":"myName","type":"string"}],"name":"registerMe","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function","signature":"0x218add39"},{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"num","type":"uint256"}],"name":"claimBagel","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function","signature":"0x198e8b1f"},{"constant":true,"inputs":[{"name":"name","type":"string"},{"name":"addr","type":"address"}],"name":"isRegistered","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xbd290b81"},{"constant":true,"inputs":[{"name":"who","type":"string"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x35ee5f87"},{"constant":false,"inputs":[{"name":"from","type":"string"},{"name":"to","type":"string"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x9b80b050"},{"constant":false,"inputs":[{"name":"from","type":"string"},{"name":"to","type":"string"},{"name":"value","type":"uint256"},{"name":"data","type":"bytes"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xacbae75e"}];
  // let contract = new web3.eth.Contract(bagelAbi,contractAddress);

  var blockNum = web3.eth.getBlockNumber();
  console.log(blockNum);
  for (var blockId = blockNum; blockId >= 4070279; blockId--) {
    var block = await web3.eth.getBlock(blockId);
    // get the transactions in this block
    var txNum = block.transactions.length;
    for (var txId = txNum - 1; txId >= 0; txId--) {
      var tx = await web3.eth.getTransactionFromBlock(blockId,txId);
      if (tx.to == contractAddress) {
        console.log(tx.hash);
      };
    };
  };
  // web3.eth.get
  // logs = await web3.eth.getPastLogs({
  // 	fromBlock: 4070279,
  // 	toBlock: 'latest'
  // });
  // for (var i = logs.length - 1; i >= 0; i--) {
  // 	console.log(logs[i].transactionHash);
  // }
  // retrieve all events
 // contract.getPastEvents('allEvents', {
 //   fromBlock: 4070279,
 //   toBlock: 'latest'
 //   }, (error, events) => {console.log(events);}).then((events) => {
 //     	console.log(events)
 // });
}
