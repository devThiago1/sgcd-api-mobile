"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
require("dotenv/config");
require("reflect-metadata");
const Post_1 = require("./entities/Post");
const User_1 = require("./entities/User");
const Adress_1 = require("./entities/Adress");
const Abrigo_1 = require("./entities/Abrigo");
const DB_PORT = process.env.DB_PORT;
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.DB_URL,
    entities: [Post_1.Posts, User_1.User, Adress_1.Adress, Abrigo_1.Abrigos],
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
});
