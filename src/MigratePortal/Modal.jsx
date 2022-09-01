
  import { useWeb3React } from "@web3-react/core";
  import { connectors } from "./connectors";
  
  export default function SelectWalletModal({ isOpen, closeModal }) {
    const { activate } = useWeb3React();
  
    const setProvider = (type) => {
      window.localStorage.setItem("provider", type);
    };
  
    return (
      <>
      
      
      </>
    );
  }
  