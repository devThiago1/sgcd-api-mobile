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

        var verfData = await user_info_Repository.findOneBy({ number_user: inputPhoneNumber })
        console.log(verfData);

        if (!verfData) {
            return res.status(400).json({ error: 'cpf ou senha inválidos 2' });
        }


        var verfPass = await bcrypt.compare(inputPassword, verfData.password_user);

        if (!verfPass) {
            return res.status(400).json({ error: 'CPF ou senha inválidos 1' });
        }

        const expiresInHours = 8;
        const expiresInSeconds = expiresInHours * 3600
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
    
        const updateUser = {
            id_user: req.body.id,
            first_name_user: req.body.first_name_user,
            last_name_user:  req.body.last_name_user,
            cpf_user: req.body.cpf_user,
            email_user: req.body.email_user,
            password_user: req.body.password_user,
            number_user: req.body.number_user,
            bairro_user: req.body.bairro_user,
            cep_user: req.body.cep_user,
            complemento_user: req.body.complemento_user,
            number_adress_user: req.body.number_adress_user,
            rua_user: req.body.rua_user,
            }

        try {
            const user = await user_info_Repository.findOneBy({ id_user: updateUser.id_user });
    
            if (!user) {
                return res.status(400).json({ error: 'Usuário não encontrado' });
            }
    
            const adressUser = await user_adress_Repository.findOneBy({ id: user.id_user });
            console.log(adressUser)

            const hashPassword = await bcrypt.hash(updateUser.password_user, 10);
            const hashCpf =  await bcrypt.hash(updateUser.cpf_user, 10);
    
            await user_adress_Repository
                .createQueryBuilder()
                .update(Adress)
                .set({
                    bairro_user: updateUser.bairro_user,
                    rua_user: updateUser.rua_user,
                    complemento_user: updateUser.complemento_user,
                    cep_user: updateUser.cep_user,
                    number_adress_user: updateUser.number_adress_user,
                })
                .where("id = :id_user", { id_user: user.id_user })
                .execute()
    
            await user_info_Repository
                .createQueryBuilder()
                .update(User)
                .set({
                    first_name_user: updateUser.first_name_user,
                    last_name_user: updateUser.last_name_user,
                    number_user: updateUser.number_user,
                    cpf_user: hashCpf,
                    email_user: updateUser.email_user,
                    password_user: hashPassword,
                })
                .where("id_user = :id", { id: user.id_user })
                .execute()
    
            return res.status(200).json({ message: 'Usuário atualizado com sucesso' });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: 'Erro ao atualizar o usuário' });
        }
    }
}