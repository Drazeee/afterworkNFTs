import React from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingIcons from "react-loading-icons";

import "./App.css";
import nft from "./assets/nft.png";

import xbto from "./assets/XBTO.png";
import devfund from "./assets/DevFund.png";
import lacity from "./assets/LACITY.png";

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
    if (chainId === 137) {
      setWeb3provider(new providers.Web3Provider(provider));
    }
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
    if (loading) {
      return;
    }
    const mintRequest = fetch("/mint/" + address);
    setLoading(true);
    const toastId = toast.loading("Mint en cours...");
    try {
      const response = await mintRequest;
      const data = await response.json();
      if (data.minted) {
        toast.update(toastId, {
          render: "Mint réussi !",
          type: "success",
          isLoading: false,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.update(toastId, {
          render: data.error,
          type: "error",
          isLoading: false,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
      setLoading(false);
    } catch (e) {
      toast.update(toastId, {
        render: "Erreur lors de la requête",
        type: "error",
        isLoading: false,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setLoading(false);
    }
  }

  return (
    <>
      <div className="App">
        <header className="App-header">
          <div className="card">
            <img src={nft} alt="" />
            <div className="infos">
              <h5>Afterwork by LaCity - 24/06/22</h5>
              <p>
                Contract{" "}
                <a
                  href="https://polygonscan.com/address/0x8303A493ff94565a71D6a5a60D303aC2F3153983"
                  target="_blank"
                  rel="noreferrer"
                >
                  0x8303...3983
                </a>
              </p>
              {!web3provider ? (
                <button onClick={enableWalletConnect} className="connect">
                  Connecter son Wallet
                </button>
              ) : (
                <>
                  <button onClick={mint} className="mint">
                    {loading ? (
                      <LoadingIcons.ThreeDots
                        className="loading"
                        height=".6rem"
                      />
                    ) : (
                      "Mint votre NFT"
                    )}
                  </button>
                  <button onClick={disconnect} className="disconnect">
                    X
                  </button>
                </>
              )}
            </div>
          </div>
        </header>
      </div>
      <div className="partners">
        <img src={xbto} alt="" />
        <img src={devfund} alt="" />
      </div>
      <div className="logo">
        <img src={lacity} alt="" />
        <span>LaCity</span>
      </div>
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
    </>
  );
}

export default App;
