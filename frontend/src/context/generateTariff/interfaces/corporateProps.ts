import { CategoryOptionsProps } from "./categoriesProps";
import RequirementSubmitProps from "./requirementSubmitProps";
import SelectionRangeProps from "./selectionRangeProps";

export interface RoomCorporate {
    adt: number,
    chd: number[],
    pet: string[],
    roomNumber: CategoryOptionsProps,
}

export interface CorporateBodySendBudget {
    rooms: RoomCorporate[],
    pension: string,
    requirements: RequirementSubmitProps[],
    discount: number,
    dateRange: SelectionRangeProps | null,
    idClient: string | null,
}

export interface DateRange {
    startDate: Date;
    endDate: Date;
}

