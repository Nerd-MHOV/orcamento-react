import { addDays, format, isWeekend } from "date-fns";
import { Request, Response } from "express";
import { getTariff } from "../Budget/functions/getTariff";

export class GetNumberPipeController {
  async handle(request: Request, response: Response) {
    const { date_in, date_out } = request.body;
    let tariff: any = {};
    let date = new Date(date_in);
    let dateOut = new Date(date_out);
    let type = "";

    if (format(date, "yyyy-MM-dd") === format(dateOut, "yyyy-MM-dd")) {
      tariff = {
        product_pipe: "46",
      };
    }

    while (date < dateOut) {
      let dayMonthYear = format(date, "yyyy-MM-dd");
      let monthYear = format(date, "yyyy-MM");
      let tariffs = await getTariff(dayMonthYear, monthYear);

      if (tariffs.type === "specific") {
        tariff = tariffs.tariff_we;
        type = "isHoliday";
      }

      if (isWeekend(date) && type !== "isHoliday") {
        tariff = tariffs.tariff_we;
        type = "isWeekend";
      }
      if (!isWeekend(date) && type !== "isHoliday" && type !== "isWeekend") {
        tariff = tariffs.tariff_mw;
        type = "isCommon";
      }
      date = addDays(date, 1);
    }

    return response.json(tariff);
  }
}
