const express = require('express')
require("dotenv").config()

const app = express();
const port = 3001;

const { contract } = require('./src/loadContract');

app.get('/mint/:address', (req, res) => {
    const { address } = req.params;
    contract.getBalance(address).then(balance => {
        console.log(balance);
        if (balance.toString() === '0') {
            contract.drop(address)
                .then(() => {
                    console.log('Minted for address:', address);
                    res.json({
                        minted: true,
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.json({
                        minted: false,
                    })
                })
        } else {
            res.json({
                minted: false,
            })
        }
    });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));