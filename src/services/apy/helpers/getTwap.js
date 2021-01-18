const ethers = require('ethers');
const ethersProvider = require('./web3Provider');
const dsdPriceOracleAbi = require('../abis/dsdPriceOracle.json');

const { oracleAddress, uniSwapPairUSDC_DSDAddress, dsdPriceOracleAddress} = require('./addresses');

const getTwap = async () => {
  const timestampEncoded = await ethersProvider.getStorageAt(
    oracleAddress,
    '0x5'
  );

  const cumultativeEncoded = await ethersProvider.getStorageAt(
    oracleAddress,
    '0x4'
  );

  const abiCoder = new ethers.utils.AbiCoder();
  const timestamp = abiCoder.decode(['uint256'], timestampEncoded);
  const cumulative = abiCoder.decode(['uint256'], cumultativeEncoded);

  const dsdPriceOracle = new ethers.Contract(dsdPriceOracleAddress, dsdPriceOracleAbi, ethersProvider);

  const twapPrice = await dsdPriceOracle.getPrice(
    uniSwapPairUSDC_DSDAddress,
    1,
    timestamp.toString(),
    cumulative.toString()
  );

  return ethers.utils.formatUnits(twapPrice, 'ether');
};

module.exports = getTwap;