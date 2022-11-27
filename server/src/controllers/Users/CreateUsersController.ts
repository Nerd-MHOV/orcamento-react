import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";
import bcrypt from 'bcrypt'


export class CreateUserController {
    async handle(request: Request, response: Response) {
        const { name, email, password, phone, username } = request.body;

        await bcrypt.hash(password, 10)
            .then(async (hashPassword) => {
               return await prismaClient.user.create({
                    data: {
                        name, email, password: hashPassword, phone, username
                    }
                })
        
            })
            .then((newUser) => {

                const { password: _, ...user } = newUser

                return response.json(user)
            })
            .catch((err) => {
                return response.status(500).json({
                    err: err,
                    message: {
                        type: 'error',
                        message: 'Usuario já existe!'
                    }
                })
            })
               
    }
}