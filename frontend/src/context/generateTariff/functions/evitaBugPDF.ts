import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { TDocumentDefinitions } from "pdfmake/interfaces";
async function EvitaBug(budgets: any[], token: string) {
  (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

  let realBudget = budgets[0];

  let housingUnit = realBudget.arrComplete.responseForm.housingUnit.substr(
    0,
    3
  );
  let rows = [];

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
      {
        text: `000000${housingUnit}09928`,
        alignment: "right",
        fontSize: 8,
      },
    ],
    styles: {},
  };

  const pdf = pdfMake.createPdf(docDefinitions);
  pdf.open();

  // let deal_id = realBudget.arrComplete.responseForm.numberPipe;
  // if (deal_id) {
  //   const document = pdf.getBlob(async (blob) => {
  //     const pipe = usePipe();
  //     const response = await pipe.addFile(
  //       token,
  //       deal_id,
  //       blob,
  //       "Descrição.pdf"
  //     );
  //     console.log(response);
  //   });
  // }
}

export default EvitaBug;
