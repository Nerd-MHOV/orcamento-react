import { checkDeadLine } from "../CheckDeadLine";
import { UpdateCustomFieldsRDToCG } from "../UpdateCustomFieldsRDToCG";
import updateRDInformations from "./updateRDInformations";

const preChangeStageDefault = async (params: any) => {
    const {
        date,
        day_dead_line,
        deal
    } = params;
    const [day, month, year] = date.split("/")
    // Atualizar informações rd 
    updateRDInformations(
        date,
        day_dead_line,
        deal,
    );

    // Atualiza informações rd -> cg 
    const checkDateToCgInformation = checkDeadLine(
        new Date(`${year}-${month}-${day}`),
        day_dead_line + 1,
    )
    if (checkDateToCgInformation) {
        await UpdateCustomFieldsRDToCG(deal)
    }
}

export default preChangeStageDefault