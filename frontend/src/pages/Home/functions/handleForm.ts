import serialize from "form-serialize";
import { RequirementSubmitProps } from "../../../components/FormOrc";
import { useApi } from "../../../hooks/api";

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
  addRows: (rows: any[], arrComplete: any) => void
) {
  const api = useApi();
  const formUp: HTMLFormElement | any = document.querySelector("#form");
  const responseForm = serialize(formUp, { hash: true });

  if (!responseForm.category || !responseForm.pension) return;

  responseForm.housingUnit = responseForm.category;
  responseForm.category = category;

  const response = await api.getBudget(
    responseForm,
    childValue,
    petValue,
    requirementValue,
    selectionRange
  );

  addRows(response.rows, {
    responseForm,
    childValue,
    petValue,
    selectionRange,
  });
}
