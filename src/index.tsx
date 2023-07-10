import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
} from '@thirdweb-dev/react';
import { App } from './App';
import * as serviceWorkerRegistration from './utils/serviceWorkerRegistration';
import reportWebVitals from './utils/reportWebVitals';
import './styles/index.css';
import { storage } from './utils/thirdweb-storage';
import { NETWORK } from './utils/env';

const isMobile = !!/(iPhone|iPad|iPod|Android)/i.exec(navigator.userAgent);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ThirdwebProvider
      activeChain={NETWORK}
      supportedWallets={
        isMobile
          ? [walletConnect()]
          : [metamaskWallet(), coinbaseWallet(), walletConnect()]
      }
      storageInterface={storage}
    >
      <App />
    </ThirdwebProvider>
  </React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
console.log(`Network: ${NETWORK}`);
