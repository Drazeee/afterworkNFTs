import React from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import "./App.css";

function App() {
  const provider = new WalletConnectProvider({
    infuraId: "f8ccbba88cde4fbf8cfa8c82dc353e08",
    rpc: {
      137: "https://matic-mainnet.chainstacklabs.com",
      80001: "https://matic-mumbai.chainstacklabs.com",
    },
  });

  const [web3provider, setWeb3provider] = React.useState(null);
  const [address, setAddress] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  async function enableWalletConnect() {
    await provider.enable();
    setWeb3provider(new providers.Web3Provider(provider));
  }

  provider.on("accountsChanged", (accounts) => {
    if (accounts.length > 0) {
      setWeb3provider(new providers.Web3Provider(provider));
      setAddress(accounts[0]);
    }
  });

  provider.on("chainChanged", (chainId) => {
    console.log(chainId);
  });

  provider.on("disconnect", (code, reason) => {
    setWeb3provider(null);
    setAddress(null);
    console.log(code, reason);
  });

  async function disconnect() {
    await provider.disconnect();
  }

  async function mint() {
    const mintRequest = fetch("/mint/" + address);
    setLoading(true);
    const response = await mintRequest;
    const data = await response.json();
    if (data.minted) {
      toast("Minted !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast("🦄 Wow so easy!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setLoading(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        {loading ? null : !web3provider ? (
          <button onClick={enableWalletConnect}>Enable WalletConnect</button>
        ) : (
          <>
            <button>{address}</button>
            <button onClick={mint}>Mint le NFT</button>
            <button onClick={disconnect}>Deconnexion</button>
          </>
        )}
      </header>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
