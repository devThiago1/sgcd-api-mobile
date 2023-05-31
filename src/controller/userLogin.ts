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
        var { id, firstName, lastName, numero_user, cpf, email, password, bairro, rua, complemento, cep, numero_adress } = req.body;

        try {
            const user = await user_info_Repository.findOneBy({ id_user: id });

            if (!user) {
                return res.status(400).json({ error: 'Usuário não encontrado' });
            }

            const adressUser = await user_adress_Repository.findOneBy({ id: user.id_user });
            console.log(adressUser)

            const updateAdressQuery = `
            UPDATE adress
            SET bairro_user = $1,
                rua_user = $2,
                complemento_user = $3,
                cep_user = $4,
                number_adress_user = $5
            WHERE id = $6
        `;
            await user_adress_Repository.query(updateAdressQuery, [bairro, rua, complemento, cep, numero_adress, user.id_user]);


            const updateUserQuery = `
            UPDATE users
            SET first_name_user = $1,
                last_name_user = $2,
                number_user = $3,
                cpf_user = $4,
                email_user = $5,
                password_user = $6
            WHERE id_user = $7
        `;
        await user_info_Repository.query(updateUserQuery, [firstName, lastName, numero_user, cpf, email, password, id]);

        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: 'Erro ao atualizar o usuário' });
        }
    }
}