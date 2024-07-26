import { Content, TDocumentDefinitions, TableCell } from "pdfmake/interfaces";

import { HeaderCalcMemory } from "../file-part/calc-memory/header";
import DataContentProps from "../../interfaces/tableBudgetDataContentProps";
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { singleTableBudget, singleTableToBudget } from "../file-part/calc-memory/single_table";
import { CorporateBodyResponseBudget } from "../../../../hooks/api/interfaces";
import RowsProps from "../../interfaces/tableBudgetRowsProps";
import { bufferedPageRange } from "pdfkit";
import { TotalCalcMemory } from "../file-part/calc-memory/total";
(<any>pdfMake).vfs = pdfFonts && pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : globalThis.pdfMake.vfs;


const onlyNumber = (string: string | undefined) => {
    if (!string) return 0;
    string = string.replace(/[.]/g, "");
    string = string.replace(/[,]/g, ".");
    string = string.replace(/[^0-9 |^.]/g, "");
    return Number(string);
};

const inReais = (value: number) => {
    return `R$ ${value.toLocaleString("pt-BR", { maximumFractionDigits: 2, minimumFractionDigits: 2, })}`
}

const doLineContentRow = (row: RowsProps): TableCell[] => {
    const description = { text: row.desc, style: { fontSize: 9 } }
    const values = row.values.map(value => ({
        text: inReais(value),
        style: { fontSize: 9 },
    }))
    const discountApplied = {
        text: inReais((Number(row.total) - Number(row.totalNoDiscount))),
        style: { fontSize: 9 },
        bold: true,
    }
    const total = {
        text: inReais((Number(row.total))),
        style: { fontSize: 9 },
        bold: true,
    }

    return [
        description,
        ...values,
        discountApplied,
        total
    ]
}
const total_content = (title: string, row: {
    values: number[], total: number, totalNoDiscount: number
}): TableCell[] => {
    const description = {
        text: title,
        bold: true,
        style: { fontSize: 8 },
    }
    const values = row.values.map(value => ({
        text: inReais(value),
        style: { fontSize: 9 },
        bold: true,
    }))

    const discountApplied = {
        text: inReais((Number(row.total) - Number(row.totalNoDiscount))),
        style: { fontSize: 9 },
        bold: true,
        color: "#d05c45",
    }
    const total = {
        text: inReais((Number(row.total))),
        style: { fontSize: 9 },
        bold: true,
    }

    return [
        description,
        ...values,
        discountApplied,
        total
    ]
}


