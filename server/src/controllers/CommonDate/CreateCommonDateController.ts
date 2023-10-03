import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";
import {v4 as uuid} from "uuid";


export class CreateCommonDateController {
  async handle(request: Request, response: Response) {
    const { tariffs } = request.body;
    try {
      const first = tariffs[0];
      const second = tariffs[1];
      const { id: firstFoodId, tariffs_id: _, ...firstFood } = first.food;
      const earlyWithoutIds = first.TariffCheckInValues.map((value: any) => {
        const { id: idEarly, tariffs_id: _, ...rest } = value;
        return rest;
      });
      const valuesWithoutId = first.TariffValues.map((value: any) => {
        const { id: idValue, tariffs_id: _, ...rest } = value;
        return rest;
      });

      const {
        id: secondFoodId,
        tariffs_id: _secondTariffId,
        ...secondFood
      } = second.food;
      const secondEarlyWithoutIds = second.TariffCheckInValues.map(
        (value: any) => {
          const { id: idEarly, tariffs_id: _, ...rest } = value;
          return rest;
        }
      );
      const secondValuesWithoutId = second.TariffValues.map((value: any) => {
        const { id: idValue, tariffs_id: _, ...rest } = value;
        return rest;
      });
      console.log("HERE", second.food);

      const [firstCreate, secondCreate, commonCreate] =
        await prismaClient.$transaction([
          prismaClient.tariff.create({
            data: {
              name: first.name,
              product_rd: first.product_rd,
              active: first.active,
              food: {
                create: {
                  ...firstFood,
                },
              },
              TariffCheckInValues: {
                createMany: {
                  data: earlyWithoutIds,
                },
              },
              TariffValues: {
                createMany: {
                  data: valuesWithoutId,
                },
              },
            },
          }),
          prismaClient.tariff.create({
            data: {
              name: second.name,
              product_rd: second.product_rd,
              active: second.active,
              food: {
                create: {
                  ...secondFood,
                },
              },
              TariffCheckInValues: {
                createMany: {
                  data: secondEarlyWithoutIds,
                },
              },
              TariffValues: {
                createMany: {
                  data: secondValuesWithoutId,
                },
              },
            },
          }),
          prismaClient.commonDates.createMany({
            data: first.tariffs_to_midweek,
          }),
        ]);

      console.log("============================================");
      console.log({ firstCreate, secondCreate, commonCreate });
      return response.json({
        msg: "success",
        debug: { firstCreate, secondCreate, commonCreate },
      });
    } catch (err) {
      console.log("============================================");
      console.log(err);
      console.log("============================================");

      return response.json({ msg: "error", debug: err });
    }
  }
}
