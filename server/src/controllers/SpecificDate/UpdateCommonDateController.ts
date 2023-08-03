import {
  TariffValues,
  TariffCheckInValues,
  Foods,
  SpecificDates,
} from "@prisma/client";
import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class UpdateSpecificDateController {
  async handle(request: Request, response: Response) {
    const { product_rd, values, checkIn, food, dates } = request.body;
    const { name } = request.params;
    try {
      const [limparDates, createNewDates] = await prismaClient.$transaction([
        prismaClient.specificDates.deleteMany({ where: { tariffs_id: name } }),
        prismaClient.specificDates.createMany({ data: dates }),
      ]);

      for (const val of values) {
        const { id: id, ...newValues } = val;
        await prismaClient.tariffValues.update({
          where: {
            id: id,
          },
          data: newValues,
        });
      }

      for (const val of checkIn) {
        const { id: id, ...newValues } = val;

        await prismaClient.tariffCheckInValues.update({
          where: {
            id,
          },
          data: newValues,
        });
      }

      const { id: id, ...newValues } = food;
      await prismaClient.foods.update({
        where: { id },
        data: newValues,
      });

      const tariffUpdate = await prismaClient.tariff.update({
        where: {
          name,
        },
        data: {
          product_rd,
        },
        include: {
          food: true,
          TariffValues: true,
          TariffCheckInValues: true,
          SpecificDates: true,
        },
      });

      return response.json({
        msg: "success",
        debug: tariffUpdate,
      });
    } catch (err) {
      console.log("============================================");
      console.log(err);
      console.log("============================================");

      return response.json({ msg: "error", debug: err });
    }
  }
}
