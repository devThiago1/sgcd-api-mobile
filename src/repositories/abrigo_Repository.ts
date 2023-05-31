import { AppDataSource } from "../data-source";
import { Abrigos } from "../entities/Abrigo";

export const abrigo_Repository = AppDataSource.getRepository(Abrigos);