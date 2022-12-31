import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class FindTariffController {
  async handle(request: Request, response: Response) {
    await prismaClient.tariff
      .findMany({
        include: {
          food: true,
          TariffCheckInValues: true,
          TariffValues: true,
          tariffs_to_midweek: true,
          tariffs_to_weekend: true,
          SpecificDates: true,
        },
        orderBy: {
          order_id: "desc",
        },
      })
      .then((tariffs) => {
        return response.json(tariffs);
      })
      .catch((err) => console.log(err));
  }
}
