import { Content, ContentTable, TableCell } from "pdfmake/interfaces";

interface doTableBudgetCorpResponse {
    content: Content[] | string,
    rows: number,
}
export const doTableBudgetCorp = (
    bodyContent: TableCell[][],
    breakPage: () => Content[],
    verify: boolean,
    rows_in_page = 0
): doTableBudgetCorpResponse => {

    if (!verify) return {
        content: '',
        rows: rows_in_page,
    }

    const content: Content[] = [];
    const contentChunck = sliceContent(bodyContent, rows_in_page)
    contentChunck.forEach((chunk, index) => {
        content.push(doContent(chunk));
        if (contentChunck.length !== index +1) {
            content.push(breakPage())
        }
    })
    const rows_in_last_chunck = contentChunck[contentChunck.length -1].length
    return {
        content: content,
        rows: contentChunck.length > 1 ? rows_in_last_chunck : (rows_in_last_chunck + rows_in_page),
    }

}

const doContent = (content: TableCell[][]): ContentTable => {
    return {
        layout: {
            fillColor: function (rowIndex: number, node: ContentTable, columnIndex: number): "#447d8e" | "#ace0c7" {
                const row = node.table.body[rowIndex];
                //@ts-ignore
                return (row && row.some(cell => cell?.text.includes("TOTAL") ))
                    ? '#447d8e'
                    : "#ace0c7";
            }
        },
        margin: [20, 0, 20, 20],
        fillOpacity: 0.5,
        table: {
            headerRows: 1,
            widths: ["*", "*", "*"],
            body: content
        }
    }
}

const sliceContent = (array: TableCell[][], rows_in_page: number) => {
    let lineToBreak = 19
    let contentChunck = [];
    for (let i = -(rows_in_page); i < array.length; i += lineToBreak) {
        const init = (i < 0) ? 0 : i
        contentChunck.push(array.slice(init, i + lineToBreak))
    }
    return contentChunck;
}