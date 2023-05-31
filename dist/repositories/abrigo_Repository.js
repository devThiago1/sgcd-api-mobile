"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.abrigo_Repository = void 0;
const data_source_1 = require("../data-source");
const Abrigo_1 = require("../entities/Abrigo");
exports.abrigo_Repository = data_source_1.AppDataSource.getRepository(Abrigo_1.Abrigos);
