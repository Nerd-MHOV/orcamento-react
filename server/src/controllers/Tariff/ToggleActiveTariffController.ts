import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class ToggleActiveTariffController {
  async handle(request: Request, response: Response) {
    const { name, active } = request.body;

    const toggleActive = await prismaClient.tariff.update({
      where: {
        name,
      },
      data: {
        active,
      },
    });

    return response.json({
      toggleActive,
      active,
    });
  }
}
