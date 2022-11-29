import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class FindCategoryController {
  async handle(request: Request, response: Response) {
    await prismaClient.categories
      .findMany()
      .then((categories) => {
        return response.json(categories);
      })
      .catch((err) => console.log(err));
  }
}
