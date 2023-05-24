import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class UpdateDiscountController {
  async handle(request: Request, response: Response) {
    const { percent_general, percent_unitary, dates } = request.body;
    const { id } = request.params;

    console.log(dates, "DATES");

    await prismaClient.discounts
      .update({
        where: { id },
        data: {
          percent_general,
          percent_unitary,
          dates: {
            deleteMany: {
              discount_id: id,
              NOT: dates.map(({ date }: { date: string }) => ({ date })),
            },
            upsert: dates.map((date: { date: string }) => ({
              where: { date: date.date },
              create: date,
              update: date,
            })),
          },
        },
        include: {
          dates: true,
        },
      })
      .then(async (discount) => {
        return response.json({ msg: "success", debug: discount });
      })
      .catch((err) => {
        console.log(err);
        return response.json({ msg: "error", debug: err });
      });
  }
}
