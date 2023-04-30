import { DataSource } from "typeorm";
import 'dotenv/config';
import 'reflect-metadata';
import { User } from "./entities/User";
import { Adress } from "./entities/Adress";

const DB_PORT = process.env.DB_PORT as number | undefined;

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [User, Adress],
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
    synchronize: false,
})