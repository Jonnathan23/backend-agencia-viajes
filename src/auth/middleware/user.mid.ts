import { Request, Response, NextFunction } from "express";
import User, { UserI } from "../models/User.model";

declare global {
    namespace Express {
        interface Request {
            user: UserI
        }
    }
}


/**
 * @description Verifica si el usuario existe 
 */
export const userExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { usr_id} = req.params;
        const userFound = await User.findByPk(usr_id);
        if(!userFound) {
            res.status(400).json({ errors: 'No existe un usuario con ese id' })
            return
        }

        req.user = userFound
        next()
    } catch (error) {
        res.status(500).json({ errors: error })
        return
    }
}