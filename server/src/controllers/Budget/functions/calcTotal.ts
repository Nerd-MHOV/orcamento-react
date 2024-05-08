import { RowsProps } from "../CalcBudgetController";
import { RoomCorporateResponse } from "../CalcBudgetCorpController";

export const calcTotal = (rows: RowsProps[], discountApplied: number) => {
    let total: RowsProps = {
        id: 900,
        desc: 'total',
        values: [],
        noDiscount: [],
        total: 0,
        totalNoDiscount: 0,
        discountApplied: 0,
    };
    if (rows[0]?.values) {

        total.values = rows[0].values.map((_, index) => rows.reduce((sum, row) => sum + row.values[index], 0));
        total.noDiscount = rows[0].noDiscount.map((_, index) => rows.reduce((sum, row) => sum + row.noDiscount[index], 0));
        total.total = rows.reduce((total, arr) => total + arr.total, 0);
        total.totalNoDiscount = rows.reduce((total, arr) => total + arr.totalNoDiscount, 0);
        total.discountApplied = discountApplied;
    }

    return total;
};


export const calcTotalBudgets = (rooms: RoomCorporateResponse[]) => {
    const response: RowsProps[] = rooms.map(room => ({
        id: +room.roomNumber.unit,
        desc: room.roomNumber.label,
        values: room.rowsValues.total.values,
        noDiscount: room.rowsValues.total.noDiscount,
        total: room.rowsValues.total.total,
        totalNoDiscount: room.rowsValues.total.totalNoDiscount,
        discountApplied: room.rowsValues.total.discountApplied,
    }))

    return response
} 