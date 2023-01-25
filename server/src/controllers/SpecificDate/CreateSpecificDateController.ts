import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class CreateSpecificDateController {
  async handle(request: Request, response: Response) {
    const { tariffs } = request.body;

    try {
      const tariff = tariffs[0];
      const { id: foodId, tariffs_id: _tariffs, ...food } = tariff.food;
      const earlyWithoutIds = tariff.TariffCheckInValues.map((value: any) => {
        const { id: _, tariffs_id: _tariffs, ...rest } = value;
        return rest;
      });
      const valuesWithoutId = tariff.TariffValues.map((value: any) => {
        const { id: _, tariffs_id: _tariffs, ...rest } = value;
        return rest;
      });
      const specificWithoutTariffs = tariff.SpecificDates.map((value: any) => {
        const { tariffs_id: _, ...rest } = value;
        return rest;
      });
      const specificCreate = await prismaClient.tariff.create({
        data: {
          name: tariff.name,
          product_pipe: tariff.product_pipe,
          active: tariff.active,
          food: {
            connectOrCreate: {
              where: { id: foodId },
              create: food,
            },
          },
          TariffCheckInValues: {
            createMany: {
              data: earlyWithoutIds,
            },
          },
          TariffValues: {
            createMany: {
              data: valuesWithoutId,
            },
          },
          SpecificDates: {
            createMany: {
              data: specificWithoutTariffs,
            },
          },
        },
      });
      return response.json({ msg: "success", debug: specificCreate });
    } catch (err) {
      console.log(err);

      return response.json({ msg: "error", debug: err });
    }
  }
}
