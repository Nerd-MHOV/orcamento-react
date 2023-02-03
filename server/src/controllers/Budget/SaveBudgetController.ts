import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class SaveBudgetController {
  async handle(request: Request, response: Response) {
    const { user_id, budgets } = request.body;

    const save = await prismaClient.saveBudgets.create({
      data: {
        user_id,
        budgets,
      },
    });

    return response.json(save);
  }
}
