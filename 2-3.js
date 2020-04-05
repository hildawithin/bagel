var Bagel = artifacts.require("./Bagel.sol");
//const Web3 = require('web3')
//const web3 = new Web3('https://rinkeby.infura.io/v3/d480e44fa4824ab881c3c940ad00dc17')

module.exports = async function() {
    var accounts = await web3.eth.getAccounts();
    var contractAddress = Bagel.address;
    var bagelAbi = [{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x18160ddd"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x8da5cb5b"},{"constant":true,"inputs":[],"name":"remainingSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xda0239a6"},{"inputs":[{"name":"_initialSupply","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor","signature":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"string"},{"indexed":false,"name":"to","type":"string"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"data","type":"bytes"}],"name":"Transfer","type":"event","signature":"0xe8cca054678291c72a36fdd68416aea936e6b2720caa266fa5070fbae858d191"},{"constant":false,"inputs":[{"name":"myName","type":"string"}],"name":"registerMe","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function","signature":"0x218add39"},{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"num","type":"uint256"}],"name":"claimBagel","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function","signature":"0x198e8b1f"},{"constant":true,"inputs":[{"name":"name","type":"string"},{"name":"addr","type":"address"}],"name":"isRegistered","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xbd290b81"},{"constant":true,"inputs":[{"name":"who","type":"string"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x35ee5f87"},{"constant":false,"inputs":[{"name":"from","type":"string"},{"name":"to","type":"string"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x9b80b050"},{"constant":false,"inputs":[{"name":"from","type":"string"},{"name":"to","type":"string"},{"name":"value","type":"uint256"},{"name":"data","type":"bytes"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xacbae75e"}];
    var contract = new web3.eth.Contract(bagelAbi, contractAddress); //,{from: accounts[1]}
    // console.log(contractAddress);
    // console.log(accounts);
    // contract.methods.registerMe('brownale').estimateGas({from: accounts[1]}).then(function(gasAmount) {
    //   console.log('Fuction registerMe: ' + gasAmount);
    // }).catch(function(error) {
    //   console.log(error);
    // });
    
    // contract.methods.registerMe('paleale').estimateGas().then(function(gasAmount) {
    //   console.log('Fuction registerMe: ' + gasAmount);
    // }).catch(function(error) {
    //   console.log(error);
    // });

    // contract.methods.claimBagel('brownale',10).estimateGas({from: accounts[1], value: 100000000000000000}).then(function(gasAmount) {
    //   console.log('Fuction claimBagel: ' + gasAmount);
    // }).catch(function(error) {
    //   console.log(error);
    // });

    contract.methods.claimBagel('paleale',10).estimateGas({from: accounts[2], value: 100000000000000000}).then(function(gasAmount) {
      console.log('Fuction claimBagel: ' + gasAmount);
      console.log('Function claimBagel actually costs around 50000 gas.');
    }).catch(function(error) {
      console.log(error);
    });

    contract.methods.isRegistered('brownale', accounts[1]).estimateGas().then(function(gasAmount) {
      console.log('Fuction isRegistered: ' + gasAmount);
    }).catch(function(error) {
      console.log(error);
    });

    contract.methods.balanceOf('brownale').estimateGas().then(function(gasAmount) {
      console.log('Fuction balanceOf: ' + gasAmount);
      console.log('Function balanceOf actually costs 0 gas.');
    }).catch(function(error) {
      console.log(error);
    });

    contract.methods.transfer('brownale', 'paleale', 5).estimateGas({from: accounts[1]}).then(function(gasAmount) {
      console.log('Fuction transfer: ' + gasAmount);
    }).catch(function(error) {
      console.log(error);
    });
}