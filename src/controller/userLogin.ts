import { Request, Response } from "express";
import { user_info_Repository } from "../repositories/user_info_Repository";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { user_adress_Repository } from "../repositories/user_adress_Repository";
import { User } from "../entities/User";
import { Adress } from "../entities/Adress";


export class userLogin {
    async verfUser(req: Request, res: Response) {

        var { inputPhoneNumber, inputPassword } = req.body;
        console.log(inputPhoneNumber, inputPassword)

        let verfData = await user_info_Repository.findOneBy({ number_user: inputPhoneNumber })
        console.log(verfData);

        if (!verfData) {
            return res.status(400).json({ error: 'cpf ou senha inválidos 2' });
        }


        var verfPass = await bcrypt.compare(inputPassword, verfData.password_user);

        if (!verfPass) {
            return res.status(400).json({ error: 'CPF ou senha inválidos 1' });
        }

        
        const expiresInSeconds = 8 * 3600
        var token = jwt.sign({ id: verfData.id_user }, process.env.JWT_PASS ?? '', { expiresIn: expiresInSeconds })

        var adressUser = await user_adress_Repository.findOneBy({ id: verfData.id_user });
        console.log(adressUser)

        var { password_user: _, ...userLogin } = verfData;

        res.json({
            adressUser: adressUser,
            verfData: userLogin,
            token: token,
        }).status(200)
    }


    async verfToken(req: Request, res: Response) {
        const jwt = require('jsonwebtoken')
        try {
            const { token } = req.body;
            const tokenDecrypted = jwt.decode(token);



            if (tokenDecrypted.exp < Date.now() / 1000) {
                console.log('Invalido')
                return res.status(400).json({ error: 'ERROR' });
            }
            else {
                console.log('VALIDO')
                return res.status(200).json({ message: 'SUCESS' });
            }
        } catch (error) {
            return res.status(400).json({ error: 'error server' });
        }
    }

    async updateUser(req: Request, res: Response) {
        const { id, firstName, lastName, numero_user,password, bairro, rua, complemento, cep, numero_adress } = req.body;
    
        
        try {
            const user = await user_info_Repository.findOneBy({ id_user: id });
    
         if (!user) {
                return res.status(400).json({ error: 'Usuário não encontrado' });
            } 
    
            const adressUser = await user_adress_Repository.findOneBy({ id: user.id_user });
            console.log(adressUser)

           const isPasswordMatch = await bcrypt.compare(password, user.password_user);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'A senha fornecida está incorreta' });
    }
                       
    const hashPassword = await bcrypt.hash(password, 10);
            
     
            await user_adress_Repository
                .createQueryBuilder()
                .update(Adress)
                .set({
                    bairro_user: bairro,
                    rua_user: rua,
                    complemento_user: complemento,
                    cep_user: cep,
                    number_adress_user: numero_adress,
                })
                .where("id = :id_user", { id_user: id })
                .execute()
    
            await user_info_Repository
                .createQueryBuilder()
                .update(User)
                .set({
                    first_name_user: firstName,
                    last_name_user: lastName,
                    number_user: numero_user,
                    password_user: hashPassword,
                })
                .where("id_user = :id", { id: id })
                .execute()
    
            return res.status(200).json({ message: 'Usuário atualizado com sucesso' });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: 'Erro ao atualizar o usuário' });
        }
    }
    async getUser(req: Request, res: Response) {
        var { id } = req.body;

        var verfData = await user_info_Repository.findOneBy({ id_user: id })
        
        if (!verfData) {
            return res.status(400).json({ error: 'INTERNAL ERRO' });
        }

        var adressUser = await user_adress_Repository.findOneBy({ id: verfData.id_user });

        const expiresInSeconds = 8 * 3600;
        var token = jwt.sign({ id: verfData.id_user }, process.env.JWT_PASS ?? '', { expiresIn: expiresInSeconds });

        var { password_user: _, ...userLogin } = verfData;

        res.json({
            adressUser: adressUser,
            verfData: userLogin,
            token: token,
        }).status(200)
               
    }
 
    async updatePassword(req: Request, res: Response) {
      const { id, passwordVerf, passwordNew } = req.body;
    
        
        try {
            const user = await user_info_Repository.findOneBy({ id_user: id });
    
         if (!user) {
                return res.status(400).json({ error: 'Usuário não encontrado' });
            } 
    
          

           const isPasswordMatch = await bcrypt.compare(passwordVerf, user.password_user);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'A senha fornecida está incorreta' });
    }
                       
    const hashPassword = await bcrypt.hash(passwordNew, 10);
            
    
            await user_info_Repository
                .createQueryBuilder()
                .update(User)
                .set({
                    password_user: hashPassword,
                })
                .where("id_user = :id", { id: id })
                .execute()
    
            return res.status(200).json({ message: 'Usuário atualizado com sucesso' });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: 'Erro ao atualizar o usuário' });
        }
    }
    
}


