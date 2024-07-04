import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { createData } from "../TableCollapseTariffs/helpers";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function DialogDeleteTariff({
  open,
  handleClose,
  handleDelete,
  rowDelete,
}: {
  open: boolean;
  handleClose: VoidFunction;
  handleDelete: VoidFunction;
  rowDelete: ReturnType<typeof createData> | undefined;
}) {
  const [tariffs, setTariffs] = React.useState("");

  const getTariffs = () => {
    if (
      !rowDelete?.tariffs_to_weekend ||
      !rowDelete?.tariffs_to_midweek ||
      !rowDelete.SpecificDates
    ) {
      handleClose();
      return;
    }
    let common =
      rowDelete.tariffs_to_midweek.length > 0
        ? rowDelete.tariffs_to_midweek[0]
        : rowDelete.tariffs_to_weekend.length > 0
        ? rowDelete.tariffs_to_weekend[0]
        : undefined;

    let specific = rowDelete.SpecificDates[0];

    let tariffsString = common
      ? `${common.tariff_to_midweek_id} e ${common.tariff_to_weekend_id}`
      : specific.tariffs_id;

    setTariffs(tariffsString);
  };

  const verifyRow = () => {
    if (rowDelete === undefined) handleClose();
  };

  React.useEffect(() => {
    verifyRow();
    getTariffs();
  }, [open]);
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Certeza que deseja deletar?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Clicar em sim excluirá totalmente as seguintes tarifas:{" "}
          <b>{tariffs}</b>.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Não</Button>
        <Button onClick={handleDelete}>Sim</Button>
      </DialogActions>
    </Dialog>
  );
}
