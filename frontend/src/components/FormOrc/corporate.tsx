import { useEffect, useState } from "react";
import "./style.scss";
import { ModalRequirement } from "../ModalRequirement";
import { PensionInputForm } from "./partForm/pension";
import { RdClientInputForm } from "./partForm/rdClient";
import { RequirementInputForm } from "./partForm/requirement";
import { InfoApp } from "../InfoApp";
import {  useGenerateTariffCorporate } from "../../context/generateTariff/generateTariff";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { ActionInputForm } from "./partForm/action";
import { GetClientName } from "./partForm/getClientName";
import { CategoryCorporateInputForm } from "./partForm/categoryCorporate";
import { DailyCourtesy } from "./partForm/dailyCourtesy";

export const FormOrcCorporate = () => {
  const {
    stateApp,
    occupancyWrong,
    occupancy,
    clientName
  } = useGenerateTariffCorporate();

  return (
    <div>
      <div className="modal">
        <ModalRequirement corporate />
      </div>
      <div className="boxFormAndInfo">
        <form id="form" className="form">
          <div className="formBox">
            <CategoryCorporateInputForm />
            <PensionInputForm corporate />
            <RdClientInputForm corporate />
            <RequirementInputForm corporate />
          </div>
        </form>
        {/* SELECT DE AÇÕES PROMOCIONAIS */}
        {/* <div style={{ width: "100%" }}>
          <ActionInputForm corporate />
        </div> */}

        <div className="pos-form">
          <div>
            <div
              className="occupancy"
              style={occupancyWrong ? { color: "red" } : {}}
            >
              {occupancy.text}
            </div>
            <InfoApp stateApp={stateApp} />
          </div>
          {/* <DailyCourtesy corporate /> */}
        </div>
        <GetClientName clientName={clientName} />
      </div>
    </div>
  );
};
