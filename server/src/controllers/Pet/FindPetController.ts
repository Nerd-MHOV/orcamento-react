import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class FindPetController {
  async handle(request: Request, response: Response) {
    await prismaClient.pet
      .findMany()
      .then((pets_daily) => {
        return response.json(pets_daily);
      })
      .catch((err) => console.log(err));
  }
}
