import { useApi } from "../../../../hooks/api/api";

export async function getMonthsWithTariffs(): Promise<String[]> {
  const api = useApi();
  const response = await api.findMonthWithTariff();
  let arrayMonths: String[] = [];
  response.map(
    (date: {
      date: string;
      tariff_to_midweek_id: string;
      tariff_to_weekend: string;
    }) => {
      arrayMonths.push(date.date);
    }
  );
  return arrayMonths;
}
