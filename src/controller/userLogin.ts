import { Request, Response } from "express";
import { user_info_Repository } from "../repositories/user_info_Repository";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { user_adress_Repository } from "../repositories/user_adress_Repository";

export class userLogin {
    async verfUser(req: Request, res: Response) {

        const { inputPhoneNumber, inputPassword } = req.body;
        console.log(inputPhoneNumber, inputPassword)

        const verfData = await user_info_Repository.findOneBy({ number_user: inputPhoneNumber })


        if (!verfData) {
            return res.status(400).json({ error: 'cpf ou senha inválidos 2' });
        }
        

        const verfPass = await bcrypt.compare(inputPassword, verfData.password_user);

        if (!verfPass) {
            return res.status(400).json({ error: 'CPF ou senha inválidos 1' });
        }

        const expiresInHours = 8;
        const expiresInSeconds = expiresInHours * 3600
        const token = jwt.sign({ id: verfData.id_user }, process.env.JWT_PASS ?? '', { expiresIn: expiresInSeconds })
        
        const adressUser =  await user_adress_Repository.findOneBy({ id: verfData.id_user });
        console.log(adressUser)

        const { password_user: _, ...userLogin } = verfData;

        res.json({
            adressUser,
            verfData: userLogin,
            token: token,
        }).status(200)
    }


    async verfToken(req: Request, res: Response) {
            const jwt =  require('jsonwebtoken')
        try{
            const { token } = req.body;
            const tokenDecrypted = jwt.decode(token);
            
            
        
            if(tokenDecrypted.exp < Date.now() / 1000){
                console.log('Invalido')
                return res.status(400).json({error: 'ERROR'});
            }
            else{
                console.log('VALIDO')
                return res.status(200).json({message: 'SUCESS'});
            }
        }catch(error){
            return res.status(400).json({error:'error server'});
        }
    }
}
