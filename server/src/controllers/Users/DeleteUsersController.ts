import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class DeleteUsersController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    await prismaClient.user
      .delete({
        where: {
          id: id,
        },
      })
      .then((user) => {
        return response.json("success");
      })
      .catch((err) => {
        return response.json("error");
      });
  }
}
