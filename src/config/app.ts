import abi from "./abi";

export default {
    // netId: 56, //mainId
    netId: 97, //testId
    updateTime: 35000,
    swapFee: 0.0025,
    Token: {
        ITHD: {
            address: "0x88366934F5aF1D5ce2592cb549d346F320dc13b3",
            abi: abi.ITHD
        },
        AYRA: {
            address: "0x911bA403442dD7736bf3f76b88227Fb043BDFAEa",
            // address: "0xE976E9Cc54817074922Eb5426F2Be74cd2883f17",
            abi: abi.AYRA
        },
        WBNB: {
            address: "0x094616F0BdFB0b526bD735Bf66Eca0Ad254ca81F",
            abi: abi.WBNB
        }
    },
    NFT: {
        address: "0x30952084d2bd8CC3334591900fc4a80794aed159",
        abi: abi.NFT
    },
    Market: {
        address: "0xeef119935f79c67312F8A4DCb923b16df5cB544F",
        abi: abi.MARKET
    },
    InfuraId: 'b596546b8ae94aa883f9830c1fw90767f',
    bnbPrice: [
        21000000000000000,
        52000000000000000,
        100000000000000000,
        200000000000000000
    ],
    ayraPrice: [
        20000000000000000000,
        100000000000000000000,
        200000000000000000000,
        400000000000000000000
    ],
    ithdPrice: [
        29000000000000000000,
        149000000000000000000,
        299000000000000000000,
        598000000000000000000
    ],
    bnbPriceWithHasTag: [
        54000000000000000,
        118000000000000000,
        230000000000000000,
        460000000000000000
    ],
    ayraPriceWithHasTag: [
        60000000000000000000,
        220000000000000000000,
        400000000000000000000,
        800000000000000000000
    ],
    ithdPriceWithHasTag: [
        88000000000000000000,
        329000000000000000000,
        598000000000000000000,
        1196000000000000000000
    ],
}
