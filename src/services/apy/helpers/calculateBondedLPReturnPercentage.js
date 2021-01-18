const { dsdPoolAddress, uniSwapPairUSDC_DSDAddress } = require('./addresses');
const poolAbi = require('../abis/pool.json');
const dsdAbi = require('../abis/dsd.json');
const ethersProvider = require('./web3Provider');
const ethers = require('ethers');

const calculateBondedDaoReturnPercentage = async (supplyIncrease) => {
  let lpShare = supplyIncrease * 0.4;

  const pool = new ethers.Contract(dsdPoolAddress, poolAbi, ethersProvider);
  const bondedLPTokens = ethers.utils.formatUnits(await pool.totalBonded(), 'ether');

  const uniUSDC_DSDInstance = new ethers.Contract(uniSwapPairUSDC_DSDAddress, dsdAbi, ethersProvider);
  const dsdInPool = ethers.utils.formatUnits(await uniUSDC_DSDInstance.balanceOf(dsdPoolAddress), 'ether');
  const lpTokenSupply = ethers.utils.formatUnits(await uniUSDC_DSDInstance.totalSupply(), 'ether');

  const lpTokenToDSDRatio = dsdInPool / lpTokenSupply;

  return 100 / (bondedLPTokens * lpTokenToDSDRatio) * lpShare;
};

module.exports = calculateBondedDaoReturnPercentage;