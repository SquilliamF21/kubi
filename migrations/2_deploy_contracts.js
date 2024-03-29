const ConvertLib = artifacts.require("ConvertLib");
const KubiCoin = artifacts.require("KubiCoin");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, KubiCoin);
  deployer.deploy(KubiCoin);
};
