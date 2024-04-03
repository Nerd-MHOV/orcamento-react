import SelectionRangeProps from "./selectionRangeProps";
import {ApiDiscountProps} from "../../../hooks/api/interfaces";
import {AppHotelProps} from "../../../hooks/appHotel/interfaces";
import DataContentProps from "./tableBudgetDataContentProps";
import RequirementSubmitProps, { RequirementSubmitValuesProps } from "./requirementSubmitProps";
import OccupancyProps from "./occupancyProps";
import { CategoryOptionsProps } from "./categoriesProps";
import PensionsOptionsProps from "./pensionOptionsProps";
import RowModalDiscount from "./rowModalDiscount";

interface GenerateTariffContextProps extends
 DatePartGTCP, 
 RequirementPartGTCP, 
 RoomPartGTCP, 
 RoomLayoutPartGTCP, 
 PensionGTCP, 
 LoadingGTCP,
 DiscountGTCP,
 InfoBudgetGTCP
{
    dataTable: DataContentProps;
    getClientName: (id: string) => Promise<string>;
    clientName: string;

    
    callHandleForm: VoidFunction;
}

export type TypeModalProps = "person" | "ticket" | "tourism";
export type occupacyUHProps = {
    text: string,
    max: number, 
    min: number, 
    category: string
}

export interface InfoBudgetGTCP {
    addRows(rows: any[], arrComplete: any): void;
    deleteLine(indexDelete: number): void;
    handleSaveBudget: () => Promise<void>;
    clearTariffs: () => Promise<void>;
    budgets: DataContentProps[];
}

export interface LoadingGTCP {
    handleOpenBackdrop: VoidFunction;
    handleCloseBackdrop: VoidFunction;
}
export interface DatePartGTCP {
    handleSelectDate(ranges: any): Promise<void>;
    holidays: string[];
    monthsWithTariffs: string[];
    selectionRange: SelectionRangeProps;
}

export interface RequirementPartGTCP {
    openModalRequirement: boolean;
    handleCloseModalRequirement: VoidFunction;
    handleSaveModalRequirement: (
        requirements: string[],
        requirement: string,
        type: string,
        values: RequirementSubmitValuesProps
    ) => void;
    typeModal: "" | TypeModalProps;
    requirementsModal: string[];
    listRequirements: string[];
    requirementValue: string[];
    requirementSubmit: RequirementSubmitProps[];
    handleClickOpenModalRequirement: (requirement: string[]) => void;
}

export interface RoomPartGTCP {
    stateApp: AppHotelProps | null;
    setStateApp: React.Dispatch<React.SetStateAction<AppHotelProps | null>>;
    unitUsing: string[];
    setUnitUsing: React.Dispatch<React.SetStateAction<string[]>>;
    occupancy: OccupancyProps;
    occupancyWrong: boolean;
    changeOccupancyWrong: () => void;
    categoryOptions: CategoryOptionsProps[];
    getOccupancyUH: (housingUnit: CategoryOptionsProps) => occupacyUHProps
    handleCategoryInput: (newValue: CategoryOptionsProps | null) => void;
    categoryValue: CategoryOptionsProps | null;
    handleCategoriesCorporateInput: (newValue: CategoryOptionsProps[]) => void;
    categoriesCorporateValues: CategoryOptionsProps[];
}
export interface RoomLayoutPartGTCP {
    childValue: number[];
    setChildValue: React.Dispatch<React.SetStateAction<number[]>>;
    petValue: string[];
    setPetValue: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface ModalPermissionDiscountGTCP {
    isOpenModalPermission: boolean;
    handleCloseModalPermission: VoidFunction;
    handleOpenModalPermission: (
        value: number,
        setDiscount: React.Dispatch<React.SetStateAction<number | null>>
    ) => void;
    handleConfirmModalPermission: (password: string) => Promise<boolean>;
}

export interface ActionPromossionsGTCP {
    setDailyCourtesy: React.Dispatch<React.SetStateAction<boolean>>;
    dailyCourtesy: boolean;
    setActionSelected: React.Dispatch<
        React.SetStateAction<ApiDiscountProps | undefined>
    >;
    actionSelected: ApiDiscountProps | undefined;
}
export interface DiscountGTCP extends ModalPermissionDiscountGTCP, ActionPromossionsGTCP {
    handleCloseModalDiscount: VoidFunction;
    handleSaveModalDiscount: VoidFunction;
    handleClickOpenModalDiscount: (row: RowModalDiscount) => void;
    openModalDiscount: boolean;
    discountBeingEdited: RowModalDiscount;
    addUnitaryDiscount: (row: RowModalDiscount) => void;
    clearUnitaryDiscount: VoidFunction;
    unitaryDiscount: RowModalDiscount[];
}

export interface PensionGTCP {
    disabledPension: boolean;
    setPensionValue: React.Dispatch<
        React.SetStateAction<PensionsOptionsProps | null>
    >;
    setDisabledPension: React.Dispatch<React.SetStateAction<boolean>>;
    pensionValue: PensionsOptionsProps | null;
}

export default GenerateTariffContextProps