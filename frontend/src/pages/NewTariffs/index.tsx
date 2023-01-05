import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import {
  foodPad,
  FoodStep,
  initValues,
} from "../../components/StepsCreateTariff/FoodStep";
import { CreateTariffProps } from "../../components/StepsCreateTariff/interfaces";
import { MonthsCommon } from "../../components/StepsCreateTariff/Months";
import { NameAndConfirmStep } from "../../components/StepsCreateTariff/NameAndConfirmStep";
import { StepperTariff } from "../../components/StepsCreateTariff/Stepper";
import {
  tariffSelectProps,
  TypeTariff,
} from "../../components/StepsCreateTariff/typeTariff";
import { ValuesStep } from "../../components/StepsCreateTariff/ValuesStep";
import { GroupValuesProps } from "../../hooks/api/interfaces";

import "./style.scss";

const stepsSpecific = [
  "Tipo de tarifário",
  "Datas a serem aplicadas",
  "Valores R$",
  "Nome",
];

const stepsCommon = [
  "Tipo de tarifário",
  "Datas a serem aplicadas",
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
  const [steps, setSteps] = useState(stepsCommon);
  const [activeStep, setActiveStep] = useState(0);
  const [nextActive, setNextActive] = useState(false);
  const [newTariff, setNewTariff] = useState<CreateTariffProps>();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setNextActive(false);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setNextActive(false);
  };

  const handleSetTariff = (type: tariffSelectProps) => {
    setTypeTariff(type);
    if (type !== null) setNextActive(true);

    if (type === "common") setSteps(stepsCommon);
    else setSteps(stepsSpecific);
  };

  const handleSetDates = (dates: string[]): void => {
    setDates(dates);

    if (dates.length > 0) setNextActive(true);
    else setNextActive(false);

    console.log(dates);
  };

  const verifyAdtValuesUhs = (Day: typeof UHsCommonValuesFDS) => {
    let next = true;
    if (Day.PAD.adt === 0) next = false;
    if (Day.PADV.adt === 0) next = false;
    if (Day.LUX.adt === 0) next = false;
    if (Day.LUXC.adt === 0) next = false;
    if (Day.LUXH.adt === 0) next = false;

    return next;
  };

  useEffect(() => {
    setNextActive(true);
  }, [foodValues, tenHourValues, twentyHourValues]);

  useEffect(() => {
    setNextActive(verifyAdtValuesUhs(UHsCommonValuesFDS));
  }, [UHsCommonValuesFDS]);

  useEffect(() => {
    setNextActive(verifyAdtValuesUhs(UHsCommonValuesMDS));
  }, [UHsCommonValuesMDS]);

  useEffect(() => {
    setNextActive(verifyAdtValuesUhs(UHsSpecificValues));
  }, [UHsSpecificValues]);

  useEffect(() => {
    setNextActive(true);
  });

  return (
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
                {activeStep === 0 && (
                  <TypeTariff
                    selected={typeTariff}
                    handleSetTariff={handleSetTariff}
                  />
                )}
                {activeStep === 1 && (
                  <MonthsCommon
                    typeTariff={typeTariff}
                    handleSetDates={handleSetDates}
                  />
                )}
                {activeStep === 2 && steps[2] === "Valores MDS" && (
                  <ValuesStep
                    title="Valores para MDS"
                    UHsValues={UHsCommonValuesMDS}
                    handleSetUHsValues={setUHsCommonValuesMDS}
                  />
                )}

                {activeStep === 2 && steps[2] === "Valores R$" && (
                  <ValuesStep
                    title="Valores Para os dias Selecionados"
                    UHsValues={UHsSpecificValues}
                    handleSetUHsValues={setUHsSpecificValues}
                  />
                )}
                {activeStep === 3 && steps[3] === "Valores FDS" && (
                  <ValuesStep
                    title="Valores para FDS"
                    UHsValues={UHsCommonValuesFDS}
                    handleSetUHsValues={setUHsCommonValuesFDS}
                  />
                )}
                {((activeStep === 3 && steps[3] === "Nome") ||
                  activeStep === 5) && (
                  <NameAndConfirmStep
                    dates={dates}
                    typeTariff={typeTariff}
                    tariffValues={{
                      MDSValues: UHsCommonValuesMDS,
                      FDSValues: UHsCommonValuesFDS,
                      SpecificValues: UHsSpecificValues,
                      foodValues: foodValues,
                      tenHourValues: tenHourValues,
                      twentyHourValues: twentyHourValues,
                    }}
                  />
                )}
              </>
            </StepperTariff>
          </div>
        </div>
      </div>
    </div>
  );
};
