import { Request, Response } from "express";
import { user_info_Repository } from "../repositories/user_info_Repository";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export class userLogin {
    async verfUser(req: Request, res: Response) {

        const { inputPhoneNumber, inputPassword } = req.body;
        console.log(inputPhoneNumber, inputPassword)

        const verfData = await user_info_Repository.findOneBy({ number_user: inputPhoneNumber })


        if (!verfData) {
            return res.status(400).json({ error: 'cpf ou senha inválidos 2' });
        }
        console.log(verfData.number_user, inputPhoneNumber)

        const verfPass = await bcrypt.compare(inputPassword, verfData.password_user);

        if (!verfPass) {
            return res.status(400).json({ error: 'CPF ou senha inválidos 1' });
        }

        const expiresInHours = 8;
        const expiresInSeconds = expiresInHours * 3600
        const token = jwt.sign({ id: verfData.id_user }, process.env.JWT_PASS ?? '', { expiresIn: expiresInSeconds })

        const { password_user: _, ...userLogin } = verfData;

        res.json({
            verfData: userLogin,
            token: token,
        }).status(200)
    }


    async verfToken(req: Request, res: Response) {
            const jwt =  require('jsonwebtoken')
        
            const { token } = req.body;
            const tokenDecrypted = jwt.verify(token, process.env.JWT_PASS ?? '', {ignoreExpiration: false} )
            console.log(tokenDecrypted)
            
            const tokenExpiresIn = tokenDecrypted.exp;
            const timeNoW = Math.floor(Date.now() / 1000);
            
        

            if(tokenExpiresIn < timeNoW){
                console.log('Invalido')
                return res.status(400).json({error: 'ERROR'});
            }
            else{
                console.log('VALIDO')
                return res.status(200).json({message: 'SUCESS'});
            }
    }
}
