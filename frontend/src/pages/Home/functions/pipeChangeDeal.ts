import { DataContentProps } from "../../../components/TableCalc";
import { useApi } from "../../../hooks/api/api";
import { usePipe } from "../../../hooks/pipedrive/pipeApi";

export async function pipeChangeDeal(
  userId: number,
  budgets: DataContentProps[]
) {
  let realBudget: DataContentProps = budgets[0];
  let valueMinimum = 0;
  let dealId = 0;
  for (let budget of budgets) {
    let total = 0;
    budget.rows.map((row) => {
      total += Number(row.total);
    });

    if (total < valueMinimum || valueMinimum === 0) {
      valueMinimum = total;
      realBudget = budget;
    }

    if (budget.arrComplete.responseForm.numberPipe) {
      dealId = budget.arrComplete.responseForm.numberPipe;
    }
  }

  if (dealId == 0) {
    return;
  }
  const pipe = usePipe();
  const api = useApi();
  try {
    const user = await api.findUniqueUser(userId);
    const token = user.token_pipe;
    await api
      .getTariffPipe(
        realBudget.arrComplete.selectionRange.startDate,
        realBudget.arrComplete.selectionRange.endDate
      )
      .then((tariff_pipe) => {
        // pipe.addFile();
        pipe.addProduct(token, dealId, tariff_pipe.product_pipe, valueMinimum);
        pipe.changePipeline(token, dealId, user.user_pipe);
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
}
