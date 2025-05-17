import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";


/**
 * @description Recupera todos los errores que se generan en las validaciones de los campos
 */
export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
}