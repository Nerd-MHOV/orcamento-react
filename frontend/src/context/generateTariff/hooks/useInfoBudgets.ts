import { useState } from "react";
import DataContentProps from "../interfaces/tableBudgetDataContentProps";
import ArrCompleteProps from "../interfaces/budgetArrCompleteProps";
import { calcTotal } from "../functions/calcTotal";
import RowsProps from "../interfaces/tableBudgetRowsProps";
import { dataInitial } from "../initial";

const useInfoBudgets = () => {
    const [budgets, setBudgets] = useState<DataContentProps[]>([]);
    const [dataTable, setDataTable] = useState<DataContentProps>(dataInitial);

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

    function addRows(rows: RowsProps[], arrComplete: ArrCompleteProps) {
        setDataTable((par) => ({...par, rows}));
        setArrComplete(arrComplete);
    }
    function clearRows() {
        addRows([], {});
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
        clearRows,
        setDataTable,
        dataTable,
    }

}

export default useInfoBudgets;