import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import {config as dotenvConfig} from 'dotenv';

dotenvConfig();

const options: DataSourceOptions = {
    type: "mariadb",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [`${__dirname}/../**/entities/*.{ts,js}`],
    migrations: [`${__dirname}/../**/migrations/*.{ts,js}`],
    synchronize: true,
    logging: false
};

export const MariaDBDataSource = new DataSource(options);

