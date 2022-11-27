import { Request, Response } from "express";


export class ValidateUsersController {
    async handle( request: Request, response: Response) {
        return request.user
    }
}