import { format } from "date-fns";
import { SelectionRangeProps } from "../../../../components/FormOrc/Interfaces";
import { useAppApi } from "../../../../hooks/appHotel/app";

export async function getUnitUsing(date: SelectionRangeProps) {
  const app = useAppApi();
  const response = await app.getHousingUnitsUsing(
    format(date.startDate, "yyyy-MM-dd"),
    format(date.endDate, "yyyy-MM-dd")
  );
  let units: string[] = [];
  console.log(response);
  response?.reservas?.map((unit: { unidade: string }) => {
    units.push(unit.unidade);
  });
  return {
    response: response,
    units: units,
  };
}
