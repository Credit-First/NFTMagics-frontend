import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

const POLLING_INTERVAL = 12000;
const RPC_URLS = {
    0: "https://data-seed-prebsc-1-s1.binance.org:8545",
    3: "https://mainnet.infura.io/v3/b54cce4b8d564b0b9f9e84e0cdd8efa2",
    4: "https://rinkeby.infura.io/v3/b54cce4b8d564b0b9f9e84e0cdd8efa2"
};

const rpcUrl = RPC_URLS[4];//getNodeUrl();
const chainId = parseInt('4', 10);
export const injected = new InjectedConnector({
    // supportedChainIds: [56], //mainChainId
    supportedChainIds: [1, 3, 4, 5, 42, 56, 97], //testChainId
});

export const walletconnect = new WalletConnectConnector({
    rpc: { [chainId]: rpcUrl },
    qrcode: true,
    bridge: "https://bridge.walletconnect.org",
    // pollingInterval: POLLING_INTERVAL,
});
