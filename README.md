# Free minting NFT platform

You need to configure a ```.env``` file in the ```backend``` directory. This are the infos about your wallet private key, blockchain endpoint and NFT contract address. Find here the .env template

```
MATIC_URL=
PRIVATE_KEY=
CONTRACT_ADDRESS=
PORT=3001
```

Configure a ```.env``` in the ```client``` directory. This contains the infuryId required for the WalletConnect API.

```
REACT_APP_INFURA_ID=
```

Configure a ```.env``` in the ```nfts``` directory. This contains the polygonscan API key required for the truffle-verify plugin.

```
POLYGONSCAN_API_KEY=
```
