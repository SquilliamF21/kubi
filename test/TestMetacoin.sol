pragma solidity >=0.4.22 <0.7.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/KubiCoin.sol";

contract TestKubicoin {

  function testInitialBalanceUsingDeployedContract() public {
    KubiCoin Kubi = KubiCoin(DeployedAddresses.KubiCoin());

    uint expected = 10000;

    Assert.equal(Kubi.getBalance(tx.origin), expected, "Owner should have 10000 KubiCoin initially");
  }

  function testInitialBalanceWithNewKubiCoin() public {
    KubiCoin Kubi = new KubiCoin();

    uint expected = 10000;

    Assert.equal(Kubi.getBalance(tx.origin), expected, "Owner should have 10000 KubiCoin initially");
  }

}
