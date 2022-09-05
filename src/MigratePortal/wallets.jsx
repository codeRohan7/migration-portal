import React,{ useEffect, useState } from "react";

import SelectWalletModal from "./Modal";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "./connectors";

import { toHex, truncateAddress } from "./utils";

import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { providerOptions } from "./providers";
import { useDispatch } from "react-redux";
import {connectWalletAction,connectMigrateContract} from '../Redux/Action/Auth/index'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Wallet() {
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [account, setAccount] = useState();
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");
  const [chainId, setChainId] = useState();
  const [network, setNetwork] = useState();
  const [message, setMessage] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [verified, setVerified] = useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { activate } = useWeb3React();
  const dispatch =useDispatch()
  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      setLibrary(library);
      if (accounts) setAccount(accounts[0]);
      setChainId(network.chainId);
    } catch (error) {
      setError(error);
    }
  };
  const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions // required
  });
  
  const handleNetwork = (e) => {
    const id = e.target.value;
    dispatch(connectWalletAction({account,id}))
    dispatch(connectMigrateContract(id))

    setNetwork(Number(id));
  };

  const handleInput = (e) => {
    const msg = e.target.value;
    setMessage(msg);
  };

  const switchNetwork = async (e) => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(Number(e)) }]
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
          });
        } catch (error) {
          setError(error);
        }
      }
    }
  };

  const refreshState = () => {
    setAccount();
    setChainId();
    setVerified(undefined);
  };

  const disconnect = async() => {
    await web3Modal.clearCachedProvider();
    window.location.reload()
    // refreshState();
  };

  useEffect(() => {
    if (web3Modal.cachedProvider) {
       connectWallet()
    }
  }, []);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        if (accounts) setAccount(accounts[0]);
      };

      const handleChainChanged = (_hexChainId) => {
        setChainId(_hexChainId);
      };

      const handleDisconnect = () => {
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);

 
  return (
    <>
  
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">


              
              <li className="nav-item active">


              {!account ? (
                <div>

        <button className="btn btn-outline-success header-btn" onClick={connectWallet}>Connect Wallet</button>
                </div>

          ) : (
<div className="d-flex">
  
<select onChange={(e)=>{handleNetwork(e);switchNetwork(e.target.value)}
                 } className="btn btn-outline-success header-btn" placeholder="Select network">
                 <option disabled selected="true">Select network</option>
                  <option value="3">Ropsten</option>
                  <option value="97">Binance</option>
                </select>


                <button className="btn btn-outline-success header-btn"  onClick={disconnect}>{account.replace(/(.{8})..+/, "$1…")}</button>

</div>

            
          )}


              </li>
             
            </ul>
          </div> 

    </>
  );
}
