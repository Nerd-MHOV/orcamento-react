import { useContext, useEffect, useState } from "react";
import "./style.scss";
import { ModalRequirement } from "../ModalRequirement";
import { PensionInputForm } from "./partForm/pension";
import { RdClientInputForm } from "./partForm/rdClient";
import { RequirementInputForm } from "./partForm/requirement";
import { InfoApp } from "../InfoApp";
import { useGenerateTariff } from "../../context/generateTariff/generateTariff";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { ActionInputForm } from "./partForm/action";
import { GetClientName } from "./partForm/getClientName";
import { CategoryCorporateInputForm } from "./partForm/categoryCorporate";

export const FormOrcCorporate = () => {
  const {
    stateApp,
    occupancyWrong,
    occupancy,
    selectionRange,
    setDailyCourtesy: setCheckCourtesy,
    dailyCourtesy: checkCourtesy,
    actionSelected,
    dataTable,
  } = useGenerateTariff();

  const [dailyCourtesy, setDailyCourtesy] = useState(false);

  const getIsCourtesy = async () => {
    const isCourtesy = actionSelected?.daily_courtesy ?? false;
    setDailyCourtesy(isCourtesy);
    if (!isCourtesy) {
      setCheckCourtesy(false);
    }
  };

  useEffect(() => {
    getIsCourtesy();
  }, [actionSelected, selectionRange, dataTable]);


  return (
    <div>
      <div className="modal">
        <ModalRequirement />
      </div>
      <div className="boxFormAndInfo">
        <form id="form" className="form">
          <div className="formBox">
            <CategoryCorporateInputForm />
            <PensionInputForm />
            <RdClientInputForm />
            <RequirementInputForm />
          </div>
        </form>
        <div style={{ width: "100%" }}>
          <ActionInputForm />
        </div>

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
          <div
            className="daily-courtesy"
            style={!dailyCourtesy ? { display: "none" } : {}}
          >
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => {
                setCheckCourtesy(!checkCourtesy);
              }}
            >
              {checkCourtesy ? <CheckBox /> : <CheckBoxOutlineBlank />}
            </IconButton>{" "}
            <p style={{ color: "#757575" }}>Diária Cortesia</p>
          </div>
        </div>
        <GetClientName />
      </div>
    </div>
  );
};
