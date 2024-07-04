import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { PropsAmount } from "./amount";

export const ModalTicket = ({
    handleClose,
    title,
    onChangeAmount,
    valueAmount,
    open,
    onConfirm,
}: PropsAmount) => (
    <Dialog open={open} onClose={handleClose} className="modalRequirements">
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Quantos ingressos vão ser cobrados?</DialogContentText>
        <div className="form">
          <TextField
            label="Ingressos"
            type="number"
            name="ingressos"
            className="textField"
            variant="standard"
            onChange={onChangeAmount}
            value={valueAmount}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onConfirm}>Confirmar</Button>
      </DialogActions>
    </Dialog>
  );
