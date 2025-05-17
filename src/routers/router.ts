import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { userExists } from "../auth/middleware/user.mid";
import { UserController } from "../auth/controllers/User.controller";
import { flightExists } from "../travels/middlewares/flights.mid";
import { FlightController } from "../travels/controllers/Flight.controller";
import { reservationExists } from "../travels/middlewares/reservations.mid";
import { ReservationController } from "../travels/controllers/Reservation.controller";

const router = Router();

// |---------------| | Users | |---------------|

// Params
router.param('usr_id',
    param('usr_id')
        .trim()
        .isString().withMessage('Identificador no válido')
        .isUUID(4).withMessage('Identificador no válido')
)

router.param('usr_id', handleInputErrors)
router.param('usr_id', userExists)

// Gets
router.get('/users/:usr_id', UserController.getUserById)

// Posts
router.post('/users',
    body('usr_id')
        .trim()
        .notEmpty().withMessage('Identificador no valido')
        .isString().withMessage('Identificador no válido')
        .isUUID(4).withMessage('Identificador no válido'),
    body('usr_first_name')
        .trim()
        .notEmpty().withMessage('El nombre es requerido')
        .isString().withMessage('Nombre no válido')
        .matches(/^[A-Za-z\s]+$/).withMessage('Nombre no válido'),
    body('usr_last_name')
        .trim()
        .notEmpty().withMessage('El apellido es requerido')
        .isString().withMessage('Apellido no válido')
        .matches(/^[A-Za-z\s]+$/).withMessage('Apellido no válido'),
    body('usr_email')
        .trim()
        .notEmpty().withMessage('El email es requerido')
        .isEmail().withMessage('Email no válido'),
    handleInputErrors,
    UserController.createUser
)

// Puts
router.put('/users/:usr_id',
    body('usr_first_name')
        .trim()
        .notEmpty().withMessage('El nombre es requerido')
        .isString().withMessage('Nombre no válido')
        .matches(/^[A-Za-z\s]+$/).withMessage('Nombre no válido'),
    body('usr_last_name')
        .trim()
        .notEmpty().withMessage('El apellido es requerido')
        .isString().withMessage('Apellido no válido')
        .matches(/^[A-Za-z\s]+$/).withMessage('Apellido no válido'),
    body('usr_email')
        .trim()
        .notEmpty().withMessage('El email es requerido')
        .isEmail().withMessage('Email no válido'),
    handleInputErrors,
    UserController.updateUser
)

// Deletes
router.delete('/users/:usr_id', UserController.deleteUser)


// |---------------| | Flights | |---------------|

router.param('flt_id',
    param('flt_id')
        .trim()
        .isString().withMessage('Identificador no válido')
        .isUUID(4).withMessage('Identificador no válido'),
)

router.param('flt_id', handleInputErrors)
router.param('flt_id', flightExists)

// Gets
router.get('/flights', FlightController.getAllFlights)
router.get('/flights/:flt_id', FlightController.getFlightById)

// Posts
router.post('/flights',
    body('flt_flight_number')
        .trim()
        .notEmpty().withMessage('No puede ir vacio el numero de vuelo'),
    body('flt_origin')
        .trim()
        .notEmpty().withMessage('No puede ir vacio el lugar de origen'),
    body('flt_destination')
        .trim()
        .notEmpty().withMessage('No puede ir vacio el lugar de destino'),
    body('flt_departure_time')
        .trim()
        .notEmpty().withMessage('No puede ir vacia la hora de salida'),
    body('flt_arrival_time')
        .trim()
        .notEmpty().withMessage('No puede ir vacia la hora de llegada'),
    body('flt_total_seats')
        .notEmpty().withMessage('No puede ir vacio el total de asientos')
        .isInt({ min: 15 }).withMessage('No puede ir vacio el total de asientos'),
    body('flt_price'),
    body('flt_is_active')
        .trim()
        .notEmpty().withMessage('No puede ir vacio el '),
    handleInputErrors,
    FlightController.createFlight
)

// Puts
router.put('/flights/update/:flt_id',
    body('flt_flight_number')
        .trim()
        .notEmpty().withMessage('No puede ir vacio el numero de vuelo'),
    body('flt_origin')
        .trim()
        .notEmpty().withMessage('No puede ir vacio el lugar de origen'),
    body('flt_destination')
        .trim()
        .notEmpty().withMessage('No puede ir vacio el lugar de destino'),
    body('flt_departure_time')
        .trim()
        .notEmpty().withMessage('No puede ir vacia la hora de salida'),
    body('flt_arrival_time')
        .trim()
        .notEmpty().withMessage('No puede ir vacia la hora de llegada'),
    body('flt_total_seats')
        .notEmpty().withMessage('No puede ir vacio el total de asientos')
        .isInt({ min: 15 }).withMessage('No puede ir vacio el total de asientos'),
    body('flt_price'),
    body('flt_is_active')
        .trim()
        .notEmpty().withMessage('No puede ir vacio el '),
    handleInputErrors,
    FlightController.updateFlight
)

// Patch
router.patch('/flights/state/:flt_id',
    body('flt_is_active')
        .trim()
        .notEmpty().withMessage('No puede ir vacio el '),
    handleInputErrors,
    FlightController.updateFlightState
)

// Deletes
router.delete('/flights/:flt_id', FlightController.deleteFlight)


// |---------------| | Reservations | |---------------|

router.param('res_id',
    param('res_id')
        .trim()
        .isString().withMessage('Identificador no válido')
        .isUUID(4).withMessage('Identificador no válido'),
)

router.param('res_id', handleInputErrors)
router.param('res_id', reservationExists)

// Gets
router.get('/reservations', ReservationController.getAllReservations)
router.get('/reservations/:res_id', ReservationController.getReservationById)

// Posts
router.post('/reservations/create/:usr_id/:flt_id',
    body('res_reserved_at')
        .trim()
        .notEmpty().withMessage('No puede ir vacio la hora de la reserva'),
    body('res_status')
        .trim()
        .notEmpty().withMessage('No puede ir vacio el estado de la reserva'),
    body('res_count_consumer')
        .trim()
        .notEmpty().withMessage('No puede ir vacia la cantidad de personas de la reserva')
        .isInt({ min: 1 }).withMessage('No puede ir vacia la cantidad de personas de la reserva'),
    handleInputErrors,
    ReservationController.createReservation
)

//Patch
router.post('/reservations/state/:usr_id/:flt_id',

    handleInputErrors,
    ReservationController.updateReservation
)

export default router;