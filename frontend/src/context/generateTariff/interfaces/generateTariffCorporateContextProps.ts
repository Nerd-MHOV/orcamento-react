import { CategoryOptionsProps } from "./categoriesProps";
import { CorporateBodySendBudget, RoomCorporate } from "./corporateProps";
import { ActionPromossionsGTCP, DatePartGTCP, InfoBudgetGTCP, LoadingGTCP, ModalPermissionDiscountGTCP, PensionGTCP, RequirementPartGTCP, RoomPartGTCP } from "./generateTariffContextProps";
import RequirementSubmitProps from "./requirementSubmitProps";
import SelectionRangeProps from "./selectionRangeProps";
import DataContentProps from "./tableBudgetDataContentProps";
import {CorporateBodyResponseBudget} from "../../../hooks/api/interfaces";
import React from "react";

interface GenerateTariffCorporateContextProps
extends 
LoadingGTCP,
ModalPermissionDiscountGTCP,
DatePartGTCP,
ActionPromossionsGTCP,
RoomPartGTCP,
RequirementPartGTCP,
PensionGTCP,
InfoBudgetGTCP,
BodyCorporateBudgetGTCP
{
    clientName: string;
    getClientName: (id: string) => Promise<string>;
    
    dataTable: DataContentProps;
    callHandleForm: VoidFunction;

    childValue: [];
    handleClickOpenModalDiscount: VoidFunction;
}


export interface BodyCorporateBudgetGTCP {
    roomsToBudget: CorporateBodySendBudget;
    addRoomCorporate: (rooms: CategoryOptionsProps[]) => void;
    deleteRoomCorporate: (rooms: CategoryOptionsProps[]) => void;
    changePension: (pension: string) => void;
    changeRequirementCorporate: (requirements: RequirementSubmitProps[]) => void;
    changeDateCorporateBudget: (dateRange: SelectionRangeProps) => void;
    changeIdClient: (idClient: string | null) => void;
    changeLayoutRoom(adt: number, chd: number[], pet: string[], roomNumber: CategoryOptionsProps): void;
    changeCategoryToRoomCorporate(categories: CategoryOptionsProps[]): void;
    verifyIfAllRoomHasEnoughOnePax(): boolean;
    bodyResponseBudget: CorporateBodyResponseBudget | null,
    setBodyResponseBudget: React.Dispatch<React.SetStateAction<CorporateBodyResponseBudget | null>>
}

export default GenerateTariffCorporateContextProps