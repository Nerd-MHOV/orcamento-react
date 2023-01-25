import { Request, Response } from "express";

export class CreateTariffWithTextController {
  async handle(request: Request, response: Response) {
    const { text } = request.body;

    console.log(text);

    return response.json({ text });
  }
}
