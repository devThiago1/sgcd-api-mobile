import { DataSource } from "typeorm";
import 'dotenv/config';
import 'reflect-metadata';
import { Posts } from "./entities/Post";
import { User } from "./entities/User";
import { Adress } from "./entities/Adress";
import { Abrigos } from "./entities/Abrigo";


const DB_PORT = process.env.DB_PORT as number | undefined;

export const AppDataSource = new DataSource({
    type: "postgres",
    url:process.env.DB_URL,
    entities: [Posts, User, Adress, Abrigos],
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
})