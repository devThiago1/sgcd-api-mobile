import { DataSource } from "typeorm";
import 'dotenv/config';
import 'reflect-metadata';
import { User } from "./entities/User";
import { Adress } from "./entities/Adress";

const DB_PORT = process.env.DB_PORT as number | undefined;

export const AppDataSource = new DataSource({
    type: "postgres",
    url:process.env.DB_URL,
    entities: [User, Adress],
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
    synchronize: false,
})