import "reflect-metadata"

import { Request, Response } from "express";
import { IPFSService } from "./ipfs";
import { Service } from "typedi";

interface RequestUpload {
    payload: string // base64 encoding
};

interface RespondUpload {
    ipfs: string
};

@Service()
export class Handlers {
    
    constructor(readonly ipfsService: IPFSService) {}
     
    async upload(req: Request, res: Response){
        try {
            const data: RequestUpload = req.body;
            const cid = await this.ipfsService.uploadFromPayload(this._decode(data.payload))
            const RespondUpload: RespondUpload= {
                ipfs: cid
            };
            res.json(RespondUpload);
        } catch (e:any) {
            res.status(500).send(e.message);
        }
    }

   private _decode = (str: string):Buffer => Buffer.from(str, 'base64');
}