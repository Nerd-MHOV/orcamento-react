import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class DeleteTariffController {
  async handle(request: Request, response: Response) {
    const { tariffs } = request.body;
    try {
      const result = await prismaClient.$transaction(async () => {
        const allDelete = [];
        for (let tariff of tariffs) {
          const deleteValues = await prismaClient.tariffValues.deleteMany({
            where: {
              tariffs_id: tariff,
            },
          });

          const deletedEarly =
            await prismaClient.tariffCheckInValues.deleteMany({
              where: {
                tariffs_id: tariff,
              },
            });

          const deleteCommonDate = await prismaClient.commonDates.deleteMany({
            where: {
              OR: [
                { tariff_to_midweek_id: tariff },
                { tariff_to_weekend_id: tariff },
              ],
            },
          });

          const deleteSpecificDate =
            await prismaClient.specificDates.deleteMany({
              where: {
                tariffs_id: tariff,
              },
            });

          console.log(deleteCommonDate, deleteSpecificDate);

          const deletedTariff = await prismaClient.tariff.delete({
            where: { name: tariff },
          });

          if (deletedTariff.food_id !== 1) {
            await prismaClient.foods.delete({
              where: {
                id: deletedTariff.food_id,
              },
            });
          }
          allDelete.push({ deletedTariff, deleteValues, deletedEarly });
        }
        return allDelete;
      });
      return response.json({ result });
    } catch (error) {
      console.log(error);
      return response.json(error);
    }
  }
}
