import { EditField } from "../../services/chatguru/EditField";
import formatPhone from "../../services/formatPhone";
import { CustomFieldFilter } from "../../services/rdstation/CustomFieldFilter";
import { Deal } from "../../services/rdstation/rd.types";

export async function UpdateCustomFieldsRDToCG(deal: Deal) {
    const number = formatPhone(deal.contacts[0]?.phones[0]?.phone)
    if (!number) {
        return;
    }
    const chd = CustomFieldFilter("chd", deal)?.value
    const adt = CustomFieldFilter("adt", deal)?.value
    const check_in = CustomFieldFilter("check_in", deal)?.value
    const check_out = CustomFieldFilter("check_out", deal)?.value
    const points = CustomFieldFilter("points", deal)?.value
    const redLinePoints = check_out

    const response = await EditField(number, {
        "ID_RD": deal.id,
        "CHD_IDADE": chd,
        "ADULTOS": adt,
        "Data_final_da_viagem": formatToDate(String(check_in)),
        "Data_inicial_da_viagem": formatToDate(String(check_out)),
        "Data_de_validade_clube_Fidelidade": formatToDate(String(redLinePoints)),
        "Pontos_fidelidade": Number(points),
    })
    console.log(response);
    return response
}

function formatToDate(date: string) {
    const [day, month, year] = date.split("/")
    return `${year}-${month}-${day}`
}