import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../../helpers/api-errors";

export class FindUniqueUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.body;
    await prismaClient.user
      .findUnique({
        where: { id },
      })
      .then((user) => {
        if (!user) throw new UnauthorizedError("Usuário não encontrado");
        const { password: _, ...userLogin } = user;

        return response.json(userLogin);
      })
      .catch((err) => {
        return response.json({
          err: err,
          message: {
            type: "error",
            message: "Erro, tente novamente!",
          },
        });
      });
  }
}
