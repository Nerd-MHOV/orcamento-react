import { useApi } from "../../../../hooks/api/api";

export async function getMonthsWithTariffs(): Promise<string[]> {
  const api = useApi();
  const response = await api.findMonthWithTariff();
  let arrayMonths: string[] = [];
  response.map((date) => {
    arrayMonths.push(date.date);
  });
  return arrayMonths;
}
