import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class PriceRequirementController {
  async handle(request: Request, response: Response) {
    const { name, price } = request.body;

    try {
      const update = await prismaClient.requirement.update({
        where: { name },
        data: { price },
      });
      return response.json(update);
    } catch (error) {
      return response.json({
        err: error,
        message: {
          type: "error",
          message: "Erro, tente novamente!",
        },
      });
    }
  }
}
