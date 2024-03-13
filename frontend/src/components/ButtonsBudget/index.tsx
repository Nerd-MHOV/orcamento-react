import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useApi } from "../../hooks/api/api";
import pdfBudget from "../../context/generateTariff/functions/pdfBudget";
import pdfDescription from "../../context/generateTariff/functions/pdfDescription";
import { rdSaveProcess } from "../../context/generateTariff/functions/rdSaveProcess";
import Btn from "../Btn";
import { GenerateTariffContext } from "../../context/generateTariff/generateTariff";
import {ModalConfirmGroup} from "../ModalConfirmGroup";
import * as React from "react";

export const ButtonsBudget = () => {
  const { userLogin } = useContext(AuthContext);
  const { budgets, handleSaveBudget, clearTariffs, handleOpenBackdrop, handleCloseBackdrop } = useContext(
    GenerateTariffContext
  );
  const api = useApi();


  const [openModalConfirmGroup, setOpenModalConfirmGroup] = React.useState(false);

  const handleOpenModalConfirmGroup = () => {
    const dealId = budgets.reduce((acc, budget) => {
      if (!acc && budget.arrComplete.responseForm.rd_client) {
        return budget.arrComplete.responseForm.rd_client;
      }
      return acc;
    }, "");

    if(budgets.length > 1 && dealId) {
      setOpenModalConfirmGroup(true);
      return;
    }

    handleOpenBackdrop();

    generatePdfBudget();
   };

  const handleCloseModalConfirmGroup = () => {
    setOpenModalConfirmGroup(false);
  };
  async function generatePdfDescription() {
    // if (
    //   budgets.find((budget) =>
    //     budget.arrComplete.responseForm.category.match(/Day-Use/)
    //   )
    // ) {
    //   return;
    // }
    handleOpenBackdrop()
    const arrUser = await api.findUniqueUser(userLogin);
    const deal_id = budgets[0].arrComplete.responseForm.rd_client;
    let response;
    if (deal_id) response = await api.rdGetaDeal(deal_id);
    let name = response?.name || "undefined";
    await pdfDescription(budgets, name);
    handleCloseBackdrop()
  }

  async function generatePdfBudget(group = false) {
    handleCloseModalConfirmGroup();
    if (budgets.length < 1) {
      return;
    }
    await rdSaveProcess(userLogin, budgets, group);
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

    api.saveBudget(userLogin, budgets, true, response?.name)


    handleCloseBackdrop();
  }

  return (
    <div className="boxButtons" style={{ marginTop: 32 }}>
      <ModalConfirmGroup
       open={openModalConfirmGroup}
       handleClose={handleCloseModalConfirmGroup}
       handleConclusion={generatePdfBudget}
      />
      <Btn action="Salvar Orçamento" color="blue" onClick={handleSaveBudget} />
      <Btn
        action="Gerar PDF Orçamento"
        color="darkBlue"
        onClick={handleOpenModalConfirmGroup}
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
