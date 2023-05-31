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
        var verfPass = await bcrypt_1.default.compare(inputPassword, verfData.password_user);
        if (!verfPass) {
            return res.status(400).json({ error: 'CPF ou senha inválidos 1' });
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
        const updateUser = {
            id_user: req.body.id,
            first_name_user: req.body.first_name_user,
            last_name_user: req.body.last_name_user,
            cpf_user: req.body.cpf_user,
            email_user: req.body.email_user,
            password_user: req.body.password_user,
            number_user: req.body.number_user,
            bairro_user: req.body.bairro_user,
            cep_user: req.body.cep_user,
            complemento_user: req.body.complemento_user,
            number_adress_user: req.body.number_adress_user,
            rua_user: req.body.rua_user,
        };
        try {
            const user = await user_info_Repository_1.user_info_Repository.findOneBy({ id_user: updateUser.id_user });
            if (!user) {
                return res.status(400).json({ error: 'Usuário não encontrado' });
            }
            const adressUser = await user_adress_Repository_1.user_adress_Repository.findOneBy({ id: user.id_user });
            console.log(adressUser);
            await user_adress_Repository_1.user_adress_Repository
                .createQueryBuilder()
                .update(Adress_1.Adress)
                .set({
                bairro_user: updateUser.bairro_user,
                rua_user: updateUser.rua_user,
                complemento_user: updateUser.complemento_user,
                cep_user: updateUser.cep_user,
                number_adress_user: updateUser.number_adress_user,
            })
                .where("id = :id_user", { id_user: user.id_user })
                .execute();
            await user_info_Repository_1.user_info_Repository
                .createQueryBuilder()
                .update(User_1.User)
                .set({
                first_name_user: updateUser.first_name_user,
                last_name_user: updateUser.last_name_user,
                number_user: updateUser.number_user,
                cpf_user: updateUser.cpf_user,
                email_user: updateUser.email_user,
                password_user: updateUser.password_user,
            })
                .where("id_user = :id", { id: user.id_user })
                .execute();
            return res.status(200).json({ message: 'Usuário atualizado com sucesso' });
        }
        catch (error) {
            console.error(error);
            return res.status(400).json({ error: 'Erro ao atualizar o usuário' });
        }
    }
}
exports.userLogin = userLogin;
