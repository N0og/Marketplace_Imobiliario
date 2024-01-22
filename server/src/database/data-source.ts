import 'reflect-metadata';
import { DataSource } from 'typeorm';
import {config as dotenvConfig} from 'dotenv'  ;

dotenvConfig();

export const AppDataSource = new DataSource({
    type: "mariadb",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [],
    migrations: [],
    synchronize: true,
    logging: false
});
