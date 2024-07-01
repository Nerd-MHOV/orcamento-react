import { Content, TableCell } from "pdfmake/interfaces"

export const applyBoder = (array: string[], style = "semClass") => {
    return array.map(text => ({ text: text, borderColor: ["#fff", "#fff", "#fff", "#fff"], margin: [2,2,2,2], style: style }))
  }