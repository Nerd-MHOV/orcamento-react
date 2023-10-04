import {rdGetDeals} from "../../services/rdstation/getDeals";
import {checkDeadLine} from "./CheckDeadLine";
import {CustomFieldFilter, FieldsKeysRD} from "../../services/rdstation/CustomFieldFilter";
import {UpdateDeal} from "../../services/rdstation/updateDeal";
import {rdCreateTask} from "../../services/rdstation/createTask";
import {format} from "date-fns";

export const Day_x = async (day_dead_line: number, current_stage: string, next_stage: string, field: FieldsKeysRD) => {
    console.log(` [ INFO ] - *Day_x() - init process....`)
    console.log(` [ INFO ] - *Day_x() - deadline: ${day_dead_line}`)
    console.log(` [ INFO ] - *Day_x() - current_stage: ${current_stage}`)
    console.log(` [ INFO ] - *Day_x() - next_stage: ${next_stage}`)

    try {
        // pegar negocios apartir de uma etapa
        const deals = await rdGetDeals({
            win: "null",
            deal_stage_id: current_stage,
        })


        // verificar se data do negocio
        console.log(` [ INFO ] - *Day_x() - deal in stage: ${deals.total}`)

        for (const deal of deals.deals) {
            const day_to_compare = CustomFieldFilter(
                field, deal
            )

            if(
                typeof day_to_compare?.value !== 'string'
                || day_to_compare.value.split("/")[0].length !== 2
                || day_to_compare.value.split("/")[1].length !== 2
                || day_to_compare.value.split("/")[2].length !== 4
            ) {
                console.log(` [ ATENTION ] - *Day_x() - this is not a date ${deal.name}, ${day_to_compare?.value}`)

                try {
                    const taskDate = new Date()
                    taskDate.setFullYear(taskDate.getFullYear() - 1);
                    rdCreateTask({
                        task: {
                            deal_id: deal.id,
                            subject: "ERRO: Data não informada corretamente",
                            type: "task",
                            date: format(taskDate, "yyyy-MM-dd"),
                            hour: format(new Date(), "HH:ii"),
                            notes: `O ${day_to_compare?.custom_field.label} precisa ser informado no formato: ( dia/mes/ano )`
                        }
                    }).then(() => {
                        console.log(` [ INFO ] - *Day_x() - **rdCreateTask() - created tag to ${deal.name}`)
                    })
                } catch (e) {
                    console.log(` [ ERROR ] - *Day_x() - **rdCreateTask() - error create tag to ${deal.name}`)
                }
                continue
            }
            const [day, month, year] = day_to_compare.value.split("/")


            const checkDate = checkDeadLine(
                new Date(`${year}-${month}-${day}`),
                day_dead_line,
            )


            // mudar negocio para proxima etapa
            if(checkDate) {
                await UpdateDeal(deal.id, {
                    deal_stage_id: next_stage
                }).then(() => {
                    console.log(` [ INFO ] - *Day_x() - changed stage deal ${deal.name}...`)
                })
                    .catch(() => {
                        console.log(` [ ERROR ] - *Day_x() - **UpdateDeal() - error to change stage deal `)
                    })
            }
        }

        console.log(` [ INFO ] - *Day_x() - finish  deadline: ${day_dead_line}`)
        return true
    }
    catch (e) {
        console.log(` [ ERROR ] - *Day_x() - Error to execute function`)
        return false;
    }
}