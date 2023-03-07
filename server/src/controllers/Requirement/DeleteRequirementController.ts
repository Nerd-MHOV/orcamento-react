import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class DeleteRequirementController {
  async handle(request: Request, response: Response) {
    const { name } = request.params;
    const user = request.user;

    try {
      if (!user || (user.level && user.level < 3))
        throw new Error("Sem permissão");

      const requirement = await prismaClient.requirement.delete({
        where: {
          name,
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
