import { style } from "@mui/system";
import { addDays, format } from "date-fns";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { usePipe } from "../../hooks/pipedrive/pipeApi";

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

async function pdfDescription(budgets: any[]) {
  (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

  let realBudget = budgets[0];

  let rows = new Array();

  for (let budget of realBudget.rows) {
    let lineRows = [];

    lineRows.push({ text: budget.desc });
    for (let value of budget.values) {
      lineRows.push({ text: value });
    }
    lineRows.push({ text: budget.total, bold: true });

    rows.push(lineRows);
  }

  let lastRow = [];

  for (let count = 0; count <= realBudget.columns.length; count++) {
    if (count === 0) {
      lastRow.push({ text: "TOTAL", bold: true });
    } else {
      let total = 0;
      for (let row of rows) {
        total += Number(row[count].text);
      }

      lastRow.push({ text: total, bold: true });
    }
  }

  let widthTable = [];

  for (let line of lastRow) {
    widthTable.push("*");
  }

  console.log(realBudget.columns, lastRow);

  const docDefinitions: TDocumentDefinitions = {
    defaultStyle: {
      //   font: "Helvetica",
      alignment: "center",
    },
    content: [
      {
        text: `nº Pipe: ` + realBudget.arrComplete.responseForm.numberPipe,
      },
      {
        text: realBudget.arrComplete.responseForm.category,
        style: {
          fontSize: 20,
        },
        bold: true,
      },
      {
        table: {
          widths: widthTable,
          body: [
            [
              ...realBudget.columns,
              {
                text: "total",
                bold: true,
              },
            ],
            ...rows,
            lastRow,
          ],
        },
        layout: {
          fillColor: function (rowIndex, node, columnIndex) {
            return rowIndex % 2 === 0 ? "#CCCCCC" : null;
          },
        },
      },
    ],
    styles: {},
  };

  pdfMake.createPdf(docDefinitions).open();
}

export default pdfDescription;
