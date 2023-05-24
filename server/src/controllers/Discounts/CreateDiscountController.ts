import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class CreateDiscountController {
  async handle(request: Request, response: Response) {
    const { name, percent_general, percent_unitary, dates, daily_courtesy } =
      request.body;
    await prismaClient.discounts
      .create({
        data: {
          name,
          percent_general,
          percent_unitary,
          daily_courtesy,
          dates: {
            createMany: {
              data: dates,
            },
          },
        },
      })
      .then((newDiscounts) => {
        return response.json({ msg: "success", debug: newDiscounts });
      })
      .catch((err) => {
        console.log(err);
        return response.status(500).json({ msg: "error", debug: err });
      });
  }
}
