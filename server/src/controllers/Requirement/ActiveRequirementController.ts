import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class ActiveRequirementController {
  async handle(request: Request, response: Response) {
    const { name } = request.params;

    try {
      const first = await prismaClient.requirement.findUniqueOrThrow({
        where: {
          name,
        },
      });

      const requirement = await prismaClient.requirement.update({
        where: { name },
        data: {
          active: !first.active,
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
