import {prismaClient} from "../database/prismaClient";
import {SaveBudgets} from "@prisma/client";
import {addDays} from "date-fns";
import {UpdateDeal} from "../services/rdstation/updateDeal";


export const assistDBStatus = async  () => {

    const filterNotIn = [
        "perdido", "ganho", "none", "refeito",
    ]
    const budgets = await prismaClient.saveBudgets.findMany({
        where: {
            status: {
                notIn: filterNotIn
            }
        }
    })

    await verifyHasExpired(budgets);
}


const verifyHasExpired = async (budgets: SaveBudgets[]) => {
    for(const budget of budgets) {
        const expireIn = addDays(budget.createdAt, 3);
        // const loseIn = addDays(budget.createdAt, 5)
        // if(loseIn < new Date()) {
        //     // atualizar para perdido
        //    await updateStatus(budget, "perdido")
        //
        // }else
        if(expireIn < new Date()) {
            // atualizar para vencido
           await updateStatus(budget, "vencido")
        }

    }
}

async function updateStatus(budget: SaveBudgets, status: string) {
    // @ts-ignore
    await UpdateDeal(budget.budgets[0].arrComplete.responseForm.rd_client, {
        deal: {
            deal_custom_fields: [
                {
                    custom_field_id: "64b94d33862444000e56696e",
                    value: status,
                }
            ],

        }
    })
        .then(res => {
            console.log(` [ INFO ] - Updated status budget ${budget.id}`)
        })
        .catch(err => {
        console.log(` [ ERROR ] - Update status to budget ${budget.id}`)
    })
    await prismaClient.saveBudgets.update({
        where: { id: budget.id},
        data: {status: status}
    })
}

