import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class FindFoodController {
  async handle(request: Request, response: Response) {
    await prismaClient.foods
      .findMany()
      .then((foods) => {
        return response.json(foods);
      })
      .catch((err) => console.log(err));
  }
}
