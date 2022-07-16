import React from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingIcons from "react-loading-icons";

import "./App.css";
import nft from "./assets/nft.png";
import metamask from "./assets/metamask.svg";
import walletconnect from "./assets/walletconnect.svg";

import xbto from "./assets/XBTO.png";
import devfund from "./assets/DevFund.png";
import lacity from "./assets/LACITY.png";

function App() {
  const provider = new WalletConnectProvider({
    infuraId: process.env.REACT_APP_INFURA_ID,
    rpc: {
      137: "https://matic-mainnet.chainstacklabs.com",
      80001: "https://matic-mumbai.chainstacklabs.com",
    },
  });

  const [WCprovider, setWCprovider] = React.useState(null);
  const [injectedProvider, setInjectedProvider] = React.useState(null);
  const [address, setAddress] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [isMetamask, setMetamask] = React.useState(false);

  async function enableWalletConnect() {
    await provider.enable();
    setWCprovider(new providers.Web3Provider(provider));
  }

  provider.on("accountsChanged", (accounts) => {
    if (accounts.length > 0) {
      setWCprovider(new providers.Web3Provider(provider));
      setAddress(accounts[0]);
    }
  });

  provider.on("chainChanged", (chainId) => {
    if (chainId === 137) {
      setWCprovider(new providers.Web3Provider(provider));
    }
  });

  provider.on("disconnect", (code, reason) => {
    setWCprovider(null);
    setAddress(null);
    console.log(code, reason);
  });

  function connectInjected() {
    if (!window.ethereum) {
      toast.error("Please install MetaMask");
      return;
    }
    window.ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
      setAddress(res[0]);
      setInjectedProvider(new providers.Web3Provider(window.ethereum));
      setMetamask(true);
    });
  }

  async function disconnect() {
    if (isMetamask) {
      setInjectedProvider(null);
    } else {
      await provider.disconnect();
    }
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
              {!WCprovider && !injectedProvider ? (
                <div style={{display: "flex", justifyContent: "space-between"}}>
                  <button onClick={connectInjected} className="connect">
                    <img src={metamask} alt="" />
                  </button>
                  <button onClick={enableWalletConnect} className="connect">
                    <img src={walletconnect} alt="" />
                  </button>
                </div>
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
