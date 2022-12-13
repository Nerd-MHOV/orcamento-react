import { Autocomplete, TextField } from "@mui/material";
import { handleForm } from "../../pages/Home/handleForm";
import { useState, useEffect } from "react";
import "./style.scss";
import { useApi } from "../../hooks/api";
import { ModalRequirement } from "../ModalRequirement";

export interface FormProps {
  selectionRange: {
    startDate: Date;
    endDate: Date;
    key: string;
  };
  addRows: (rows: any[], arrComplete: any[]) => void;
}

export interface RequirementProps {
  name: string;
  price: number;
}

export type RequirementSubmitProps = {
  requirement: string;
  type: string;
  values: RequirementSubmitValuesProps;
};

export type RequirementSubmitValuesProps = {
  adult: number;
  child: string[];
  amount: number;
};

const optionsCategories = [
  { label: "padrão", input: 1 },
  { label: "padrão varanda", input: 2 },
  { label: "luxo", input: 3 },
  { label: "luxo conjugado", input: 4 },
  { label: "luxo com hidro", input: 5 },
];

export const FormOrc = ({ selectionRange, addRows }: FormProps) => {
  const api = useApi();
  const [open, setOpen] = useState(false);
  const [childValue, setChildValue] = useState<any[]>([]);
  const [petValue, setPetValue] = useState<any[]>([]);
  const [categoryValue, setCategoryValue] = useState<{
    label: string;
    input: number;
  } | null>(null);
  const [pensionValue, setPensionValue] = useState<string | null>(null);
  const [requirementValue, setRequirementValue] = useState<string[]>([]);
  const [listRequirements, setListRequirements] = useState<string[]>([]);
  const [typeModal, setTypeModal] = useState<
    "" | "person" | "ticket" | "tourism"
  >("");
  const [requirementModal, setRequirementModal] = useState<string[]>([]);
  const [requirementSubmit, setRequirementSubmit] = useState<
    RequirementSubmitProps[]
  >([]);
  async function getListRequirements() {
    await api.getRequirements().then((response) => {
      let list: string[] = [];

      response.map((res: any) => {
        list.push(res.name);
      });
      setListRequirements(list);
    });
  }
  const handleClickOpen = (requirement: string[]) => {
    if (requirement.length < requirementSubmit.length) {
      setRequirementSubmit((old) => {
        return old.filter((arr) => requirement.includes(arr.requirement));
      });
      return;
    }
    let lastRequirement = requirement[requirement.length - 1];
    if (lastRequirement.match(/decoração romântica/)) return;
    if (lastRequirement.match(/check-in às/)) setTypeModal("person");
    if (lastRequirement.match(/observação C.E.U/)) setTypeModal("ticket");
    if (
      lastRequirement.match(/Território -/) ||
      lastRequirement.match(/Eco A. -/)
    )
      setTypeModal("tourism");

    setRequirementModal(requirement);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (
    requirements: string[],
    requirement: string,
    type: string,
    values: RequirementSubmitValuesProps
  ) => {
    setOpen(false);
    setRequirementSubmit((old) => {
      return [...old, { requirement, type, values }];
    });

    //setRequirementValue(requirements);
  };

  function changeRequirementValue() {
    let array: string[] = [];
    requirementSubmit.map((val) => {
      array.push(val.requirement);
    });

    setRequirementValue(array);
  }

  useEffect(() => {
    changeRequirementValue();
  }, [requirementSubmit]);
  useEffect(() => {
    handleForm(
      requirementSubmit,
      childValue,
      petValue,
      selectionRange,
      addRows
    );
  }, [
    requirementValue,
    childValue,
    petValue,
    categoryValue,
    pensionValue,
    selectionRange,
  ]);
  useEffect(() => {
    getListRequirements();
  });

  return (
    <>
      <div className="modal">
        {open && (
          <ModalRequirement
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            handleSave={handleSave}
            typeModal={typeModal}
            requirementsModal={requirementModal}
            open={open}
          />
        )}
      </div>
      <form id="form" className="form">
        <div className="formBox">
          <TextField
            label="Adulto"
            type="number"
            name="adult"
            className="textField"
            variant="standard"
            onChange={() =>
              handleForm(
                requirementSubmit,
                childValue,
                petValue,
                selectionRange,
                addRows
              )
            }
          />
          <Autocomplete
            multiple
            componentName="child"
            onChange={(_, newValue) => {
              setChildValue(newValue);
            }}
            value={childValue}
            options={[
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
            ]}
            isOptionEqualToValue={() => false}
            className="textField"
            renderInput={(params) => (
              <TextField
                {...params}
                label="Criança"
                type="text"
                placeholder="idade"
                variant="standard"
                onChange={() =>
                  handleForm(
                    requirementSubmit,
                    childValue,
                    petValue,
                    selectionRange,
                    addRows
                  )
                }
              />
            )}
          />
          <Autocomplete
            multiple
            options={["pequeno", "médio", "grande"]}
            isOptionEqualToValue={() => false}
            className="textField"
            onChange={(_, newValue) => {
              setPetValue(newValue);
            }}
            value={petValue}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Pet"
                name="pet"
                placeholder="porte"
                type="text"
                variant="standard"
              />
            )}
          />
          <TextField
            label="Desconto"
            type="number"
            name="discount"
            className="textField"
            variant="standard"
            onChange={() =>
              handleForm(
                requirementSubmit,
                childValue,
                petValue,
                selectionRange,
                addRows
              )
            }
          />
        </div>
        <div className="formBox">
          <Autocomplete
            options={optionsCategories}
            className="textField"
            onChange={(_, newValue) => {
              setCategoryValue(newValue);
            }}
            value={categoryValue}
            renderInput={(params) => (
              <TextField
                {...params}
                name="category"
                label="Categoria"
                type="text"
                variant="standard"
              />
            )}
          />
          <Autocomplete
            options={["simples", "meia", "completa"]}
            className="textField"
            onChange={(_, newValue) => {
              setPensionValue(newValue);
            }}
            value={pensionValue}
            renderInput={(params) => (
              <TextField
                {...params}
                name="pension"
                label="Pensão"
                type="text"
                variant="standard"
              />
            )}
          />
          <TextField
            label="Nº Pipe"
            type="number"
            name="numberPipe"
            onChange={() =>
              handleForm(
                requirementSubmit,
                childValue,
                petValue,
                selectionRange,
                addRows
              )
            }
            className="textField"
            variant="standard"
          />

          <Autocomplete
            multiple
            isOptionEqualToValue={() => false}
            options={listRequirements}
            className="textField"
            onChange={(_, newValue) => {
              handleClickOpen(newValue);
            }}
            value={requirementValue}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Requerimento"
                type="text"
                name="requirement"
                className="textField"
                variant="standard"
              />
            )}
          />
        </div>
      </form>
    </>
  );
};
