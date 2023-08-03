import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class CreateTariffController {
  async handle(request: Request, response: Response) {
    const { name, product_rd, food_id } = request.body;

    await prismaClient.tariff
      .create({
        data: {
          name,
          product_rd,
          active: true,
          food_id,
        },
      })
      .then((createdTariff) => {
        return response.json(createdTariff);
      })
      .catch((err) => console.log(err));
  }
}
