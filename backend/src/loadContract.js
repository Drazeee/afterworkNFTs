const ethers = require('ethers');
const { signer } = require('./loadWallet');
const ContractJSON = require("./AfterWorkByLaCity240622.json");

const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, ContractJSON.abi, signer);

module.exports = {
    contract
}