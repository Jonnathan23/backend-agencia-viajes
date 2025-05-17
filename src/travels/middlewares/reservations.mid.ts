import { Request, Response, NextFunction } from "express";
import Reservation, { ReservationsI } from "../models/reservations.model";

declare global {
    namespace Express {
        interface Request {
            reservation: ReservationsI
        }
    }
}

export const reservationExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { res_id } = req.params;
        const reservationFound = await Reservation.findByPk(res_id);
        if (!reservationFound) {
            res.status(400).json({ errors: 'No se ha encontrado una reserva' })
            return
        }

        req.reservation = reservationFound
        next()
    } catch (error) {
        res.status(500).json({ errors: error })
        return
    }
}