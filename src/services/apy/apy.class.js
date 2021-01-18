/* eslint-disable no-unused-vars */
const getTwap = require('./helpers/getTwap');
const calculateSupplyIncreaseGiven = require('./helpers/calculateSupplyIncrease');
const calculateBondedDaoReturnPercentageFrom = require('./helpers/calculateBondedDaoReturnPercentage');
const calculateBondedLPReturnPercentageFrom = require('./helpers/calculateBondedLPReturnPercentage');

exports.Apy = class Apy {

  async find () {
    const twapPrice = await getTwap();

    if (twapPrice <= 1) {
      return { BONDED_DAO_RETURN_PERCENT: 0, BONDED_LP_RETURN_PERCENT: 0 };
    }

    const supplyIncrease = await calculateSupplyIncreaseGiven(twapPrice);

    const BONDED_DAO_RETURN_PERCENT = await calculateBondedDaoReturnPercentageFrom(supplyIncrease);

    const BONDED_LP_RETURN_PERCENT = await calculateBondedLPReturnPercentageFrom(supplyIncrease);

    return {
      BONDED_DAO_RETURN_PERCENT,
      BONDED_LP_RETURN_PERCENT
    };
  }

};
