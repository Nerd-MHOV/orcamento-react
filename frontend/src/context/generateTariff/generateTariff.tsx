import serialize from "form-serialize";
import { createContext, useEffect, useState } from "react";
import { AppHotelProps } from "../../hooks/appHotel/interfaces";
import { getCategoryOptions } from "./functions/getters/getCategoryOptions";
import { getColumnData } from "./functions/getters/getColumnData";
import { getHolidays } from "./functions/getters/getHolidays";
import { getListRequirements } from "./functions/getters/getListRequirements";
import { getMonthsWithTariffs } from "./functions/getters/getMonthsWithTariffs";
import { getUnitUsing } from "./functions/getters/getUnitUsing";
import { handleForm } from "./functions/handleForm";
import {
  dataInitial,
  occupancyInitial,
  rowDiscountInitial,
  selectionRangeInitial,
} from "./initial";
import {
  ArrCompleteProps,
  CategoriesProps,
  CategoryOptionsProps,
  DataContentProps,
  GenerateTariffContextProps,
  OccupancyProps,
  PensionsOptionsProps,
  RequirementSubmitProps,
  RequirementSubmitValuesProps,
  RowModalDiscount,
  TypeModalProps,
} from "./interfaces";

export const GenerateTariffContext = createContext<GenerateTariffContextProps>({
  handleSelectDate: async () => {},
  holidays: [],
  monthsWithTariffs: [],
  selectionRange: selectionRangeInitial,
  stateApp: null,
  addRows() {},
  unitUsing: [],
  dataTable: {
    rows: [],
    columns: [],
  },
  budgets: [],
  deleteLine() {},
  handleSaveBudget: async () => {},
  clearTariffs: async () => {},
  openModalRequirement: false,
  handleCloseModalRequirement() {},
  handleSaveModalRequirement() {},
  typeModal: "",
  requirementsModal: [],
  callHandleForm() {},
  occupancy: occupancyInitial,
  occupancyWrong: false,
  changeOccupancyWrong() {},
  childValue: [],
  setChildValue() {},
  petValue: [],
  setPetValue() {},
  disabledPension: false,
  handleCategoryInput() {},
  categoryOptions: [],
  categoryValue: null,
  pensionValue: null,
  setPensionValue() {},
  listRequirements: [],
  requirementValue: [],
  handleClickOpenModalRequirement() {},
  handleCloseModalDiscount() {},
  handleSaveModalDiscount() {},
  handleClickOpenModalDiscount() {},
  openModalDiscount: false,
  discountBeingEdited: rowDiscountInitial,
  addUnitaryDiscount() {},
  clearUnitaryDiscount() {},
});

