import  express, { Request, Response }  from "express";
import { AppDataSource } from "./data-source";
import 'dotenv/config';
import 'reflect-metadata';
import routes from "./routes";


 AppDataSource.initialize().then(() => {
    const app = express();
    const bodyParser = require("body-parser");
    
    
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(routes)
    

    return app.listen(process.env.PORT);
});