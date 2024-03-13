import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Btn from "../../components/Btn";
import { LayoutBudget } from "../../components/Layout";
import CollapsibleTableDiscounts from "../../components/TableDiscounts";
import { useApi } from "../../hooks/api/api";
import { ApiDiscountProps } from "../../hooks/api/interfaces";
import "./style.scss";

export const DiscountsPage = () => {
  const api = useApi();
  const [discounts, setDiscounts] = useState<ApiDiscountProps[]>([]);

  const getDiscounts = async () => {
    const response = await api.getAllDiscounts();
    setDiscounts(response);
  };

  useEffect(() => {
    getDiscounts();
  }, []);

  return (
    <LayoutBudget>
      <div className="p20">
        <div className="containerBx">
          <div className="top">
            <div className="titleContainerBx">Gerenciar Ação</div>
            <Link to="/discounts/create" className="link">
              <Btn action=" + " color="dashboard" onClick={() => {}} />
            </Link>
          </div>
          <div className="table">
            <CollapsibleTableDiscounts
              rows={discounts}
              reloadRows={getDiscounts}
            />
          </div>
        </div>
      </div>
    </LayoutBudget>
  );
};
