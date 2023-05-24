import serialize from "form-serialize";
import { useApi } from "../../../hooks/api/api";
import { RequirementSubmitProps, RowModalDiscount } from "../interfaces";

export interface selectionRange {
  startDate: Date;
  endDate: Date;
  key: string;
}

export async function handleForm(
  category: string,
  requirementValue: RequirementSubmitProps[],
  childValue: any[],
  petValue: any[],
  selectionRange: selectionRange,
  addRows: (rows: any[], arrComplete: any) => void,
  unitaryDiscount: RowModalDiscount[],
  dailyCourtesy: boolean
) {
  const api = useApi();

  const formUp: HTMLFormElement | any = document.querySelector("#form");
  const responseForm = serialize(formUp, { hash: true });

  if (
    typeof responseForm.category === "string" &&
    responseForm.category.match(/Day-Use/)
  ) {
    const response = await api.getBudgetDU(
      responseForm,
      childValue,
      petValue,
      requirementValue,
      selectionRange,
      unitaryDiscount
    );

    addRows(response.rows, {
      responseForm,
      childValue,
      petValue,
      selectionRange,
    });

    return;
  }

  if (!responseForm.category || !responseForm.pension) return;

  responseForm.housingUnit = responseForm.category;
  responseForm.category = category;

  const response = await api.getBudget(
    responseForm,
    childValue,
    petValue,
    requirementValue,
    selectionRange,
    unitaryDiscount,
    dailyCourtesy
  );

  addRows(response.rows, {
    responseForm,
    childValue,
    petValue,
    selectionRange,
  });
}
