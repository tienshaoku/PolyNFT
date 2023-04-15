import "reflect-metadata"

import { Request, Response } from "express";
import { IPFSService } from "./ipfs";
import { Service } from "typedi";
import { MockFuseService } from "./mockFuse";

interface RequestUpload {
    payload: string // base64 encoding
};

interface RespondUpload {
    ipfs: string
};

interface RequestFuse {
    urlList: string[]
    prompt: string
};

@Service()
export class Handlers {
    
    constructor(readonly ipfsService: IPFSService, readonly mockFuseService:MockFuseService) {}
     
    async upload(req: Request, res: Response){
        try {
            const data: RequestUpload = req.body;
            const url = await this.ipfsService.uploadFromPayload(this._decode(data.payload))
            const RespondUpload: RespondUpload= {
                ipfs: url
            };
            res.json(RespondUpload);
        } catch (e:any) {
            res.status(500).send(e.message);
        }
    }

    async fuse(req: Request, res: Response){
        try {
            const data: RequestFuse = req.body;
            const url = await this.mockFuseService.fuse(data.urlList, data.prompt)
            const RespondUpload: RespondUpload= {
                ipfs: url
            };
            res.json(RespondUpload);
        } catch (e:any) {
            res.status(500).send(e.message);
        }
    }

   private _decode = (str: string):Buffer => Buffer.from(str, 'base64');
}