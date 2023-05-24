import { TextField } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { GenerateTariffContext } from "../../../context/generateTariff/generateTariff";

export const DiscountInputForm = () => {
  const { disabledPension, callHandleForm, handleOpenModalPermission } =
    useContext(GenerateTariffContext);
  const [discount, setDiscount] = useState<number | null>(null);
  const handleChangeDiscount = (value: number) => {
    if (value > 20) {
      verifyPermission(value);
      value = 0;
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