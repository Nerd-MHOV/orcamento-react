import { AppHotelProps } from "../../pages/Home";

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

export type RequirementSubmitProps = {
  requirement: string;
  type: string;
  values: RequirementSubmitValuesProps;
};

export type RequirementSubmitValuesProps = {
  adult: number;
  child: string[];
  amount: number;
};

export interface CategoryOptionsProps {
  label: string;
  unit: number;
  category: string;
}

export interface CategoriesProps {
  category: {
    id: string;
    name: string;
  };
  category_id: string;
  id: number;
  minimum_occupancy: number;
  maximum_occupancy: number;
}
