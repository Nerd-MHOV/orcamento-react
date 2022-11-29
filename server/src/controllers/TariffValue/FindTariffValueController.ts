import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class FindTariffValueController {
  async handle(request: Request, response: Response) {
    await prismaClient.tariffValues
      .findMany()
      .then((tariffs) => {
        return response.json(tariffs);
      })
      .catch((err) => console.log(err));
  }
}
