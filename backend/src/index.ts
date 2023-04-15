#!/usr/bin/env node
import "reflect-metadata";

import * as dotenv from "dotenv";
import fetch, { Headers } from "node-fetch"
import express, { Request, Response } from "express";
import { Container } from "typedi"
import { Handlers } from "./handler";

dotenv.config()

async function main(): Promise<void> {
    const app = express();
    const port = 3000;
    app.use(express.json());
    
    const handlers = Container.get(Handlers)
    app.post('/api/v1/upload', handlers.upload.bind(handlers));
    
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
    
}

if (require.main === module) {
    main()
}