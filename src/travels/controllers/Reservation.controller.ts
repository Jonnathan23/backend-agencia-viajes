import { Response, Request } from 'express';
import Reservation from '../models/reservations.model';

export class ReservationController {

    //gets
    static getAllReservations = async (req: Request, res: Response) => {
        try {
            const allReservations = await Reservation.findAll()
            res.status(200).send(allReservations)
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }

    static getReservationById = async (req: Request, res: Response) => {
        try {
            const reservationFound = req.reservation
            res.status(200).send(reservationFound)
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }

    static getAllReservationsByUser = async (req: Request, res: Response) => {
        try {
            const user = req.user
            const reservationsFound = await Reservation.findAll({ where: { res_usr_id: user.usr_id } })
            res.status(200).send(reservationsFound)
        } catch(error) {
            res.status(500).json({ errors: error })
        }
    }

    //post
    static createReservation = async (req: Request, res: Response) => {
        try {
            const { res_count_consumer } = req.body
            const user = req.user
            const flight = req.flight

            if(res_count_consumer > flight.flt_total_seats) {
                res.status(400).json({ errors: 'No hay cupos disponibles' })
                return
            }

            const newReservation = new Reservation(req.body)
            newReservation.res_usr_id = user.usr_id
            newReservation.res_flt_id = flight.flt_id
            flight.flt_total_seats -= res_count_consumer

            await flight.save()
            await newReservation.save()
            res.status(201).send('Reserva creada')
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }

    //patch
    static updateReservation = async (req: Request, res: Response) => {
        try {
            const user = req.user
            const flight = req.flight

            const reservationFound = req.reservation

            reservationFound.res_status = req.body.res_status
            reservationFound.res_usr_id = user.usr_id
            reservationFound.res_flt_id = flight.flt_id

            res.status(200).send('Reserva actualizada')
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }

    static deleteReservation = async (req: Request, res: Response) => {
        try {
            const reservationFound = req.reservation
            await reservationFound.destroy()
            res.status(200).send('Reserva eliminada')
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }
}