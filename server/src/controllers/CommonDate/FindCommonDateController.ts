import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class FindCommonDateController {
  async handle(request: Request, response: Response) {
    await prismaClient.commonDates
      .findMany()
      .then((dates) => {
        return response.json(dates);
      })
      .catch((err) => console.log(err));
  }
}
