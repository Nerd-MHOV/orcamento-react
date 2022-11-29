import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class CreatePetController {
  async handle(request: Request, response: Response) {
    const { carrying, daily_price } = request.body;

    await prismaClient.pet
      .create({
        data: {
          carrying,
          daily_price,
        },
      })
      .then((createdPet) => {
        return response.json(createdPet);
      })
      .catch((err) => console.log(err));
  }
}
