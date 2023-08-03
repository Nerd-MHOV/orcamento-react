import {ContentTable} from "pdfmake/interfaces";
import {LayoutTableMemoryCalc} from "./layout_table";


export const DailyCalcMemory = (widthTable: string[], columns: any, rows_days: any, lastRow_days: any) => {

    return [
        {
            text: "Diárias:",
            style: {
                fontSize: 18,
            },
        },
        {
            table: {
                widths: widthTable,
                headerRows: 1,
                body: [
                    JSON.parse(JSON.stringify(columns)),
                    ...rows_days,
                    lastRow_days,
                ],
            },
            layout: LayoutTableMemoryCalc,
            style: {
                marginBottom: 20,
            },
        },
    ]
}