#!/usr/bin/env node
import "reflect-metadata";

import * as dotenv from "dotenv";
import express from "express";
import cors from 'cors';
import { Container } from "typedi";
import { Handlers } from "./handler";

dotenv.config()

async function main(): Promise<void> {
    const app = express();
    const port = 3001;

    app.use(cors());
    app.use(express.json({limit: '50mb'}));
    
    const handlers = Container.get(Handlers)
    app.post('/api/v1/upload', handlers.upload.bind(handlers));
    app.post('/api/v1/fuse', handlers.fuse.bind(handlers));
    app.post('/api/v1/fuse/upload', handlers.fuseAndUpload.bind(handlers));
    
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
    
}

if (require.main === module) {
    main()
}