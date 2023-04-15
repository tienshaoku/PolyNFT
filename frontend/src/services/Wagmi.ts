import { getDefaultClient } from "connectkit"
import { RPC_URL_HTTPS } from "constants/env"
import { configureChains, createClient } from "wagmi"
import { optimism, optimismGoerli } from "wagmi/chains"
import { jsonRpcProvider } from "wagmi/providers/jsonRpc"

class Wagmi {
    constructor(private readonly rpcUrl: string) {}

    getClient() {
        const { chains, provider, webSocketProvider } = configureChains(
            [optimism, optimismGoerli],
            [
                jsonRpcProvider({
                    rpc: () => ({
                        http: this.rpcUrl,
                    }),
                }),
            ],
        )
        return createClient(
            getDefaultClient({
                appName: "NFT Polymerization",
                autoConnect: true,
                chains,
                provider,
                webSocketProvider,
            }),
        )
    }
}

export const wagmi = new Wagmi(RPC_URL_HTTPS)
