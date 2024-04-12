var SimpleStorage = artifacts.require("./FlightData2.sol");

module.exports = function (deployer) {
  deployer.deploy(SimpleStorage);
};
