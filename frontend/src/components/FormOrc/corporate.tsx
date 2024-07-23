import "./style.scss";
import { ModalRequirement } from "../ModalRequirement";
import { PensionInputForm } from "./partForm/pension";
import { RdClientInputForm } from "./partForm/rdClient";
import { RequirementInputForm } from "./partForm/requirement";
import { InfoApp } from "../InfoApp";
import { useGenerateTariffCorporate } from "../../context/generateTariff/generateTariff";
import { GetClientName } from "./partForm/getClientName";
import { CategoryCorporateInputForm } from "./partForm/categoryCorporate";
import { DiscountInputForm } from "./partForm/discount_corp";
import { LocationInputForm } from "./partForm/location";
import { StaffCorp } from "./partForm/staff_corp";

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
            <DiscountInputForm />
            <RequirementInputForm corporate />
            <LocationInputForm />
            <StaffCorp />
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
