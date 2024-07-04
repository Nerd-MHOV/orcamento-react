import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { PropsAmount } from "./amount";
export const ModalParticipant = ({
    handleClose,
    open,
    title,
    onChangeAmount,
    valueAmount,
    onConfirm,
}: PropsAmount) => (
    <Dialog open={open} onClose={handleClose} className="modalRequirements">
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            <DialogContentText>Quantos participantes?</DialogContentText>
            <div className="form">
                <TextField
                    label="nº de participantes"
                    type="number"
                    name="tourismPerson"
                    className="textField"
                    variant="standard"
                    onChange={onChangeAmount}
                    value={valueAmount}
                />
            </div>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={onConfirm} >Confirmar</Button>
        </DialogActions>
    </Dialog>
);