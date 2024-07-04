import * as React from "react";
import "./style.scss";
import { useGenerateTariff, useGenerateTariffCorporate } from "../../context/generateTariff/generateTariff";
import serialize from "form-serialize";
import { ModalPerson } from "./typesModal/person";
import { RequirementSubmitValuesProps } from "../../context/generateTariff/interfaces/requirementSubmitProps";
import { ModalTicket } from "./typesModal/ticket";
import { ModalParticipant } from "./typesModal/participant";
import { ModalAmount, PropsAmount } from "./typesModal/amount";

export function ModalRequirement({ corporate = false }) {
  const {
    openModalRequirement: open,
    handleCloseModalRequirement: handleClose,
    requirementsModal,
    handleSaveModalRequirement: handleSave,
    typeModal,
    childValue,
  } = corporate ? useGenerateTariffCorporate() : useGenerateTariff();
  const [child, setChild] = React.useState<any[]>([]);
  const [adult, setAdult] = React.useState<number>(0);
  const [amount, setAmount] = React.useState<number>(0);

  React.useEffect(() => {
    const formUp: HTMLFormElement | any = document.querySelector("#form");
    const responseForm = serialize(formUp, { hash: true });
    setAdult(Number(responseForm.adult));
    setChild(childValue);
  }, [open]);

  const title = requirementsModal[requirementsModal.length - 1]?.name ?? "";
  const type = requirementsModal[requirementsModal.length - 1]?.type ?? "";
  const callHandleSalve = (submitProps: RequirementSubmitValuesProps) => {
    handleSave(
      title,
      typeModal || 'amount',
      type,
      submitProps
    )
  }
  const propsAmount: PropsAmount = {
    handleClose,
    open,
    title,
    onChangeAmount: (value) => { setAmount(Number(value.target.value)) },
    valueAmount: amount,
    onConfirm: () => { callHandleSalve({ adult: 0, child: [], amount: amount} ) },
  }
  const modalPerson = ModalPerson({
    handleClose,
    open,
    title,
    onChangeAdult: (value) => {  setAdult(Number(value.target.value)) },
    onChangeChild: (_, newValue) => { setChild(newValue) },
    onConfirm: () => { callHandleSalve({ adult, child, amount: 0 }) },
    valueAdult: adult,
    valueChild: child,
  });
  const modalTicket = ModalTicket(propsAmount)
  const modalParticipant = ModalParticipant(propsAmount)
  const modalAmount = ModalAmount(propsAmount)
  

  if (typeModal === "person") return modalPerson;
  if (typeModal === "ticket") return modalTicket;
  if (typeModal === "participant") return modalParticipant;
  return modalAmount;
}
