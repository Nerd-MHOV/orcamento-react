import { RowsProps } from "../CalcBudgetController";

export const calcTotalAgency = (total: RowsProps, agencyPercent: number): RowsProps => {
    const value = Math.ceil(total.total * (agencyPercent / 100));
    let values = [value];
    total.values.forEach((_, i) => {
        if(i !== 0 ) values.push(0);
    });
    
    return {
        desc: `Agência ${agencyPercent}%`,
        discountApplied: 0,
        id: 7001,
        noDiscount: values,
        total: value,
        totalNoDiscount: value,
        values: values,
        type: 'agency'
    }
}
