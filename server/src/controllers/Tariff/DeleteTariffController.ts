import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class DeleteTariffController {
  async handle(request: Request, response: Response) {
    const { tariffs } = request.body;
    try {
      const result = await prismaClient.$transaction(async () => {
        const allDelete = [];
        for (let tariff of tariffs) {

          const deletedTariff = await prismaClient.tariff.delete({
            where: { name: tariff },
          });

          allDelete.push({ deletedTariff });
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
