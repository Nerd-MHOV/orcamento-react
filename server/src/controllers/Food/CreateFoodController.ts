import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class CreateFoodController {
  async handle(request: Request, response: Response) {
    const { adt, adtex, chd0, chd4, chd8 } = request.body;

    await prismaClient.foods
      .create({
        data: {
          adt,
          adtex,
          chd0,
          chd4,
          chd8,
        },
      })
      .then((createdFood) => {
        return response.json(createdFood);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
