import { Router } from "express";
import { userLogin } from "../controller/userLogin";



const routes = Router();


routes.post('/login', new userLogin().verfUser);
routes.post('/verfToken', new userLogin().verfToken);


export default routes;