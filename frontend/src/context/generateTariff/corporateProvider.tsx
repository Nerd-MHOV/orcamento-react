import React, { ReactNode, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { GenerateTariffCorporateContext } from "./generateTariff";
import DataContentProps from "./interfaces/tableBudgetDataContentProps";
import usePermission from "./hooks/usePermission";
import useDateRange from "./hooks/useDateRange";
import useActionsDiscount from "./hooks/useActionsDiscount";
import useCategory from "./hooks/useCategory";
import useRoomLayout from "./hooks/useRoomLayout";
import useRequirement from "./hooks/useRequirement";
import useClientName from "./hooks/useClientName";
import useInfoBudgets from "./hooks/useInfoBudgets";
import { corporateBodySendBudgetInitial, dataInitial } from "./initial";
import RowsProps from "./interfaces/tableBudgetRowsProps";
import { getColumnData } from "./functions/getters/getColumnData";
import useBodyCorporateBudget from "./hooks/useBodyCorporateBudget";

const CorporateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // initial
    const [dataTable, setDataTable] = useState<DataContentProps>(dataInitial);
    const onAddRows = (rows: RowsProps[]) => {
        setDataTable((par) => {
            return {
                rows: rows,
                columns: par.columns,
            };
        });
    }
    //Loading Component
    const [openBackdrop, setOpenBackdrop] = useState(false)
    const handleOpenBackdrop = () => { setOpenBackdrop(true) }
    const handleCloseBackdrop = () => { setOpenBackdrop(false) }
    const loadingComponent = {
        handleOpenBackdrop,
        handleCloseBackdrop,
    }
    //Send Objetct To Api Budget
    function callHandleForm() { }
    const selectionRangeHook = useDateRange();
    useEffect(() => {
        setDataTable((par) => ({
            rows: par.rows,
            columns: getColumnData(selectionRangeHook.selectionRange),
        }))
    }, [selectionRangeHook.selectionRange]);
    // NEW for corporate
    const bodySendBudget = useBodyCorporateBudget();
    const categoryHook = useCategory();
    useEffect(() => { 
        bodySendBudget.changeCategoryToRoomCorporate(categoryHook.categoriesCorporateValues)
    }, [categoryHook.categoriesCorporateValues])
    return (
        <GenerateTariffCorporateContext.Provider
            value={{
                ...bodySendBudget,
                ...loadingComponent,
                ...usePermission(),                                             // Modal Permission General Discount
                ...selectionRangeHook,                                          // CalendarPicker
                ...useActionsDiscount(),                                        // FormOrc/corporate 
                ...categoryHook,                                               // FormOrc/corporate 
                ...useRequirement(),                                            // ModalRequirement, Requirement(form)
                ...useRoomLayout(),                                             // pension(form)
                ...useClientName(),                                             // rdClient(form)
                ...useInfoBudgets(dataTable, onAddRows),                        // infoTables
                callHandleForm,
                dataTable,
                childValue: [],                                                 // ModalRequirement
                handleClickOpenModalDiscount: () => { }                          // TableCalc
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
        </GenerateTariffCorporateContext.Provider>
    );
}


export default CorporateProvider