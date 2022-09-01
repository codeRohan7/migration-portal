import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";

import App from "./App";
import { Provider } from 'react-redux'
import  ConfigureStore  from './Redux/Store/configureStore'
const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000; // frequency provider is polling
  return library;
};

const store =ConfigureStore()
const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <App />
      </Web3ReactProvider>
      </Provider>,
  rootElement
);
