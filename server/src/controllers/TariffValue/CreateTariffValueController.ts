import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";
import { ParametersError } from "../../helpers/api-errors";

export class CreateTariffValueController {
  async handle(request: Request, response: Response) {
    const { tariffs } = request.body;
    if (tariffs.length !== 5) {
      return response.status(403).json("parametros inssuficientes");
    }
    await prismaClient.tariffValues
      .createMany({
        data: tariffs,
      })
      .then((createdTariffs) => {
        return response.json(createdTariffs);
      })
      .catch((err) => console.log(err));
  }
}
