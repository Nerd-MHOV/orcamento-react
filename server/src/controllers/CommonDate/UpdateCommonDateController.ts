import { TariffValues, TariffCheckInValues, Foods } from "@prisma/client";
import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class UpdateCommonDateController {
  async handle(request: Request, response: Response) {
    const { product_pipe, values, checkIn, food } = request.body;
    const { name } = request.params;
    try {
      values.forEach(async (val: TariffValues) => {
        const { id: id, ...newValues } = val;
        await prismaClient.tariffValues.update({
          where: {
            id: id,
          },
          data: newValues,
        });
      });

      checkIn.forEach(async (val: TariffCheckInValues) => {
        const { id: id, ...newValues } = val;

        await prismaClient.tariffCheckInValues.update({
          where: {
            id,
          },
          data: newValues,
        });
      });

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
          product_pipe,
        },
        include: {
          food: true,
          TariffValues: true,
          TariffCheckInValues: true,
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
