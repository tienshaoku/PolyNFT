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

interface ResponseFuse {
    payload: string // base64 encoding
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
            const payload = await this.mockFuseService.fuse(data.urlList, data.prompt)
            const RespondUpload: ResponseFuse= {
                payload: this._encode(payload),
            };
            res.json(RespondUpload);
        } catch (e:any) {
            res.status(500).send(e.message);
        }
    }



    async fuseAndUpload(req: Request, res: Response){
        try {
            const data: RequestFuse = req.body;
            const payload = await this.mockFuseService.fuse(data.urlList, data.prompt)
            const url = await this.ipfsService.uploadFromPayload(payload)
            const RespondUpload: RespondUpload= {
                ipfs: url
            };
            res.json(RespondUpload);
        } catch (e:any) {
            res.status(500).send(e.message);
        }
    }

   private _decode = (str: string):Buffer => Buffer.from(str, 'base64');
   private _encode = (buffer: Buffer):string => buffer.toString('base64');
}