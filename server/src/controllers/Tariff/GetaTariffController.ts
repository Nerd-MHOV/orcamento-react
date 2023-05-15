import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class GetaTariffController {
  async handle(request: Request, response: Response) {
    const { tariff_id } = request.body;

    try {
      const tariff = await prismaClient.tariff.findUniqueOrThrow({
        where: { name: tariff_id },
        include: {
          SpecificDates: true,
          food: true,
          TariffCheckInValues: true,
          tariffs_to_midweek: true,
          tariffs_to_weekend: true,
          TariffValues: true,
        },
      });

      return response.json(tariff);
    } catch (error) {
      console.log(error);

      return response.status(500).json("Internal Error");
    }
  }
}
