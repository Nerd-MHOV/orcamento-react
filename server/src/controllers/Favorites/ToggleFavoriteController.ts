import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class ToggleFavoriteController {
  async handle(request: Request, response: Response) {
    const { id: budget_id } = request.params;
    const { id } = request.user;

    const favorite = await prismaClient.budgetsFavorites.findFirst({
      where: {
        AND: [
          {
            budget_id,
          },
          {
            user_id: id,
          },
        ],
      },
    });

    if (favorite) {
      await prismaClient.budgetsFavorites.delete({
        where: { id: favorite.id },
      });
    } else {
      await prismaClient.budgetsFavorites.create({
        data: {
          budget: {
            connect: {
              id: budget_id,
            },
          },
          users: {
            connect: {
              id,
            },
          },
        },
      });
    }

    return response.json("Success");
  }
}
