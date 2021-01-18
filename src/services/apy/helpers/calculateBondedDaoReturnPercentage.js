const { dsdDaoAddress } = require('./addresses');
const daoAbi = require('../abis/dao.json');
const ethersProvider = require('./web3Provider');
const ethers = require('ethers');

const calculateBondedDaoReturnPercentage = async (supplyIncrease) => {
  let dapShare = supplyIncrease * 0.6;

  const dao = new ethers.Contract(dsdDaoAddress, daoAbi, ethersProvider);

  const currentEpoch = await dao.epoch();
  const couponsOutstanding = await dao.outstandingCoupons(currentEpoch);
  const couponsOutstandingToNumber = couponsOutstanding.toNumber();

  if (couponsOutstandingToNumber > 0) {
    const redeemableCoupons = Math.min(couponsOutstandingToNumber, dapShare);
    dapShare = dapShare - redeemableCoupons;
  }

  const bondedDsd = ethers.utils.formatUnits(await dao.totalBonded(), 'ether');

  return 100 / bondedDsd * dapShare;
};

module.exports = calculateBondedDaoReturnPercentage;