import { ApiDiscountProps } from "../../hooks/api/interfaces";
import { AppHotelProps } from "../../hooks/appHotel/interfaces";

export interface GenerateTariffContextProps {
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
  handleCategoryInput: (newValue: CategoryOptionsProps | null) => void;
  categoryOptions: CategoryOptionsProps[];
  categoryValue: CategoryOptionsProps | null;
  setPensionValue: React.Dispatch<
    React.SetStateAction<PensionsOptionsProps | null>
  >;
  pensionValue: PensionsOptionsProps | null;
  listRequirements: string[];
  requirementValue: string[];
  handleClickOpenModalRequirement: (requirement: string[]) => void;
  handleCloseModalDiscount: VoidFunction;
  handleSaveModalDiscount: VoidFunction;
  handleClickOpenModalDiscount: (row: RowModalDiscount) => void;
  openModalDiscount: boolean;
  discountBeingEdited: RowModalDiscount;
  addUnitaryDiscount: (row: RowModalDiscount) => void;
  clearUnitaryDiscount: VoidFunction;
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
}

export type SelectionRangeProps = {
  startDate: Date;
  endDate: Date;
  key: string;
};

export type RowsProps = {
  id: number;
  desc: string;
  values: string[] | number[] | any[];
  total: string | number;
  noDiscount: string[] | number[] | any[];
  totalNoDiscount: string | number;
  discountApplied: string | number;
};

export type DataContentProps = {
  rows: Array<RowsProps> | [];
  columns: string[] | [];
  arrComplete?: any;
  total?: {
    total: number;
    noDiscount: number;
  };
};

//form
export interface CategoriesProps {
  category: {
    id: string;
    name: string;
  };
  category_id: string;
  id: string;
  minimum_occupancy: number;
  maximum_occupancy: number;
}

export type TypeModalProps = "person" | "ticket" | "tourism";
export type PensionsOptionsProps = "simples" | "meia" | "completa";
export type CategoryOptionsStringProps =
  | "padrão"
  | "padrão varanda"
  | "luxo"
  | "luxo conjugado"
  | "luxo com hidro";

export interface RequirementSubmitProps {
  requirement: string;
  type: string;
  values: RequirementSubmitValuesProps;
}

export interface RequirementSubmitValuesProps {
  adult: number;
  child: string[];
  amount: number;
}

export interface CategoryOptionsProps {
  label: string;
  unit: string;
  category: string;
}

export interface ArrCompleteProps {
  childValue?: String[];
  petValue?: String[];
  responseForm?: ResponseFormProps;
  selectionRange?: SelectionRangeProps;
}

export interface ResponseFormProps {
  adult?: number;
  discount?: number;
  category?: string;
  housingUnit: string;
  numberPipe: number;
  pension: string;
}

export interface OccupancyProps {
  text: string;
  max: number;
  min: number;
  category: string;
}

export interface RowModalDiscount {
  id: number;
  name: string;
  discount: number;
}
