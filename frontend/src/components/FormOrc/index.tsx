import { handleForm } from "../../pages/Home/functions/handleForm";
import { useState, useEffect } from "react";
import "./style.scss";
import { useApi } from "../../hooks/api/api";
import { ModalRequirement } from "../ModalRequirement";
import serialize from "form-serialize";
import {
  CategoriesProps,
  CategoryOptionsProps,
  FormProps,
  OccupancyProps,
  RequirementSubmitProps,
  RequirementSubmitValuesProps,
  TypeModalProps,
} from "./Interfaces";
import { AdultInputForm } from "./partForm/adult";
import { ChildInputForm } from "./partForm/child";
import { PetInputForm } from "./partForm/pet";
import { DiscountInputForm } from "./partForm/discount";
import { CategoryInputForm } from "./partForm/category";
import { PensionInputForm } from "./partForm/pension";
import { PipeNumberInputForm } from "./partForm/pipeNumber";
import { RequirementInputForm } from "./partForm/requirement";
import { InfoApp } from "../InfoApp";
import { getListRequirements } from "./getters/getListRequirements";
import { getCategoryOptions } from "./getters/getCategoryOptions";

const occupancyInitial = {
  text: "",
  max: 0,
  min: 0,
  category: "",
};

export const FormOrc = ({
  stateApp,
  selectionRange,
  addRows,
  unitUsing,
}: FormProps) => {
  const api = useApi();
  const [open, setOpen] = useState(false);
  const [childValue, setChildValue] = useState<Number[]>([]);
  const [petValue, setPetValue] = useState<string[]>([]);
  const [categoryValue, setCategoryValue] =
    useState<CategoryOptionsProps | null>(null);
  const [pensionValue, setPensionValue] = useState<string | null>(null);
  const [requirementValue, setRequirementValue] = useState<string[]>([]);
  const [listRequirements, setListRequirements] = useState<string[]>([]);
  const [typeModal, setTypeModal] = useState<TypeModalProps | "">("");
  const [requirementModal, setRequirementModal] = useState<string[]>([]);
  const [requirementSubmit, setRequirementSubmit] = useState<
    RequirementSubmitProps[]
  >([]);
  const [categoryOptions, setCategoryOptions] = useState<
    CategoryOptionsProps[]
  >([]);
  const [allCategories, setAllCategories] = useState<CategoriesProps[]>([]);
  const [occupancy, setOccupancy] = useState<OccupancyProps>(occupancyInitial);
  const [occupancyWrong, setOccupancyWrong] = useState(false);
  const [disabledPension, setDisabledPension] = useState(false);

  const handleClickOpen = (requirement: string[]) => {
    if (requirement.length < requirementSubmit.length) {
      setRequirementSubmit((old) => {
        return old.filter((arr) => requirement.includes(arr.requirement));
      });
      return;
    }
    let lastRequirement = requirement[requirement.length - 1];
    if (lastRequirement.match(/decoração romântica/)) {
      handleSave(requirement, lastRequirement, "romantic", {
        adult: 0,
        child: [],
        amount: 1,
      });
      return;
    }
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

  const handleCategoryInput = (newValue: CategoryOptionsProps | null) => {
    setCategoryValue(newValue);
    setDisabledPension(false);
    if (newValue && !!newValue.label.match(/Day-Use/)) {
      setDisabledPension(true);
      return;
    }
    if (newValue) changeOccupancy(newValue);
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

  const callHandleForm = () => {
    handleForm(
      occupancy.category,
      requirementSubmit,
      childValue,
      petValue,
      selectionRange,
      addRows
    );
  };
  function changeOccupancy(housingUnit: CategoryOptionsProps) {
    let category = allCategories.filter((arr) => arr.id === housingUnit.unit);
    const newValue = {
      text: `${category[0].id} - min: ${category[0].minimum_occupancy}, max: ${category[0].maximum_occupancy}`,
      max: category[0].maximum_occupancy,
      min: category[0].minimum_occupancy,
      category: housingUnit.category,
    };
    setOccupancy(newValue);
    changeOccupancyWrong(newValue);
  }

  function changeOccupancyWrong(occupancy: OccupancyProps) {
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
    callHandleForm();
  }, [
    requirementValue,
    childValue,
    petValue,
    categoryValue,
    pensionValue,
    selectionRange,
  ]);

  const getVariables = async () => {
    const resCategory = await getCategoryOptions();
    setListRequirements(await getListRequirements());
    setAllCategories(resCategory.response);
    setCategoryOptions(resCategory.list);
  };
  useEffect(() => {
    getVariables();
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
            <AdultInputForm
              onChange={() => {
                callHandleForm();
                changeOccupancyWrong(occupancy);
              }}
            />
            <ChildInputForm
              childValue={childValue}
              onChange={(newValue) => {
                setChildValue(newValue);
                changeOccupancyWrong(occupancy);
                callHandleForm;
              }}
            />
            <PetInputForm
              onChange={(newValue) => {
                setPetValue(newValue);
              }}
              petValue={petValue}
            />
            <DiscountInputForm
              onChange={callHandleForm}
              disabledPension={disabledPension}
            />
          </div>
          <div className="formBox">
            <CategoryInputForm
              onChange={handleCategoryInput}
              categoryOptions={categoryOptions}
              categoryValue={categoryValue}
              selectionRange={selectionRange}
              unitUsing={unitUsing}
            />
            <PensionInputForm
              disabledPension={disabledPension}
              onChange={(newValue) => {
                setPensionValue(newValue);
              }}
              pensionValue={pensionValue}
            />
            <PipeNumberInputForm onChange={callHandleForm} />

            <RequirementInputForm
              listRequirements={listRequirements}
              onChange={handleClickOpen}
              requirementValue={requirementValue}
            />
          </div>
        </form>
        <div
          className="occupancy"
          style={occupancyWrong ? { color: "red" } : {}}
        >
          {occupancy.text}
        </div>
        <InfoApp stateApp={stateApp} />
      </div>
    </>
  );
};
