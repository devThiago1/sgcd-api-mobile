import { Request, Response } from "express";
import { user_info_Repository } from "../repositories/user_info_Repository";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export class userLogin{
    async verfUser(req: Request, res: Response){

        const { inputPhoneNumber, inputPassword } = req.body; 
        console.log(inputPhoneNumber, inputPassword)

        const verfData = await user_info_Repository.findOneBy({ number_user: inputPhoneNumber })


        if(!verfData){
            return res.status(400).json({error: 'cpf ou senha inválidos 2'});
        }
        console.log(verfData.number_user, inputPhoneNumber)

       const verfPass = await bcrypt.compare(inputPassword, verfData.password_user);

        if(!verfPass) {
            return res.status(400).json({error: 'CPF ou senha inválidos 1'});
        }

        const token = jwt.sign({id: verfData.id_user}, process.env.JWT_PASS ?? '', {expiresIn: '200h'})

        const {password_user: _, ...userLogin} = verfData;

        res.json({
            verfData: userLogin,    
            token: token,
        }).status(200)
    }}