import React, {ReactNode, useEffect, useState} from "react";
import {getCategoryOptions} from "./functions/getters/getCategoryOptions";
import {getColumnData} from "./functions/getters/getColumnData";
import {getHolidays} from "./functions/getters/getHolidays";
import {getListRequirements} from "./functions/getters/getListRequirements";
import {getMonthsWithTariffs} from "./functions/getters/getMonthsWithTariffs";
import {getUnitUsing} from "./functions/getters/getUnitUsing";
import {handleForm} from "./functions/handleForm";
import {calcTotal} from "./functions/calcTotal";
import {dataInitial} from "./initial";
import ArrCompleteProps from "./interfaces/budgetArrCompleteProps";
import { CategoryOptionsProps } from "./interfaces/categoriesProps";
import PensionsOptionsProps from "./interfaces/pensionOptionsProps";
import CategoriesProps from "./interfaces/categoriesProps";
import DataContentProps from "./interfaces/tableBudgetDataContentProps";
import {ApiDiscountProps} from "../../hooks/api/interfaces";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import usePermission from "./hooks/permission/usePermission";
import useUnitaryDiscount from "./hooks/unitaryDiscount/useUnitaryDiscount";
import useClientName from "./hooks/clientName/useClientName";
import useSelectionRange from "./hooks/selectionRange/useSelectionRange";
import useRequirement from "./hooks/requirement/useRequirement";
import useCategory from "./hooks/category/useCategory";
import useDiscountModal from "./hooks/discountModal/useDiscountModal";
import { GenerateTariffContext } from "./generateTariff";

const AccommodadtionProvider: React.FC< {children: ReactNode } > = ({children}) => {
    // Values
    const [dailyCourtesy, setDailyCourtesy] = useState(false);
    const [childValue, setChildValue] = useState<number[]>([]);
    const [petValue, setPetValue] = useState<string[]>([]);
    const [pensionValue, setPensionValue] = useState<PensionsOptionsProps | null>(
      null
    );
  
    // initials?
    const [holidays, setHolidays] = useState<string[]>([]);
    const [monthsWithTariffs, setMonthsWithTariffs] = useState<string[]>([]);
    const [listRequirements, setListRequirements] = useState<string[]>([]);
    const [categoryOptions, setCategoryOptions] = useState<
    CategoryOptionsProps[]
    >([]);
    const [allCategories, setAllCategories] = useState<CategoriesProps[]>([]);
  
    const [openBackdrop, setOpenBackdrop] = useState(false)
    const [dataTable, setDataTable] = useState<DataContentProps>(dataInitial);
    const [budgets, setBudgets] = useState<DataContentProps[]>([]);
    const [arrComplete, setArrComplete] = useState<ArrCompleteProps | []>([]);
    const [unitUsing, setUnitUsing] = useState<string[]>([]);
    const [disabledPension, setDisabledPension] = useState(false);
    const [actionSelected, setActionSelected] = useState<
      ApiDiscountProps | undefined
    >();
    
    const permissionHook = usePermission();
    const unitaryDiscountHook = useUnitaryDiscount();
    const clientNameHook = useClientName();
    const selectionRangeHook = useSelectionRange();
    const requirementsHook = useRequirement(); 
    const categoryHook = useCategory(allCategories, childValue);
    const discountModalHook = useDiscountModal();
  
  
    //Loading Component
    const handleOpenBackdrop = () => {
      setOpenBackdrop(true);
    }
  
    const handleCloseBackdrop = () => {
      setOpenBackdrop(false);
    }
   
  
    const getVariables = async () => {
      setDataTable(dataInitial);
      setHolidays(await getHolidays());
      setMonthsWithTariffs(await getMonthsWithTariffs());
      const resCategory = await getCategoryOptions();
      setListRequirements(await getListRequirements());
      setAllCategories(resCategory.response);
      setCategoryOptions(resCategory.list);
    };
  
   
  
    async function handleSaveBudget() {
      if (dataTable.rows.length === 0) {
        return;
      }
      const total = calcTotal(dataTable).total;
      setBudgets((old) => {
        return [...old, { ...dataTable, arrComplete, total }];
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
  
  
    async function whenChangeSelectionRange() {
      setDailyCourtesy(false);
      setDataTable((par) => ({
        rows: par.rows,
        columns: getColumnData(selectionRangeHook.selectionRange),
      }));
      setUnitUsing([]);
      const response = await getUnitUsing(selectionRangeHook.selectionRange);
      selectionRangeHook.setStateApp(response.response);
      setUnitUsing(response.units);
    }
  
    const callHandleForm = () => {
      handleForm(
        categoryHook.occupancy.category,
        requirementsHook.requirementSubmit,
        childValue,
        petValue,
        selectionRangeHook.selectionRange,
        addRows,
        unitaryDiscountHook.unitaryDiscount,
        dailyCourtesy
      );
    };
  
    useEffect(() => {
      callHandleForm();
    }, [
      requirementsHook.requirementValue,
      childValue,
      petValue,
      categoryHook.categoryValue,
      pensionValue,
      selectionRangeHook.selectionRange,
      unitaryDiscountHook.unitaryDiscount,
      dailyCourtesy,
    ]);
  
    useEffect(() => {
      unitaryDiscountHook.clearUnitaryDiscount();
      categoryHook.changeOccupancyWrong();
    }, [childValue, petValue]);
   
    useEffect(() => {
      whenChangeSelectionRange();
    }, [selectionRangeHook.selectionRange]);
  
    useEffect(() => {
      // If there is day-use then it will always be complete pension --
      setDisabledPension(false);
      if (categoryHook.categoryValue && !!categoryHook.categoryValue.label.match(/Day-Use/)) {
        setDisabledPension(true);
        return;
      }
    }, [categoryHook.handleCategoryInput])
  
    useEffect(() => {
      getVariables();
    }, []);
  
    return (
      <GenerateTariffContext.Provider
        value={{
          ...permissionHook,
          ...unitaryDiscountHook,
          ...clientNameHook,
          ...selectionRangeHook,
          ...requirementsHook,
          ...categoryHook,
          ...discountModalHook,
          holidays,
          monthsWithTariffs,
          addRows,
          unitUsing,
          dataTable,
          budgets,
          deleteLine,
          handleSaveBudget,
          clearTariffs,
          callHandleForm,
          childValue,
          setChildValue,
          petValue,
          setPetValue,
          disabledPension,
          categoryOptions,
          setPensionValue,
          pensionValue,
          listRequirements,
          dailyCourtesy,
          setDailyCourtesy,
          actionSelected,
          setActionSelected,
          handleOpenBackdrop,
          handleCloseBackdrop,
        }}
      >
        <Backdrop
            sx={{ color: '#54a0ff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={openBackdrop}
            onClick={handleCloseBackdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
  
  
        {children}
      </GenerateTariffContext.Provider>
    );
}


export default AccommodadtionProvider