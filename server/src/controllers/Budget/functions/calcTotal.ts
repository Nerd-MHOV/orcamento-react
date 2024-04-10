import { RowsProps } from "../CalcBudgetController";

export const calcTotal = (rows: RowsProps[]) => {
    let total: RowsProps = {
        id: 900,
        desc: 'total',
        values: [],
        noDiscount: [],
        total: 0,
        totalNoDiscount: 0,
        discountApplied: 0,
    };
    rows.map((row, rowIndex) => {
        
        row.values.map((value, index) => {
            
            if (totalPerRow[index]) {
                totalPerRow[index].total += value;
                totalPerRow[index].noDiscount +=
                    rows[rowIndex].noDiscount[index];
            } else {
                totalPerRow[index] = {
                    total: value,
                    noDiscount: rows[rowIndex].noDiscount[index],
                };
            }
        });
    });

    
    total.total = rows.reduce((total, arr) => total + arr.total, 0);
    total.totalNoDiscount = rows.reduce((total, arr) => total + arr.totalNoDiscount, 0);
    total.discountApplied = rows.reduce((total, arr) => total + arr.discountApplied, 0);


    return total;
};
