import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class DeleteDiscountController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    await prismaClient.discounts
      .delete({
        where: {
          id,
        },
      })
      .then(async (deleted) => {
        return response.json({ msg: "success", debug: deleted });
      })
      .catch((err) => {
        console.log(err);
        return response.json({ msg: "error", debug: err });
      });
  }
}
