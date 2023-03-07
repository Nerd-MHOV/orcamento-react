import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class DeleteUsersController {
  async handle(request: Request, response: Response) {
    const user = request.user;
    const { id } = request.params;

    if (!user || (user.level && user.level < 3)) {
      return response.json("Sem permissão").status(500);
    }
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
