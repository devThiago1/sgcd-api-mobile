"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_info_Repository = void 0;
const data_source_1 = require("../data-source");
const User_1 = require("../entities/User");
exports.user_info_Repository = data_source_1.AppDataSource.getRepository(User_1.User);
