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
        BNB: {
            address: "0x094616F0BdFB0b526bD735Bf66Eca0Ad254ca81F",
            abi: abi.BNB
        }
    },
    NFT: {
        address: "0xf97BD7d9871655a3e19224354Ffe1e4CA2C4C053",
        abi: abi.NFT
    },
    Market: {
        address: "0x351d0F13075706E69b2BdD3532aD7824fd36A97b",
        abi: abi.MARKET
    },
    Lottery: {
        address: "0x9b6A2aede4364600dd0bbAB6c06ddd3fC305388B",
        abi: abi.LOTTERY
    },
    InfuraId: 'b596546b8ae94aa883f9830c1fw90767f',
    bnbPrice: 2100000000000000,
    ayraPrice: 20000000000000000000,
    ithdPrice: 29000000000000000000,
    bnbTicketPrice: 1050000000000000,
    ayraTicketPrice: 10000000000000000000,
    ithdTicketPrice: 14500000000000000000
}
