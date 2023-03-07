import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class FindRequirementsController {
  async handle(request: Request, response: Response) {
    const requirements = await prismaClient.requirement.findMany({
      orderBy: {
        name: "desc",
      },
    });

    return response.json(requirements);
  }
}
