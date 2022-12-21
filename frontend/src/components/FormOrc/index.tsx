import { Autocomplete, TextField } from "@mui/material";
import { handleForm } from "../../pages/Home/functions/handleForm";
import { useState, useEffect, useRef } from "react";
import "./style.scss";
import { useApi } from "../../hooks/api";
import { ModalRequirement } from "../ModalRequirement";
import serialize from "form-serialize";
import { AppHotelProps } from "../../pages/Home";

export interface FormProps {
  stateApp: AppHotelProps | null;
  selectionRange: {
    startDate: Date;
    endDate: Date;
    key: string;
  };
  addRows: (rows: any[], arrComplete: any[]) => void;
  unitUsing: string[];
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

export interface CategoryOptionsProps {
  label: string;
  unit: number;
  category: string;
}

export interface CategoriesProps {
  category: {
    id: string;
    name: string;
  };
  category_id: string;
  id: number;
  minimum_occupancy: number;
  maximum_occupancy: number;
}

export const FormOrc = ({
  stateApp,
  selectionRange,
  addRows,
  unitUsing,
}: FormProps) => {
  const api = useApi();

  const [open, setOpen] = useState(false);
  const [childValue, setChildValue] = useState<any[]>([]);
  const [petValue, setPetValue] = useState<any[]>([]);
  const [categoryValue, setCategoryValue] =
    useState<CategoryOptionsProps | null>(null);
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
  const [categoryOptions, setCategoryOptions] = useState<
    CategoryOptionsProps[]
  >([]);
  const [allCategories, setAllCategories] = useState<CategoriesProps[]>([]);
  const [occupancy, setOccupancy] = useState<{
    text: string;
    max: number;
    min: number;
    category: string;
  }>({
    text: "",
    max: 0,
    min: 0,
    category: "",
  });
  const [occupancyWrong, setOccupancyWrong] = useState(false);
  const [infoApp, setInfoApp] = useState<String>("");

  async function getListRequirements() {
    await api.getRequirements().then((response) => {
      let list: string[] = [];

      response.map((res: any) => {
        list.push(res.name);
      });
      setListRequirements(list);
    });
  }

  async function getCategoryOptions() {
    await api.findAllHousingUnits().then((response) => {
      let list: CategoryOptionsProps[] = [];

      response.map((res: any) => {
        list.push({
          label: `${res.id} - ${res.category_id}`,
          unit: res.id,
          category: res.category.name,
        });
      });

      setAllCategories(response);
      setCategoryOptions(list);
    });
  }

  function getInfoApp() {
    setInfoApp("");
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

  function changeOccupancy(housingUnit: CategoryOptionsProps) {
    let category = allCategories.filter((arr) => arr.id === housingUnit.unit);

    setOccupancy({
      text: `${category[0].id} - min: ${category[0].minimum_occupancy}, max: ${category[0].maximum_occupancy}`,
      max: category[0].maximum_occupancy,
      min: category[0].minimum_occupancy,
      category: housingUnit.category,
    });
    changeOccupancyWrong({
      text: `${category[0].id} - min: ${category[0].minimum_occupancy}, max: ${category[0].maximum_occupancy}`,
      max: category[0].maximum_occupancy,
      min: category[0].minimum_occupancy,
      category: housingUnit.category,
    });
  }

  function changeOccupancyWrong(occupancy: {
    text: string;
    max: number;
    min: number;
    category: string;
  }) {
    const formUp: HTMLFormElement | any = document.querySelector("#form");
    const responseForm = serialize(formUp, { hash: true });
    let adult = responseForm.adult;
    let child = childValue.length;
    let paq = Number(adult) + child;
    if (paq > occupancy.max || paq < occupancy.min) {
      setOccupancyWrong(true);
    } else {
      setOccupancyWrong(false);
    }
  }

  useEffect(() => {
    changeRequirementValue();
  }, [requirementSubmit]);
  useEffect(() => {
    getInfoApp();
  }, [stateApp]);
  useEffect(() => {
    handleForm(
      occupancy.category,
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
    getCategoryOptions();
  }, []);

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
      <div className="boxFormAndInfo">
        <form id="form" className="form">
          <div className="formBox">
            <TextField
              label="Adulto"
              type="number"
              name="adult"
              className="textField"
              variant="standard"
              onChange={() => {
                handleForm(
                  occupancy.category,
                  requirementSubmit,
                  childValue,
                  petValue,
                  selectionRange,
                  addRows
                );
                changeOccupancyWrong(occupancy);
              }}
            />
            <Autocomplete
              componentName="child"
              multiple
              onChange={(_, newValue) => {
                setChildValue(newValue);
                changeOccupancyWrong(occupancy);
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
                      occupancy.category,
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
              componentName="pet"
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
              name="discount"
              label="Desconto"
              type="number"
              className="textField"
              variant="standard"
              onChange={() =>
                handleForm(
                  occupancy.category,
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
              componentName="category"
              options={categoryOptions}
              className="textField"
              onChange={(_, newValue) => {
                setCategoryValue(newValue);
                if (newValue) changeOccupancy(newValue);
              }}
              // getOptionDisabled={(option) =>
              //   unitUsing.includes(`${option.unit}`)
              // }
              renderOption={(props, option) => {
                if (unitUsing.includes(`${option.unit}`))
                  return (
                    <span {...props} style={{ color: "lightgray" }}>
                      {option.label}
                    </span>
                  );

                return <span {...props}>{option.label}</span>;
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
              componentName="pension"
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
              name="numberPipe"
              label="Nº Pipe"
              type="number"
              onChange={() =>
                handleForm(
                  occupancy.category,
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
              componentName="requirement"
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
        <div
          className="occupancy"
          style={occupancyWrong ? { color: "red" } : {}}
        >
          {occupancy.text}
        </div>
        <div className="infoApp">
          {stateApp !== null && stateApp.qntdReservas && (
            <div className="infoAppBox">
              <div>
                <p>Confirmadas: {stateApp.confirmadas}</p>
                <p>Bloqueios: {stateApp.bloqueios}</p>
              </div>
              <div>
                <p>Processadas: {stateApp.processadas}</p>
                <p>Total Reservas: {stateApp.qntdReservas}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
