const express = require('express')
const ethers = require('ethers')
require("dotenv").config()

const app = express();
const port = process.env.PORT || 3001;

const { contract } = require('./src/loadContract');

app.get('/mint/:address', (req, res) => {
    const { address } = req.params;
    contract.getBalance(address).then(balance => {
        if (balance.toString() === '0') {
            contract.drop(address, {
                gasPrice: ethers.utils.parseUnits('50', 'gwei').toString(),
                gasLimit: 177302
            })
                .then(() => {
                    console.log('Minted for address:', address);
                    res.json({
                        minted: true,
                    })
                })
                .catch(err => {
                    console.log(err.message);
                    res.status(500).json({
                        minted: false,
                        error: err.message,
                    })
                })
        } else {
            res.status(500).json({
                minted: false,
                error: 'Vous avez déjà récupéré votre NFT',
            })
        }
    });
})

app.get("/kfjzklajrkvjbezjerguyihyohkjgfrekj/:adddress", (req, res) => {
    const { address } = req.params;
    contract.dropForBuilders(address)
        .then(() => {
            console.log('Minted for address:', address);
            res.json({
                minted: true,
            })
        })
        .catch(err => {
            res.status(500).json({
                minted: false,
                error: err.message,
            })
        })
})

app.use(express.static('../client/build'));

app.listen(port, () => console.log(`LaCity AW 24/06/22 listening on port ${port}!`));