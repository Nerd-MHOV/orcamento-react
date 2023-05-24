import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class ToggleActiveDiscountController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    await prismaClient.discounts
      .findUnique({
        where: {
          id,
        },
      })
      .then(async (getBoolean) => {
        return await prismaClient.discounts
          .update({
            where: { id },
            data: {
              active: !getBoolean?.active,
            },
          })
          .then((updated) => {
            return response.json({ msg: "success", debug: updated });
          });
      })
      .catch((err) => {
        console.log(err);
        return response.json({ msg: "error", debug: err });
      });
  }
}
