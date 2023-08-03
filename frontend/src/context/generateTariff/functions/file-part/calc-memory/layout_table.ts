import {ContentTable} from "pdfmake/interfaces";

export const LayoutTableMemoryCalc = {
    hLineWidth: function (i: number, node: ContentTable) {
    return i === 0 || i === node.table.body.length ? 2 : 1;
    },
    vLineWidth: function (i: number, node: ContentTable) {
        return i === 0 || i === node.table.widths?.length ? 2 : 1;
    },
    hLineColor: function (i: number, node: ContentTable) {
        return i === 0 || i === node.table.body.length ? "black" : "gray";
    },
    vLineColor: function (i: number, node: ContentTable) {
        return i === 0 || i === node.table.widths?.length
            ? "black"
            : "gray";
    },
}