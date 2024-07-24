import { CategoryOptionsProps } from "./categoriesProps";
import RequirementSubmitProps from "./requirementSubmitProps";
import RowModalDiscount from "./rowModalDiscount";
import SelectionRangeProps from "./selectionRangeProps";

export interface RoomCorporate {
    adt: number,
    chd: number[],
    pet: string[],
    roomNumber: CategoryOptionsProps,
    isStaff: boolean,
}

export interface CorporateBodySendBudget {
    rooms: RoomCorporate[],
    pension: string,
    requirements: RequirementSubmitProps[],
    discount: number,
    agency: number,
    dateRange: SelectionRangeProps[] | null,
    unitaryDiscount: RowModalDiscount[],
    idClient: string | null,
}

export interface DateRange {
    startDate: Date;
    endDate: Date;
    key: string;
}

