import { useContext, useEffect, useState } from "react";
import "./style.scss";
import { ModalRequirement } from "../ModalRequirement";
import { AdultInputForm } from "./partForm/adult";
import { ChildInputForm } from "./partForm/child";
import { PetInputForm } from "./partForm/pet";
import { DiscountInputForm } from "./partForm/discount";
import { CategoryInputForm } from "./partForm/category";
import { PensionInputForm } from "./partForm/pension";
import { PipeNumberInputForm } from "./partForm/pipeNumber";
import { RdClientInputForm} from "./partForm/rdClient";
import { RequirementInputForm } from "./partForm/requirement";
import { InfoApp } from "../InfoApp";
import { GenerateTariffContext, useGenerateTariff } from "../../context/generateTariff/generateTariff";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { ActionInputForm } from "./partForm/action";
import {GetClientName} from "./partForm/getClientName";

export const FormOrc = () => {
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

  const getIsCourtesy = async () => {
    const isCourtesy = actionSelected?.daily_courtesy ?? false;
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
            <AdultInputForm />
            <ChildInputForm />
            <PetInputForm />
            <DiscountInputForm />
          </div>
          <div className="formBox">
            <CategoryInputForm />
            <PensionInputForm />
            {/*<PipeNumberInputForm />*/}
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
          {
            actionSelected?.daily_courtesy ?
                <div
                    className="daily-courtesy"
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
                : <></>
          }

        </div>
        <GetClientName />
      </div>
    </div>
  );
};
