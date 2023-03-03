import { Request, Response } from "express";

import jwt from "jsonwebtoken";
import { prismaClient } from "../../database/prismaClient";

type JwtPayload = {
  id: string;
};

export class ValidateUsersController {
  async handle(request: Request, response: Response) {
    const { authorization } = request.headers;

    try {
      if (!authorization) {
        throw new Error("Não Autorizado");
      }

      const getToken = authorization.split(" ");
      let token;
      if (getToken.length === 2) token = getToken[1];
      else token = getToken[0];

      const { id } = jwt.verify(
        token,
        process.env.JWT_PASS ?? "hash"
      ) as JwtPayload;
      const user = await prismaClient.user.findUniqueOrThrow({
        where: {
          id,
        },
      });

      const { password: _, ...userLogged } = user;

      request.user = userLogged;

      return response.json(userLogged);
    } catch (err) {
      return response.status(401).json({
        err: err,
        message: {
          type: "error",
          message: "Não autorizado!",
        },
      });
    }
  }
}
