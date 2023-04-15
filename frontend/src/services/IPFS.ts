import { API_UPLOAD_IMG } from "constants/api"
import { getBase64StringFromDataURL } from "utils/get"

class IPFSClient {
    async uploadFile(reader: FileReader) {
        const base64Str = getBase64StringFromDataURL(reader.result)
        return fetch(API_UPLOAD_IMG, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                payload: base64Str,
            }),
        })
    }

    async uploadBase64(base64Str: string) {
        return fetch(API_UPLOAD_IMG, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                payload: base64Str,
            }),
        })
    }
}

export const ipfsClient = new IPFSClient()
