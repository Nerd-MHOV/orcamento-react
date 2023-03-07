import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class GetaRequirementController {
  async handle(request: Request, response: Response) {
    const { name } = request.body;

    try {
      const requirement = await prismaClient.requirement.findUniqueOrThrow({
        where: { name },
      });
      return response.json(requirement);
    } catch (error) {
      return response.status(500).json("Internal Error");
    }
  }
}
