import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class GetDiscountController {
  async handle(request: Request, response: Response) {
    await prismaClient.discounts
      .findMany({
        include: {
          dates: true,
        },
      })
      .then((dates) => {
        return response.json(dates);
      })
      .catch((err) => console.log(err));
  }
}
