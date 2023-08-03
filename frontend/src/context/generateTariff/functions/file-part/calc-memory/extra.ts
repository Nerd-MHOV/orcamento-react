import {LayoutTableMemoryCalc} from "./layout_table";

export const ExtraCalcMemory = (widthTable: string[], columns: any, rows_extra: any, lastRow_extras: any) => {
    return [
        {
            text: "Extras:",
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
                    ...rows_extra,
                    lastRow_extras,
                ],
            },
            layout: LayoutTableMemoryCalc,
        },
        {
            text: " ",
            style: {
                margin: 200,
            },
        },
    ]
}