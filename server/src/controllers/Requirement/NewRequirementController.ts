import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class NewRequirementController {
  async handle(request: Request, response: Response) {
    const { name, price, typeModal, type } = request.body;

    try {
      const requirement = await prismaClient.requirement.create({
        data: {
          name,
          price: Number(price),
          typeModal,
          type
        },
      });

      return response.json(requirement);
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