async function pdfDescriptionCorp(
    data: DataContentProps,
    responseBudget: CorporateBodyResponseBudget,
    namePerson: string,
) {
    const columnsContent = [...data.columns, 'desconto aplicado', 'TOTAL'];

    const housingUnit = responseBudget.rooms.map(room => room.roomNumber.unit).join('.');
    const isNotLocation = (match: string) => {
        return responseBudget.requirements.some(requirement => match.includes(requirement.requirement) && requirement.type !== 'location')
    }
    const contentFor: Content = [];
    let widthTable = columnsContent.map(() => '*');
    // Rooms
    const contentToTableRoom: singleTableToBudget[] = responseBudget.rooms.map(room => {
        const content: TableCell[][] = [];
        content.push(columnsContent.map((title: string) => ({
            text: title,
            bold: true,
            style: {
                fontSize: 8,
            },
        })))
        const line_content: TableCell[][] = room.rowsValues.rows.map(doLineContentRow)

        content.push(...line_content, total_content("Total da UH", room.rowsValues.total));
        return {
            title: room.roomNumber.category,
            content,
            widthTable,
        }
    })
    contentFor.push(...contentToTableRoom.map(content => singleTableBudget(content)))

    // Requirement
    const requirements = responseBudget.rowsValues.rows.filter(row => row.type === "requirement" && isNotLocation(row.desc));
    if (!!requirements.length) {

        const contentTableRequirements = (): singleTableToBudget => {
            const content: TableCell[][] = [];
            content.push(columnsContent.map((title: string) => ({
                text: title,
                bold: true,
                style: {
                    fontSize: 8,
                },
            })))


            const line_content: TableCell[][] = requirements.map(doLineContentRow)
            const valuesArray = requirements.map(requirement => requirement.values);
            const values = valuesArray.reduce((acc, curr) => {
                return acc.map((num, idx) => num + curr[idx])
            }, new Array(valuesArray[0]?.length).fill(0))
            content.push(...line_content, total_content('Total Extras', {
                values,
                total: requirements.reduce((sum, value) => sum + value.total, 0),
                totalNoDiscount: requirements.reduce((sum, value) => sum + value.totalNoDiscount, 0),
            }));
            return {
                title: "Extras",
                widthTable,
                content,
            }
        }
        contentFor.push(...singleTableBudget(contentTableRequirements()))
    }

    // Locations
    const locations = responseBudget.rowsValues.rows.filter(row => row.type === "requirement" && !isNotLocation(row.desc));
    if (!!locations.length) {
        const contentTableLocations = () => {
            const content: TableCell[][] = [];
            content.push(columnsContent.map((title: string) => ({
                text: title,
                bold: true,
                style: {
                    fontSize: 8,
                },
            })))
            const line_content: TableCell[][] = locations.map(doLineContentRow)
            const valuesArray = locations.map(location => location.values);
            const values = valuesArray.reduce((acc, curr) => {
                return acc.map((num, idx) => num + curr[idx])
            }, new Array(valuesArray[0]?.length).fill(0))
            content.push(...line_content, total_content('Total Extras', {
                values,
                total: locations.reduce((sum, value) => sum + value.total, 0),
                totalNoDiscount: locations.reduce((sum, value) => sum + value.totalNoDiscount, 0),
            }));
            return {
                title: "Locações",
                widthTable,
                content,
            }
        }
        contentFor.push(...singleTableBudget(contentTableLocations()))
    }

    // agency 
    const agency = responseBudget.rowsValues.rows.find(row => row.type === 'agency');
    if (agency) {
        contentFor.push(...TotalCalcMemory(agency.total, `AGÊNCIA ${responseBudget.agencyPercent}%`))
        contentFor.push({ text: '', style: { margin: 200 } })
    }


    // total
    contentFor.push(...TotalCalcMemory(responseBudget.rowsValues.total.total, 'TOTAL'))


    // for (const singleBudget of budgets) {
    //     let rows_days = [];
    //     let rows_extra = [];
    //     // Line to Line
    //     for (let budget of singleBudget.rows) {
    //         let lineRows = [];
    //         lineRows.push({ text: budget.desc, style: { fontSize: 9 } });
    //         for (let value of budget.values) {
    //             lineRows.push({
    //                 text: inReais(value),
    //                 style: { fontSize: 9 },
    //             });
    //         }
    //         lineRows.push({
    //             text: inReais((Number(budget.total) - Number(budget.totalNoDiscount))),
    //             style: { fontSize: 9 },
    //             bold: true,
    //         });
    //         lineRows.push({
    //             text: `R$ ${budget.total.toLocaleString("pt-BR", {
    //                 maximumFractionDigits: 2,
    //                 minimumFractionDigits: 2,
    //             })}`,
    //             style: {
    //                 fontSize: 9,
    //             },
    //             bold: true,
    //         });

    //         const typeToRowsDays = ['adult', 'child', 'pet', 'room'];
    //         if (typeToRowsDays.includes(budget.type)) rows_days.push(lineRows);
    //         else rows_extra.push(lineRows);
    //     }
    //     let lastRow_days = [];
    //     let lastRow_extras = [];
    //     // Total Line
    //     for (let count = 0; count <= singleBudget.columns.length + 1; count++) {
    //         if (count === 0) {
    //             lastRow_days.push({
    //                 text: "Total de Diárias",
    //                 bold: true,
    //                 style: { fontSize: 8 },
    //             });
    //             lastRow_extras.push({
    //                 text: "Total de Extras",
    //                 bold: true,
    //                 style: { fontSize: 8 },
    //             });
    //         } else if (count === singleBudget.columns.length) {
    //             let total_days = 0;
    //             let total_extras = 0;
    //             for (let day of rows_days) {
    //                 total_days += onlyNumber(day[count].text);
    //             }

    //             for (let extra of rows_extra) {
    //                 total_extras += onlyNumber(extra[count].text);
    //             }

    //             lastRow_days.push({
    //                 text: `R$ -${total_days.toLocaleString("pt-BR", {
    //                     maximumFractionDigits: 2,
    //                     minimumFractionDigits: 2,
    //                 })}`,
    //                 bold: true,
    //                 style: {
    //                     fontSize: 9,
    //                 },
    //                 color: "#d05c45",
    //             });
    //             lastRow_extras.push({
    //                 text: `R$ ${total_extras.toLocaleString("pt-BR", {
    //                     maximumFractionDigits: 2,
    //                     minimumFractionDigits: 2,
    //                 })}`,
    //                 bold: true,
    //                 style: {
    //                     fontSize: 9,
    //                 },
    //                 color: "#d05c45",
    //             });
    //         } else {
    //             let total_days = 0;
    //             let total_extras = 0;
    //             for (let day of rows_days) {
    //                 total_days += onlyNumber(day[count].text);
    //             }

    //             for (let extra of rows_extra) {
    //                 total_extras += onlyNumber(extra[count].text);
    //             }

    //             lastRow_days.push({
    //                 text: `R$ ${total_days.toLocaleString("pt-BR", {
    //                     maximumFractionDigits: 2,
    //                     minimumFractionDigits: 2,
    //                 })}`,
    //                 style: {
    //                     fontSize: 9,
    //                 },
    //                 bold: true,
    //             });
    //             lastRow_extras.push({
    //                 text: `R$ ${total_extras.toLocaleString("pt-BR", {
    //                     maximumFractionDigits: 2,
    //                     minimumFractionDigits: 2,
    //                 })}`,
    //                 style: {
    //                     fontSize: 9,
    //                 },
    //                 bold: true,
    //             });
    //         }
    //     }



    //     // Last Line Total
    //     columns.push({
    //         text: "desconto aplicado",
    //         bold: true,
    //         style: {
    //             fontSize: 8,
    //         },
    //     });
    //     columns.push({
    //         text: "TOTAL",
    //         bold: true,
    //         style: {
    //             fontSize: 8,
    //         },
    //     });


    //     // total
    //     let total =
    //         onlyNumber(lastRow_days.at(-1)?.text) +
    //         onlyNumber(lastRow_extras.at(-1)?.text);
    //     // const otherColumns = columns;


    //     const content: Content = [
    //         ...singleTableBudget({
    //             widthTable,
    //             title: 'quarto1',
    //             content: [
    //                 columns,
    //                 ...rows_days,
    //                 lastRow_days,
    //             ]
    //         }),
    //         ...DailyCalcMemory(widthTable, columns, rows_days, lastRow_days),
    //         { text: " ", style: { margin: 200 } }, //margin
    //         ...ExtraCalcMemory(widthTable, columns, rows_extra, lastRow_extras),
    //         ...TotalCalcMemory(total),

    //     ]
    //     contentFor.push(...content)
    // }


    const docDefinitions: TDocumentDefinitions = {
        defaultStyle: {
            //   font: "Helvetica",
            alignment: "left",
        },
        pageSize: {
            width: 600,
            height: "auto"
        },
        info: {
            title: "Memoria de Calculo",
            author: "Matheus Henrique"
        },
        pageMargins: 15,
        content: [
            ...HeaderCalcMemory(namePerson, responseBudget.idClient || ''),
            //for
            {
                text: "_______________________________________________________________________________________",
                margin: [0, 20, 0, 10],
                noWrap: true,
                alignment: "center"
            },
            {
                text: 'Corporativo',
                style: { fontSize: 18 },
                alignment: "center",
            },
            ...contentFor,
            {
                text: "_______________________________________________________________________________________",
                margin: [0, 20, 0, 10],
                noWrap: true,
                alignment: "center"
            },
            {
                text: `000000${housingUnit}009928`,
                alignment: "right",
                fontSize: 8,
            },
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
            },
            description: {
                fontSize: 8,
            },
        },
    };

    const pdf = pdfMake.createPdf(docDefinitions);
    //pdf.open();

    pdf.getBlob((blob) => {
        // Converte o blob em uma URL de dados
        const url = URL.createObjectURL(blob);
        // Define o tamanho e posição da janela pop-up
        const width = 1000; // Largura da janela em pixels
        const height = 650; // Altura da janela em pixels
        const left = (window.innerWidth - width) / 2; // Centraliza a janela horizontalmente
        const top = (window.innerHeight - height) / 2; // Centraliza a janela verticalmente
        const features = `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`;

        // Abre a janela pop-up com o PDF
        window.open(url, '_blank', features);
    });
}

export default pdfDescriptionCorp;
