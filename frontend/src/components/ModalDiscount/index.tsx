import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Autocomplete, TextField } from "@mui/material";
import "./style.scss";
import { RequirementSubmitValuesProps } from "../FormOrc/Interfaces";
import { DiscountInputForm } from "../FormOrc/partForm/discount";

interface ModalRequirementProps {
  handleClose: VoidFunction;
  handleSave: () => void;
  open: boolean;
  lastDiscount: number;
  product: {
    id: number;
    name: string;
  };
}

export function ModalRequirement({
  handleClose,
  handleSave,
  open,
}: ModalRequirementProps) {
  return (
    <Dialog open={open} onClose={handleClose} className="modalDiscount">
      <Dialog open={open} onClose={handleClose} className="modalRequirements">
        <DialogTitle>Nome do lançamento</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Qual a porcentagem do desconto aplicado ?
          </DialogContentText>
          <div className="form">
            <DiscountInputForm onChange={() => {}} disabledPension={false} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => {}}>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
}
