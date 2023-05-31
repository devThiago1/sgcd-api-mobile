"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_adress_Repository = void 0;
const data_source_1 = require("../data-source");
const Adress_1 = require("../entities/Adress");
exports.user_adress_Repository = data_source_1.AppDataSource.getRepository(Adress_1.Adress);
