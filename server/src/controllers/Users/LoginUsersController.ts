import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prismaClient } from "../../database/prismaClient";
import bcrypt from "bcrypt";

export class LoginUsersController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    if (!username || !password) {
      return response.status(201).json({
        message: {
          type: "error",
          message: "Informe o Usuario e a Senha!",
        },
      });
    }

    await prismaClient.user
      .findFirstOrThrow({
        where: {
          username,
        },
      })
      .then(async (user) => {
        const verifyPassword = await bcrypt.compare(password, user.password);
        if (!verifyPassword) {
          throw new Error("Usuario ou senhas incorretos!");
        }
        return user;
      })
      .then(async (user) => {
        const token = jwt.sign(
          { id: user.id },
          process.env.JWT_PASS || "hash",
          {
            expiresIn: "8h",
          }
        );

        const { password: _, ...userLogin } = user;

        return response.json({
          user: userLogin,
          token: token,
          message: {
            type: "success",
            message: "Logado com sucesso!",
          },
        });
      })
      .catch((err) => {
        console.log(err);
        return response.json({
          err: err,
          message: {
            type: "error",
            message: "Usuario ou senhas incorretos!",
          },
        });
      });
  }
}
