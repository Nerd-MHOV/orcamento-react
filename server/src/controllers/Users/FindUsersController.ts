import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import jwt from 'jsonwebtoken'

export class FindUserController {
    async handle( request: Request, response: Response) {    

        await prismaClient.user.findMany()
        .then((user) => {
            return response.json(user)
        })
        .catch((err) => {
            return response.json({
                err: err,
                message: {
                    type: 'error',
                    message: 'Erro, tente novamente!'
                }
            })
        })

    }
}