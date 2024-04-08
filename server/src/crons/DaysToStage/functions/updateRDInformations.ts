import { rdstationConfig } from "../../../config/rdstationConfig";
import getLoyaltPoints from "../../../services/getLoyaltPoints";
import { CustomFieldFilterContact } from "../../../services/rdstation/CustomFieldFilter";
import { rdGetContactDeal } from "../../../services/rdstation/getContactDeal";
import { Deal } from "../../../services/rdstation/rd.types";
import { UpdateDeal } from "../../../services/rdstation/updateDeal";
import { checkDeadLine } from "../CheckDeadLine";

const updateRDInformations = async (
    date: string,
    day_dead_line: number,
    deal: Deal
    ) => {
    const [day, month, year] = date.split("/")
    const checkDateToRdInformation = checkDeadLine(
        new Date(`${year}-${month}-${day}`),
        day_dead_line + 2,
    )
    if (checkDateToRdInformation) {
        // get cpf
        const contactDeal = await rdGetContactDeal(deal.id);
        const cpf = CustomFieldFilterContact("cpf", contactDeal.contacts[0])?.value;
        if (!cpf) {
            console.log(` [ ERROR ] - *Day_x() - GET CPF TO ${deal.name} ${cpf}`)
            return;
        };
        // pontos_fidelidade
        const points = await getLoyaltPoints(`${cpf}`)
        if (!points) {
            console.log(` [ ERROR ] - *Day_x() - GET LAUOUTS POINTS ${deal.name} ${cpf}`)
            return;
        };

        UpdateDeal(deal.id, {
            deal: {
                deal_custom_fields: [
                    {
                        custom_field_id: rdstationConfig.fields.points,
                        value: String(points?.saldo),
                    },
                    {
                        custom_field_id: rdstationConfig.fields.points_validate,
                        value: `${day}/${month}/${+year + 1}`
                    }
                ]
            }
        }).then(() => {
            console.log(` [ SUCCESS ] - *Day_x() - ATT LAUOUTS POINTS ${deal.name} ${cpf}`)
        }).catch(() => {
            console.log(` [ ERROR ] - *Day_x() - ATT LAUOUTS POINTS ${deal.name} ${cpf}`)
        })
    }
}

export default updateRDInformations