import { Content, TableCell } from "pdfmake/interfaces";
import {LayoutTableMemoryCalc} from "./layout_table";

export interface singleTableToBudget {
    widthTable: string[], 
    title: string,
    content: TableCell[][],
}
export const singleTableBudget = ({
    title, widthTable, content
}: singleTableToBudget): Content[] => {

    return [
        {
            text: title,
            style: {
                fontSize: 14,
            },
        },{
            table: {
                widths: widthTable,
                headerRows: 1,
                body: content,
            },
            layout: LayoutTableMemoryCalc,
        },{
            text: " ",
            style: {
                margin: 200,
            },
        },
    ]
}