var Bagel = artifacts.require("./Bagel.sol");
// in console: accounts = await web3.eth.getAccounts()
// Bagel.deployed().then((inst)=>{app=inst;})

contract('Bagel', function(accounts) {
  var tokenInstance;

  // initialization: this part is not implemented in this version of Bagel, and not used in test
/*  it('initializes the contract with the correct values', function() {
    return Bagel.deployed().then(function(instance) {
      tokenInstance = instance;
      return tokenInstance.name();
    }).then(function(name) {
      assert.equal(name, '', 'has the correct name');
      return tokenInstance.symbol();
    }).then(function(symbol) {
      assert.equal(symbol, '', 'has the correct symbol');
      return tokenInstance.owner();
    }).then(function(owner) {
      assert.equal(owner, '0x', 'has the correct owner');
    });
  })
*/  
  it('allocates the initial supply upon deployment', function() {
    return Bagel.deployed().then(function(instance) {
      tokenInstance = instance;
      return tokenInstance.totalSupply();
    }).then(function(totalSupply) {
      assert.equal(totalSupply.toNumber(), 10000, 'sets the total supply to 10,000');
      return tokenInstance.remainingSupply();
    }).then(function(remainingSupply) {
      assert.equal(remainingSupply.toNumber(), 10000, 'it allocates the initial supply to the admin account');
    });
  });

  it('register new accounts avoiding same name for different addresses', function() {
    return Bagel.deployed().then(function(instance) {
      tokenInstance = instance;
      return tokenInstance.registerMe.call('brownale',{from: accounts[1]});
    }).then(function(success) {
      assert.equal(success, true, 'it returns true');
      return tokenInstance.registerMe('brownale',{from: accounts[1]});
    }).then(function() {
      return tokenInstance.registerMe.call('brownale', {from: accounts[2]});
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
      return tokenInstance.registerMe.call('paleale', {from: accounts[2]});
    }).then(function(success) {
      assert.equal(success, true, 'it returns true');
      return tokenInstance.registerMe('paleale', {from: accounts[2]});
    }).then(function() {
    //   return tokenInstance.remainingSupply();
    // }).then(function(remainingSupply) {
    //   assert.equal(remainingSupply.toNumber(), 9980, 'it allocates 20 to two registered accounts')
      return tokenInstance.isRegistered('paleale', accounts[2]);
    }).then(function(success) {
      assert.equal(success, true, 'it returns true');
    });
  });

  it('claims Bagel for registered users with matching ether amount', function() {
    return Bagel.deployed().then(function(instance) {
      tokenInstance = instance;t
      return tokenInstance.claimBagel.call('brownale', 10, {from: accounts[1], value: 110000000000000000});
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
      return tokenInstance.claimBagel('brownale', 10, {from: accounts[1], value: 100000000000000000});
    }).then(function() {
      return tokenInstance.balanceOf('brownale');
    }).then(function(balance) {
      assert.equal(balance.toNumber(), 10, 'account claimed 10 Bagel');
      return tokenInstance.remainingSupply();
    }).then(function(remainingSupply) {
      assert.equal(remainingSupply.toNumber(), 9990, 'allocates 10 Bagel to user')
      return tokenInstance.claimBagel.call('paleale', 10, {from: accounts[1], value: 100000000000000000});
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
      return tokenInstance.claimBagel.call('paleale', 15, {from: accounts[2], value: 150000000000000000});
    }).then(function() {
      return tokenInstance.claimBagel('paleale', 15, {from: accounts[2], value: 150000000000000000});
    }).then(function() {
      return tokenInstance.balanceOf('paleale');
    }).then(function(balance) {
      assert.equal(balance.toNumber(), 15, 'account claimed 15 Bagel');
      return tokenInstance.remainingSupply();
    }).then(function(remainingSupply) {
      assert.equal(remainingSupply.toNumber(), 9975, 'it allocates 25 Bagels to two registered accounts');
    });
  });

  it('returns the right balance for registered accounts', function() {
    return Bagel.deployed().then(function(instance) {
      tokenInstance = instance;
    //   return tokenInstance.balanceOf.call('juicehaze', {from: accounts[3]}); // everybody can check others' account balance
    // }).then(assert.fail).catch(function(error) {
    //   assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
      return tokenInstance.balanceOf.call('paleale', {from: accounts[2]});
    }).then(function(balance) {
      assert.equal(balance.toNumber(),15,'the account owns 15 Bagel');
    });
  });

  it('transfers token ownership correctly', function() {
    return Bagel.deployed().then(function(instance) {
      tokenInstance = instance;
      // Test `require` statement first by transferring something larger than the sender's balance
      return tokenInstance.transfer.call('brownale', 'paleale', 50, {from: accounts[1]});
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
      return tokenInstance.transfer.call('brownale', 'paleale', -6, {from: accounts[1]});
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
      return tokenInstance.transfer.call('brownale', 'paleale', 1, {from: accounts[1]});
    }).then(async function(success) {
      assert.equal(success, true, 'it returns true');
      receipt = await tokenInstance.transfer('brownale', 'paleale', 5, {from: accounts[1]});
      return receipt;
    }).then(function(receipt) {
      assert.equal(receipt.logs.length, 1, 'triggers one event');
      assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
      assert.equal(receipt.logs[0].args.from, 'brownale', 'logs the account the tokens are transferred from');
      assert.equal(receipt.logs[0].args.to, 'paleale', 'logs the account the tokens are transferred to');
      assert.equal(receipt.logs[0].args.value, 5, 'logs the transfer amount');
      return tokenInstance.balanceOf.call('paleale', {from: accounts[2]});
    }).then(function(balance) {
      assert.equal(balance.toNumber(), 15, 'adds the amount to the receiving account');
      return tokenInstance.balanceOf.call('brownale', {from: accounts[1]});
    }).then(function(balance) {
      assert.equal(balance.toNumber(), 5, 'deducts the amount from the sending account');
    });
  });
});
