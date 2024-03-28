import React, { ReactNode, useEffect, useState } from "react";
import { getColumnData } from "./functions/getters/getColumnData";
import { getUnitUsing } from "./functions/getters/getUnitUsing";
import { handleForm } from "./functions/handleForm";
import { calcTotal } from "./functions/calcTotal";
import { dataInitial } from "./initial";
import ArrCompleteProps from "./interfaces/budgetArrCompleteProps";
import DataContentProps from "./interfaces/tableBudgetDataContentProps";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import usePermission from "./hooks/usePermission";
import useUnitaryDiscount from "./hooks/useUnitaryDiscount";
import useClientName from "./hooks/useClientName";
import useDateRange from "./hooks/useDateRange";
import useRequirement from "./hooks/useRequirement";
import useCategory from "./hooks/useCategory";
import useDiscountModal from "./hooks/useDiscountModal";
import { GenerateTariffContext } from "./generateTariff";
import useActionsDiscount from "./hooks/useActionsDiscount";
import useRoomLayout from "./hooks/useRoomLayout";
import RowsProps from "./interfaces/tableBudgetRowsProps";
import useInfoBudgets from "./hooks/useInfoBudgets";

const AccommodadtionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  
  const [openBackdrop, setOpenBackdrop] = useState(false)
  
  const [dataTable, setDataTable] = useState<DataContentProps>(dataInitial);

  const onAddRows = (rows: RowsProps[]) => {
    setDataTable((par) => {
      return {
        rows: rows,
        columns: par.columns,
      };
    });
  }
  
  const permissionHook = usePermission();
  const unitaryDiscountHook = useUnitaryDiscount();
  const clientNameHook = useClientName();
  const selectionRangeHook = useDateRange();
  const requirementsHook = useRequirement();
  const categoryHook = useCategory();
  const discountModalHook = useDiscountModal();
  const actionsDiscountHook = useActionsDiscount();
  const roomLayoutHook = useRoomLayout();
  const infoBudgetHook = useInfoBudgets( dataTable, onAddRows );

  //Loading Component
  const handleOpenBackdrop = () => {
    setOpenBackdrop(true);
  }

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  }

  const callHandleForm = () => {
    handleForm(
      categoryHook.occupancy.category,
      selectionRangeHook.selectionRange,
      unitaryDiscountHook.unitaryDiscount,
      actionsDiscountHook.dailyCourtesy,
      infoBudgetHook.addRows,
    );
  };

  useEffect(() => {
    callHandleForm();
  }, [
    unitaryDiscountHook.unitaryDiscount,
  ]);


  useEffect(() => {
    setDataTable((par) => ({
      rows: par.rows,
      columns: getColumnData(selectionRangeHook.selectionRange),
    }))
  }, [selectionRangeHook.selectionRange]);

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
        ...actionsDiscountHook,
        ...roomLayoutHook,
        ...infoBudgetHook,
        dataTable,
        callHandleForm,
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