import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";

export interface PropsAmount {
    handleClose: VoidFunction;
    title: string;
    onChangeAmount: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> | undefined;
    valueAmount: number;
    open: boolean;
    onConfirm: VoidFunction;
}

export const ModalAmount = ({
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
            <DialogContentText>Quantidade ?</DialogContentText>
            <div className="form">
                <TextField
                    label="Quantidade"
                    type="number"
                    name="amountGeneric"
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

