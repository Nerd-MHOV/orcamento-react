import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useApi } from "../../hooks/api";
import pdfBudget from "../../pages/Home/functions/pdfBudget";
import pdfDescription from "../../pages/Home/functions/pdfDescription";
import { pipeChangeDeal } from "../../pages/Home/functions/pipeChangeDeal";
import Btn from "../Btn";
import { DataContentProps } from "../TableCalc";

interface ButtonsBudgetProps {
  budgets: DataContentProps[];
  handleSaveBudget: () => Promise<void>;
  clearTariffs: () => Promise<void>;
}

export const ButtonsBudget = ({
  budgets,
  handleSaveBudget,
  clearTariffs,
}: ButtonsBudgetProps) => {
  const { userLogin } = useContext(AuthContext);
  const api = useApi();

  async function generatePdfDescription() {
    const arrUser = await api.findUniqueUser(userLogin);

    pdfDescription(budgets, arrUser.token_pipe);
  }

  async function generatePdfBudget() {
    pipeChangeDeal(userLogin, budgets);
    const arrUser = await api.findUniqueUser(userLogin);
    pdfBudget(
      budgets,
      arrUser.name,
      arrUser.email,
      arrUser.phone,
      arrUser.token_pipe
    );
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
        action="Gerar PDF tarifa"
        color="dashboard"
        onClick={generatePdfDescription}
      />
      <Btn action="Limpar" color="red" onClick={clearTariffs} />
    </div>
  );
};
