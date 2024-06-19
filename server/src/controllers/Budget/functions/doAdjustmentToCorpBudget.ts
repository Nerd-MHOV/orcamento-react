import {CorporateBodyResponseBudget} from "../CalcBudgetCorpController";
import {mainCorp} from "./mainCorp";


// DELETE THIS FILE
export async function doAdjustmentToCorpBudget(without: CorporateBodyResponseBudget) {
    let adjustment = getAdjustmentToApplied(without.rowsValues.total.total);
    if (adjustment == 0) return {
        withAdjustment: without,
        adjustment
    };
    console.log('adjustment', adjustment);
    return {
        withAdjustment: await mainCorp(without, adjustment),
        adjustment
    };
}


function getAdjustmentToApplied(total: number) {

    let getAdjustment = adjustments.filter(dsc => dsc.value <= total);
    getAdjustment.sort((a, b) => b.adjustment - a.adjustment);

    return getAdjustment.length > 0 ? getAdjustment[0].adjustment : 0;
}

const adjustments = [
    {value: 10000, adjustment: 10},
    {value: 15000, adjustment: 12},
    {value: 16000, adjustment: 13},
    {value: 18000, adjustment: 14},
    {value: 20000, adjustment: 16},
    {value: 22000, adjustment: 17},
    {value: 25000, adjustment: 20},
]