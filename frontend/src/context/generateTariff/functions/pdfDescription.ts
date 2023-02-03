import { TDocumentDefinitions } from "pdfmake/interfaces";
import { usePipe } from "../../../hooks/pipedrive/pipeApi";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { blue } from "@mui/material/colors";
import { format } from "date-fns";

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

// for production
// import * as pdfMake from "pdfmake/build/pdfmake";
// import * as pdfFonts from "./vfs_fonts";
// (<any>pdfMake).vfs = pdfFonts.pdfMake;

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

const onlyNumber = (string: string | undefined) => {
  if (!string) return 0;
  string = string.replace(/[.]/g, "");
  string = string.replace(/[,]/g, ".");
  string = string.replace(/[^0-9 | ^.]/g, "");
  return Number(string);
};

async function pdfDescription(
  budgets: any[],
  token: string,
  namePerson: string
) {
  let realBudget = budgets[0];
  console.log(realBudget, "realBudget");
  let housingUnit = realBudget.arrComplete.responseForm.housingUnit.substr(
    0,
    3
  );

  let rows_days = new Array();
  let rows_extra = new Array();

  for (let budget of realBudget.rows) {
    let lineRows = [];

    lineRows.push({ text: budget.desc });
    for (let value of budget.values) {
      lineRows.push({
        text: `R$ ${value.toLocaleString("pt-BR", {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        })}`,
      });
    }
    lineRows.push({
      text: `R$ ${budget.total.toLocaleString("pt-BR", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      })}`,
      bold: true,
    });

    if (budget.id < 300) rows_days.push(lineRows);
    else rows_extra.push(lineRows);
  }
  let lastRow_days = [];
  let lastRow_extras = [];
  for (let count = 0; count <= realBudget.columns.length; count++) {
    if (count === 0) {
      lastRow_days.push({ text: "TOTAL", bold: true });
      lastRow_extras.push({ text: "TOTAL", bold: true });
    } else {
      let total_days = 0;
      let total_extras = 0;
      for (let day of rows_days) {
        total_days += onlyNumber(day[count].text);
      }

      for (let extra of rows_extra) {
        total_extras += onlyNumber(extra[count].text);
      }

      lastRow_days.push({
        text: `R$ ${total_days.toLocaleString("pt-BR", {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        })}`,
        bold: true,
      });
      lastRow_extras.push({
        text: `R$ ${total_extras.toLocaleString("pt-BR", {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        })}`,
        bold: true,
      });

      console.log(
        `R$ ${total_extras.toLocaleString("pt-BR", {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        })}`
      );
    }
  }

  let columns = realBudget.columns.map((title: string) => ({
    text: title,
    bold: true,
  }));
  columns.push({ text: "TOTAL", bold: true });

  let total =
    onlyNumber(lastRow_days.at(-1)?.text) +
    onlyNumber(lastRow_extras.at(-1)?.text);

  const otherColumns = columns;

  let widthTable = [];

  for (let line of lastRow_days) {
    widthTable.push("*");
  }

  const docDefinitions: TDocumentDefinitions = {
    defaultStyle: {
      //   font: "Helvetica",
      alignment: "left",
    },
    content: [
      {
        text: `Memória de Cálculo`,
        style: "header",
      },
      {
        columns: [
          {
            text: `nº Pipe: ` + realBudget.arrComplete.responseForm.numberPipe,
            style: "description",
          },
          {
            text: `Nome: ` + namePerson,
            style: "description",
          },
        ],
      },
      {
        columns: [
          {
            text: `Gerado em: ` + format(new Date(), "dd/MM/yyyy"),
            style: "description",
          },
          {
            text: `Pensão: ${realBudget.arrComplete.responseForm.pension}`,
          },
        ],
      },
      {
        text:
          realBudget.arrComplete.responseForm.category +
          " - R$: " +
          total.toLocaleString("pt-BR", {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          }),
        style: {
          fontSize: 20,
        },
        bold: true,
      },
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
        layout: {
          hLineWidth: function (i, node) {
            return i === 0 || i === node.table.body.length ? 2 : 1;
          },
          vLineWidth: function (i, node) {
            return i === 0 || i === node.table.widths?.length ? 2 : 1;
          },
          hLineColor: function (i, node) {
            return i === 0 || i === node.table.body.length ? "black" : "gray";
          },
          vLineColor: function (i, node) {
            return i === 0 || i === node.table.widths?.length
              ? "black"
              : "gray";
          },
          // hLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
          // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
          // paddingLeft: function(i, node) { return 4; },
          // paddingRight: function(i, node) { return 4; },
          // paddingTop: function(i, node) { return 2; },
          // paddingBottom: function(i, node) { return 2; },
          // fillColor: function (rowIndex, node, columnIndex) { return null; }
        },
        style: {
          marginBottom: 20,
        },
      },
      {
        text: " ",
        style: {
          margin: 200,
        },
      },
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
        layout: {
          hLineWidth: function (i, node) {
            return i === 0 || i === node.table.body.length ? 2 : 1;
          },
          vLineWidth: function (i, node) {
            return i === 0 || i === node.table.widths?.length ? 2 : 1;
          },
          hLineColor: function (i, node) {
            return i === 0 || i === node.table.body.length ? "black" : "gray";
          },
          vLineColor: function (i, node) {
            return i === 0 || i === node.table.widths?.length
              ? "black"
              : "gray";
          },
          // hLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
          // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
          // paddingLeft: function(i, node) { return 4; },
          // paddingRight: function(i, node) { return 4; },
          // paddingTop: function(i, node) { return 2; },
          // paddingBottom: function(i, node) { return 2; },
          // fillColor: function (rowIndex, node, columnIndex) { return null; }
        },
      },
      {
        text: `000000${housingUnit}09928`,
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
        fontSize: 10,
      },
    },
  };

  const pdf = pdfMake.createPdf(docDefinitions);
  pdf.open();

  let deal_id = realBudget.arrComplete.responseForm.numberPipe;
  if (deal_id) {
    const document = pdf.getBlob(async (blob) => {
      const pipe = usePipe();
      const response = await pipe.addFile(
        token,
        deal_id,
        blob,
        "Descrição.pdf"
      );
      console.log(response);
    });
  }
}

export default pdfDescription;
