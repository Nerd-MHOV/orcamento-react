import { TextField } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { getAllowedDiscount } from "../../../context/generateTariff/functions/getters/getAllowedDiscount";
import { GenerateTariffContext } from "../../../context/generateTariff/generateTariff";

export const DiscountInputForm = () => {
  const {
    disabledPension,
    callHandleForm,
    handleOpenModalPermission,
    selectionRange,
    actionSelected,
  } = useContext(GenerateTariffContext);
  const [discount, setDiscount] = useState<number | null>(null);
  const handleChangeDiscount = async (value: number) => {
    let limit = actionSelected?.percent_general ?? 10;

    if (value > limit) {
      verifyPermission(value);
      value = limit;
    }
    if (value < 0) setDiscount(null);
    else if (value > 100) setDiscount(100);
    else setDiscount(value);

    setTimeout(() => {
      callHandleForm();
    }, 200);
  };

  const verifyPermission = (value: number) => {
    console.log("verify...", value);
    handleOpenModalPermission(value, setDiscount);
  };

  useEffect(() => {
    handleChangeDiscount(discount || -1);
  }, [selectionRange, actionSelected]);
  return (
    <TextField
      name="discount"
      disabled={disabledPension}
      label="Desconto %"
      type="number"
      className="textField"
      variant="standard"
      value={discount}
      onChange={(e) => {
        handleChangeDiscount(+e.target.value);
      }}
    />
  );
};
