import {LayoutTableMemoryCalc} from "./layout_table";

export const TotalCalcMemory = (total: number, title = "Total da UH") => {
    return [
        {
            table: {
                widths: ["*", "*"],
                body: [
                    [
                        {
                            text: title,
                            alignment: "left",
                            fontSize: 9,
                            bold: true,
                        },
                        {
                            text:
                                "R$ " +
                                total.toLocaleString("pt-BR", {
                                    maximumFractionDigits: 2,
                                    minimumFractionDigits: 2,
                                }),
                            alignment: "right",
                            fontSize: 10,
                            bold: true,
                        },
                    ],
                ],
            },
            layout: LayoutTableMemoryCalc,
        },
    ]
}