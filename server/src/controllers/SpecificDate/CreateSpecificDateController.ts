import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class CreateSpecificDateController {
  async handle(request: Request, response: Response) {
    const { date, tariffs_id } = request.body;

    await prismaClient.specificDates
      .create({
        data: {
          date,
          tariffs_id,
        },
      })
      .then((createdDate) => {
        return response.json(createdDate);
      })
      .catch((err) => console.log(err));
  }
}
