import { Router } from "express";
import { userLogin } from "../controller/userLogin";
import { PostManager } from "../controller/PostManager";
import { AbrigoManager } from "../controller/abrigoManager";


const routes = Router();


routes.post('/login', new userLogin().verfUser);
routes.post('/verfToken', new userLogin().verfToken);
routes.put('/updateUser', new userLogin().updateUser);
routes.get('/getNewUser', new userLogin().getUser)
routes.post('/insertPost', new PostManager().insertPost);
routes.get('/getPosts', new PostManager().getPosts);
routes.get('/getAbrigos', new AbrigoManager().getAbrigos);


export default routes;