export const GenerateTariffProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [dataTable, setDataTable] = useState<DataContentProps>(dataInitial);
  const [budgets, setBudgets] = useState<DataContentProps[]>([]);
  const [arrComplete, setArrComplete] = useState<ArrCompleteProps | []>([]);
  const [selectionRange, setSelectionRange] = useState(selectionRangeInitial);
  const [holidays, setHolidays] = useState<string[]>([]);
  const [monthsWithTariffs, setMonthsWithTariffs] = useState<string[]>([]);
  const [stateApp, setStateApp] = useState<AppHotelProps | null>(null);
  const [unitUsing, setUnitUsing] = useState<string[]>([]);
  const [openModalRequirement, setOpenModalRequirement] = useState(false);
  const [childValue, setChildValue] = useState<number[]>([]);
  const [petValue, setPetValue] = useState<string[]>([]);
  const [categoryValue, setCategoryValue] =
    useState<CategoryOptionsProps | null>(null);
  const [pensionValue, setPensionValue] = useState<PensionsOptionsProps | null>(
    null
  );
  const [requirementValue, setRequirementValue] = useState<string[]>([]);
  const [listRequirements, setListRequirements] = useState<string[]>([]);
  const [typeModal, setTypeModal] = useState<TypeModalProps | "">("");
  const [requirementsModal, setRequirementsModal] = useState<string[]>([]);
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
  const [openModalDiscount, setOpenModalDiscount] = useState(false);
  const [unitaryDiscount, setUnitaryDiscount] = useState<RowModalDiscount[]>(
    []
  );
  const [discountBeingEdited, setDiscountBeingEdited] =
    useState(rowDiscountInitial);

  const getVariables = async () => {
    setDataTable(dataInitial);
    setHolidays(await getHolidays());
    setMonthsWithTariffs(await getMonthsWithTariffs());
    const resCategory = await getCategoryOptions();
    setListRequirements(await getListRequirements());
    setAllCategories(resCategory.response);
    setCategoryOptions(resCategory.list);
  };

  async function handleSelectDate(ranges: any) {
    setStateApp(null);
    setSelectionRange(ranges.selection);
    setDataTable((par) => ({
      rows: par.rows,
      columns: getColumnData(ranges.selection),
    }));
    setUnitUsing([]);
    const response = await getUnitUsing(ranges.selection);
    setStateApp(response.response);
    setUnitUsing(response.units);
  }

  async function handleSaveBudget() {
    if (dataTable.rows.length === 0) {
      return;
    }
    setBudgets((old) => {
      return [...old, { ...dataTable, arrComplete }];
    });
  }

  async function clearTariffs() {
    setBudgets([]);
  }

  function addRows(rows: any[], arrComplete: any) {
    setDataTable((par) => {
      return {
        rows: rows,
        columns: par.columns,
      };
    });
    setArrComplete(arrComplete);
  }

  function deleteLine(indexDelete: number) {
    setBudgets((old) => {
      return old.filter((arr, index) => index !== indexDelete);
    });
  }

  //form
  const addUnitaryDiscount = (row: RowModalDiscount) => {
    setUnitaryDiscount((old) => {
      let editable: RowModalDiscount[] = [];
      let editableOld = old;
      let newItem = true;

      editableOld = old.map((item) => {
        if (item.id === row.id) {
          newItem = false;
          item.discount = row.discount;
        }

        return item;
      });

      if (newItem) {
        editable.push(row);
      }

      return [...editableOld, ...editable];
    });
  };

  const clearUnitaryDiscount = () => {
    setUnitaryDiscount([]);
  };

  const handleCloseModalDiscount = () => {
    setOpenModalDiscount(false);
  };

  const handleClickOpenModalDiscount = (row: RowModalDiscount) => {
    setDiscountBeingEdited(row);
    setOpenModalDiscount(true);
  };

  const handleSaveModalDiscount = () => {
    setOpenModalDiscount(false);
  };
  const handleCloseModalRequirement = () => {
    setOpenModalRequirement(false);
  };

  const handleClickOpenModalRequirement = (requirement: string[]) => {
    if (requirement.length < requirementSubmit.length) {
      setRequirementSubmit((old) => {
        return old.filter((arr) => requirement.includes(arr.requirement));
      });
      return;
    }
    let lastRequirement = requirement[requirement.length - 1];
    if (lastRequirement.match(/decoração romântica/)) {
      handleSaveModalRequirement(requirement, lastRequirement, "romantic", {
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

    setRequirementsModal(requirement);
    setOpenModalRequirement(true);
  };

  const handleSaveModalRequirement = (
    requirements: string[],
    requirement: string,
    type: string,
    values: RequirementSubmitValuesProps
  ) => {
    setOpenModalRequirement(false);
    setRequirementSubmit((old) => {
      return [...old, { requirement, type, values }];
    });
    //setRequirementValue(requirements);
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

  function changeOccupancyWrong(parOccupancy?: OccupancyProps) {
    if (!parOccupancy) parOccupancy = occupancy;
    const formUp: HTMLFormElement | any = document.querySelector("#form");
    const responseForm = serialize(formUp, { hash: true });
    let adult = responseForm.adult;
    let child = childValue.length;
    let paq = Number(adult) + child;
    if (paq > parOccupancy.max || paq < parOccupancy.min) {
      setOccupancyWrong(true);
    } else {
      setOccupancyWrong(false);
    }
  }

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
      addRows,
      unitaryDiscount
    );
  };

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
    unitaryDiscount,
  ]);

  useEffect(() => {
    clearUnitaryDiscount();
  }, [childValue, petValue]);

  useEffect(() => {
    getVariables();
  }, []);
  return (
    <GenerateTariffContext.Provider
      value={{
        handleSelectDate,
        holidays,
        monthsWithTariffs,
        selectionRange,
        stateApp,
        addRows,
        unitUsing,
        dataTable,
        budgets,
        deleteLine,
        handleSaveBudget,
        clearTariffs,
        openModalRequirement,
        handleCloseModalRequirement,
        handleSaveModalRequirement,
        typeModal,
        requirementsModal,
        callHandleForm,
        occupancy,
        occupancyWrong,
        changeOccupancyWrong,
        childValue,
        setChildValue,
        petValue,
        setPetValue,
        disabledPension,
        handleCategoryInput,
        categoryOptions,
        categoryValue,
        setPensionValue,
        pensionValue,
        listRequirements,
        requirementValue,
        handleClickOpenModalRequirement,
        handleCloseModalDiscount,
        handleSaveModalDiscount,
        handleClickOpenModalDiscount,
        openModalDiscount,
        discountBeingEdited,
        addUnitaryDiscount,
        clearUnitaryDiscount,
      }}
    >
      {children}
    </GenerateTariffContext.Provider>
  );
};
