import {useApi} from "../../../hooks/api/api";
import {DataContentProps} from "../interfaces";
import {format} from "date-fns";

export async function rdSaveProcess(userId: string, budgets: DataContentProps[], group = false) {
    const api = useApi();

    let realBudget: DataContentProps = budgets[0];
    let dealId = "";
    for (let budget of budgets) {
        if (budget.arrComplete.responseForm.rd_client) {
            dealId = budget.arrComplete.responseForm.rd_client;
        }
    }

    if (dealId == "") {
        return;
    }



    // delete old products
    const productsToDelete = (await api.rdGetaDeal(dealId)).deal_products
    for (const prod of productsToDelete) {
        await api.rdDeleteProduct(dealId, prod.id)
    }

    console.log("GROUP: ", group);
    if(group) {
        // add all budgets
        for (const budget of budgets) {
            try {

                await api
                    .getTariffPipe(budget.arrComplete.selectionRange.startDate, budget.arrComplete.selectionRange.endDate)
                    .then((tariff_pipe) => {
                        // pipe.addFile();
                        api.rdAddProduct(dealId, tariff_pipe.product_rd, budget?.total?.total ?? 0)
                    })
                    .catch((err) => console.log(err));
            } catch (err) {
                console.log(err);
            }
        }
    } else {
        const budget = budgets.reduce((old, current) => {
            const oldValue = old?.total?.total ?? 0;
            const currentValue = current?.total?.total ?? 0;

            return currentValue < oldValue ? current : old;
        }, budgets[0]);

        try {

            await api
                .getTariffPipe(budget.arrComplete.selectionRange.startDate, budget.arrComplete.selectionRange.endDate)
                .then((tariff_pipe) => {
                    // pipe.addFile();
                    api.rdAddProduct(dealId, tariff_pipe.product_rd, budget?.total?.total ?? 0)
                })
                .catch((err) => console.log(err));
        } catch (err) {
            console.log(err);
        }
    }



    await api.rdChangeStage(dealId, format(realBudget.arrComplete.selectionRange.startDate, "dd/MM/yyyy"), format(realBudget.arrComplete.selectionRange.endDate, "dd/MM/yyyy"), +realBudget.arrComplete.responseForm.adult, realBudget.arrComplete.childValue, realBudget.arrComplete.petValue)
}
