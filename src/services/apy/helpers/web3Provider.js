const ethers = require('ethers');

module.exports = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`);