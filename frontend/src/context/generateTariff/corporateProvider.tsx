import React, { ReactNode, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { GenerateTariffCorporateContext } from "./generateTariff";
import usePermission from "./hooks/usePermission";
import useDateRange from "./hooks/useDateRange";
import useActionsDiscount from "./hooks/useActionsDiscount";
import useCategory from "./hooks/useCategory";
import useRoomLayout from "./hooks/useRoomLayout";
import useRequirement from "./hooks/useRequirement";
import useClientName from "./hooks/useClientName";
import useInfoBudgets from "./hooks/useInfoBudgets";
import { getColumnData } from "./functions/getters/getColumnData";
import useBodyCorporateBudget from "./hooks/useBodyCorporateBudget";
import { useApi } from "../../hooks/api/api";

const CorporateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const api = useApi();
    //Loading Component
    const [openBackdrop, setOpenBackdrop] = useState(false)
    const handleOpenBackdrop = () => { setOpenBackdrop(true) }
    const handleCloseBackdrop = () => { setOpenBackdrop(false) }
    const loadingComponent = {
        handleOpenBackdrop,
        handleCloseBackdrop,
    }
   
   
    // NEW for corporate
    const bodySendBudget = useBodyCorporateBudget();
    const categoryHook = useCategory();

    const infoBudgetHook = useInfoBudgets();
    const selectionRangeHook = useDateRange();
    const requirementHook = useRequirement();

    useEffect(() => {
        bodySendBudget.changeDateCorporateBudget(selectionRangeHook.selectionRange);
        infoBudgetHook.setDataTable((par) => ({  
            ...par,
            columns: getColumnData(selectionRangeHook.selectionRange),
        }))
        
    }, [selectionRangeHook.selectionRange]);
    useEffect(() => { 
        bodySendBudget.changeCategoryToRoomCorporate(categoryHook.categoriesCorporateValues)
    }, [categoryHook.categoriesCorporateValues])

    useEffect(() => {
        callHandleForm()
    }, [ bodySendBudget.roomsToBudget ])

    useEffect(() => {
        bodySendBudget.changeRequirementCorporate(requirementHook.requirementSubmit);
    }, [requirementHook.requirementSubmit])

    //Send Objetct To Api Budget
    async function callHandleForm() {
        infoBudgetHook.clearRows();
        if (
            bodySendBudget.roomsToBudget.rooms.length > 0
            && bodySendBudget.verifyIfAllRoomHasEnoughOnePax()
            && bodySendBudget.roomsToBudget.dateRange) {
            const response = await api.getBudgetCorp(bodySendBudget.roomsToBudget);
            const responseBudget = response;
            bodySendBudget.setBodyResponseBudget(response);
            infoBudgetHook.addRows(responseBudget.rowsValues.rows, {
                responseForm: {
                    category: `${responseBudget.rooms.length} quartos`,
                    pension: responseBudget.pension,
                    rd_client: responseBudget.idClient || '',
                    housingUnit: `${responseBudget.rooms.length} quartos`,
                }
            })
        }
    }


    return (
        <GenerateTariffCorporateContext.Provider
            value={{
                ...bodySendBudget,
                ...loadingComponent,
                ...usePermission(),                                             // Modal Permission General Discount
                ...selectionRangeHook,                                          // CalendarPicker
                ...useActionsDiscount(),                                        // FormOrc/corporate 
                ...categoryHook,                                                // FormOrc/corporate 
                ...requirementHook,                                             // ModalRequirement, Requirement(form)
                ...useRoomLayout(),                                             // pension(form)
                ...useClientName(),                                             // rdClient(form)
                ...infoBudgetHook,                                              // infoTables
                callHandleForm,
                childValue: [],                                                 // ModalRequirement
                handleClickOpenModalDiscount: () => { }                         // TableCalc
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