import { create } from "ipfs-http-client"
import { Service } from "typedi"


@Service()
export class IPFSService {
    private readonly _DATA_ENDPOINT = "https://ipfs.io/ipfs"
    private readonly _ENDPOINT = process.env.IPFS_ENDPOINT || "http://127.0.0.1:5001"
    private readonly _KEY = process.env.IPFS_KEY || ""
    private readonly _SECRET = process.env.IPFS_SECRET || ""
    private readonly _API_ENDPOINT:string


    constructor() {
        const url =  new URL(this._ENDPOINT);
        url.username = this._KEY;
        url.password  = this._SECRET;
        this._API_ENDPOINT = url.toString();
    }
    
    async uploadFromPayload(payload: Buffer): Promise<string>{     
        const ipfs = create({ url:  this._API_ENDPOINT  });
        const fileAdded = await ipfs.add({content: payload});
        return `${this._DATA_ENDPOINT}/${fileAdded.cid.toString()}`;
    }
}
