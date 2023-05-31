"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbrigoManager = void 0;
const abrigo_Repository_1 = require("../repositories/abrigo_Repository");
class AbrigoManager {
    async getAbrigos(req, res) {
        try {
            const abrigos = await abrigo_Repository_1.abrigo_Repository
                .createQueryBuilder("abrigos")
                .getMany();
            if (abrigos !== null) {
                return res.json({
                    abrigos: abrigos
                }).status(200);
            }
            else {
                return res.status(404);
            }
        }
        catch (error) {
            return res.status(500).json({ message: 'ERROR internal' });
        }
    }
}
exports.AbrigoManager = AbrigoManager;
