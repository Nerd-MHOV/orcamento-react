import { Content } from "pdfmake/interfaces";
export const breakPage = (
    layout: () => Content
): Content[] => {
    return [
        { text: '', pageBreak: 'after' },
        layout(),
      ]
}