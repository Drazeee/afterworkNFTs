const ethers = require('ethers');

const provider = new ethers.providers.JsonRpcProvider(process.env.MATIC_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

module.exports = {
    provider,
    signer
}