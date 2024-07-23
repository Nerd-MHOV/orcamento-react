import { addDays, format } from "date-fns";
import { prismaClient } from "../../../database/prismaClient";
import inMainPeriod from "./inMainPeriod";

const daysOfWeekend = ["Fri", "Sat", "Sun"];

export async function generateBudgetPet(
  mainPeriod: Date [],
  completePeriod: Date [],
  arrForm: any,
  carrying: "pequeno" | "médio" | "grande"
) {
   const valuesBudget =  Promise.all(completePeriod.map(async (date) => {
    let tariffBudget = 0;
    if(!inMainPeriod(mainPeriod, date)) return tariffBudget
    let tariffs = await prismaClient.pet.findMany();
    let tariffSpecific = tariffs.filter(
      (arr: any) => arr.carrying === carrying
    );
    if (tariffSpecific[0]) tariffBudget = tariffSpecific[0].daily_price;
    return tariffBudget;

  }))
  return valuesBudget;
}
