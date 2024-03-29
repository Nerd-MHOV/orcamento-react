import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class FindTariffController {
  async handle(request: Request, response: Response) {
    await prismaClient.tariff
      .findMany({
        include: {
          food: true,
          TariffCheckInValues: true,
          TariffValues: {
            orderBy: {
              adt: "asc",
            },
          },
          tariffs_to_midweek: true,
          tariffs_to_weekend: true,
          SpecificDates: true,
        },
        orderBy: {
          name: "asc",
        },
      })
      .then((tariffs) => {
        return response.json(tariffs);
      })
      .catch((err) => console.log(err));
  }
}
