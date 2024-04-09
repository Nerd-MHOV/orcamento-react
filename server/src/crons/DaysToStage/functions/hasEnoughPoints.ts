import { CustomFieldFilter } from "../../../services/rdstation/CustomFieldFilter";
import { Deal } from "../../../services/rdstation/rd.types";

function hasEnoughPoints(deal: Deal) {
    const points = CustomFieldFilter("points", deal)?.value;
    if(!points || Number(points) < 1) {
        console.log(` [ ERROR ] - *hasEnoughPoints() - don't have enough points ${deal.name} ${points}`)
        return false
    }

    return true
}

export default hasEnoughPoints