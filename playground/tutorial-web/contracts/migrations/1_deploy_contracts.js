const Contacts = artifacts.require('contracts.sol')

module.exports = function (deployer) {
  deployer.deploy(Contacts)
}
