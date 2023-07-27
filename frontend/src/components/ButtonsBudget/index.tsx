import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useApi } from "../../hooks/api/api";
import pdfBudget from "../../context/generateTariff/functions/pdfBudget";
import pdfDescription from "../../context/generateTariff/functions/pdfDescription";
import EvitaBug from "../../context/generateTariff/functions/evitaBugPDF";
import { pipeChangeDeal } from "../../context/generateTariff/functions/pipeChangeDeal";
import Btn from "../Btn";
import { GenerateTariffContext } from "../../context/generateTariff/generateTariff";
import { usePipe } from "../../hooks/pipedrive/pipeApi";

export const ButtonsBudget = () => {
  const { userLogin } = useContext(AuthContext);
  const { budgets, handleSaveBudget, clearTariffs } = useContext(
    GenerateTariffContext
  );
  const api = useApi();
  const pipe = usePipe();
  function evitaBug() {
    EvitaBug(budgets, "token");
  }
  async function generatePdfDescription() {
    // if (
    //   budgets.find((budget) =>
    //     budget.arrComplete.responseForm.category.match(/Day-Use/)
    //   )
    // ) {
    //   return;
    // }
    const arrUser = await api.findUniqueUser(userLogin);
    const deal_id = budgets[0].arrComplete.responseForm.numberPipe;
    let response;
    if (deal_id) response = await pipe.getaDeal(arrUser.token_pipe, deal_id);
    let name = response?.data?.person_name || "";
    pdfDescription(budgets, arrUser.token_pipe, name);
  }

  async function generatePdfBudget() {
    if (budgets.length < 1) {
      return;
    }
    pipeChangeDeal(userLogin, budgets);
    if (
      budgets.find((budget) =>
        budget.arrComplete.responseForm.category.match(/Day-Use/)
      )
    ) {
      return;
    }
    const arrUser = await api.findUniqueUser(userLogin);
    pdfBudget(
      budgets,
      arrUser.name,
      arrUser.email,
      arrUser.phone,
      arrUser.token_pipe
    );

    api
      .saveBudget(userLogin, budgets)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }

  return (
    <div className="boxButtons" style={{ marginTop: 32 }}>
      <Btn action="Salvar Orçamento" color="blue" onClick={handleSaveBudget} />
      <Btn
        action="Gerar PDF Orçamento"
        color="darkBlue"
        onClick={generatePdfBudget}
      />
      <Btn
        action="Memória de Cálculo"
        color="dashboard"
        onClick={generatePdfDescription}
      />
      <Btn action="Limpar" color="red" onClick={clearTariffs} />
    </div>
  );
};
