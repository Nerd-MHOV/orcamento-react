import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class FindTariffController {
  async handle(request: Request, response: Response) {
    await prismaClient.tariff
      .findMany()
      .then((tariffs) => {
        return response.json(tariffs);
      })
      .catch((err) => console.log(err));
  }
}
