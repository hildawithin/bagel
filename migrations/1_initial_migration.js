var Migrations = artifacts.require("./Migrations.sol");
var Bagel = artifacts.require("./Bagel.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Bagel, 10000);
};
