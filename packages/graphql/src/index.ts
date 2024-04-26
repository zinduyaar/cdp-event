import * as express from "express"
import * as bodyParser from "body-parser"
import * as cors from "cors";
import { Request, Response } from "express"
import { Routes } from "./routes"

import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { schema } from './graphql-schema';

// create express app
const app = express()
app.use(bodyParser.json())
app.use(cors());

// register express routes from defined application routes
Routes.forEach(route => {
    (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
        const result = (new (route.controller as any))[route.action](req, res, next)
        if (result instanceof Promise) {
            result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

        } else if (result !== null && result !== undefined) {
            res.json(result)
        }
    })
})

const server = new WebSocketServer({
    port: 4000,
    path: '/graphql',
});

useServer({ schema }, server);

console.log('Listening to port 4000');