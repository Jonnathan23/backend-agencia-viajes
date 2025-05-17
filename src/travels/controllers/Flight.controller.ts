import { Response, Request } from 'express';
import Flight from '../models/flights.model';

export class FlightController {
    //Gets
    static getAllFlights = async (req: Request, res: Response) => {
        try {
            const allFlights = await Flight.findAll()
            res.status(200).send(allFlights)
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }

    static getFlightById = async (req: Request, res: Response) => {
        try {
            const flightFound = req.flight
            res.status(200).send(flightFound)
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }

    //Post
    static createFlight = async (req: Request, res: Response) => {
        try {
            const newFlight = new Flight(req.body)
            await newFlight.save()
            res.status(201).send('Vuelo creado')
        } catch(error) {
            res.status(500).json({ errors: error })
        }
    }

    //Puts
    static updateFlight = async (req: Request, res: Response) => {
        try {
            const flightFound = req.flight
            await flightFound.update(req.body)
            res.status(200).send('Vuelo actualizado')
        } catch(error) {
            res.status(500).json({ errors: error })
        }
    }

    //Deletes
    static deleteFlight = async (req: Request, res: Response) => {
        try {
            const flightFound = req.flight
            await flightFound.destroy()
            res.status(200).send('Vuelo eliminado')
        } catch(error) {
            res.status(500).json({ errors: error })
        }
    }
}