import { create } from "ipfs-http-client"
import { Service } from "typedi"


@Service()
export class MockFuseService {
    private readonly _mockImages = []


    constructor() {
 
    }
    
    async fuse(list: string[]): Promise<string>{     
       console.log(list)
       return "https://ipfs.io/ipfs/QmbPbq16xF4PsowtbSDKa4qcWFManZAnvYbfxhjMPgZ8Jw";
    }
}
