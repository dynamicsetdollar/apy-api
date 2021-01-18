const { dsdAddress } = require('./addresses');
const dsdAbi = require('../abis/dsd.json');
const ethersProvider = require('./web3Provider');
const ethers = require('ethers');

const calculateSupplyIncrease = async (twapPrice) => {
  const dsd = new ethers.Contract(dsdAddress, dsdAbi, ethersProvider);

  const totalSupply = ethers.utils.formatUnits(await dsd.totalSupply(), 'ether');

  return totalSupply * ((twapPrice - 1) / 12);
};

module.exports = calculateSupplyIncrease;