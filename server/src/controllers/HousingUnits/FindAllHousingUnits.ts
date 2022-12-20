import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class FindAllHousingUnits {
  async handle(request: Request, response: Response) {
    const hus = await prismaClient.hUs.findMany({
      include: {
        category: true,
      },
    });

    return response.json(hus);
  }
}
