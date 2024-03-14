import SelectionRangeProps from "./selectionRangeProps";
import {ApiDiscountProps} from "../../../hooks/api/interfaces";
import {AppHotelProps} from "../../../hooks/appHotel/interfaces";
import DataContentProps from "./tableBudgetDataContentProps";
import RequirementSubmitProps, { RequirementSubmitValuesProps } from "./requirementSubmitProps";
import OccupancyProps from "./occupancyProps";
import { CategoryOptionsProps } from "./categoriesProps";
import PensionsOptionsProps from "./pensionOptionsProps";
import RowModalDiscount from "./rowModalDiscount";

export type TypeModalProps = "person" | "ticket" | "tourism";
export type occupacyUHProps = {
    text: string,
    max: number, 
    min: number, 
    category: string
}

interface GenerateTariffContextProps {
    handleSelectDate(ranges: any): Promise<void>;
    holidays: string[];
    monthsWithTariffs: string[];
    selectionRange: SelectionRangeProps;
    stateApp: AppHotelProps | null;

    addRows(rows: any[], arrComplete: any): void;

    unitUsing: string[];
    dataTable: DataContentProps;
    budgets: DataContentProps[];

    deleteLine(indexDelete: number): void;

    handleSaveBudget: () => Promise<void>;
    clearTariffs: () => Promise<void>;
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
    callHandleForm: VoidFunction;
    occupancy: OccupancyProps;
    occupancyWrong: boolean;
    changeOccupancyWrong: () => void;
    childValue: number[];
    setChildValue: React.Dispatch<React.SetStateAction<number[]>>;
    petValue: string[];
    setPetValue: React.Dispatch<React.SetStateAction<string[]>>;
    disabledPension: boolean;
   
    categoryOptions: CategoryOptionsProps[];
    
    setPensionValue: React.Dispatch<
        React.SetStateAction<PensionsOptionsProps | null>
    >;
    pensionValue: PensionsOptionsProps | null;
    listRequirements: string[];
    requirementValue: string[];
    requirementSubmit: RequirementSubmitProps[];
    handleClickOpenModalRequirement: (requirement: string[]) => void;
    handleCloseModalDiscount: VoidFunction;
    handleSaveModalDiscount: VoidFunction;
    handleClickOpenModalDiscount: (row: RowModalDiscount) => void;
    openModalDiscount: boolean;
    discountBeingEdited: RowModalDiscount;
    addUnitaryDiscount: (row: RowModalDiscount) => void;
    clearUnitaryDiscount: VoidFunction;
    unitaryDiscount: RowModalDiscount[];
    isOpenModalPermission: boolean;
    handleCloseModalPermission: VoidFunction;
    handleOpenModalPermission: (
        value: number,
        setDiscount: React.Dispatch<React.SetStateAction<number | null>>
    ) => void;
    handleConfirmModalPermission: (password: string) => Promise<boolean>;
    setDailyCourtesy: React.Dispatch<React.SetStateAction<boolean>>;
    dailyCourtesy: boolean;
    setActionSelected: React.Dispatch<
        React.SetStateAction<ApiDiscountProps | undefined>
    >;
    actionSelected: ApiDiscountProps | undefined;
    getClientName: (id: string) => Promise<string>;
    clientName: string;
    handleOpenBackdrop: VoidFunction;
    handleCloseBackdrop: VoidFunction;
    getOccupancyUH: (housingUnit: CategoryOptionsProps) => occupacyUHProps
    
    handleCategoryInput: (newValue: CategoryOptionsProps | null) => void;
    categoryValue: CategoryOptionsProps | null;
    handleCategoriesCorporateInput: (newValue: CategoryOptionsProps[]) => void;
    categoriesCorporateValues: CategoryOptionsProps[];
}
export default GenerateTariffContextProps