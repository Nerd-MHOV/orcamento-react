import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class CreateCategoryController {
  async handle(request: Request, response: Response) {
    const { initials, name } = request.body;

    await prismaClient.categories
      .create({
        data: {
          initials,
          name,
        },
      })
      .then((createdCategory) => {
        return response.json(createdCategory);
      })
      .catch((err) => console.log(err));
  }
}
