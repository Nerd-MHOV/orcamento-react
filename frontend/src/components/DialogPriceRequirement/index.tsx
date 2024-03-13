import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { GenerateTariffContext } from "../../context/generateTariff/generateTariff";
import { Box, CircularProgress, TextField } from "@mui/material";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogPriceRequirement({
  requirement,
  open,
  confirm,
  close,
}: {
  requirement: string;
  open: boolean;
  confirm(price: number): Promise<boolean>;
  close: VoidFunction;
}) {
  const [price, setPrice] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={close}
        aria-describedby="alert-dialog-slide-description"
      >
        {!loading ? (
          <>
            <DialogTitle>
              Editar o valor do requerimento "{requirement}"?
            </DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="price"
                label="Preço do Requerimento"
                type="text"
                error={error}
                fullWidth
                variant="standard"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={close}>Cancelar</Button>
              <Button
                onClick={() => {
                  setLoading(true);
                  setError(false);
                  confirm(Number(price)).then((response) => {
                    setLoading(false);
                    if (response) {
                      close();
                      setPrice("");
                    } else {
                      setError(true);
                    }
                  });
                }}
              >
                Aplicar
              </Button>
            </DialogActions>
          </>
        ) : (
          <Box sx={{ display: "flex", padding: 15 }}>
            <CircularProgress />
          </Box>
        )}
      </Dialog>
    </div>
  );
}
