import 'reflect-metadata';
import express from "express";
import cors from 'cors';
import {config as dotenvConfig} from 'dotenv'  ;
import { AppDataSource } from './database/data-source'

dotenvConfig();
const app = express();

app.use(cors());
app.use(express.json());
AppDataSource.initialize()
    .then(async () => {
        console.log('Database has been initialized.');
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`Server started on port ${process.env.SERVER_PORT}`)
        })
    })
    .catch((err) => {
        console.log("Error during Data Source initialization", err)
    });
