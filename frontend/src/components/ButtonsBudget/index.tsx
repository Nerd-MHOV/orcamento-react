import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useApi } from "../../hooks/api/api";
import pdfBudget from "../../context/generateTariff/functions/pdfBudget";
import pdfDescription from "../../context/generateTariff/functions/pdfDescription";
import { rdSaveProcess } from "../../context/generateTariff/functions/rdSaveProcess";
import Btn from "../Btn";
import { useGenerateTariff, useGenerateTariffCorporate } from "../../context/generateTariff/generateTariff";
import {ModalConfirmGroup} from "../ModalConfirmGroup";
import * as React from "react";
import pdfBudgetCorp from "../../context/generateTariff/functions/pdfBudgetCorp/pdfBudgetCorp";
import DataContentProps from "../../context/generateTariff/interfaces/tableBudgetDataContentProps";
import { calcTotal } from "../../context/generateTariff/functions/calcTotal";

export const ButtonsBudget = ({ corporate = false }) => {
  const { userLogin } = useContext(AuthContext);
  const { 
    budgets, 
    bodyResponseBudget,
    handleSaveBudget, 
    clearTariffs, 
    handleOpenBackdrop, 
    
    dataTable,

    handleCloseBackdrop 
  } = corporate ? useGenerateTariffCorporate() : { ...useGenerateTariff(), bodyResponseBudget: null};
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

    if(!corporate) generatePdfBudget();
    else generatePdfBudgetCorporate();
   };

  const handleCloseModalConfirmGroup = () => {
    setOpenModalConfirmGroup(false);
  };

  async function generatePdfBudgetCorporate () {
    handleCloseModalConfirmGroup();
    if(!bodyResponseBudget) {
      handleCloseBackdrop();
      return;
    }
    const arrUser = await api.findUniqueUser(userLogin);
    await pdfBudgetCorp(
      bodyResponseBudget!,
      arrUser.name,
      arrUser.email,
      arrUser.phone,
    );
    handleCloseBackdrop();
  }

  async function generatePdfDescriptionCorporate() {
    handleOpenBackdrop()
    if(!bodyResponseBudget) {
      handleCloseBackdrop();
      return;
    }
    const deal_id = bodyResponseBudget.idClient;
    const descriptionData: DataContentProps[] = [
      {
        columns: dataTable.columns,
        rows: dataTable.rows,
        total: calcTotal(dataTable).total,
      }
    ]
    console.log(budgets);
    let response;
    if (deal_id) response = await api.rdGetaDeal(deal_id);
    let name = response?.name || "undefined";
    await pdfDescription(descriptionData, name);
    handleCloseBackdrop()
  }



  async function generatePdfDescription() {
    // if (
    //   budgets.find((budget) =>
    //     budget.arrComplete.responseForm.category.match(/Day-Use/)
    //   )
    // ) {
    //   return;
    // }
    handleOpenBackdrop()
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
      { !corporate && <Btn action="Salvar Orçamento" color="blue" onClick={handleSaveBudget} />}
      <Btn
        action="Gerar PDF Orçamento"
        color="darkBlue"
        onClick={handleOpenModalConfirmGroup}
      />
      <Btn
        action="Memória de Cálculo"
        color="dashboard"
        onClick={corporate ? generatePdfDescriptionCorporate : generatePdfDescription}
      />
      { !corporate && <Btn action="Limpar" color="red" onClick={clearTariffs} /> }
    </div>
  );
};
