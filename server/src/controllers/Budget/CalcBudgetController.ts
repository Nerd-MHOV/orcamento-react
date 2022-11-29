import { addDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";
import { getTariff } from "./getTariff";

type RowsProps = {
  id: number;
  desc: string;
  values: {
    [key: string]: number;
  }[];
  total: number;
};

export class CalcBudgetController {
  async handle(request: Request, response: Response) {
    const { arrForm, arrChild, arrPet, rangeDate } = request.body;

    //vars:
    let adultRows: RowsProps[] = [];
    let childRows: RowsProps[] = [];
    let petRows: RowsProps[] = [];

    let lastRow: RowsProps[] = [];

    let initDate = new Date(rangeDate.startDate);
    let finalDate = new Date(rangeDate.endDate);

    finalDate = addDays(finalDate, 1);

    //ADULT
    let amountAdults = arrForm.adult ?? 0;
    let countAdult = 0;
    while (countAdult < amountAdults) {
      countAdult++;

      if (countAdult <= 2) {
        let valuesAdult: {
          [key: string]: number;
        }[] = [];
        let totalAdult = 0;

        while (initDate < finalDate) {
          let dayMonthYear = format(initDate, "yyyy-MM-dd");
          let monthYear = format(initDate, "yyyy-MM");
          let tariffAdult = 0;
          let tariffs = await getTariff(dayMonthYear, monthYear);

          if (tariffs.tariff_mw) {
          }

          return response.json(tariffs);
          valuesAdult.push({
            [dayMonthYear]: tariffAdult,
          });

          initDate = addDays(initDate, 1);
        }

        adultRows.push({
          id: 100 + countAdult,
          desc: "Adulto " + countAdult,
          values: valuesAdult,
          total: totalAdult,
        });
      } else {
      }
    }

    let completeRows = [...adultRows, ...childRows, ...petRows, ...lastRow];

    console.log(completeRows, "que");

    return response.json(completeRows);
  }
}
