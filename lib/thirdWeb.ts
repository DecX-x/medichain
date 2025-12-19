import { createThirdwebClient } from "thirdweb";
import { createWallet } from "thirdweb/wallets";
import { inAppWallet } from "thirdweb/wallets/in-app";
import { sepolia } from "thirdweb/chains";


export const client = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID as string
});


export const wallets = [
    inAppWallet({
        executionMode: {
            mode: "EIP4337",
            smartAccount: {
                chain: sepolia, // chain required for EIP-4337
                sponsorGas: true,
            }
        },
    }),
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
];