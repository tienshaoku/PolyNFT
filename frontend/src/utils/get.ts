import { fetchSigner } from "@wagmi/core"
import { CHAIN_ID } from "constants/env"

export async function getSigner() {
    const signer = await fetchSigner({ chainId: CHAIN_ID })
    if (!signer) {
        throw new Error("Wallet is not connected yet.")
    }
    return signer
}

export function getBase64StringFromDataURL(dataURL: any) {
    return dataURL.replace("data:", "").replace(/^.+,/, "")
}
