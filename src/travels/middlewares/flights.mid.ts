import { Request, Response, NextFunction } from "express";
import Flight, { FlightsI } from "../models/flights.model";

declare global {
    namespace Express {
        interface Request {
            flight: FlightsI
        }
    }
}

export const flightExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { flt_id } = req.params;
        const flightFound = await Flight.findByPk(flt_id);
        if (!flightFound) {
            res.status(400).json({ errors: 'No existe un vuelo con ese id' })
            return
        }

        req.flight = flightFound
        next()

    } catch (error) {
        res.status(500).json({ errors: error })
        return
    }
}
