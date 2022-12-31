import { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { MonthsCommon } from "../../components/StepsCreateTariff/Months";
import { StepperTariff } from "../../components/StepsCreateTariff/Stepper";
import {
  tariffSelectProps,
  TypeTariff,
} from "../../components/StepsCreateTariff/typeTariff";

import "./style.scss";

export const NewTariff = () => {
  const [typeTariff, setTypeTariff] = useState<tariffSelectProps>(null);
  const [dates, setDates] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [nextActive, setNextActive] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setNextActive(false);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSetTariff = (type: tariffSelectProps) => {
    setTypeTariff(type);
    if (type !== null) setNextActive(true);
  };

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
            >
              <>
                {activeStep === 0 && (
                  <TypeTariff
                    selected={typeTariff}
                    handleSetTariff={handleSetTariff}
                  />
                )}
                {activeStep === 1 && <MonthsCommon />}
              </>
            </StepperTariff>
          </div>
        </div>
      </div>
    </div>
  );
};
