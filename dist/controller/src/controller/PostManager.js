"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostManager = void 0;
const Post_1 = require("../entities/Post");
const post_Repository_1 = require("../repositories/post_Repository");
class PostManager {
    async insertPost(req, res) {
        const { message, id_user } = req.body;
        console.log(message, id_user);
        try {
            const Post = new Post_1.Posts();
            Post.message = message;
            Post.user = id_user;
            await post_Repository_1.post_Repository.manager.save(Post);
            return res.status(200).json({ message: "SUCESS" });
        }
        catch (error) {
            return res.status(500).json({ message: 'ERROR internal' });
        }
    }
    async getPosts(req, res) {
        try {
            const posts = await post_Repository_1.post_Repository.createQueryBuilder("posts")
                .leftJoinAndSelect("posts.user", "user")
                .select(["posts.id",
                "posts.message",
                "user.first_name_user",
                "user.last_name_user",])
                .getMany();
            if (posts !== null) {
                return res.json({
                    posts: posts
                }).status(200);
            }
        }
        catch (error) {
            return res.status(500).json({ message: 'ERROR internal' });
        }
    }
}
exports.PostManager = PostManager;
