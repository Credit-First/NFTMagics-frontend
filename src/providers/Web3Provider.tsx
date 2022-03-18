import React from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

const Web3 = ({ children } : { children: any}) => {
    function getLibrary(provider:any) {
        const library = new Web3Provider(provider);
        library.pollingInterval = 3000;
        return library;
    }
    return (
        <Web3ReactProvider getLibrary={getLibrary}>{children}</Web3ReactProvider>
    );
};

export default Web3;
