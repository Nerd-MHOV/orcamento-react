import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Autocomplete, TextField } from "@mui/material";
import "./style.scss";
import { RequirementSubmitValuesProps } from "../../context/generateTariff/interfaces";
import { GenerateTariffContext } from "../../context/generateTariff/generateTariff";
import serialize from "form-serialize";

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

export function ModalRequirement() {
  const {
    openModalRequirement: open,
    handleCloseModalRequirement: handleClose,
    requirementsModal,
    handleSaveModalRequirement: handleSave,
    typeModal,
    childValue,
  } = React.useContext(GenerateTariffContext);
  const [child, setChild] = React.useState<any[]>([]);
  const [adult, setAdult] = React.useState<number>(0);
  const [amount, setAmount] = React.useState<number>(0);

  React.useEffect(() => {
    const formUp: HTMLFormElement | any = document.querySelector("#form");
    const responseForm = serialize(formUp, { hash: true });
    setAdult(Number(responseForm.adult));
    setChild(childValue);
  }, [open]);

  const modalPerson = (
    <Dialog open={open} onClose={handleClose} className="modalRequirements">
      <DialogTitle>
        {requirementsModal[requirementsModal.length - 1]}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Em quantas pessoas será aplicado o requerimento?
        </DialogContentText>
        <div className="form">
          <TextField
            label="Adulto"
            type="number"
            name="adult"
            className="textField"
            variant="standard"
            onChange={(value) => {
              setAdult(Number(value.target.value));
            }}
            value={adult}
          />
          <Autocomplete
            multiple
            onChange={(_, newValue) => {
              setChild(newValue);
            }}
            value={child}
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
        <Button
          onClick={() => {
            handleSave(
              requirementsModal,
              requirementsModal[requirementsModal.length - 1],
              typeModal,
              {
                adult: adult,
                child: child,
                amount: 0,
              }
            );
          }}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );

  const modalTicket = (
    <Dialog open={open} onClose={handleClose} className="modalRequirements">
      <DialogTitle>
        {requirementsModal[requirementsModal.length - 1]}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Quantos ingressos vão ser cobrados?
        </DialogContentText>
        <div className="form">
          <TextField
            label="Ingressos"
            type="number"
            name="ingressos"
            className="textField"
            variant="standard"
            onChange={(value) => {
              setAmount(Number(value.target.value));
            }}
            value={amount}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={() => {
            handleSave(
              requirementsModal,
              requirementsModal[requirementsModal.length - 1],
              typeModal,
              {
                adult: 0,
                child: [],
                amount: amount,
              }
            );
          }}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );

  const modalTourism = (
    <Dialog open={open} onClose={handleClose} className="modalRequirements">
      <DialogTitle>
        {requirementsModal[requirementsModal.length - 1]}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Quantos participantes?</DialogContentText>
        <div className="form">
          <TextField
            label="nº de participantes"
            type="number"
            name="tourismPerson"
            className="textField"
            variant="standard"
            onChange={(value) => {
              setAmount(Number(value.target.value));
            }}
            value={amount}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={() => {
            handleSave(
              requirementsModal,
              requirementsModal[requirementsModal.length - 1],
              typeModal,
              {
                adult: 0,
                child: [],
                amount: amount,
              }
            );
          }}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );


    const modalGeneric = (
        <Dialog open={open} onClose={handleClose} className="modalRequirements">
            <DialogTitle>
                {requirementsModal[requirementsModal.length - 1]}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>Quantidade ?</DialogContentText>
                <div className="form">
                    <TextField
                        label="Quantidade"
                        type="number"
                        name="amountGeneric"
                        className="textField"
                        variant="standard"
                        onChange={(value) => {
                            setAmount(Number(value.target.value));
                        }}
                        value={amount}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                    onClick={() => {
                        handleSave(
                            requirementsModal,
                            requirementsModal[requirementsModal.length - 1],
                            typeModal,
                            {
                                adult: 0,
                                child: [],
                                amount: amount,
                            }
                        );
                    }}
                >
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );



  if (typeModal === "person") return modalPerson;
  if (typeModal === "ticket") return modalTicket;
  if (typeModal === "tourism") return modalTourism;
  return modalGeneric;
}
