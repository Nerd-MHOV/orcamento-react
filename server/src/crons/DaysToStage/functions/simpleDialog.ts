import { format } from "date-fns";
import { Dialog } from "../../../services/chatguru/Dialog";
import formatPhone from "../../../services/formatPhone";
import { rdCreateTask } from "../../../services/rdstation/createTask";
import { Deal } from "../../../services/rdstation/rd.types";

const simpleDialogDaysToStage = async (deal: Deal, dialog: string) => {
    const number = formatPhone(deal.contacts[0].phones[0].phone)
    const responseDialog = await Dialog(
        number,
        dialog,
    );
    console.log(` [ INFO ] - *SimpleDialog() - Send Dialog: ${number} - ${dialog} - ${responseDialog?.code}`)
    if (responseDialog?.code !== 200) {
        // Criar task com o erro
        const taskDate = new Date()
        taskDate.setFullYear(taskDate.getFullYear() - 1);
        rdCreateTask({
            task: {
                deal_id: deal.id,
                subject: "ERRO: Dialog Chatguru",
                type: "task",
                date: format(taskDate, "yyyy-MM-dd"),
                hour: format(new Date(), "HH:ii"),
                notes: responseDialog.description ?? "Erro ao enviar menssagem",
            }
        }).then(() => {
            console.log(` [ INFO ] - *SimpleDialog() - CG Erro ao executar dialogo - created tag to ${deal.name}`)
        })
    }
}


export default simpleDialogDaysToStage