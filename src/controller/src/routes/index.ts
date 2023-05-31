import { Router } from "express";
import { userLogin } from "../controller/userLogin";
import { PostManager } from "../controller/PostManager";



const routes = Router();


routes.post('/login', new userLogin().verfUser);
routes.post('/verfToken', new userLogin().verfToken);
routes.post('/update', new userLogin().updateUser);
routes.post('/insertPost', new PostManager().insertPost);
routes.get('/getPosts', new PostManager().getPosts);


export default routes;