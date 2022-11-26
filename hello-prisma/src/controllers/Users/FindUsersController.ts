import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'

export class FindUserController {
    async handle( request: Request, response: Response) {

        const user = await prismaClient.user.findMany()

        return response.json(user);
    }
}