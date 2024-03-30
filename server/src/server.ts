import 'reflect-metadata';
import express from "express";
import cors from 'cors';
import {config as dotenvConfig} from 'dotenv'  ;
import { MariaDBDataSource } from './database/data-source'
import { router } from './routes';

dotenvConfig();
const app = express();

app.use(cors({
    origin: `${process.env.FRONT_HOST}`
}));
app.use(express.json());
app.use(router)

MariaDBDataSource.initialize()
    .then(async () => {
        console.log('Database has been initialized.');
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`Server started on port ${process.env.SERVER_PORT}`)
        })
    })
    .catch((err) => {
        console.log("Error during Data Source initialization", err)
    });