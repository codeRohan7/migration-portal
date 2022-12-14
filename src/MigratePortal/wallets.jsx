import React,{ useEffect, useState } from "react";

import { useWeb3React } from "@web3-react/core";
import { connectors } from "./connectors";

import { toHex, truncateAddress } from "./utils";

import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { providerOptions } from "./providers";
import { useDispatch } from "react-redux";
import {connectWalletAction,connectMigrateContract} from '../Redux/Action/Auth/index'
import Box from '@mui/material/Box';
import { FaEthereum } from "react-icons/fa";
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
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
  const [isCopied, setIsCopied] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
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
    console.log(id);
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

  async function copyTextToClipboard (text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(account)
      .then(() => {
        // setIsCopied(true);
        setTimeout(() => {
          // setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
  
                <div>

<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
<Box sx={style}>
   <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
    {console.log(navigator.clipboard.writeText({account}))}
<Grid item xs={6}>
    <button  className="btn btn-outline-success" onClick={handleCopyClick}>copy address</button>
       
  </Grid>
  <Grid item xs={6}>
  <button  className="btn btn-outline-success" onClick={disconnect}>Disconnect</button>
  </Grid>
  
</Grid>
  </Box>

</Modal>

            <ul className="navbar-nav ml-auto">


              
              <li className="nav-item active">


              {!account ? (
                <div>

        <button className="btn btn-outline-success header-btn" onClick={connectWallet}>Connect Wallet</button>
                </div>

          ) : (

            
<div className="d-flex">

<FormControl >
        <InputLabel id="demo-simple-select-label">Select Network</InputLabel>
        <Select
          label="Select Network"
          id="demo-simple-select"
          value={account.network}
          onChange={(e)=>{handleNetwork(e);switchNetwork(e.target.value)}}
        >
          <MenuItem value={3}><img width={'20px'} className="mr-1" src="/assets/images/ethereum-eth-logo.png"/>Ropsten</MenuItem>
          <MenuItem value={97}><img width={'20px'} className="mr-1" src="/assets/images/bnb-bnb-logo.png"/>Bnb</MenuItem>
        </Select>
        </FormControl>

      <button  className="btn btn-outline-success header-btn" onClick={handleOpen}>{account.replace(/(.{8})..+/, "$1???")}</button>

</div>

            
          )}


              </li>
             
            </ul>
          </div> 
       

    </>
  );
}
