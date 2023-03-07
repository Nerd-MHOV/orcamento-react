import { useContext, useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";
import {
  foodPad,
  FoodStep,
  initValues,
} from "../../../components/StepsCreateTariff/FoodStep";
import { InputTables } from "../../../components/StepsCreateTariff/InputTables";
import { CreateTariffProps } from "../../../components/StepsCreateTariff/interfaces";
import { MonthsCommon } from "../../../components/StepsCreateTariff/Months";
import { NameAndConfirmStep } from "../../../components/StepsCreateTariff/NameAndConfirmStep";
import { StepperTariff } from "../../../components/StepsCreateTariff/Stepper";
import { TypeTariff } from "../../../components/StepsCreateTariff/typeTariff";
import { ValuesStep } from "../../../components/StepsCreateTariff/ValuesStep";
import {
  CreateTariffContext,
  CreateTariffContextProvider,
} from "../../../context/createTariff/createTariff";
import { GroupValuesProps } from "../../../hooks/api/interfaces";

import "./style.scss";

export const stepsSpecific = [
  "Tipo de tarifário",
  "Datas a serem aplicadas",
  "Tabela",
  "Valores R$",
  "Nome",
];

export const stepsCommon = [
  "Tipo de tarifário",
  "Datas a serem aplicadas",
  "Tabelas",
  "Valores MDS",
  "Valores FDS",
  "Nome",
];

export const initValuesUHS = {
  PAD: initValues,
  PADV: initValues,
  LUX: initValues,
  LUXC: initValues,
  LUXH: initValues,
};

export const NewTariff = () => {
  const { typeTariff } = useContext(CreateTariffContext);
  const [steps, setSteps] = useState(stepsCommon);
  const [activeStep, setActiveStep] = useState(0);
  const [nextActive, setNextActive] = useState(false);
  const [newTariff, setNewTariff] = useState<CreateTariffProps>();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setNextActive(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setNextActive(false);
  };

  return (
    <CreateTariffContextProvider
      next={setNextActive}
      step={setSteps}
      activeStep={setActiveStep}
    >
      <div className="new-tariff">
        <Sidebar />
        <div className="new-tariff-bx">
          <Navbar />
          <div className="p20">
            <div className="containerBx">
              <div className="titleContainerBx">Adicionar Tarifário</div>
              <StepperTariff
                nextActive={nextActive}
                activeStep={activeStep}
                handleBack={handleBack}
                handleNext={handleNext}
                steps={steps}
              >
                <>
                  {activeStep === 0 && <TypeTariff />}
                  {activeStep === 1 && <MonthsCommon />}
                  {activeStep === 2 && <InputTables />}
                  {activeStep === 3 && steps[3] === "Valores MDS" && (
                    <ValuesStep title="Valores para MDS" type="midweek" />
                  )}

                  {activeStep === 3 && steps[3] === "Valores R$" && (
                    <ValuesStep
                      title="Valores Para os dias Selecionados"
                      type="specific"
                    />
                  )}
                  {activeStep === 4 && steps[4] === "Valores FDS" && (
                    <ValuesStep title="Valores para FDS" type="weekend" />
                  )}

                  {((activeStep === 4 && steps[4] === "Nome") ||
                    activeStep === 5) && <NameAndConfirmStep />}
                </>
              </StepperTariff>
            </div>
          </div>
        </div>
      </div>
    </CreateTariffContextProvider>
  );
};
