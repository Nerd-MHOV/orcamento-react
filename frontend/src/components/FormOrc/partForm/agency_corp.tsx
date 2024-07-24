import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useGenerateTariffCorporate } from "../../../context/generateTariff/generateTariff";

export const AgencyInputForm = () => {
  const {
    disabledPension,
    selectionRange,
    changeAgencyPercent,
  } = useGenerateTariffCorporate();
  const [agencyPercent, setAgencyPercent] = useState<number | null>(null);
  const handleChangeAgencyPercent = async (value: number) => {

    if (value < 0) setAgencyPercent(null);
    else if (value > 100) setAgencyPercent(100);
    else setAgencyPercent(value);

  };

  useEffect(() => {
    handleChangeAgencyPercent(agencyPercent || -1);
  }, [selectionRange]);

  useEffect(() => {
    changeAgencyPercent(agencyPercent || 0)
  }, [ agencyPercent ])
  return (
    <TextField
      name="agencyPercent"
      disabled={disabledPension}
      label="Agencia %"
      type="number"
      className="textField"
      variant="standard"
      value={agencyPercent}
      onChange={(e) => {
        handleChangeAgencyPercent(+e.target.value);
      }}
    />
  );
};
