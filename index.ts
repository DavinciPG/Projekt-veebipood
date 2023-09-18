import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";

import aadressController from "./controllers/Aadress"
import arveController from "./controllers/Arve"
import arveridaController from "./controllers/Arverida"
import klientController from "./controllers/Klient"
import kontaktandmedController from "./controllers/Kontaktandmed"
import maksestaatusController from "./controllers/Maksestaatus"
import toodeController from "./controllers/Toode"
import kategooriaController from "./controllers/Kategooria"

const app: Express = express();

app.use(bodyParser.json());

app.use('/', aadressController);
app.use('/', arveController);
app.use('/', arveridaController);
app.use('/', klientController);
app.use('/', kontaktandmedController);
app.use('/', maksestaatusController);
app.use('/', toodeController);
app.use('/', kategooriaController);
app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.use('/')

app.listen(3000,() => {
    console.log(`[server]: Server is running at http://localhost:3000`);
});