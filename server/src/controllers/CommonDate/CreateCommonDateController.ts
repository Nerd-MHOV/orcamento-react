import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class CreateCommonDateController {
  async handle(request: Request, response: Response) {
    const { date, tariff_to_midweek_id, tariff_to_weekend_id } = request.body;

    await prismaClient.commonDates
      .create({
        data: {
          date,
          tariff_to_midweek_id,
          tariff_to_weekend_id,
        },
      })
      .then((createdDate) => {
        return response.json(createdDate);
      })
      .catch((err) => console.log(err));
  }
}
