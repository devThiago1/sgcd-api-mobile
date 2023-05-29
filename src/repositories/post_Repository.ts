import { AppDataSource } from "../data-source";
import { Posts } from "../entities/Post";

export const post_Repository = AppDataSource.getRepository(Posts);