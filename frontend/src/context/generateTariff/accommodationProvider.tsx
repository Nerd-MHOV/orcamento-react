import React, { ReactNode, useEffect, useState } from "react";
import { getColumnData } from "./functions/getters/getColumnData";
import { handleForm } from "./functions/handleForm";
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
import useInfoBudgets from "./hooks/useInfoBudgets";

const AccommodadtionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  
  const [openBackdrop, setOpenBackdrop] = useState(false)
  
  const permissionHook = usePermission();
  const unitaryDiscountHook = useUnitaryDiscount();
  const clientNameHook = useClientName();
  const selectionRangeHook = useDateRange();
  const requirementsHook = useRequirement();
  const categoryHook = useCategory();
  const discountModalHook = useDiscountModal();
  const actionsDiscountHook = useActionsDiscount();
  const roomLayoutHook = useRoomLayout();
  const infoBudgetHook = useInfoBudgets();

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
    infoBudgetHook.setDataTable((par) => ({
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