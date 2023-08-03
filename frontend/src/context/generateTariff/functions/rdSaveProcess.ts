import { useApi } from "../../../hooks/api/api";
import { DataContentProps } from "../interfaces";
import {format} from "date-fns";

export async function rdSaveProcess(
  userId: string,
  budgets: DataContentProps[]
) {
  let realBudget: DataContentProps = budgets[0];
  let valueMinimum = 0;
  let dealId = "";
  for (let budget of budgets) {
    let total = 0;
    budget.rows.map((row) => {
      total += Number(row.total);
    });

    if (total < valueMinimum || valueMinimum === 0) {
      valueMinimum = total;
      realBudget = budget;
    }

    if (budget.arrComplete.responseForm.rd_client) {
      dealId = budget.arrComplete.responseForm.rd_client;
    }
  }

  if (dealId == "") {
    return;
  }
  const api = useApi();

  for(const budget of budgets) {
    try {

      await api
          .getTariffPipe(
              realBudget.arrComplete.selectionRange.startDate,
              realBudget.arrComplete.selectionRange.endDate
          )
          .then((tariff_pipe) => {
            // pipe.addFile();
            api.rdAddProduct(dealId, tariff_pipe.product_rd, valueMinimum)
          })
          .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }
  api.rdChangeStage(
      dealId,
      format(realBudget.arrComplete.selectionRange.startDate, "dd/MM/yyyy"),
      format(realBudget.arrComplete.selectionRange.endDate, "dd/MM/yyyy"),
      +realBudget.arrComplete.responseForm.adult,
      realBudget.arrComplete.childValue,
      realBudget.arrComplete.petValue
  )
}
