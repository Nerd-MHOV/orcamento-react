import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class FindSpecificDateController {
  async handle(request: Request, response: Response) {
    await prismaClient.specificDates
      .findMany()
      .then((dates) => {
        return response.json(dates);
      })
      .catch((err) => console.log(err));
  }
}
