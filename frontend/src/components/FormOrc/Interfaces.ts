import { AppHotelProps } from "../../hooks/appHotel/interfaces";

export type TypeModalProps = "person" | "ticket" | "tourism";
export interface FormProps {
  stateApp: AppHotelProps | null;
  selectionRange: {
    startDate: Date;
    endDate: Date;
    key: string;
  };
  addRows: (rows: any[], arrComplete: any[]) => void;
  unitUsing: string[];
}

export interface RequirementProps {
  name: string;
  price: number;
}

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

export interface ArrCompleteProps {
  childValue?: String[];
  petValue?: String[];
  responseForm?: ResponseFormProps;
  selectionRange?: SelectionRangeProps;
}

export interface SelectionRangeProps {
  startDate: Date;
  endDate: Date;
  key: string;
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
