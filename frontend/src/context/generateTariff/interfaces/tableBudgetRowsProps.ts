interface RowsProps  {
    id: number;
    desc: string;
    values: string[] | number[] | any[];
    total: string | number;
    noDiscount: string[] | number[] | any[];
    totalNoDiscount: string | number;
    discountApplied: string | number;
};

export default RowsProps;
