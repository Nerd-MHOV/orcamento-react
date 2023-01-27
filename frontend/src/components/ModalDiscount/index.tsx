import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import "./style.scss";
import { GenerateTariffContext } from "../../context/generateTariff/generateTariff";

export function ModalDiscount() {
  const {
    handleCloseModalDiscount: handleClose,
    handleSaveModalDiscount,
    openModalDiscount: open,
    discountBeingEdited,
    addUnitaryDiscount,
  } = React.useContext(GenerateTariffContext);
  const [discount, setDiscount] = React.useState<number | null>(null);
  const handleChangeDiscount = (value: number) => {
    console.log(discountBeingEdited);
    if (value < 0) setDiscount(null);
    else if (value === 0) setDiscount(null);
    else if (value > 100) setDiscount(100);
    else setDiscount(value);
  };

  const handleSave = () => {
    if (discount === discountBeingEdited.discount) {
      handleClose();
      return;
    }
    addUnitaryDiscount({
      id: discountBeingEdited.id,
      name: discountBeingEdited.name,
      discount: discount ?? discountBeingEdited.discount,
    });
    setTimeout(() => {
      handleSaveModalDiscount();
    }, 200);
  };

  React.useEffect(() => {
    setDiscount(discountBeingEdited.discount);
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose} className="modalDiscount">
      <Dialog open={open} onClose={handleClose} className="modalRequirements">
        <DialogTitle>{discountBeingEdited.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Qual a porcentagem do desconto a ser aplicado ?
          </DialogContentText>
          <div className="form">
            <TextField
              name="discount"
              label="Desconto %"
              type="number"
              className="textField"
              variant="standard"
              value={discount}
              onChange={(e) => {
                handleChangeDiscount(+e.target.value);
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
}
