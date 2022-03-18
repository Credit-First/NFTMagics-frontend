import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { isMobile } from 'react-device-detect';

import { SUPPORTED_WALLETS } from './wallets';

declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}

interface ConnectWalletProps {
  width?: number;
  height?: number;
  background?: string;
  classname?: string;
  onCloseClick?: () => void;
}

export default function ConnectWallet({
  width,
  height,
  background = '',
  classname = '',
  onCloseClick,
}: ConnectWalletProps) {
  const { account, chainId, library, activate, connector, deactivate } =
    useWeb3React();

  useEffect(() => {
    async function fetchBalance() {
      try {
        if (onCloseClick) onCloseClick();
      } catch (e) {
        console.log(e);
      }
    }

    // if (!library || !account || !isRightNetwork(chainId)) return;
    if (!library || !account) return;
    if (chainId !== 1 && window.ethereum) {
      // if it's not mainnet
      changeNetwork();
    } else if (window.ethereum) {
      fetchBalance();
    }
  }, [chainId, account, library]);

  const tryActivation = async (
    connector:
      | (() => Promise<AbstractConnector>)
      | AbstractConnector
      | any
      | undefined
  ) => {
    let name = '';
    const conn = typeof connector === 'function' ? await connector() : connector;

    Object.keys(SUPPORTED_WALLETS).map((key) => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        return (name = SUPPORTED_WALLETS[key].name);
      }
      return true;
    });

    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (
      conn instanceof WalletConnectConnector &&
      conn.walletConnectProvider?.wc?.uri
    ) {
      conn.walletConnectProvider = undefined;
    }

    conn &&
      activate(conn, undefined, true).catch(async (error) => {
        if (error instanceof UnsupportedChainIdError) {
          console.log(error);
          await changeNetwork();
          activate(conn); // a little janky...can't use setError because the connector isn't set
        }
      });
  };

  function getStyle() {
    let styles = {};
    if (width) styles = Object.assign(styles, { width: width });
    if (height) styles = Object.assign(styles, { height: height });
    if (background)
      styles = Object.assign(styles, { backgroundColor: background });
    return styles;
  }

  return (
    <div
      className={`border-radius-35 bg-white p-4 sm:p-10 lp-card-min-width ${
        classname ? classname : ''
      }`}
      style={getStyle()}
    >
      <div className="flex items-center justify-between">
        <div className="font-bold connect-color font-30">Connect</div>
      </div>
      <div
        className="pr-2 mt-5 overflow-auto connect-wallet-max-height"
        id="walletList"
      >
        {Object.keys(SUPPORTED_WALLETS).map((key, index) =>
          !(window.web3 || window.ethereum) &&
          SUPPORTED_WALLETS[key].name === 'MetaMask' ? (
            <div
              className={`font-bold text-center cursor-pointer text-black flex flex-row justify-between connect-modal-link-bg border-radius-16 ${
                index > 0 ? 'mt-3' : ''
              } px-5`}
              key={key}
              onClick={(e) => {
                window.open('https://metamask.io/', '_blank');
              }}
            >
              <div className="pl-2">Install {SUPPORTED_WALLETS[key].name}</div>
              <Image
                src={require('./img/' + SUPPORTED_WALLETS[key].iconName)}
                width="24px"
                height="24px"
                className="mr-2"
                alt=""
              />
            </div>
          ) : isMobile && SUPPORTED_WALLETS[key].mobile ? (
            <div
              className={`font-bold text-center cursor-pointer text-black flex flex-row justify-between connect-modal-link-bg border-radius-16 ${
                index > 0 ? 'mt-3' : ''
              } px-5 `}
              key={key}
              onClick={(e) => {
                if (SUPPORTED_WALLETS[key].connector !== connector)
                  if (!SUPPORTED_WALLETS[key].href)
                    tryActivation(SUPPORTED_WALLETS[key].connector);
              }}
            >
              <div className="pl-2">{SUPPORTED_WALLETS[key].name}</div>
              <Image
                src={require('./img/' + SUPPORTED_WALLETS[key].iconName)}
                width="24px"
                height="24px"
                className="mr-2"
                alt=""
              />
            </div>
          ) : !isMobile && !SUPPORTED_WALLETS[key].mobileOnly ? (
            <div
              className={`font-bold text-center cursor-pointer text-black flex flex-row justify-between connect-modal-link-bg border-radius-16 ${
                index > 0 ? 'mt-3' : ''
              } px-5`}
              key={key}
              onClick={(e) => {
                if (SUPPORTED_WALLETS[key].connector !== connector)
                  if (!SUPPORTED_WALLETS[key].href)
                    tryActivation(SUPPORTED_WALLETS[key].connector);
              }}
            >
              <div className="pl-2">{SUPPORTED_WALLETS[key].name}</div>
              <Image
                src={require('./img/' + SUPPORTED_WALLETS[key].iconName)}
                width="24px"
                height="24px"
                className="mr-2"
                alt=""
              />
            </div>
          ) : (
            ``
          )
        )}
      </div>
    </div>
  );
}
export async function changeNetwork() {
  try {
    // check if the chain to connect to is installed
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x1' }], // chainId must be in hexadecimal numbers
    });
  } catch (error) {
    console.error(error);
  }
}
