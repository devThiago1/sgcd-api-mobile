import { Request, Response } from "express";
import { Posts } from "../entities/Post";
import { post_Repository } from "../repositories/post_Repository";
import { user_info_Repository } from "../repositories/user_info_Repository";
import { User } from "../entities/User";

export class PostManager {
    async insertPost(req: Request, res: Response) {
        const { message, id_user } = req.body;
        console.log(message, id_user);

        try {
            const Post = new Posts();
            Post.message = message;
            Post.user = id_user;

            await post_Repository.manager.save(Post);

            return res.status(200).json({ message: "SUCESS" });

        } catch (error) {
            return res.status(500).json({ message: 'ERROR internal' });
        }

    }

    async getPosts(req: Request, res: Response) {
        try {
            const posts = await post_Repository.createQueryBuilder("posts")
            .leftJoinAndSelect("posts.user", "user")
            .select(["posts.id",
            "posts.message",
            "user.first_name_user",
            "user.last_name_user",])
            .getMany()
                if(posts !== null){
                   return res.json({
                    posts: posts
                   }).status(200);
                }
        } catch (error) {
            return res.status(500).json({ message: 'ERROR internal' });
        }

    }

}