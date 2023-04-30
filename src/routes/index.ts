import { Router } from "express";
import { userLogin } from "../controller/userLogin";



const routes = Router();


routes.post('/login', new userLogin().verfUser);


export default routes;