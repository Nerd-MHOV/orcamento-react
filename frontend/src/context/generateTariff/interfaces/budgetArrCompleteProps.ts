import SelectionRangeProps from "./selectionRangeProps";

interface ResponseFormProps {
    adult?: number;
    discount?: number;
    category?: string;
    housingUnit: string;
    rd_client: string;
    pension: string;
}

interface ArrCompleteProps {
    childValue?: String[];
    petValue?: String[];
    responseForm?: ResponseFormProps;
    selectionRange?: SelectionRangeProps;
}

export default ArrCompleteProps