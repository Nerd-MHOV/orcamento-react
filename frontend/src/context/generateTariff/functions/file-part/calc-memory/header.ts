import {format} from "date-fns";

export const HeaderCalcMemory = (namePerson: string, rd_client: string) => {
    return [
        {
            text: `Memória de Cálculo`,
            style: "header",
        },
        { text: " ", style: { margin: 5} },
        {
            text: `Nome: ` + namePerson,
            style: "description",
        },
        {
            text: `ID do Cliente: ` + rd_client,
            style: "description",
        },
        {
            text: `Gerado em: ` + format(new Date(), "dd/MM/yyyy"),
            style: "description",
        },
    ]
}