import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";

const app: Express = express();

app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.listen(3000,() => {
    console.log(`[server]: Server is running at http://localhost:3000`);
});