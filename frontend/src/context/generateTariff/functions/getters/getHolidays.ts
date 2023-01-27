import { useApi } from "../../../../hooks/api/api";

export async function getHolidays(): Promise<string[]> {
  const api = useApi();
  const response = await api.findHolidays();
  let arrayDate: string[] = [];
  response.map((date: { date: string; tariffs_id: string }) => {
    arrayDate.push(date.date);
  });
  return arrayDate;
}
