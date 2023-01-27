import { useContext } from "react";
import "./style.scss";
import { ModalRequirement } from "../ModalRequirement";
import { AdultInputForm } from "./partForm/adult";
import { ChildInputForm } from "./partForm/child";
import { PetInputForm } from "./partForm/pet";
import { DiscountInputForm } from "./partForm/discount";
import { CategoryInputForm } from "./partForm/category";
import { PensionInputForm } from "./partForm/pension";
import { PipeNumberInputForm } from "./partForm/pipeNumber";
import { RequirementInputForm } from "./partForm/requirement";
import { InfoApp } from "../InfoApp";
import { GenerateTariffContext } from "../../context/generateTariff/generateTariff";

export const FormOrc = () => {
  const { stateApp, occupancyWrong, openModalRequirement, occupancy } =
    useContext(GenerateTariffContext);
  return (
    <>
      <div className="modal">
        {openModalRequirement && <ModalRequirement />}
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
            <PipeNumberInputForm />
            <RequirementInputForm />
          </div>
        </form>
        <div
          className="occupancy"
          style={occupancyWrong ? { color: "red" } : {}}
        >
          {occupancy.text}
        </div>
        <InfoApp stateApp={stateApp} />
      </div>
    </>
  );
};
