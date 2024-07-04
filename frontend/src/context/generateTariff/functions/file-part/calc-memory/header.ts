import {format} from "date-fns";
import DataContentProps from "../../../interfaces/tableBudgetDataContentProps";

export const HeaderCalcMemory = (namePerson: string, budget: DataContentProps) => {
    const rd_client = budget.arrComplete.responseForm.rd_client;
    return [
        {
            text: `Memória de Cálculo`,
            style: "header",
        },
        { text: " ", style: { margin: 5} },
        {
            text: `Nome: ` + namePerson,
            style: "description",
        },
        {
            text: `ID do Cliente: ` + rd_client,
            style: "description",
        },
        {
            text: `Gerado em: ` + format(new Date(), "dd/MM/yyyy"),
            style: "description",
        },
    ]
}