import { Request, Response } from "express";
import { abrigo_Repository } from "../repositories/abrigo_Repository";

export class AbrigoManager{
    async getAbrigos(req: Request, res: Response) {
        try {
            const abrigos = await abrigo_Repository
            .createQueryBuilder("abrigos")
            .getMany()
                if(abrigos !== null){
                   return res.json({
                    abrigos: abrigos
                   }).status(200);
                }
                else{
                    return res.status(404)
                }
        } catch (error) {
            return res.status(500).json({ message: 'ERROR internal' });
        }

    }
}