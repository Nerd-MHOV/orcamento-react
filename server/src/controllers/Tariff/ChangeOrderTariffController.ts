import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class ChangeOrderTariffController {
  async handle(request: Request, response: Response) {
    const { side, order_id } = request.body;

    const tariffs = await prismaClient.tariff.findMany({
      orderBy: {
        order_id: "asc",
      },
    });

    const maxValue = tariffs.reduce(function (prev, current) {
      return prev.order_id > current.order_id ? prev : current;
    });
    const minValue = tariffs.reduce(function (prev, current) {
      return prev.order_id < current.order_id ? prev : current;
    });

    const firstTariff = tariffs.filter(
      (tariff) => tariff.order_id === order_id
    )[0];

    if (side === "up" && firstTariff.order_id === maxValue.order_id) {
      return response.json("Essa tarifa esta no topo");
    }

    if (side === "down" && firstTariff.order_id === minValue.order_id) {
      return response.json("Essa tarifa não desce mais!");
    }

    const secondTariff =
      side === "up"
        ? tariffs.filter((tariff) => tariff.order_id > order_id)[0]
        : tariffs.filter((tariff) => tariff.order_id < order_id)[0];

    await prismaClient.tariff.update({
      where: { name: firstTariff.name },
      data: {
        order_id: secondTariff.order_id,
      },
    });

    await prismaClient.tariff.update({
      where: { name: secondTariff.name },
      data: {
        order_id: firstTariff.order_id,
      },
    });

    return response.json({
      firstTariff,
      secondTariff,
    });
  }
}
