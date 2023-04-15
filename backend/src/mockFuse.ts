import { create } from "ipfs-http-client"
import { Service } from "typedi"
import { IPFSService } from "./ipfs";
import { readFileSync, statSync } from "fs";
import path from "path";


@Service()
export class MockFuseService {
    private readonly _IMG_FOLDER = "images"
    private readonly _DEFAULT_IMG = "other.png"

    constructor() {}
    
    async fuse(list: string[], prompt: string): Promise<Buffer>{
        return  await this._readFile(list,  prompt);
    }

    async _readFile(list: string[], prompt: string): Promise<Buffer>{
        const sourceCID = path.parse(list[0]).base;
        const keyword = prompt.split(" ")[0];
        let imagePath = path.join(this._IMG_FOLDER, sourceCID, `${keyword}.png`);
        if (!this._checkFileExists(imagePath)){
            imagePath = path.join(this._IMG_FOLDER, sourceCID, this._DEFAULT_IMG);
        }
        return readFileSync(imagePath);
     }

     _checkFileExists(path: string): boolean {
        try{
            statSync(path);
            return true;
        }catch(e:any){
            return false;
        }
     }
}
