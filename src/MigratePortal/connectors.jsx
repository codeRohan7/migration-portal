import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
const CHAIN_URLS = {
  //* Chain ID: Link
  4: "https://rinkeby.infura.io/v3/1bc80444349c4cac8999fda14cab6b67"
};
const injected = new InjectedConnector(
  {
  supportedChainIds: [1, 3, 4, 5, 42]
});
//need ipc url for wallet connect
const walletconnect = new WalletConnectConnector({
  rpcUrl: `https://eth-mainnet.nodereal.io/v1/1659dfb40aa24bbb8153a677b98064d7`,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true
});



export const connectors = {
  injected: injected,
  walletConnect: walletconnect,
};
