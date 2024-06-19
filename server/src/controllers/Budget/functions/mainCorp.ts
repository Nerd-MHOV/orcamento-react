import { RowsProps, UnitaryDiscountProps } from "../CalcBudgetController";
import { CorporateBodyResponseBudget, CorporateBodySendBudget, RoomCorporateResponse } from "../CalcBudgetCorpController";
import { adultBudget } from "./adultBudget";
import { calcTotal, calcTotalBudgets } from "./calcTotal";
import { childBudget } from "./childBudget";
import { petBudget } from "./petBudget";
import { requirementBudget } from "./requirementBudget";


export async function mainCorp(bodyRequest: CorporateBodySendBudget, discount = 0) {
    
    const { dateRange, rooms, pension, requirements } = bodyRequest;

    let initDate = new Date(dateRange.startDate);
    let finalDate = new Date(dateRange.endDate);

    // mock variables
    const unitaryDiscount: UnitaryDiscountProps[] = [];
    const dailyCourtesy: boolean = false;
    const newRoomsPromises = rooms.map(async ( room ) => {
        const arrForm = {
            adult: room.adt,
            discount,
            category: room.roomNumber.category,
            pension: pension,
        }
        // calculate cost for adult, child, pet and requirements
        let adultRows = await adultBudget(arrForm, room.chd, unitaryDiscount, dailyCourtesy, initDate, finalDate);
        let childRows = await childBudget(arrForm, room.chd, unitaryDiscount, dailyCourtesy, initDate, finalDate);
        let petRows = await petBudget(arrForm, room.pet, unitaryDiscount, initDate, finalDate);
        let requirementRows = await requirementBudget(arrForm, [], unitaryDiscount, initDate, finalDate);

        const rows = [...adultRows, ...childRows, ...petRows, ...requirementRows]
        let newRoom: RoomCorporateResponse = {
            ...room,
            rowsValues: {
                rows: rows,
                total: calcTotal(rows, discount)
            }
        };
        return newRoom
    })
    
    // Awaiting to conclusion each async operation
    const newRooms = await Promise.all(newRoomsPromises);

    // requirement to budget ( all rooms )
    let requirementRows = await requirementBudget({ adult: 0 }, requirements, unitaryDiscount, initDate, finalDate);
    const rowsFinal: RowsProps[] = [...calcTotalBudgets(newRooms), ...requirementRows];

    const response: CorporateBodyResponseBudget = {
        ...bodyRequest,
        rooms: newRooms,
        rowsValues: {
            rows: rowsFinal,
            total: calcTotal(rowsFinal, discount)
        }
    }

    return response;
}