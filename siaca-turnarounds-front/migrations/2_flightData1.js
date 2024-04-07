var SimpleStorage = artifacts.require("./FlightData1.sol");

module.exports = function (deployer) {
  deployer.deploy(SimpleStorage);
};
