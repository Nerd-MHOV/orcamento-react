import { useState } from "react";
import DataContentProps from "../interfaces/tableBudgetDataContentProps";
import ArrCompleteProps from "../interfaces/budgetArrCompleteProps";
import { calcTotal } from "../functions/calcTotal";
import RowsProps from "../interfaces/tableBudgetRowsProps";

const useInfoBudgets = (
    dataTable: DataContentProps,
    onAddRows: (rows: RowsProps[]) => void
) => {
    const [budgets, setBudgets] = useState<DataContentProps[]>([]);
    const [arrComplete, setArrComplete] = useState<ArrCompleteProps | []>([]);

    async function handleSaveBudget() {
        if (dataTable.rows.length === 0) {
            return;
        }
        const total = calcTotal(dataTable).total;
        setBudgets((old) => {
            return [...old, { ...dataTable, arrComplete, total }];
        });
    }

    async function clearTariffs() {
        setBudgets([]);
    }

    function addRows(rows: any[], arrComplete: any) {
        onAddRows(rows);
        setArrComplete(arrComplete);
    }
    function deleteLine(indexDelete: number) {
        setBudgets((old) => {
            return old.filter((arr, index) => index !== indexDelete);
        });
    }

    return {
        addRows,
        budgets,
        deleteLine,
        handleSaveBudget,
        clearTariffs,
    }

}

export default useInfoBudgets;