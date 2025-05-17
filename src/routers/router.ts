import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { userExists } from "../auth/middleware/user.mid";
import { UserController } from "../auth/controllers/User.controller";

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


export default router;