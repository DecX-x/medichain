import { createThirdwebClient } from "thirdweb";
import { createWallet } from "thirdweb/wallets";
import { inAppWallet } from "thirdweb/wallets/in-app";
import { defineChain } from "thirdweb/chains";


export const liskSepolia = defineChain({
    id: 4202, 
    name: "Lisk Sepolia Testnet",
    nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
    },
    rpcUrls: {
        default: { http: ["https://rpc.sepolia-api.lisk.com"]}
    },
    blockExplorers: {
        default: { name: "Lisk Explorer", url: "https://sepolia-blockscout.lisk.com" }
    }
},

)

export const client = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID as string
});


export const wallets = [
    inAppWallet({
        auth: {
            options: ["google", "x", 'passkey']
        },
        executionMode: {
            mode: "EIP4337",
            smartAccount: {
                chain: liskSepolia, // chain required for EIP-4337
                sponsorGas: true,
            }
        },
    }),
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
];