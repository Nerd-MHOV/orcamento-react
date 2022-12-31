import { useApi } from "../../../../hooks/api/api";

export async function getHolidays(): Promise<String[]> {
  const api = useApi();
  const response = await api.findHolidays();
  let arrayDate: String[] = [];
  response.map((date: { date: string; tariffs_id: string }) => {
    arrayDate.push(date.date);
  });
  return arrayDate;
}
