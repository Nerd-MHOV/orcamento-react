import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
const ageChild = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];
interface Props {
  handleClose: VoidFunction,
  open: boolean,
  title: string,
  onChangeAdult: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> | undefined,
  valueAdult: number,
  onChangeChild: ((event: React.SyntheticEvent<Element, Event>, value: any[], reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<any> | undefined) => void) | undefined
  valueChild: any[],
  onConfirm: VoidFunction,
}
export const ModalPerson = ({
  handleClose,
  open,
  title,
  onChangeAdult,
  valueAdult,
  onChangeChild,
  valueChild,
  onConfirm,

}: Props) => (
  <Dialog open={open} onClose={handleClose} className="modalRequirements">
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>Em quantas pessoas será aplicado o requerimento?</DialogContentText>
      <div className="form">
        <TextField
          label="Adulto"
          type="number"
          name="adult"
          className="textField"
          variant="standard"
          onChange={onChangeAdult}
          value={valueAdult}
        />
        <Autocomplete
          multiple
          onChange={onChangeChild}
          value={valueChild}
          options={ageChild}
          isOptionEqualToValue={() => false}
          className="textField"
          renderInput={(params) => (
            <TextField
              {...params}
              label="Criança"
              type="text"
              placeholder="idade"
              variant="standard"
            />
          )}
        />
      </div>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={onConfirm} >Confirmar</Button>
    </DialogActions>
  </Dialog>
);