import RowsProps from "./tableBudgetRowsProps";

interface DataContentProps {
    rows: RowsProps[] | [];
    columns: string[] | [];
    arrComplete?: any;
    total?: {
        total: number;
        noDiscount: number;
    };
}

export default DataContentProps
