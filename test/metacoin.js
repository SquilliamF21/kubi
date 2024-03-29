const KubiCoin = artifacts.require("KubiCoin");

contract('KubiCoin', function(accounts) {
  it("should put 10000 KubiCoin in the first account", function() {
    return KubiCoin.deployed().then(function(instance) {
      return instance.getBalance.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
    });
  });
  it("should call a function that depends on a linked library", function() {
    var Kubi;
    var KubiCoinBalance;
    var KubiCoinEthBalance;

    return KubiCoin.deployed().then(function(instance) {
      Kubi = instance;
      return Kubi.getBalance.call(accounts[0]);
    }).then(function(outCoinBalance) {
      KubiCoinBalance = parseInt(outCoinBalance);
      return Kubi.getBalanceInEth.call(accounts[0]);
    }).then(function(outCoinBalanceEth) {
      KubiCoinEthBalance = parseInt(outCoinBalanceEth);
    }).then(function() {
      assert.equal(KubiCoinEthBalance, 2 * KubiCoinBalance, "Library function returned unexpected function, linkage may be broken");
    });
  });
  it("should send coin correctly", function() {
    var Kubi;

    // Get initial balances of first and second account.
    var account_one = accounts[0];
    var account_two = accounts[1];

    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_one_ending_balance;
    var account_two_ending_balance;

    var amount = 10;

    return KubiCoin.deployed().then(function(instance) {
      Kubi = instance;
      return Kubi.getBalance.call(account_one);
    }).then(function(balance) {
      account_one_starting_balance = parseInt(balance);
      return Kubi.getBalance.call(account_two);
    }).then(function(balance) {
      account_two_starting_balance = parseInt(balance);
      return Kubi.sendCoin(account_two, amount, {from: account_one});
    }).then(function() {
      return Kubi.getBalance.call(account_one);
    }).then(function(balance) {
      account_one_ending_balance = parseInt(balance);
      return Kubi.getBalance.call(account_two);
    }).then(function(balance) {
      account_two_ending_balance = parseInt(balance);

      assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
      assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
    });
  });
});
