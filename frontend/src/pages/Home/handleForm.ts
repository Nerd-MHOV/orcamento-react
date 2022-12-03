import serialize from "form-serialize";
import { useApi } from "../../hooks/api";

export interface selectionRange {
  startDate: Date;
  endDate: Date;
  key: string;
}

export async function handleForm(
  childValue: any[],
  petValue: any[],
  selectionRange: selectionRange,
  addRows: (rows: any[]) => void
) {
  const api = useApi();
  const formUp: HTMLFormElement | any = document.querySelector("#form");
  const responseForm = serialize(formUp, { hash: true });

  console.log(responseForm, "pensinos");
  console.log(childValue);
  console.log(petValue);

  if (!responseForm.category || !responseForm.pension) return;

  const response = await api.getBudget(
    responseForm,
    childValue,
    petValue,
    selectionRange
  );
  console.log(response, "response");

  addRows(response);
}
