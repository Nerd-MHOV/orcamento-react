import { FormNewDiscount } from "../../../components/FormNewDiscount";
import { FormNewRequirement } from "../../../components/FormNewRequirement";
import { LayoutBudget } from "../../../components/Layout";
import "./style.scss";

export const NewDiscountPage = () => {
  return (
    <LayoutBudget>
      <div className="p20">
        <div className="containerBx">
          <div className="top">
            <div className="titleContainerBx">Cadastrar Ação</div>
          </div>
          <div className="form">
            <FormNewDiscount />
          </div>
        </div>
      </div>
    </LayoutBudget>
  );
};
