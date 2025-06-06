import { Request, Response } from "express";
import User from "../models/User.model";

export class UserController {
    // Gets
    static getUserById = async (req: Request, res: Response) => {
        try {
            const userFound = req.user
            res.status(200).send(userFound)
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }

    // Posts
    static createUser = async (req: Request, res: Response) => {
        try {
            const userFound = await User.findOne({ where: { usr_email: req.body.usr_email } })
            if (userFound) {
                res.status(400).json({ errors: 'Ya existe un usuario con ese email' })
                return
            }
            
            const userFound2 = await User.findOne({ where: { usr_id: req.body.usr_id } })
            if (userFound2) {
                res.status(400).json({ errors: 'Ya existe un usuario con ese id' })
                return
            }

            const newUser = new User(req.body)
            await newUser.save()
            res.status(201).send('Usuario creado')
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }

    // Puts
    static updateUser = async (req: Request, res: Response) => {
        try {
            const userUpdate = req.user
            await userUpdate.update(req.body)
            res.status(200).send('Usuario actualizado')
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }

    static deleteUser = async (req: Request, res: Response) => {
        try {
            const userDelete = req.user
            await userDelete.destroy()
            res.status(200).send('Usuario eliminado')
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }
}