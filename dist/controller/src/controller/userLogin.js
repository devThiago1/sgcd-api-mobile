"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = void 0;
const user_info_Repository_1 = require("../repositories/user_info_Repository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_adress_Repository_1 = require("../repositories/user_adress_Repository");
const User_1 = require("../entities/User");
const Adress_1 = require("../entities/Adress");
class userLogin {
    async verfUser(req, res) {
        var _a;
        var { inputPhoneNumber, inputPassword } = req.body;
        console.log(inputPhoneNumber, inputPassword);
        var verfData = await user_info_Repository_1.user_info_Repository.findOneBy({ number_user: inputPhoneNumber });
        console.log(verfData);
        if (!verfData) {
            return res.status(400).json({ error: 'cpf ou senha inválidos 2' });
        }
        var verfPass = bcrypt_1.default.compare(inputPassword, verfData.password_user);
        if (!verfPass) {
            return res.json({ verfData, verfPass }).status(400);
        }
        const expiresInHours = 8;
        const expiresInSeconds = expiresInHours * 3600;
        var token = jsonwebtoken_1.default.sign({ id: verfData.id_user }, (_a = process.env.JWT_PASS) !== null && _a !== void 0 ? _a : '', { expiresIn: expiresInSeconds });
        var adressUser = await user_adress_Repository_1.user_adress_Repository.findOneBy({ id: verfData.id_user });
        console.log(adressUser);
        var { password_user: _, ...userLogin } = verfData;
        res.json({
            adressUser: adressUser,
            verfData: userLogin,
            token: token,
        }).status(200);
    }
    async verfToken(req, res) {
        const jwt = require('jsonwebtoken');
        try {
            const { token } = req.body;
            const tokenDecrypted = jwt.decode(token);
            if (tokenDecrypted.exp < Date.now() / 1000) {
                console.log('Invalido');
                return res.status(400).json({ error: 'ERROR' });
            }
            else {
                console.log('VALIDO');
                return res.status(200).json({ message: 'SUCESS' });
            }
        }
        catch (error) {
            return res.status(400).json({ error: 'error server' });
        }
    }
    async updateUser(req, res) {
        const { id, number, cpf, email, password, bairro, rua, complemento, cep, numero } = req.body;
        try {
            const user = await user_info_Repository_1.user_info_Repository.findOneBy({ id_user: id });
            if (!user) {
                return res.status(400).json({ error: 'Usuário não encontrado' });
            }
            const adressUser = await user_adress_Repository_1.user_adress_Repository.findOneBy({ id: user.id_user });
            console.log(adressUser);
            await user_info_Repository_1.user_info_Repository
                .createQueryBuilder()
                .update(User_1.User)
                .set({
                first_name_user: firstName,
                last_name_user: lastName,
                number_user: number,
                cpf_user: cpf,
                email_user: email,
                password_user: password,
            })
                .where("id_user = :id", { id: id })
                .execute();
            await user_adress_Repository_1.user_adress_Repository
                .createQueryBuilder()
                .update(Adress_1.Adress)
                .set({
                bairro_user: bairro,
                rua_user: rua,
                complemento_user: complemento,
                cep_user: cep,
                number_adress_user: numero,
            })
                .where("id: = :user.id_user", { id: id })
                .execute();
        }
        catch (error) {
            console.error(error);
            return res.status(400).json({ error: 'Erro ao atualizar o usuário' });
        }
    }
}
exports.userLogin = userLogin;
