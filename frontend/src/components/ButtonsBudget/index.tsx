import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useApi } from "../../hooks/api/api";
import pdfBudget from "../../context/generateTariff/functions/pdfBudget";
import pdfDescription from "../../context/generateTariff/functions/pdfDescription";
import { rdSaveProcess } from "../../context/generateTariff/functions/rdSaveProcess";
import Btn from "../Btn";
import { GenerateTariffContext } from "../../context/generateTariff/generateTariff";

export const ButtonsBudget = () => {
  const { userLogin } = useContext(AuthContext);
  const { budgets, handleSaveBudget, clearTariffs } = useContext(
    GenerateTariffContext
  );
  const api = useApi();

  async function generatePdfDescription() {
    // if (
    //   budgets.find((budget) =>
    //     budget.arrComplete.responseForm.category.match(/Day-Use/)
    //   )
    // ) {
    //   return;
    // }
    const arrUser = await api.findUniqueUser(userLogin);
    const deal_id = budgets[0].arrComplete.responseForm.rd_client;
    let response;
    if (deal_id) response = await api.rdGetaDeal(deal_id);
    console.log(response, "here")
    let name = response?.name || "undefined";
    await pdfDescription(budgets, name);
  }

  async function generatePdfBudget() {
    if (budgets.length < 1) {
      return;
    }
    await rdSaveProcess(userLogin, budgets);
    if (
      budgets.find((budget) =>
        budget.arrComplete.responseForm.category.match(/Day-Use/)
      )
    ) {
      return;
    }
    const arrUser = await api.findUniqueUser(userLogin);
    await pdfBudget(
      budgets,
      arrUser.name,
      arrUser.email,
      arrUser.phone,
    );

    const deal_id = budgets[0].arrComplete.responseForm.rd_client;
    let response;
    if (deal_id) response = await api.rdGetaDeal(deal_id);

    api
      .saveBudget(userLogin, budgets, true, response?.name)
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
